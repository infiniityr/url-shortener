import * as dotenv from "dotenv"

dotenv.config()

export default {
    SERVER_PORT: process.env.SERVER_PORT?
                    parseInt(process.env.SERVER_PORT)
                    :8080,
    
    DATABASE_FOLDER: process.env.DATABASE_FOLDER?
                        process.env.DATABASE_FOLDER
                        :"./databases/",


    SERVER_BASE_URL: process.env.SERVER_BASE_URL?
                        process.env.SERVER_BASE_URL
                        :"http://localhost",
    
    SHORTENER_URL_CONTEXT: process.env.CONTEXT?
                        process.env.CONTEXT
                        :"s",
    
    ERROR_URL: process.env.ERROR_URL?
                        process.env.ERROR_URL
                        :"/error",

    BASE_URL_REGEX: process.env.BASE_URL_REGEX?
                        process.env.BASE_URL_REGEX
                        :"https?:\/\/[a-z\.]+\.(com|fr)(\/[a-z\/]*)?"
}
