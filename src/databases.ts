import Nedb = require("nedb");
import config from "./config";

export let databases_name = {
    links: "links.ndjson"
}

export default class Databases {

    links: Nedb

    constructor() {
        this.links = new Nedb({
            filename: config.DATABASE_FOLDER + databases_name.links,
            autoload: true,
            timestampData: true
        })

        this.indexes()
    }

    private indexes () {
        this.links.ensureIndex({ fieldName: 'urlCode', unique: true })
    }
}

export let databases = new Databases()
