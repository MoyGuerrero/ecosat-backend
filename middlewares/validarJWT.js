const jsonwebtoken = require('jsonwebtoken');


const validar_token = (req, res = Response, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        });
    }

    try {
        const { id } = jsonwebtoken.verify(token, process.env.JWT_SECRET);

        req.id = id;

        next();
    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'Token incorrecto'
        });
    }
}
module.exports = { validar_token }