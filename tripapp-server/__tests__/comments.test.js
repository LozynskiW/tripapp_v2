const Place = require("../models/Place");
const Comment = require('../models/Comment');
const app = require('../server');
const mongoose = require('mongoose');
const supertest = require("supertest");

const request = supertest(app);

beforeEach((done) => {
    mongoose.connect("mongodb://localhost:27017/tripAppTestDB",
        { useNewUrlParser: true, useUnifiedTopology: true },
        () => done());
    
    const db = mongoose.connection
    db.on('error', (error) => console.error(error));
});

afterEach((done) => {
    mongoose.connection.db.dropDatabase(() => {
        mongoose.connection.close(() => done())
    });
});

afterAll((done) => {
    mongoose.connection.close(() => done());
})

test('GET /api/comments - should show all comments', async () => {

    await Place.deleteMany({});
    await Place.create({
        name: "IPI",
        description: "IPI PAN",
        city: "Warsaw",
        street: "Jana Kazimierza 5",
        lat: 52.2189,
        lon: 21.2340,
        timeToVisit: 8,
        costToVisit: 0
    });

    const ipi = await Place.findOne({});

    await Comment.create({
        nick: 'henk',
        title: 'good place',
        content: 'i have never been there',
        rate: 5,
        dateOfVisit: Date.now(),
        commentDate: Date.now(),
        place: ipi._id
    });

    await request.get(`/api/comments/${ipi._id}`)
        .expect(200)
        .then((response) => {
            expect(Array.isArray(response.body)).toBeTruthy();
            expect(response.body.length).toBe(1);
            expect(response.body[0].nick).toBe('henk');
        })
});

test('GET /api/comments - should show only proper comments', async () => {

    await Place.create({
        name: "IPI",
        description: "IPI PAN",
        city: "Warsaw",
        street: "Jana Kazimierza 5",
        lat: 52.2189,
        lon: 21.2340,
        timeToVisit: 8,
        costToVisit: 0
    });

    const ipi = await Place.findOne({});

    await Comment.create([
        {
        nick: 'henk',
        title: 'good place',
        content: 'i have never been there',
        rate: 5,
        dateOfVisit: Date.now(),
        commentDate: Date.now(),
        place: ipi._id
        },
        {
            nick: 'hitler',
            title: 'shitty place',
            content: 'I...hate...this...prison...this prison.',
            rate: 5,
            dateOfVisit: Date.now(),
            commentDate: Date.now(),
            place: ipi._id,
            proper: false
        }
    ]);

    await request.get(`/api/comments/${ipi._id}`)
        .expect(200)
        .then((response) => {
            expect(response.body.length).toBe(1);
            expect(response.body[0].nick).toBe('henk');
        })
});