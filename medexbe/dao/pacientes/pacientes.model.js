const getDB = require('../mongodb');
let db = null;
class Pacientes{
    collection = null;

    constructor(){
        getDB()
        .then((database)=>{
            db = database;
            collection = db.collection('Pacientes');

            if(process.env.MIGRATE ==='true'){
                //Por si se ocupa algo
                        }
        })
        .catch((err) => { console.error(err)});
        
    }

    async new (nombres, apellidos, identidad, telefono,correo){
        const newPaciente ={
            nombres,
            apellidos,
            identidad,
            telefono,
            correo
        };

        const rslt = await this.collection.insertOne(newPaciente);
        return rslt;
    }

    async getAll () {
        
    }
    
    async getById(id) {
        
    }

    async updateOne (id, nombres, apellidos, identidad, telefono,correo){
        
    }

    async deleteOne (id){
        
    }
}

module.exports = Pacientes;