import {Express} from 'express'
import {Server as HttpServer} from 'http'
import config from './config'

const express = require('express')

export default class Server {
    readonly port: number
    readonly app: Express
    server!: HttpServer

    constructor(port: number) {
        this.port = port
        this.app = express()
        this.middlewares()
        this.server = new HttpServer(this.app)
    }

    start() {
        this.server.listen(this.port, () => {
            console.log('Listening on port ' + this.port)
        })
    }

    private middlewares() {

        this.app.use(express.json())
        this.app.use(express.urlencoded({extended: true}))

    }

}

export let server = new Server((process.env.PORT)?+process.env.PORT:config.SERVER_PORT)

