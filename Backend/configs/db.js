import mongoose from "mongoose";

const connectDB =  async () => {
    await mongoose.connect(process.env.MONGODB_URL).then(()=> {
        console.log(`MongoDb Is Connect `)
    }).catch(error => {
         console.log(`mongo db is not connected becausee this errror is showing ${error}`)
    })
}


export default connectDB;