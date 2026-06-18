import pool from '../../config/bd.mjs'

export async function buscarUsuario(username) {

    const consulta = `
        SELECT *
        FROM usuarios
        WHERE username = $1
    `

    const resultado = await pool.query(
        consulta,
        [username]
    )

    return resultado.rows[0]
}