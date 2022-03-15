//const { ObjectId } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const getDB = require('../mongodb');

let db = null;
class Pacientes{
    collection = null;

    constructor(){
        getDB()
        .then((database)=>{
            db = database;
            this.collection = db.collection('Pacientes');

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
        const cursor = this.collection.find({});
        const documents = await cursor.toArray();
        return documents;
    }

    async getFaceted(page,items,filter={}){
        const cursor = this.collection.find(filter);
        const totalItems = await cursor.count();
        cursor.skip((page -1)* items);
        cursor.limit(items);

        const resultados = await cursor.toArray();
        return {
            totalItems,
            page,
            items, 
            totalpages:(Math.ceil(totalItems/items)),
            resultados};
    }

    async getById(id) {
        const _id = new ObjectId(id);
        const filter = {_id};
        const myDocument = await this.collection.findOne(filter);
        return myDocument;
        
    }

    async updateOne (id, nombres, apellidos, identidad, telefono,correo){
        
        const filter = {_id: new ObjectId(id)};
        const updateCmd ={
            '$set':{
                nombres, 
                apellidos, 
                identidad, 
                telefono,
                correo
            }
        };
        
        const rslt = await this.collection.updateOne(filter,updateCmd);
        return rslt;
    }

    async updateAddTag(id, tagEntry){
        const updateCmd ={
            "$push":{
                tags: tagEntry
            }
        }

        const filter = {_id: new ObjectId(id)};
        return await this.collection.updateOne(filter, updateCmd);
    }

    async updateAddTagSet(id, tagEntry){
        const updateCmd ={
            "$addToSet":{
                tags: tagEntry
            }
        }

        const filter = {_id: new ObjectId(id)};
        return await this.collection.updateOne(filter, updateCmd);
    }

    //removeonetag
    /*
        The $pop operator removes the first or last element of an array. 
        Pass $pop a value of -1 to remove the first element of an array 
        and 1 to remove the last element in an array.

    */
    async updateRemoveTagSet(id, tagEntry){
        const nameEntry = tagEntry;
        const updateCmd ={
            "$pop":{
                //nameEntry: -1
                tags:-1
            }
        }

        const filter = {_id: new ObjectId(id)};
        return await this.collection.updateOne(filter, updateCmd);
    }

    async deleteOne (id){
        const filter = {_id: new ObjectId(id)};
        
        
        const rslt = await this.collection.deleteOne(filter);
        return rslt;
    }
}

module.exports = Pacientes;