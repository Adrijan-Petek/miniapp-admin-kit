import { z } from 'zod'

// Announcement validation schema
export const announcementSchema = z.object({
  id: z.number().int().positive().optional(),
  text: z.string()
    .min(1, 'Announcement text cannot be empty')
    .max(500, 'Announcement text cannot exceed 500 characters')
    .refine(text => text.trim().length > 0, 'Announcement text cannot be only whitespace'),
  charCount: z.number().int().min(0).max(500).optional(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
})

export type AnnouncementInput = z.infer<typeof announcementSchema>

// Leaderboard validation schema
export const leaderboardPlayerSchema = z.object({
  id: z.number().int().positive().optional(),
  address: z.string()
    .regex(/^0x[a-fA-F0-9]{40}$/, 'Invalid Ethereum address format')
    .transform(addr => addr.toLowerCase()),
  score: z.number().int().min(0, 'Score must be non-negative'),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
})

export type LeaderboardPlayerInput = z.infer<typeof leaderboardPlayerSchema>

// Level rewards validation schema
export const levelRewardSchema = z.object({
  id: z.number().int().positive().optional(),
  level: z.number().int().min(1).max(1000),
  reward_amount: z.number().int().min(0, 'Reward amount must be non-negative'),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
})

export type LevelRewardInput = z.infer<typeof levelRewardSchema>

// Mini app validation schema
export const miniAppSchema = z.object({
  id: z.number().int().positive().optional(),
  name: z.string()
    .min(1, 'App name cannot be empty')
    .max(100, 'App name cannot exceed 100 characters')
    .regex(/^[a-zA-Z0-9\s\-_]+$/, 'App name contains invalid characters'),
  description: z.string()
    .min(1, 'Description cannot be empty')
    .max(500, 'Description cannot exceed 500 characters'),
  url: z.string()
    .url('Invalid URL format')
    .refine(url => url.startsWith('/'), 'Mini app URLs must be relative paths starting with /'),
  is_active: z.boolean().optional(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
})

export type MiniAppInput = z.infer<typeof miniAppSchema>

// Treasury validation schema
export const treasurySchema = z.object({
  id: z.number().int().positive().optional(),
  balance: z.number().int().min(0, 'Balance must be non-negative'),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
})

export type TreasuryInput = z.infer<typeof treasurySchema>

// User authentication schemas
export const loginSchema = z.object({
  username: z.string()
    .min(1, 'Username is required')
    .max(50, 'Username too long'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one lowercase letter, one uppercase letter, and one number'),
})

export type LoginInput = z.infer<typeof loginSchema>

// Settings validation schemas
export const databaseSettingsSchema = z.object({
  databaseProvider: z.enum(['supabase', 'vercel-postgres', 'planetscale', 'mongodb-atlas', 'railway', 'neon', 'cockroachdb', 'custom']),
  databaseUrl: z.string().url().optional().or(z.literal('')),
  databaseName: z.string().min(1).max(100).optional().or(z.literal('')),
  databaseHost: z.string().min(1).max(255).optional().or(z.literal('')),
  databasePort: z.string().regex(/^\d+$/).optional().or(z.literal('')),
  databaseUsername: z.string().min(1).max(100).optional().or(z.literal('')),
  databasePassword: z.string().optional(),
})

export const themeSettingsSchema = z.object({
  themeColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Invalid hex color'),
  fontFamily: z.enum(['Inter', 'Roboto', 'Open Sans', 'Lato', 'Poppins', 'Nunito']),
  logoUrl: z.string().url().optional().or(z.literal('')),
  backgroundImageUrl: z.string().url().optional().or(z.literal('')),
})

export const gameSettingsSchema = z.object({
  match3PlayFee: z.number().min(0),
  match3BoosterSinglePrice: z.number().min(0),
  match3BoosterPackPrice: z.number().min(0),
  cardGamePlayFee: z.number().min(0),
  cardGameWinReward: z.number().min(0),
  dailyClaimBaseReward: z.number().min(0),
  dailyClaimStreakBonus: z.number().min(0),
})

// API request validation helpers
export const validateData = <T>(schema: z.ZodSchema<T>, data: unknown): { success: true; data: T } | { success: false; errors: z.ZodError } => {
  const result = schema.safeParse(data)
  if (result.success) {
    return { success: true, data: result.data }
  } else {
    return { success: false, errors: result.error }
  }
}

export const validateAndSanitize = <T>(schema: z.ZodSchema<T>, data: unknown): T => {
  const result = schema.parse(data)
  return result
}

// Sanitization helpers
export const sanitizeString = (str: string): string => {
  return str.trim().replace(/[<>]/g, '') // Basic XSS prevention
}

export const sanitizeUrl = (url: string): string => {
  // Basic URL sanitization - in production, use a proper URL sanitizer
  return url.trim()
}

// Rate limiting helpers (for future API implementation)
export const rateLimitSchema = z.object({
  identifier: z.string(),
  action: z.string(),
  timestamp: z.number(),
  attempts: z.number().min(0),
})

export type RateLimitEntry = z.infer<typeof rateLimitSchema>

// User management schemas
export const userRoleSchema = z.enum(['super_admin', 'admin', 'moderator', 'viewer'])

export const userSchema = z.object({
  id: z.number().int().positive().optional(),
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(50, 'Username cannot exceed 50 characters')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Username can only contain letters, numbers, underscores, and hyphens'),
  email: z.string()
    .email('Invalid email format')
    .max(255, 'Email cannot exceed 255 characters'),
  role: userRoleSchema,
  is_active: z.boolean().default(true),
  last_login: z.string().datetime().optional(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
})

export type UserInput = z.infer<typeof userSchema>
export type UserRole = z.infer<typeof userRoleSchema>

// Password change schema
export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one lowercase letter, one uppercase letter, and one number'),
  confirmPassword: z.string(),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>

// Role-based permissions schema
export const permissionsSchema = z.object({
  can_manage_users: z.boolean().default(false),
  can_manage_announcements: z.boolean().default(false),
  can_manage_leaderboard: z.boolean().default(false),
  can_manage_miniapps: z.boolean().default(false),
  can_manage_rewards: z.boolean().default(false),
  can_manage_treasury: z.boolean().default(false),
  can_manage_settings: z.boolean().default(false),
  can_view_analytics: z.boolean().default(false),
})

export type Permissions = z.infer<typeof permissionsSchema>

// API security schemas
export const apiKeySchema = z.object({
  id: z.number().int().positive().optional(),
  name: z.string()
    .min(1, 'API key name is required')
    .max(100, 'API key name cannot exceed 100 characters'),
  key: z.string()
    .regex(/^[a-zA-Z0-9_-]{32,}$/, 'Invalid API key format'),
  permissions: permissionsSchema,
  is_active: z.boolean().default(true),
  created_by: z.number().int().positive(),
  expires_at: z.string().datetime().optional(),
  last_used: z.string().datetime().optional(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
})

export type ApiKeyInput = z.infer<typeof apiKeySchema>

// Audit log schema
export const auditLogSchema = z.object({
  id: z.number().int().positive().optional(),
  user_id: z.number().int().positive(),
  action: z.string().min(1, 'Action is required'),
  resource: z.string().min(1, 'Resource is required'),
  resource_id: z.string().optional(),
  details: z.record(z.string(), z.unknown()).optional(),
  ip_address: z.string().optional(),
  user_agent: z.string().optional(),
  timestamp: z.string().datetime().default(() => new Date().toISOString()),
})

export type AuditLogInput = z.infer<typeof auditLogSchema>

// Session management schema
export const sessionSchema = z.object({
  id: z.string().uuid(),
  user_id: z.number().int().positive(),
  token: z.string(),
  expires_at: z.string().datetime(),
  ip_address: z.string().optional(),
  user_agent: z.string().optional(),
  created_at: z.string().datetime().default(() => new Date().toISOString()),
})

export type SessionInput = z.infer<typeof sessionSchema>