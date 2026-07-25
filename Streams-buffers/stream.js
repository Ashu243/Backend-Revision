const fs = require('fs')

const readStream = fs.createReadStream("movie.mp4")

readStream.on("data", (chunk)=>{
    console.log(chunk.length)
})