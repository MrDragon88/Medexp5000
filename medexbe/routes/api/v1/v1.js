const express = require('express');
const router = express.Router();
const pacientesRoutes = require('./pacientes/pacientes');
const expedienteRoutes = require('./expedientes/expedientes');
// const expedientesRoutes = require('./expedientes/expedientes');
//middlewares
router.use('/pacientes', pacientesRoutes);
router.use('/expedientes', expedienteRoutes);

module.exports = router;