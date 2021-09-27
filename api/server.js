const HttpServer = require('http')
const Express = require('express')
const cors = require('cors')

const socketIo = require('socket.io')

// Instalacao Express
const app = new Express()
app.use(cors()) // Permite acessar de qualquer origem
app.use(Express.json())
app.use(Express.urlencoded({ extended: true }))

// Instalacao Server
const http = HttpServer.createServer(app)

// Servidor em tempo real
const io = socketIo(http, { cors: true, origins:["http://localhost:8080"] })
io
    .of('/server')
    .on('connection', (socket) => {
        socket.on('join', (id) => {
            socket.join(id)
            console.log(`Um cliente foi conectado na sala: ${id}`)
        })

        socket.on('leave', (id) => {
            // Remove o client da sala
            socket.leave(id)
            console.log(`Um cliente foi disconectado da sala: ${id}`)
        })
    })

// Rotas
app.get('/', (req, res) => {
    res.json({ code: 200, status: 'success', message: 'Express server is running' })
})

app.post('/senha', (req, res)  => {
    const dadosEmitidos = req.body.dadosEmitidos

    io.of('/server').to(dadosEmitidos[0].servidor).emit('messageChannel', dadosEmitidos)
    //  console.log(JSON.stringify(dadosEmitidos))

    console.log(`[DEBUG] Socket Emmiting to ${dadosEmitidos.servidor} on chanel: messageChannel. Value: ${dadosEmitidos}`)
    res.json({ code: 201, status: 'success', message: 'Senha Emitida com sucesso!' })
})

// Start Servidor
http.listen(3030)
console.log('Servidor esta rodando na porta ', 3030)

module.exports = {
    io
}