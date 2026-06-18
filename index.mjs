import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { auditoriaPeticion } from './middlewares/middleware.auditoria.mjs';

import rutasProyecto from './rutas/rutas.jugadores.mjs';

dotenv.config();
const app = express();
const PUERTO = process.env.PORT || 3001;

// Configuración de middlewares globales
app.use(express.json());
app.use(auditoriaPeticion); // Aplicación del middleware propio 
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use('/styles', express.static('styles'));

// Vinculamos todas las rutas que separamos en el otro archivo
app.use('/', rutasProyecto);

app.listen(PUERTO, () => {
    console.log(`Servidor de aplicaciones iniciado en puerto ${PUERTO}`);
});