import * as server from '../ServerData'
import BaseController from './BaseController'

class LessonController extends BaseController {
    getPath () {
        return '/lessons'
    }

    getHandlers () {
        return [
            {
                path: '',
                handler: (vars, params) => {
                    return server.getLessons({...vars, ...params})
                }
            },
            /* {
                path: '/:lessonId',
                handler: (vars, params) => {
                    return server.getLessonDetails({...vars, ...params})
                }
            },            
            {
                path: '/count',
                handler: (vars, params) => {
                    return server.getLessonCount({...vars, ...params})
                }
            }, */
        ]
    }
}

export default new LessonController()