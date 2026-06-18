import express from 'express';
// Subimos un nivel (../) para salir de la carpeta rutas y entrar a modulos o middlewares
import * as controlador from '../modulos/jugadores/controlador.jugadores.mjs';
import * as auth from '../modulos/auth/controlador.auth.mjs';
import { verificarToken } from '../middlewares/middleware.auth.mjs';

const router = express.Router();

// --- RUTAS DE LA API (JUGADORES) ---
router.get('/api/v1/jugadores', verificarToken, controlador.obtenerTodos);
router.get('/api/v1/jugadores/:id', verificarToken, controlador.obtenerUno);
router.get('/api/v1/acciones/tasacion-plantel', verificarToken, controlador.ejecutarTasacion);

// --- RUTAS DE AUTENTICACIÓN (LOGIN / LOGOUT) ---
router.get('/login', (req, res) => {
    res.sendFile(process.cwd() + '/vistas/login.html');
});
router.post('/login', auth.login);

router.get('/cerrar-sesion', (req, res) => {
    res.clearCookie('token');
    res.redirect('/login');
});

// --- RUTAS DE VISTAS (HTML) ---
router.get('/', (req, res) => {
    res.send('FUNCIONA');
});

router.get('/items', verificarToken, (req, res) => {
    res.sendFile(process.cwd() + '/vistas/items.html');
});

router.get('/item', verificarToken, (req, res) => {
    res.sendFile(process.cwd() + '/vistas/item.html');
});

router.get('/procedimiento', verificarToken, (req, res) => {
    res.sendFile(process.cwd() + '/vistas/procedimiento.html');
});

export default router;