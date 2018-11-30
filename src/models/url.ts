import { generate as generateShortId } from 'shortid'
import config from '../config';

export interface GenerateUrl {
    url:       string
    baseShortUrl?: string
}

export default class Url {
    public baseUrl:      string
    public urlCode:      string
    public shortUrl:     string
    public baseShortUrl: string
    public createdAt?:   Date
    public updatedAt?:   Date

    constructor (opts: { baseUrl: string, urlCode?: string, baseShortUrl?: string }) {
        this.baseUrl      = opts.baseUrl
        this.urlCode      = (opts.urlCode)?opts.urlCode:generateShortId()
        this.baseShortUrl = (opts.baseShortUrl)?opts.baseShortUrl:config.SERVER_BASE_URL + '/' + config.SHORTENER_URL_CONTEXT
        this.shortUrl     = this.generate()
    }

    generate (): string {
        return this.baseShortUrl + (this.baseShortUrl.endsWith('/')?'':'/') + this.urlCode
    }
}
