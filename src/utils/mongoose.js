import { connect, connection, set } from 'mongoose'

set("strictQuery", false);
const URIConnection = `mongodb+srv://${process.env.BBDD_USER}:${process.env.BBDD_PASS}@mybbdd.c3unr1n.mongodb.net/${process.env.BBDD_SCHEMA}?retryWrites=true&w=majority`
const conn = { isConnected: false }

export async function dbConnect(){
  if(conn.isConnected) return

  const db = await connect(URIConnection)
  conn.isConnected = db.connections[0].readyState
}

connection.on("connected", () => {
  console.info("MongoDB is connected")
})

connection.on("error", (error) => {
  console.error(error)
})