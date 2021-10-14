const Place = require("../models/Place");
const Photo = require("../models/Photo");
const app = require('../server');
const mongoose = require('mongoose');
const supertest = require("supertest");
const db = mongoose.connection

const request = supertest(app);

beforeEach((done) => {
    mongoose.connect("mongodb://localhost:27017/tripAppTestDB",
        { useNewUrlParser: true, useUnifiedTopology: true },
        () => done());

    db.on('error', (error) => console.error(error));
    db.once('connected', () => {
        Place.remove({});
    })
});

afterEach((done) => {
    mongoose.connection.db.dropDatabase(() => {
        mongoose.connection.close(() => done())
    });
});

afterAll((done) => {
    mongoose.connection.close(() => done());
})

test('GET /api/photos/:id - should return list of all photos for place', async () => {

    Place.remove({});

    await Place.create(
            {
                name: "IPI",
                description: "IPI PAN",
                city: "Warsaw",
                street: "Jana Kazimierza 5",
                lat: 52.2189,
                lon: 21.2340,
                timeToVisit: 8,
                costToVisit: 0
            }
        );
    


    var place = await Place.findOne({});

    Photo.create([
        {
            url: "https://ipipan.waw.pl/images/siedziba/Ipipan-02d.jpg",
            place: place._id
        },
        {
            url: "http://www.artrys.pl/wp-content/uploads/2016/05/Informatyka-PAN-8-1024x696.jpg",
            place: place._id
        }
    ])

    await request.get(`/api/photos/${place._id}`)
        .expect(200)
        .then((response) => {
            expect(response.body[0].url).toBe('https://ipipan.waw.pl/images/siedziba/Ipipan-02d.jpg')
            expect(response.body[1].url).toBe('http://www.artrys.pl/wp-content/uploads/2016/05/Informatyka-PAN-8-1024x696.jpg')
        })
});