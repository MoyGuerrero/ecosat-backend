const { connection } = require("../db/db");


const tabla = (req, res = Response) => {
    try {

        connection.query('SELECT u.nombre as Ubicacion, z.nombre as Zona,s.nombre as Sensor, fecha,hora,tiempo,estado,temperatura,origen,registro,nivel FROM' +
            ' sensor_ubicacion as su LEFT JOIN ubicacion as u ON su.id_ubicacion = u.id LEFT JOIN zona' +
            ' as z ON su.id_zona = z.id LEFT JOIN sensor as s ON su.id_sensor =s.id', (err, result) => {

                if (err) {
                    return res.status(404).json({
                        ok: false,
                        msg: 'Ocurrio un error al buscar la informacion'
                    });
                }

                if (!result.length) {
                    return res.status(404).json({
                        ok: false,
                        msg: 'No hay informacion'
                    });
                }
                const ordenados = result.sort((a, b) => a.nivel.localeCompare(b.nivel));

                res.json({
                    ok: true,
                    result,
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

const ubicacion = (req, res = Response) => {
    try {

        connection.query("SELECT * FROM ubicacion", (err, result) => {
            if (err) {
                return res.status(404).json({
                    ok: false,
                    msg: 'Ocurrio un error al buscar la informacion'
                });
            }

            if (!result.length) {
                return res.status(404).json({
                    ok: false,
                    msg: 'No hay informacion'
                });
            }

            res.json({
                ok: true,
                result
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

const zona = (req, res = Response) => {
    try {

        connection.query("SELECT * FROM zona", (err, result) => {
            if (err) {
                return res.status(404).json({
                    ok: false,
                    msg: 'Ocurrio un error al buscar la informacion'
                });
            }

            if (!result.length) {
                return res.status(404).json({
                    ok: false,
                    msg: 'No hay informacion'
                });
            }

            res.json({
                ok: true,
                result
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

const sensor = (req, res = Response) => {
    try {

        connection.query("SELECT * FROM sensor", (err, result) => {
            if (err) {
                return res.status(404).json({
                    ok: false,
                    msg: 'Ocurrio un error al buscar la informacion'
                });
            }

            if (!result.length) {
                return res.status(404).json({
                    ok: false,
                    msg: 'No hay informacion'
                });
            }

            res.json({
                ok: true,
                result
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
    tabla,
    ubicacion, zona, sensor
}