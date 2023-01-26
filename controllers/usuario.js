
const bcrypt = require('bcryptjs');
const { connection } = require('../db/db');
const { generarJWT } = require('../helpers/jwt');

// const login = () => {

// }


const agregar_usuario =  (req, res = Response) => {
    try {

        const { nickname, password, nombre } = req.body
        


        const salt = bcrypt.genSaltSync();

        const passEncriptado = bcrypt.hashSync(password, salt);

        connection.query("INSERT INTO usuario (nombre,nickname,contrasenia) VALUE(?,?,?)", [nombre, nickname, passEncriptado], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    ok: false,
                    msg: 'Error'
                });
            }

            res.json({
                ok: true,
                result
            });
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Ocurrio un error al momento de ingresar el usuario'
        });
    }
}

const login = (req, res = Response) => {

    try {
        const { password, nickname } = req.body;
        
        connection.query('SELECT * FROM usuario where nickname = ?', [nickname], async (err, result) => {
            if (err) {
                console.log(err);
                return res.status(404).json({
                    ok: false,
                    msg: 'Ocurrio un error al buscar el usuario'
                });
            }

            if (!result.length) {
                return res.status(404).json({
                    ok: false,
                    msg: 'No se encontro el usuario'
                });
            }

            const { id, contrasenia, activo } = result[0];

            const passValidado = bcrypt.compareSync(password, contrasenia);

            if (!passValidado) {
                return res.status(500).json({
                    ok: false,
                    msg: 'Contraseña incorrecta'
                });
            }
            if (!activo) {
                return res.status(500).json({
                    ok: false,
                    msg: 'Usuario dado de baja'
                });
            }

            const token = await generarJWT(id)


            res.json({
                ok: true,
                token
            });

        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Ocurrio un error hable con el administrador"
        });
    }

}

const renovar_token = (req, res = Response) => {

    try {

        const id = req.id;

        connection.query('SELECT * FROM usuario where id = ?', [id], async (err, result) => {
            if (err) {
                console.log(err)
                return res.status(404).json({
                    ok: false,
                    msg: 'Ocurrio un error'
                })
            }

            const token = await generarJWT(id);
            res.json({
                ok: true,
                result,
                token
            });
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Ocurrio un error hable con el administrador"
        });
    }
}


module.exports = {
    agregar_usuario,
    login,
    renovar_token
}