var express = require('express');
var app = new express();
var http = require('http').createServer(app);
var io = require('socket.io')(http, {});

// Reception et envoi de données

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
app.get('/game', function (req, res) {
    res.sendFile(__dirname + '/public/game.html');
});
app.use('/public', express.static(__dirname + '/public'));

http.listen(2000);

console.log("Server started");

io.on('connection', function (socket) {

    socket.on('start', function (data) {
        console.log(`${socket.id} ${data.x} ${data.y}`);
        var player = new Player(socket.id, data.x, data.y, data.w, data.h);
        players_list.push(player)
    });

    socket.on('update', function (data) {
        var player = playerFind(socket, players_list);
        try {
            player.x = data.x;
            player.y = data.y;
            player.w = data.w;
            player.h = data.h;
            player.life = data.life;
            player.isDead = data.dead;
        } catch (err) {
        }
    });

    socket.on('particle', function (data) {
        io.sockets.emit('particles', data);
    });

    socket.on('attack', function (data) {
        io.sockets.emit('sweeps', data);
    });

    socket.on('hit', function (data) {
        io.sockets.emit('hit', data);
    });

    socket.on('death', function (data) {
        var player = playerFind(data);
        players_list.splice(players_list.indexOf(player), 1)
    });

    socket.on('disconnect', function () {
        var player = playerFind(socket, players_list);
        io.sockets.emit('delete', players_list.indexOf(player));
        io.sockets.emit('deconnection', socket.id);
        players_list.splice(players_list.indexOf(player), 1);
    });

    let id = socket.id;
    console.log(socket.id)
    socket.on('chat', function (msg,id) {
        io.emit('chat', msg, id);
    });

});


// Fonction pour trouver le socket
function playerFind(socket, players_list) {
    for (i in players_list) {
        if (socket.id === players_list[i].id) {
            return players_list[i];
        }
    }
}

// Tous les objets du jeu

var players_list = [];

var Player = function (id, x, y, w, h) {
    var self = {
        id: id,
        x: x,
        y: y,
        w: w,
        h: h
    };
    return self
};

setInterval(tick, 1000 / 60);

function tick() {
    io.sockets.emit('tick', players_list)
}