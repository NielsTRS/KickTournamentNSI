$(function () {
    var socket = io();
    $('form').submit(function (e) {
        e.preventDefault(); // prevents page reloading
        socket.emit('tchat', $('#message').val());
        $('#message').val('');
        return false;
    });
    socket.on('tchat', function (msg) {
        $('#messages').prepend($('<li>').text(msg));
    });
});