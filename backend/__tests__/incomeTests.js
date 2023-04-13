const request = require('supertest')
const { app, server } = require('../index')
const mongoose = require('mongoose')

let token = ''
describe("Add Income Category test", ()=>{



    beforeAll(async()=>{
        const user = {
            email: "gopal@gopal.com",
             password: "gopal"
        }
        const tokenResponse= await request(app).post('/users/login').send(user)
        token = tokenResponse.body.token
    })

    test("Making request without auth header", async() => {
        const response = await request(app).post('/income/addCategory').send({data: 'payload'})
        
        expect(response.statusCode).toBe(400)
        expect(response.body.response).toBe("Authorization header not present")
    })

    test("Inavlid Token", async() => {
        const response = await request(app).post('/income/addCategory').set('authorization', "JWT " +token + "invalid").send({data: 'payload'})

        expect(response.statusCode).toBe(400) 
        expect(response.body.response).toBe("Invalid Token")
    })

    test("Adding Income Category", async()=>{
            const response = await request(app).post('/income/addCategory').set('authorization', "JWT " +token).send({num: '55'}); 

            expect(response.status).toBe(200)

    }, 15000)

})


afterAll(async () => {
    await mongoose.connection.close();
    await server.close()
});