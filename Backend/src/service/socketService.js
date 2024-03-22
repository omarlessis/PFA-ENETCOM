const http = require('http');
const server = http.createServer(app);
const socketIO = require('socket.io');
const io = socketIO(server);


io.on('connection', (socket) => {
  socket.on('pseudo', (pseudo) => {
    socket.pseudo = pseudo;
    socket.broadcast.emit('newUser', pseudo);
  });
  socket.on('newMessage',(message)=>{
    socket.broadcast.emit('newMessageAll',{message:message, pseudo:socket.pseudo});
  })
  socket.on('disconnect', () => {
    socket.broadcast.emit('quitUser', socket.pseudo);
  });
});
app.use(express.static(__dirname + '/public'));
app.get('/',function(req,res){
  res.render('index.ejs')
});
