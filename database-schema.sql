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
-- For now, allow all operations (you should restrict these based on your auth system)
CREATE POLICY "Allow all operations on announcements" ON announcements FOR ALL USING (true);
CREATE POLICY "Allow all operations on leaderboard" ON leaderboard FOR ALL USING (true);
CREATE POLICY "Allow all operations on level_rewards" ON level_rewards FOR ALL USING (true);
CREATE POLICY "Allow all operations on mini_apps" ON mini_apps FOR ALL USING (true);
CREATE POLICY "Allow all operations on treasury" ON treasury FOR ALL USING (true);