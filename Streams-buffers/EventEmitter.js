

const EventEmitter = require('events')

const emitter = new EventEmitter()

emitter.on("greet", (name)=>{
    console.log("hey", name)
})

emitter.emit('greet', "Ashu")

