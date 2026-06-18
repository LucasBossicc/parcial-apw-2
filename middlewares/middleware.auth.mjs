import jwt from 'jsonwebtoken';

export function verificarToken(req, res, next) {
    // Recupera el token almacenado en la cookie del cliente de forma segura
    const token = req.cookies.token;

    // Si el token no existe, interrumpe el ciclo de la solicitud y redirige al login
    if (!token) {
        return res.redirect('/login');
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        return res.redirect('/login');
    }
}