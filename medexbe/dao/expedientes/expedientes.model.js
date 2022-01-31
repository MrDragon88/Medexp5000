const getDB = require('../db');
let db = null;
class Expedientes{
    

    constructor(){
        getDB()
        .then((database)=>{
            db = database;

            if(process.env.MIGRATE ==='true'){
                const createStatement = 'CREATE TABLE IF NOT EXISTS expedientes (idexp INTEGER PRIMARY KEY AUTOINCREMENT, identidad TEXT, fecha TEXT, descripcion TEXT, observacion TEXT, registros TEXT, ultimaActualizacion TEXT)';
                db.run(createStatement);
            }
        })
        .catch((err) => { console.error(err)});
        
    }

    new (identidad, fecha, descripcion, observacion,registros ){
        return new Promise((accept, reject)=>{
            db.run(
                "INSERT INTO expedientes (identidad , fecha, descripcion, observacion, registros, ultimaActualizacion ) VALUES (?,?,?,?,?, datetime('now'));",
                [identidad, fecha, descripcion, observacion,registros],
                (err,rslt)=>{
                    if(err){
                        console.error(err);
                        reject(err);
                    }

                    accept(rslt);
                }
            );
        });
    }

    getAll () {
        return new Promise ( (accept, reject) => {
          db.all('SELECT * from expedientes;', (err, rows) => {
            if(err){
              console.error(err);
              reject(err);
            } else {
              accept(rows);
            }
          });
        });
      }
    
    getById(id) {
        return new Promise((accept, reject) => {
          db.get(
            'SELECT * from expedientes where idexp=?;',
            [id],
            (err, row) => {
            if (err) {
              console.error(err);
              reject(err);
            } else {
              accept(row);
            }
          });
        });
      }

    updateOne (idexp, identidad , descripcion, observacion, registros){
        return new Promise(
          (accept,reject)=>{
            const sqlUpdate = "UPDATE expedientes set identidad = ?, descripcion = ?, observacion =?, registros =?, ultimaActualizacion = datetime('now') where idexp =?;";
            db.run(
              sqlUpdate,
              [identidad , descripcion, observacion, registros, idexp ],
              function (err) {
                if(err){
                  reject(err);
                }
                else{
                  accept(this);
                }
                
              }
            );

          }
        );
      }

      deleteOne (idexp){
        return new Promise(
          (accept,reject)=>{
            const sqlDelete = 'DELETE FROM expedientes where idexp =?;';
            db.run(
              sqlDelete,
              [idexp],
              function (err) {
                if(err){
                  reject(err);
                }
                else{
                  accept(this);
                }
                
              }
            );

          }
        );
      }
}

module.exports = Expedientes;