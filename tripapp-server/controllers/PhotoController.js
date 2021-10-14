const Place = require('../models/Place')
const Photo = require('../models/Photo')

exports.getPhotosForPlace = async (req, res) => {

    let foundPlace = req.body.place;

    let photos;

    try {

        if (foundPlace == null) {
            return res.status(404).json({ 
                message: "No place, no images for the place"
            })
        } else {
            photos = await Photo.find({
                place: foundPlace
            }).populate('place');
        }

    } catch (err) {

        return res.status(500).json({
            message: err.message
        })

    }
    res.json(photos)
}

exports.addPhotoForPlace = async (req, res) => {

    let place = req.body.place;

    const newPhoto = new Photo({
        url: req.body.data.url,
        place: place._id
    })

    try {
        const addedPhoto = await newPhoto.save()
        res.status(201).json(addedPhoto)
    } catch (err) {
        res.status(400).json({message:err.message})
    }

}

exports.removePhotoById = async (req, res) => {

    try {
        await Photo.deleteOne({
            _id: req.params.id //found photo id
        })
        res.sendStatus(204);
    } catch (err) {
        res.status(400).json({message:err.message})
    }

}