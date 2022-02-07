const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // these are to avoid errors in console
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
    })

    console.log(`MongoDB connected: ${conn.connection.host}`.rainbow.underline)

  } catch (err) {
    console.error(`Error: ${err.message}`.red.underline.bold)
    // the one means that exit with failure
    process.exit(1)
  }
}

module.exports = connectDB