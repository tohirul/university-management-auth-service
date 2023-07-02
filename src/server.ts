import mongoose from 'mongoose'
import config from './config/index'
import app from './app'

async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    console.log('Database connection established')
    app.listen(config.port, () => {
      console.log(`Application listening on ${config.port}`)
    })
  } catch (err: any) {
    console.log('Failed to connect to Mongo database', err)
  }
}
main()

//
