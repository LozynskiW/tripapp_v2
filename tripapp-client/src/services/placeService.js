//import places from '../data/places.json'
import axios from 'axios'

const path = '/api/places'

export class PlaceService {

    async getAllPlaces() {

        let allPlaces = await axios.get(path, {withCredentials: true});
        
        return allPlaces

    }

    async getPlaceById(id) {

        const places =  await this.getAllPlaces();


        const place = places.data.filter(place => place._id === id)

        return place || null

    }

    addNewPlace(place) {

        axios.post(path, {
            data: {
                place: place
            }
        })
    }
}

const placeService = new PlaceService()
export default placeService