import axios from 'axios'

export class UserService {

    async getUserData() {
        
        let user = null;

        try {

            let user = await axios.get('/api/user', { withCredentials: true })

            return user.data
            
        } catch (err) {
            
            console.log(err);
        }
    
        return user
    }
}

const userService = new UserService()
export default userService;