import axios from 'axios'

const path = 'api/comments/'

export class CommentForPlaceService {

    async getAllCommentsForPlace(placeId) {

        let allCommentsForPlace = await axios.get(path+placeId, {withCredentials: true});
        
        return allCommentsForPlace.data

    }

    async addCommentForPlace(id, comment) {

        await axios.post(path+id, {
            data: {
                comment: comment 
            }
        })

        this.$router.go(0)

    }

    async markCommentNotProper(commentId) {

        await axios.delete(path+commentId)

    }
}

const commentService = new CommentForPlaceService()
export default commentService