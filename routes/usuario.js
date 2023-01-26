const { Router } = require("express");
const { agregar_usuario, login, renovar_token } = require("../controllers/usuario");
const { validar_token } = require("../middlewares/validarJWT");



const router = Router();

router.post('/agregar_usuario', validar_token, agregar_usuario);

router.post('/login', login);

router.get('/renovar_token', validar_token, renovar_token);



module.exports = router;