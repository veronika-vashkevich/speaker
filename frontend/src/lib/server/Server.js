import * as server from './ServerData'
import lessonController from './controllers/LessonController'

const RESPONSE_DELAY = 1000

const ROUTING = {
    [lessonController.getPath()]: lessonController
}

function getSuccessResponse (data, extraBodyProps = {}, extraProps = {}) {
    let body = { success: true, ...extraBodyProps }

    if (data) {
        body.data = data
    }

    let resp = {
        body,
        ...extraProps,
        statusCode: 200
    }

    // текстовое представление ответа
    resp.text = JSON.stringify(resp)

    return resp
}

function getFailureResponse (code = 'error', message = 'Error', statusCode = 500) {
    let resp = {
        body: {
            success: false,
            error: {
                code,
                message
            }
        },
        statusCode: statusCode
    }

    // текстовое представление ответа
    resp.text = JSON.stringify(resp)

    return resp
}

class Server {
    service (request) {
        return new Promise(resolve => {
            const { url, params } = request

            setTimeout(() => {
                for (let path in ROUTING) {
                    if(url.includes(path)) {
                        const controller = ROUTING[path]

                        if (controller) {
                            resolve(
                                getSuccessResponse(controller.handle(request))
                            )
                        }

                        else {
                            resolve(
                                getFailureResponse('resource.not.found', 'Resource is not found')
                            )
                        }
                    }
                }
            }, RESPONSE_DELAY)
        })
    }
}

export default new Server()