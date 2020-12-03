import BaseService from './BaseService'

export class LessonService extends BaseService {
    find ({ filter }) {
        return super.request({
            url: '/lessons',
            params: { ...filter }
        })
    }

    /*
        findById (appointmentId) {
            return super.request({
                url: `/appointments/${appointmentId}`
            })
        }
    
        count () {
            return super.request({
                url: '/appointments/count'
            })
        }
    */
}

export default new LessonService()