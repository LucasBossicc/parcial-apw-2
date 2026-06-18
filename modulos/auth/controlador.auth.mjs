import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import * as modelo from './modelo.auth.mjs'

export async function login(req, res) {

    const { username, password } = req.body

    const usuario = await modelo.buscarUsuario(username)

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