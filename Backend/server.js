


const express = require('express')
const app = express()
const mongoose = require('mongoose');
mongoose.set('strictQuery',false);
var routes=require('./route/routes');
const cors = require ('cors');
const http = require('http');
const server = http.createServer(app);
const socketIO = require('socket.io');
const io = socketIO(server);

app.use(cors(
  {
    origin:"http://localhost:4200"
  }
));
mongoose.connect('mongodb+srv://root:root@cluster0.bdozs6y.mongodb.net/pfa?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  server.listen(9000, () => {
    console.log('Server started on port 9000');
  });
  console.log('Database connection successful');
})
.catch((error) => {
  console.log('Database connection error: ' + error);
});

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

app.use(express.json());
app.use(routes);

app.use(express.static(__dirname + '/public'));
app.get('/chat',function(req,res){
  res.render('index.ejs')
});


app.use(function(req, res, next) {
  res.setHeader('Content-type', 'text/html');
  res.status(404).send('Page introuvable !');
});


















 
