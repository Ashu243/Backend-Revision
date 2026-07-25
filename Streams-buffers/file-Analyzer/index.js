
// creating stream
const fs = require('fs')

// creating Event Emitter
const EventEmitter = require('events')

const emitter = new EventEmitter()

const readStream = fs.createReadStream('./book.txt')

let chunkProcessed = 0

emitter.on('chunk-processed', (chunkProcessed)=>{
    console.log(`chunk ${chunkProcessed} processed!`)
})

emitter.on('completed', ()=>{
    console.log('task completed')
})

let characters = 0
let words = 0
let lines = 0

// reading data from file chunk by chunk
readStream.on('data', (chunk)=>{
    let wordStr = chunk.toString()
    characters += wordStr.length
    words += wordStr.trim().split(/\s+/).length
    lines += wordStr.split(/\n/).length

    chunkProcessed++
    emitter.emit('chunk-processed', chunkProcessed)
})


// End of reading data
readStream.on('end', ()=>{
    emitter.emit('completed')
    
    console.log(`characters: ${characters}, words: ${words}, lines: ${lines}`)
})

readStream.on('error', (err)=>{
    console.log('Read Stream Error', err)
})
