import { MongoClient, ServerApiVersion } from 'mongodb'

const user = process.env.MONGODB_USERNAME as string
const pwd = process.env.MONGODB_PASSWORD as string
const uri = process.env.MONGODB_URI as string
const protocol = uri.includes(':') ? 'mongodb' : 'mongodb+srv' // support localhost and non-
const connString = `${protocol}://${user}:${pwd}@${uri}`
console.log(connString)
const options = { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 }

export const getMongoClient = (): MongoClient => {
  let client

  if (!process.env.MONGODB_URI) {
    throw new Error('Please add your Mongo URI to .env.local')
  }

  if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    if (!global._mongoClient) {
      client = new MongoClient(connString, options)
      global._mongoClient = client
    }
    client = global._mongoClient
  } else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(connString, options)
  }

  // Export a module-scoped MongoClient promise. By doing this in a
  // separate module, the client can be shared across functions.
  return client
}
