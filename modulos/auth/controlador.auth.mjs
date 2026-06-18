import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import * as modelo from './modelo.auth.mjs'

export async function login(req, res) {

    // Aplica desestructuración de objetos para extraer las credenciales enviadas en el cuerpo de la petición (payload)
    const { username, password } = req.body
    const usuario = await modelo.buscarUsuario(username)

    // Si el registro no existe, interrumpe el flujo y retorna un código de estado HTTP 401 (No autorizado)
    if (!usuario) {
        return res.status(401).send('Usuario incorrecto')
    }

    const valido = await bcrypt.compare(password, usuario.password_hash)

    console.log("PASSWORD INGRESADA:", password)
    console.log("HASH BD:", usuario.password_hash)
    console.log("VALIDO:", valido)

    if (!valido) {
        return res.status(401).send('Contraseña incorrecta')
    }

    // Genera y firma un JSON Web Token (JWT) incluyendo el identificador del usuario y configurando un tiempo de expiración
    const token = jwt.sign(
        {
            username: usuario.username
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1h'
        }
    )

    res.cookie(
        'token',
        token,
        {
            httpOnly: true
        }
    )
    res.redirect('/items')
}