import express from 'express';
import * as controlador from './modulos/jugadores/controlador.jugadores.mjs';
import { auditoriaPeticion } from './middlewares/middleware.auditoria.mjs';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import * as auth from './modulos/auth/controlador.auth.mjs';
import { verificarToken } from './middlewares/middleware.auth.mjs';



dotenv.config()
const app = express();
const PUERTO = process.env.PORT || 3001;

// Configuración de middlewares globales
app.use(express.json());
app.use(auditoriaPeticion); // Aplicación del middleware propio 
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use('/styles', express.static('styles'));


// Rutas API REST (Entidades)
app.get('/api/v1/jugadores', verificarToken, controlador.obtenerTodos);
app.get('/api/v1/jugadores/:id', verificarToken, controlador.obtenerUno);
app.get('/api/v1/acciones/tasacion-plantel', verificarToken, controlador.ejecutarTasacion);
// Login
app.get('/login', (req, res) => {
    res.sendFile(process.cwd() + '/vistas/login.html');
});

app.post('/login', auth.login);


app.get('/', (req, res) => {
    res.send('FUNCIONA');
});

app.get('/items', verificarToken, (req, res) => {
    res.sendFile(process.cwd() + '/vistas/items.html');
});

app.get('/item', verificarToken, (req, res) => {
    res.sendFile(process.cwd() + '/vistas/item.html');
});

app.get('/procedimiento', verificarToken, (req, res) => {
    res.sendFile(process.cwd() + '/vistas/procedimiento.html');
});

app.get('/cerrar-sesion', (req, res) => {
    res.clearCookie('token');
    res.redirect('/login');
});



app.listen(PUERTO, () => {
    console.log(`Servidor de aplicaciones iniciado en puerto ${PUERTO}`);
});