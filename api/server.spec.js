const request = require('supertest');

const server = require('./server.js');

describe('server', function(){

    it('runs the tests', function(){
        expect(true).toBe(true); // fail the first test.
    })

    describe('GET /', function(){

        it('Should return JSON', function(){

            return request(server).get('/')
            .then(res=>{
                expect(res.type).toMatch(/json/i)
            })
        })

        it('should return JSON', function() {
            return request(server).get('/')
            .then(res => {
                expect(res.body.test).toBe('Success');
            })
        })
    })
})