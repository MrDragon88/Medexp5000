const express = require('express');
const router = express.Router();

const {verifyApiHeaderToken} =  require('./headerVerifyMiddleware');
const {passport, jwtMiddleware}=require('./seguridad/jwtHelper');
//const middlewares = require('./headerVerifyMiddleware');

const pacientesRoutes = require('./pacientes/pacientes');
const expedienteRoutes = require('./expedientes/expedientes');
const seguridadRoutes = require('./seguridad/seguridad');

//public
router.use(passport.initialize());
router.use('/seguridad',verifyApiHeaderToken, seguridadRoutes);

//middlewares
router.use(
    '/pacientes', 
    verifyApiHeaderToken,
    jwtMiddleware,
    pacientesRoutes);


//router.use('/pacientes', middlewares.verifyApiHeaderToken,pacientesRoutes);
router.use('/expedientes', expedienteRoutes);


module.exports = router;