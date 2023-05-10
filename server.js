// const http = require('http');

// const debug = require('debug')('node-angular')

// const app = require('./backend/app');

// const port = process.env.PORT || 3000;

// app.set('port',port);

// const server = http.createServer(app);

// server.listen(port);

const app = require("./backend/app");
const debug = require("debug")("node-angular");
const http = require("http");
const soket = require('socket.io')(http);
// const connect = require('./backend/connection/connect')

const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  debug("Listening on " + bind);
};

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);

// added sockt
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});
// var io = soket(server);
io.on('connection',(soket)=> {
        console.log('Connection has created with soket' + soket.id);
        soket.on('create',(dataCrate)=> {
            io.sockets.emit('crate',dataCrate)
        });
        soket.on("update", (update)=> {
            io.sockets.emit('update',update)
        })
    })


//  var soketIo = soket(server);
//  soketIo.on('connection',(soket)=> {
//      console.log('Connection has created with soket' + soket.id);
//      soket.on('create',(dataCrate)=> {
//          soketIo.sockets.emit('crate',dataCrate)
//      });
//      soket.on("update", (update)=> {
//          soketIo.sockets.emit('update',update)
//      })
//  })

//  const io = require("socket.io")(httpServer, {
//   cors: {
//     origin: "https://example.com",
//     methods: ["GET", "POST"]
//   }
// });
