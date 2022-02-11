const app = require('../../app');
const supertest = require("supertest");

describe('Test Suite de api v1 pacientes endpoint',()=>{
    
    it("GET /api/v1/pacientes/", async ()=>{
        await supertest(app).get('/api/v1/pacientes')
        .set({APITOKEN:'3d060ce9-f842-4125-8981-e22b6235fb07'})
        .expect(200);
    });
});