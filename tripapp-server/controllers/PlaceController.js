const Place = require('../models/Place')

exports.getAllPlaces = async (req, res) => {
    
    try {
        let query = req.query;
        for (p in query) {
            console.log(p + ":" + query[p])
        }
        let places;

        let criteria;

        if (!query.sortOrder) {
            query.sortOrder = 1
        }

        switch (query.sortBy) {
            case 'city':
                if (query.sortOrder === 1) {
                    criteria = {'city': 1}
                } else {
                    criteria = {'city': -1}
                }
                break;
            case 'costToVisit':
                if (query.sortOrder === 1) {
                    criteria = {'costToVisit': 1}
                } else {
                    criteria = {'costToVisit': -1}
                }
                break;
            case 'description':
                if (query.sortOrder === 1) {
                    criteria = {'description': 1}
                } else {
                    criteria = {'description': -1}
                }
                break;
            case 'name':
            default:
                if (query.sortOrder === 1) {
                    criteria = {'name': 1}
                } else {
                    criteria = {'name': -1}
                }
                break;

        }

        if (query.name)
            criteria.name = query.name
        
        if (query.city)
            criteria.city = query.city
        
        places = await Place.find({}).sort(criteria)

        /*places = await Place.find()

        if (query.name)
            places = places.filter(
                place => place.name.includes(query.name)
            )
        
        if (query.city)
            places = places.filter(
                place => place.city == query.city
            )
        */
        console.log("GET PLACES:", places)
        res.json(places)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.getPlaceDetailsById = async (req, res) => {
    res.json(req.body.place)
}

exports.getPlaceByID = async (req, res, next) => {
    let place;
    try {
        place = await Place.findById(req.params.id);

        if (place == null) {
            return res.status(404).json({ 
                message: "Place not found"
            })
        }

    } catch (err) {

        return res.status(500).json({
            message: err.message
        })

    }
    req.body.place = place;
    next();
}

exports.createPlace = async (req, res) => {

    const newPlace = req.body.data.place

    console.log("createPlace")
    console.log(newPlace)

    try {
        const addedPlace = await Place.create(newPlace)
        res.status(201).json(addedPlace)
    } catch (err) {
        res.status(400).json({ message: err.message })
        console.log(err.message)
    }

}

exports.updatePlace= async (req, res) => {
    let place = req.body.place

    if (req.body.name)
        place.name = req.body.name
    if (req.body.description)
        place.description = req.body.description
    if (req.body.city)
        place.city = req.body.city
    if (req.body.street)
        place.street = req.body.street
    if (req.body.lat)
        place.lat = req.body.lat
    if (req.body.lon)
        place.lon = req.body.lon
    if (req.body.costToVisit)
        place.costToVisit = req.body.costToVisit
    if (req.body.timeToVisit)
        place.timeToVisit = req.body.timeToVisit
    
    try {
        const updatedPlace = await place.save()
        res.json(updatedPlace)
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}