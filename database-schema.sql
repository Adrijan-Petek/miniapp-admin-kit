-- MiniApp Admin Kit Database Schema
-- Run this SQL in your Supabase SQL editor to set up the database

-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create announcements table
CREATE TABLE IF NOT EXISTS announcements (
  id SERIAL PRIMARY KEY,
  text TEXT NOT NULL,
  char_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create leaderboard table
CREATE TABLE IF NOT EXISTS leaderboard (
  id SERIAL PRIMARY KEY,
  address TEXT NOT NULL UNIQUE,
  score INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create level_rewards table
CREATE TABLE IF NOT EXISTS level_rewards (
  id SERIAL PRIMARY KEY,
  level INTEGER NOT NULL UNIQUE,
  reward_amount INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create mini_apps table
CREATE TABLE IF NOT EXISTS mini_apps (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  url TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create treasury table
CREATE TABLE IF NOT EXISTS treasury (
  id SERIAL PRIMARY KEY,
  balance INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default data
INSERT INTO announcements (text, char_count) VALUES
  ('Reach Level 15 for 10,000 Tokens, Level 20 for 15,000 Tokens, and Level 30 for a massive 30,000 Tokens. Claim everything directly from your profile.', 142),
  ('You get 1 free Match-3 and 1 free Card Game play every day - use them before they reset!', 88),
  ('Boosters are live in Match-3! Use Hammer, Shuffle, and Color Bomb to chase higher scores and more Tokens.', 103),
  ('New leaderboard season is coming - play Match-3 and Card Game now to secure your spot and earn Token prizes.', 107),
  ('Play games, earn Tokens, and claim your rewards directly from your profile. More Token utilities coming soon!', 106)
ON CONFLICT DO NOTHING;

INSERT INTO mini_apps (name, description, url, is_active) VALUES
  ('Match-3 Game', 'Classic match-3 puzzle game with boosters and leaderboards', '/games/match3', true),
  ('Card Game', 'Strategic card game with daily rewards', '/games/cards', true),
  ('Token Shop', 'Purchase in-game items and boosts with tokens', '/shop', true),
  ('Profile Manager', 'Manage your profile, rewards, and achievements', '/profile', true)
ON CONFLICT DO NOTHING;

INSERT INTO level_rewards (level, reward_amount) VALUES
  (15, 10000),
  (20, 15000),
  (30, 30000)
ON CONFLICT DO NOTHING;

INSERT INTO treasury (id, balance) VALUES (1, 0) ON CONFLICT DO NOTHING;

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_announcements_updated_at BEFORE UPDATE ON announcements FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_leaderboard_updated_at BEFORE UPDATE ON leaderboard FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_level_rewards_updated_at BEFORE UPDATE ON level_rewards FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_mini_apps_updated_at BEFORE UPDATE ON mini_apps FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_treasury_updated_at BEFORE UPDATE ON treasury FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (optional - configure as needed)
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;
ALTER TABLE level_rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE mini_apps ENABLE ROW LEVEL SECURITY;
ALTER TABLE treasury ENABLE ROW LEVEL SECURITY;

-- Create policies (adjust based on your authentication needs)
-- Create users table for multi-user authentication
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('super_admin', 'admin', 'moderator', 'viewer')),
  is_active BOOLEAN NOT NULL DEFAULT true,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create api_keys table for API access
CREATE TABLE IF NOT EXISTS api_keys (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  key TEXT NOT NULL UNIQUE,
  permissions JSONB NOT NULL DEFAULT '{}',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_by INTEGER NOT NULL REFERENCES users(id),
  expires_at TIMESTAMP WITH TIME ZONE,
  last_used TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create audit_logs table for security tracking
CREATE TABLE IF NOT EXISTS audit_logs (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  action TEXT NOT NULL,
  resource TEXT NOT NULL,
  resource_id TEXT,
  details JSONB,
  ip_address INET,
  user_agent TEXT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create sessions table for session management
CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id INTEGER NOT NULL REFERENCES users(id),
  token TEXT NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default super admin user (password: admin123 - CHANGE THIS IN PRODUCTION!)
INSERT INTO users (username, email, password_hash, role) VALUES
  ('superadmin', 'admin@example.com', '$2b$10$rOz8vZKZ8vZKZ8vZKZ8vZKZ8vZKZ8vZKZ8vZKZ8vZKZ8vZKZ8vZK', 'super_admin')
ON CONFLICT (username) DO NOTHING;

-- Add updated_at triggers for new tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_api_keys_updated_at BEFORE UPDATE ON api_keys FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security for new tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Users can view their own data" ON users FOR SELECT USING (auth.uid()::text = id::text);
CREATE POLICY "Super admins can manage all users" ON users FOR ALL USING (
  EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'super_admin'
  )
);

-- Create policies for api_keys table
CREATE POLICY "Users can view their own API keys" ON api_keys FOR SELECT USING (created_by = auth.uid());
CREATE POLICY "Admins can manage API keys" ON api_keys FOR ALL USING (
  EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('super_admin', 'admin')
  )
);

-- Create policies for audit_logs table
CREATE POLICY "Admins can view audit logs" ON audit_logs FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('super_admin', 'admin')
  )
);

-- Create policies for sessions table
CREATE POLICY "Users can view their own sessions" ON sessions FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can manage their own sessions" ON sessions FOR ALL USING (user_id = auth.uid());