import {server} from './server'
import { Request, Response } from 'express';
import Url from './models/url';
import { databases } from './databases';
import config from './config';
import { GenerateUrl } from './models/url';
import { isUri } from 'valid-url'


server.app.get('/', async (req: Request, res: Response) => {
    return res.sendFile('index.html')
})

server.app.get('/error', async (req: Request, res: Response) => {
    return res.sendFile('error.html')
})

server.app.get('/' + config.SHORTENER_URL_CONTEXT + '/:urlCode', async (req: Request, res: Response) => {
    const code = req.params.urlCode

    databases.links.findOne({ urlCode: code }, (err: Error, url: Url) => {
        if (url) {
            res.redirect(url.baseUrl)
        } else {
            res.redirect(config.ERROR_URL)
        }
    })

})


server.app.post('/generate', async (req: Request, res: Response) => {
    const urlToShortened: GenerateUrl = req.body

    if (!isUri(urlToShortened.url)) {
        return res
                .status(400)
                .json({
                    status:  400,
                    message: 'Invalid url'
                })
    }

    if (urlToShortened.baseShortUrl && !!!urlToShortened.baseShortUrl.match(new RegExp(config.BASE_URL_REGEX, 'gi'))) {
        return res
                .status(400)
                .json({
                    status:  400,
                    message: 'Invalid base short url'
                })
    }
    const shortUrl: Url = new Url({
        baseUrl: urlToShortened.url,
        baseShortUrl: urlToShortened.baseShortUrl
    })

    databases.links.findOne({ baseUrl: urlToShortened.url, baseShortUrl: shortUrl.baseShortUrl }, (err: Error, url: Url) => {
        if (url) {
            return res
                    .json(shortUrl)
        } else {
            databases.links.insert(shortUrl, (err: Error, insertedUrl: Url) => {
                return res
                        .json(shortUrl)
            })
        }
    })

})



server.start()

