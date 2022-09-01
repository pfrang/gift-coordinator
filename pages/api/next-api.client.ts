import axios, { AxiosInstance } from "axios";
import mongoDB from "../../sql-nodejs/cosmosdb/app";

const axiosInstance = axios.create({
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': "true",
    "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
    "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
  },
  baseURL: `https://www.prisjakt.no`,
});


export class NextApiClient {

  axiosInstance: AxiosInstance
  db: mongoDB
  constructor() {
    const axiosInstance = axios.create({
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': "true",
        "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
        "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
      },
      baseURL: '',
    });

    const db = new mongoDB

    this.axiosInstance = axiosInstance
    this.db = db
  }
}
