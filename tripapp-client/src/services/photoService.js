import axios from 'axios'

const path = 'api/photos/'

export class PhotosForPlaceService {

    async getAllPhotosForPlace(id) {

        let allPhotosForPlace = await axios.get(path+id, {withCredentials: true});
        
        return allPhotosForPlace.data

    }

    async addPhotoForPlace(id, photoUrl) {

        await axios.post('api/photos/'+id, {
            data: {
                url: photoUrl 
            }
        })

    }

    async deletePhotoForPlace(photoId) {

        await axios.delete('api/photos/'+photoId)

    }
}

const photoService = new PhotosForPlaceService()
export default photoService