import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()
const { Pool } = pg

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
})

pool.connect()
    .then(() => {
        console.log('✅ Conectado a PostgreSQL')
    })
    .catch((error) => {
        console.log('❌ Error PostgreSQL')
        console.log(error)
    })

export default pool

