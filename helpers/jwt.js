const jsonwebtoken = require('jsonwebtoken');



const generarJWT = (id) => {
    return new Promise((resolve, reject) => {
        const payload = {
            id
        }

        jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '8h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el JWT');
            } else {
                resolve(token);
            }
        }
        );
    });
}

module.exports = {
    generarJWT
}