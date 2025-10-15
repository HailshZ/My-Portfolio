const { Pool } = require('pg');
require('dotenv').config();

// Parse connection string to extract components for debugging
const connectionString = process.env.SUPABASE_DB_URL;
console.log('🔧 Database Configuration:');
console.log('   Using connection string:', connectionString.replace(/:[^:]*@/, ':****@'));

const pool = new Pool({
  connectionString: connectionString,
  ssl: { 
    rejectUnauthorized: false 
  },
  // Remove family: 4 as it might be causing issues
  connectionTimeoutMillis: 15000,
  idleTimeoutMillis: 30000,
  max: 10, // Maximum number of clients in the pool
  min: 2,  // Minimum number of clients in the pool
});

// Enhanced connection test with better error handling
const testConnection = async () => {
  let client;
  try {
    console.log('🔄 Testing database connection...');
    client = await pool.connect();
    const result = await client.query('SELECT NOW() as current_time, version() as db_version');
    console.log('✅ Database connected successfully');
    console.log('📅 Database time:', result.rows[0].current_time);
    console.log('🗄️  Database version:', result.rows[0].db_version.split('\n')[0]);
    client.release();
  } catch (error) {
    console.error('❌ Database connection failed:');
    console.error('   Error:', error.message);
    console.error('   Code:', error.code);
    console.error('   Detail:', error.detail);
    
    if (error.message.includes('password authentication failed')) {
      console.error('   🔑 Issue: Password authentication failed. Check your password.');
    } else if (error.message.includes('getaddrinfo ENOTFOUND')) {
      console.error('   🌐 Issue: Cannot resolve database hostname. Check network connection.');
    } else if (error.message.includes('connection refused')) {
      console.error('   🔌 Issue: Connection refused. Check if database is running and accessible.');
    } else if (error.message.includes('timeout')) {
      console.error('   ⏰ Issue: Connection timeout. Check network or try again.');
    }
    
    if (client) client.release();
    // Don't exit process, let server start but without DB
    console.log('⚠️  Server will start without database connection');
  }
};

testConnection();

// Handle pool errors
pool.on('error', (err) => {
  console.error('💥 Unexpected database pool error:', err.message);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool
};