import { expect, assert } from 'chai'
import chai = require('chai')
import 'mocha'
import Url from '../src/models/url';

chai.use(require('chai-string'))

describe('Url model', () => {
    it('Should construct only with the baseUrl', () => {
        const url = new Url({ baseUrl: 'http://www.google.fr' })
        expect(url).to.be.a('object')
    })

    it('Should generate a unique urlCode', () => {
        const url = new Url({ baseUrl: 'http://www.google.fr' })
        expect(url.urlCode).to.be.a('string')
        expect(url.shortUrl).to.be.a('string')
    })

    it('Should generate a shortUrl with the given urlCode', () => {
        const url = new Url({ baseUrl: 'http://www.google.fr', urlCode: '123456789' })
        expect(url.urlCode).to.be.a('string')
        expect(url.shortUrl).to.endWith('123456789')
    })

    it('Should generate a shortUrl with the given baseShortUrl', () => {
        const url = new Url({ baseUrl: 'http://www.google.fr', baseShortUrl: 'http://localhost:80/context/' })
        expect(url.baseShortUrl).to.be.a('string')
        expect(url.shortUrl).to.startWith('http://localhost:80/context/')
    })

    it('Should generate a shortUrl with the given baseShortUrl and urlCode', () => {
        const url = new Url({ baseUrl: 'http://www.google.fr', baseShortUrl: 'http://localhost:80/context/', urlCode: '123456789' })
        expect(url.shortUrl).to.be.equal('http://localhost:80/context/123456789')
    })

    it('Should add a / if the baseShortUrl does not have one', () => {
        const url = new Url({ baseUrl: 'http://www.google.fr', baseShortUrl: 'http://localhost:80/context', urlCode: '123456789' })
        expect(url.shortUrl).to.be.equal('http://localhost:80/context/123456789')
    })
})