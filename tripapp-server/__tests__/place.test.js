const Place = require("../models/Place");
const app = require('../server');
const mongoose = require('mongoose');
const supertest = require("supertest");
const db = mongoose.connection

const request = supertest(app);

beforeEach((done) => {
    mongoose.connect("mongodb://localhost:27017/tripAppTestDB",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        },
        () => done());

    db.on('error', (error) => console.error(error));
    db.once('connected', () => {
        Place.deleteMany({});
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

test('GET api/places - shouls show list of 2 places', async () => {
    
    await Place.deleteMany({});
    await Place.create(
        [
            {
                name: "IPI",
                description: "IPI PAN",
                city: "Warsaw",
                street: "Jana Kazimierza 5",
                lat: 52.2189,
                lon: 21.2340,
                timeToVisit: 8,
                costToVisit: 0
            },
            {
                name: "PKIN",
                description: "Pałac Kultury i Nauki",
                city: "Warsaw",
                street: "plac Defilad 1",
                lat: 53.2189,
                lon: 22.2340,
                timeToVisit: 8,
                costToVisit: 0
            }
        ]);
    
    let createdPlaces = await Place.find({});

    await request.get(`/api/places`)
        .expect(200)
        .then((response) => {
            expect(Array.isArray(response.body)).toBeTruthy()
            expect(response.body.length).toBe(createdPlaces.length)
            expect(response.body[0].name).toBe('IPI')
            expect(response.body[1].name).toBe('PKIN')
        })
});

test('PUT api/places/id', async () => {

    let placeBeforeUpdate = {
        name: "IPI",
        description: "IPI PAN",
        city: "Warsaw",
        street: "Jana Kazimierza 5",
        lat: 52.2189,
        lon: 21.2340,
        timeToVisit: 8,
        costToVisit: 0
    }

    await Place.create(placeBeforeUpdate)

    let placeToUpdate = await Place.findOne({});
    expect(placeToUpdate).not.toBe(undefined);


    let placeUpdate = {
        name: "IPI",
        description: "Instytut Podstaw Informatyki PAN",
        city: "Warsaw",
        street: "ul Jana Kazimierza 5",
        lat: 30.21,
        lon: 25.0,
        timeToVisit: 30,
        costToVisit: 0
    }

    await request.put(`/api/places/${placeToUpdate._id}`)
        .send(placeUpdate)
        .expect(200)
    
    let placeAfterUpdate = await Place.findOne({});

    expect(placeAfterUpdate).not.toBe(undefined);
    expect(placeAfterUpdate.lat).toBe(placeUpdate.lat)
    expect(placeAfterUpdate.lon).toBe(placeUpdate.lon)
    expect(placeAfterUpdate.timeToVisit).toBe(placeUpdate.timeToVisit)
    expect(placeAfterUpdate.description).toBe(placeUpdate.description)
    expect(placeAfterUpdate.street).toBe(placeUpdate.street)
    expect(placeAfterUpdate.name).toBe(placeUpdate.name)
})

test('GET api/places/id', async () => {

    await request.get(`/api/places/60be63833143417f1c57f415`)
        .expect(404)
        .then((response) => {
            expect(response.text).toBe("{\"message\":\"Place not found\"}");
        });
})

test('POST api/places', async () => {

    let placeToCreate = {
        name: "IPI",
        description: "IPI PAN",
        city: "Warsaw",
        street: "Jana Kazimierza 5",
        lat: 30.21,
        lon: 25.0,
        timeToVisit: 30,
        costToVisit: 0
    }

    await request.post(`/api/places`)
        .send(placeToCreate)
        .expect(201)
    
    let createdPlace = await Place.find({})

    expect(createdPlace[0].name).toBe(placeToCreate.name);
    expect(createdPlace[0].city).toBe(placeToCreate.city);
})

test('POST api/places', async () => {

    let placeToCreateWithError = {
        name: "IPI",
        description: "IPI PAN",
        city: "Warsaw",
        street: "Jana Kazimierza 5",
        lat: 30.21,
        lon: 25.0,
        timeToVisit: 30,
        costToVisit: 'error'
    }

    await request.post(`/api/places`)
        .send(placeToCreateWithError)
        .expect(400)
})