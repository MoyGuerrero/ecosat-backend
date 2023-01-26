const express = require('express');
const cors = require('cors');
const usuario = require('../routes/usuario');
const info = require('../routes/informacion');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || "3000";

        this.middlewares();

        this.routes();

    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes() {
        this.app.use('/api/usuario', usuario)
                .use('/api/informacion', info)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }

}

module.exports = Server;