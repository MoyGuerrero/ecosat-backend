const { Router } = require("express");
const { tabla, ubicacion, zona, sensor } = require("../controllers/informacion");

const { validar_token } = require("../middlewares/validarJWT");



const router = Router();

router.get('/tabla', validar_token, tabla);
router.get('/ubicacion', validar_token, ubicacion);
router.get('/zona', validar_token, zona);
router.get('/sensor', validar_token, sensor);

// router.post('/login', login);

// router.get('/renovar_token', validar_token);



module.exports = router;