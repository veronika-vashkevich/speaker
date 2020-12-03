import UrlPattern from 'url-pattern'

export default class BaseController {
    
    //Методы getPath() и getHandlers() будут переопределены потомками. 
    // А вот метод handle() нужно реализовать именно здесь, затем он будет унаследован.
    getPath () { return '' }

    getHandlers () { return [] }

    handle (request) {
        const { url, params } = request
        const handlers = this.getHandlers()

        for (let i = 0; i < handlers.length; i++) {
            const { path, handler } = handlers[i]

            const pattern = new UrlPattern(this.getPath() + path)
            const vars = pattern.match(url)

            if (vars) return handler(vars, params)
        }

        return null;
    }
}