#!/usr/bin/env node

/**
 * Database Setup Script for MiniApp Admin Kit
 *
 * This script helps set up the database schema and creates an initial super admin user.
 * Run this after setting up your Supabase project.
 *
 * Usage: npm run db:setup
 */

import bcrypt from 'bcrypt'
import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables')
  console.error('Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function setupDatabase() {
  try {
    console.log('🚀 Setting up MiniApp Admin Kit database...')

    // Read and execute schema
    const schemaPath = path.join(process.cwd(), 'database-schema.sql')
    const schema = fs.readFileSync(schemaPath, 'utf8')

    // Split schema into individual statements
    const statements = schema
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'))

    console.log('📄 Executing database schema...')

    for (const statement of statements) {
      if (statement.trim()) {
        try {
          const { error } = await supabase.rpc('exec_sql', { sql: statement })
          if (error) {
            console.warn(`⚠️  Warning executing statement: ${error.message}`)
          }
        } catch (err) {
          // Some statements might fail if tables already exist, continue
          console.log(`ℹ️  Statement might have failed (this is normal if tables exist): ${statement.substring(0, 50)}...`)
        }
      }
    }

    console.log('✅ Database schema setup complete!')

    // Check if super admin exists
    const { data: existingAdmin, error: checkError } = await supabase
      .from('users')
      .select('id')
      .eq('username', 'superadmin')
      .single()

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('❌ Error checking for existing admin:', checkError)
    }

    if (!existingAdmin) {
      console.log('👤 Creating initial super admin user...')

      // Create super admin user
      const hashedPassword = await bcrypt.hash('admin123', 10)

      const { error: insertError } = await supabase
        .from('users')
        .insert({
          username: 'superadmin',
          email: 'admin@example.com',
          password_hash: hashedPassword,
          role: 'super_admin',
          is_active: true,
        })

      if (insertError) {
        console.error('❌ Error creating super admin:', insertError)
        process.exit(1)
      }

      console.log('✅ Super admin user created!')
      console.log('🔐 Default credentials:')
      console.log('   Username: superadmin')
      console.log('   Password: admin123')
      console.log('   Email: admin@example.com')
      console.log('')
      console.log('⚠️  IMPORTANT: Change these credentials immediately after first login!')
    } else {
      console.log('ℹ️  Super admin user already exists')
    }

    console.log('')
    console.log('🎉 Database setup complete!')
    console.log('You can now start the application with: npm run dev')

  } catch (error) {
    console.error('❌ Database setup failed:', error)
    process.exit(1)
  }
}

setupDatabase()