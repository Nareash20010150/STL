import pkg from 'pg'
const { Pool } = pkg
import dotenv from 'dotenv'
dotenv.config()

//database connection object
const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
//   ssl: {
//     rejectUnauthorized: false // Add this line to disable SSL certificate verification
//   }
})

const connectDB = async () => {
  try {
    const client = await pool.connect()
    console.log('PostgreSQL Connected')
  } catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}

const query = async (text, params) => {
  try {
    const result = await pool.query(text, params)
    return result
  } catch (error) {
    console.error(`Error executing query: ${error.message}`)
    throw error
  }
}

export { connectDB, query }