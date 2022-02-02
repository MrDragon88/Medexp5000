const express = require('express');
const router = express.Router();

const {verifyApiHeaderToken} =  require('./headerVerifyMiddleware');
//const middlewares = require('./headerVerifyMiddleware');

const pacientesRoutes = require('./pacientes/pacientes');
const expedienteRoutes = require('./expedientes/expedientes');

//middlewares
router.use('/pacientes', verifyApiHeaderToken,pacientesRoutes);
//router.use('/pacientes', middlewares.verifyApiHeaderToken,pacientesRoutes);
router.use('/expedientes', expedienteRoutes);

module.exports = router;