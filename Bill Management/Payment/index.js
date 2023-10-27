import {app} from "./core/init.js";
import { connectDB,query } from './config/db.js'
import dotenv from 'dotenv'


dotenv.config()
//database connection object
connectDB()




