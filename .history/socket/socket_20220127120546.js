const io = require('socket.io')(8000, {
    cors: {
        origin: "*",
        methods: ['GET', 'POST']
    }
})

let users = []

const addUser = (userId, socketId, userInfo) => {
    const checkUser = users.some(u => u.userId === userId);
    if (!checkUser) {
        users.push({ userId, socketId, userInfo })
    }
}

const removeUser = (socketId)=>{
users = users.filter(u=> u.socketId !== socketId)
}

const findFriend = (id)=>{

}

io.on('connection', (socket) => {
    console.log("user connected.....")
    socket.on('addUser', (userId, userInfo) => {
        addUser(userId, socket.id, userInfo)
        io.emit('getUser', users)
    })

    socket.on("sendMessage",(data)=>{
        console.log(data)
    })

    socket.on("disconnect",()=>{
        console.log("disconnect")
        removeUser(socket.id);
        io.emit('getUser', users)
    })
})