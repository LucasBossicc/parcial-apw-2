import pg from 'pg'
import dotenv from 'dotenv'

// Inicializa la configuración de las variables de entorno desde el archivo .env
dotenv.config()
const { Pool } = pg

// Instancia el pool de conexiones configurando las credenciales de acceso a PostgreSQL
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
})

// Establece y verifica la conexión inicial con el servidor de la base de datos
pool.connect()
    .then(() => {
        console.log('✅ Conectado a PostgreSQL')
    })
    .catch((error) => {
        console.log('❌ Error PostgreSQL')
        console.log(error)
    })

// Exporta la instancia del pool para su reutilización modular en los modelos
export default pool

