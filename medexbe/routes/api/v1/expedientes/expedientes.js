const express = require('express');
const router = express.Router();

const Expedientes =require('../../../../dao/expedientes/expedientes.model');
const expedienteModel = new Expedientes();

router.get('/', (req, res) => {
  res.status(200).json(
    {
      endpoint: 'Expedientes',
      updates: new Date(2022,0,19,18,41,00)
    }
  );
}); //GET /

router.get('/all', async (req, res) => {
  try {
    const rows = await expedienteModel.getAll();
    res.status(200).json({status:'ok', expedientes: rows});
  } catch (ex) {
    console.log(ex);
    res.status(500).json({status:'failed'});
  }
} );
// /byid/1;

router.post('/new', async (req,res)=>{
    //console.log(req.body);
    const{ identidad, fecha, descripcion, observacion, registros, ultimoActualizacion }=req.body;

    try{
      rslt = await expedienteModel.new(identidad, fecha, descripcion, observacion, registros);
      res.status(200).json(
        {
          status: 'ok',
          result: rslt
        });
    } catch (ex) {
      console.log(ex);
      res.status(500).json(
        {
          status: 'failed',
          result: {}
        });
    }
});//Post /new

router.put('/update/:idexp',async (req,res)=>{
  try{
    const{ identidad, descripcion, observacion, registro, ultimoActualizacion }=req.body;
    const {idexp} = req.params;
    const result = await expedienteModel.updateOne(idexp, identidad, descripcion, observacion, registro, ultimoActualizacion);
    res.status(200).json({
      status:'ok',
      result
    });
  }
  catch (ex){
    console.log(ex);
    res.status(500).json({status:'failed'});
  }
});


router.delete('/delete/:idexp',async (req,res)=>{
  try{
   
    const {idexp} = req.params;
    const result = await expedienteModel.deleteOne(idexp);
    res.status(200).json({
      status:'ok',
      result
    });
  }
  catch (ex){
    console.log(ex);
    res.status(500).json({status:'failed'});
  }
});



module.exports = router;
