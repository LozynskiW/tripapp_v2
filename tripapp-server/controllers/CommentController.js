const Place = require('../models/Place')
const Comment = require('../models/Comment')

exports.getCommentsForPlace = async (req, res) => {

    const place = req.body.place;

    try {

        var commentsForPlace = await Comment.find({
            proper : true,
            place : place._id
        })

        res.status(200).json(commentsForPlace)

    } catch (err) {
        res.status(404).json({
            message: "No comments found for place" + place._id
        })
    }
}

exports.createCommentForPlace = async (req, res) => {

    let place = req.body.place
    console.log(req.body.data.comment)

    let newComment = new Comment({
        nick: req.body.data.comment.nick,
        title: req.body.data.comment.title,
        content: req.body.data.comment.content,
        rate: req.body.data.comment.rate,
        //dateOfVisit: req.body.dateOfVisit,
        commentDate: new Date(),
        proper: true,
        place: place._id
    })

    try {

        const addedComment = await newComment.save()
        res.status(201).json(addedComment)

    } catch (err) {

        res.status(400).json({message:err.message})
    }
}

exports.markCommentNotProper = async (req, res) => {
    // znajdujemy comment o podanym id w bazie
    let comment;

    try {

        comment = await Comment.findById(req.params.id);

        if (comment == null) {
            return res.status(404).json({ 
                message: "Comment not found"
            })
        }

    } catch (err) {

        return res.status(500).json({
            message: err.message
        })
        
    }
    
    // oznaczamy go jako nieodpowiedni i zapisujemy zmianę w bazie
    comment.proper = false;
    try {
        await comment.save()
        res.sendStatus(204);
    } catch (err) {
        res.status(400).json({
            message : err.message
        })
    }
}

