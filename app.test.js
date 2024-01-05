const request = require("supertest")
const app = require('./app')

describe('Express API', () => {
    it('GET /allblogs --> array blogs', () => {
        return request(app)
            .get('/allblogs')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            titre: expect.any(String),
                            description: expect.any(String)
                        })
                    ])
                )

            })
    });

    it('GET /blog/id --> specific blog by ID', () => {
        return request(app)
            .get('/blog/6582e4ac658fc377190f04f1')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        titre: expect.any(String),
                        description: expect.any(String)
                    })
                )

            })
    });

    it('POST /addblog --> created blog', () => {
        return request(app).post('/addblog').send({
            titre: "titre exemple",
            description : "description"
        }).expect('Content-Type', 'application/json; charset=utf-8')
            .expect(201)
            .then(response => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        result : expect.any(String)
                    })
                )
            })
    });


})


