import BaseService from './BaseService'
import {USER_NAME_SESSION_ATTRIBUTE_NAME} from "./AuthenticationService";

export class LessonService extends BaseService {
    find ({ filter }) {
        return super.request({
            url: '/lessons',
            params: { ...filter }
        })
    }
}

export default new LessonService()
