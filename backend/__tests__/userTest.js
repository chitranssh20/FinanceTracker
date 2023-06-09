const request = require('supertest')
const { app, server } = require('../index')
const mongoose = require('mongoose')


//Log In test
describe("Log In Test", () => {

    test('login a user if the user is present', async () => {
        const user = {
            email: "gopal@gopal.com",
            password: "gopal"
        };

        const response = await request(app).post('/users/login').send(user);

        // expect(response.statusCode).toBe(200)
        // expect(response.body.passwordMatched).toBe(true)
        // expect(response.body.response).toBe("Successfully Logged In")

    })


    test('login a user with wrong password', async () => {
        const user = {
            email: "gopal@gopal.com",
            password: "bhopal"
        };

        const response = await request(app).post('/users/login').send(user);

        expect(response.statusCode).toBe(200)
        expect(response.body.passwordMatched).toBe(false)
        expect(response.body.response).toBe("Wrong Password")

    })


    test('login a user if user do not exist', async () => {
        const user = {
            email: "Do not exist",
            password: "do not exist"
        };
        const response = await request(app).post('/users/login').send(user);

        expect(response.statusCode).toBe(404)
        expect(response.body.response).toBe("User not found")
    })


    test('login user without giving email Field', async () => {
        const user = {
            password: "do not exist"
        };
        const response = await request(app).post('/users/login').send(user);

        expect(response.statusCode).toBe(400)
        expect(response.body.response).toBe("Missing fields")
    })


    test('login user without giving password Field', async () => {
        const user = {
            email: "gopal@gopal.com"
        };
        const response = await request(app).post('/users/login').send(user);

        expect(response.statusCode).toBe(400)
        expect(response.body.response).toBe("Missing fields")
    })
});


describe("User Registration Test", ()=>{
    // test('Perfect Sign Up', async()=>{
        // Change the user object before running this test otherwise it will fail as user would have been already present in the database
    //         const user = {name: "New user", email: "new@new.com", password: "new"};
    //         const response = await request(app).post('/users/register/').send(user); 
            
    //         expect(response.statusCode).toBe(500)
    //         expect(response.body.response).toBe("User has been registered");
    // })


    test("User is already registered", async()=>{
        const user = {name: "Gopal", email: 'gopal@gopal.com', password: 'gopal'} 

        const response = await request(app).post('/users/register').send(user); 

        expect(response.statusCode).toBe(500);
        expect(response.body.response).toBe("Email Id already exists"); 
    });


    test("Name Field is not sent", async()=>{
        const user = {email: 'gopal@gopal.com', password: 'gopal'}; 
        const response = await request(app).post('/users/register').send(user); 

        expect(response.statusCode).toBe(400)
        expect(response.body.response).toBe("Some fields are missing");
    })


    test("Email Field is not sent", async()=>{
        const user = {name: 'Gopal', password: 'gopal'}; 
        const response = await request(app).post('/users/register').send(user); 

        expect(response.statusCode).toBe(400)
        expect(response.body.response).toBe("Some fields are missing");
    })


    test("PasswordField is not sent", async()=>{
        const user = {name: "Gopal", email: 'gopal@gopal.com'}; 
        const response = await request(app).post('/users/register').send(user); 

        expect(response.statusCode).toBe(400)
        expect(response.body.response).toBe("Some fields are missing");
    })

})







afterAll(async () => {
    await mongoose.connection.close();
    await server.close()
});
