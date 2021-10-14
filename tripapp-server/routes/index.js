const { response } = require('express')
const express = require('express')
const router = express.Router()

const CommentController = require('../controllers/CommentController')
const PhotoController = require('../controllers/PhotoController')
const PlaceController = require('../controllers/PlaceController')
const LoginController = require('../security/jwt-auth')
const RegisterController = require('../controllers/LoginController')
const UserController = require('../controllers/UserController')

router.get('/api/places', PlaceController.getAllPlaces)
router.get('/api/places/:id',PlaceController.getPlaceByID, PlaceController.getPlaceDetailsById)
router.post('/api/places', PlaceController.createPlace)
router.put('/api/places/:id',PlaceController.getPlaceByID, PlaceController.updatePlace)

router.get('/api/photos/:id',PlaceController.getPlaceByID, PhotoController.getPhotosForPlace)
router.post('/api/photos/:id',PlaceController.getPlaceByID, PhotoController.addPhotoForPlace)
router.delete('/api/photos/:id', PhotoController.removePhotoById)

router.get('/api/comments/:id',PlaceController.getPlaceByID, CommentController.getCommentsForPlace)
router.post('/api/comments/:id',[LoginController.authenticate, PlaceController.getPlaceByID], CommentController.createCommentForPlace)
router.delete('/api/comments/:id', CommentController.markCommentNotProper)

router.get('/api/user', [LoginController.authenticate, UserController.getUserByID], UserController.getUserDetailsById)

router.post('/api/login', LoginController.login)
router.post('/api/register', RegisterController.registerNewUser)

router.get('/api/home', (req, res, next) => {
    res.json('Logged in :D')
});

module.exports = router