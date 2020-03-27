$(function () {
    var socket = io();
    $('form').submit(function (e) {
        e.preventDefault(); // prevents page reloading
        socket.emit('chat', $('#message').val(), socket.id);
        $('#message').val('');
        return false;
    });
    socket.on('tchat', function (msg, id) {
        $('#messages').prepend($('<li>').text(id + ": " + msg));
    });
});
