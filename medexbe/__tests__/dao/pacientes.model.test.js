const Pacientes =require( '../../dao/pacientes/pacientes.model');

describe('Testing Pacientes Model', ()=>{
    let pacienteModel = undefined;
    let lastId = 0;

    beforeAll( (done)=>{
        
        pacienteModel = new Pacientes();
        setTimeout(()=>{
            done();
        },1000);
       
    });

    it('pacienteModel esta definido', ()=>{
        return expect(pacienteModel).toBeDefined();
    });

    it('getAll Devuelve un array', async ()=>{
        const arrPacientes = await pacienteModel.getAll();
        return expect(arrPacientes.length).toBeGreaterThanOrEqual(0);
    });

    it('New Guardado de Dato', async () =>{
        const resultado = await pacienteModel.new(
            'Test Prueba',
            'Fulano',
            '0000001',
            'teleono',
            'correo@correo.com'
        );

        //console.log(resultado);
        lastId = resultado;
        return expect(resultado).toBeDefined();
        
    });

    it('obtener un dato', async () => {
        const resultado = await pacienteModel.getById(
          lastId
        );
        console.log(resultado);
        return expect(resultado.nombre).toBe('Test Prueba');
      });
    
      it('eliminar un dato', async () => {
        const resultado = await pacienteModel.deleteOne(
          lastId
        );
        console.log(resultado);
        return expect(resultado).toBeDefined();
      });
});