const Users = require('./auth-model.js');
const db = require('../database/dbConfig.js');

describe("Users Model", function() {

    describe('test environment', function() {
        it('should use testing environment', function(){
            expect(process.env.DB_ENV).toBe('testing');
        })
    })

    
    describe('add()', function(){

        beforeEach(async () => {
            await db('users').truncate();
        })

        it('Adds a new User', async function(){
            // call to add a new User
            await Users.add({username:"Test", password:"Test"})
            const users = await db('users');
            expect(users).toHaveLength(1);
        })
    })


})