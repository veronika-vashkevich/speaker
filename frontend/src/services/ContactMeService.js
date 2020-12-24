import axios from 'axios'
import { API_URL } from '../Constants'

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

class ContactMeService {
    


    sendContactMeRequest(name, email, phone) {
        return axios.post(`${API_URL}/contacts/contact-me`, {
            name,
            email,
            phone
        },{
            headers: {
                isAuthRequired: "false"
            }
        })
    }

}

export default new ContactMeService()