function eventsHandler(socket) {
    socket.on('tick', function (data) {
        players = data;
    })

    socket.on('particles', function (data) {
        particles.push(new Particle(data[0], data[1], data[2]))
    })

    socket.on('sweeps', function (data) {
        sweepImg = data.dist < 0 ? sweepLeft : sweepRight;
        sweeps.push(new Sweep(data.x, data.y, 0, sweepImg))
    })

    socket.on('hit', function (data) {
        if (socket.id == data.hitter) {
            try {
                playSound('/public/assets/sound/hit.wav', volume)
            } catch (err) {
            }
            console.log(`Vous avez touché ${data.hitted}: -${data.damage} PV`)
        } else if (socket.id == data.hitted) {
            console.log(`Vous avez été touché par ${data.hitter}: -${data.damage} PV`)
            player.life -= data.damage;
            try {
                playSound('/public/assets/sound/hurt.wav', volume)
            } catch (err) {
            }
        }
    })

    socket.on('delete', function (data) {
        players.splice(data, 1)
    })

    socket.on('deconnection', function (data) {
        try {
            playSound('/public/assets/sound/cancel.wav', volume)
        } catch (err) {
        }
        // disconnect.play()
        deconnections.push({txt: data + " s'est déconnecté.", life: 500, color: rndmKey(colors)})
    })
}

function keyPressed() {
    if (!player.death()) {
        if (keyCode === LEFT_ARROW || key === getCookie("left") && !menuOpened) player.left = true;
        if (keyCode === RIGHT_ARROW || key === getCookie("right") && !menuOpened) player.right = true;
        if (key === " " && !menuOpened) player.jump();
    }
    if (keyCode === ESCAPE) menuUi();
    if (key === "s") player.life = 0;
}

function keyReleased() {
    if (keyCode === LEFT_ARROW || key === getCookie("left") && !menuOpened) player.left = false;
    if (keyCode === RIGHT_ARROW || key === getCookie("right") && !menuOpened) player.right = false;
}

function mousePressed() {
    if (mouseButton == "left" && !player.death() && !menuOpened) {
        try {
            playSound('/public/assets/sound/sweep.wav', volume)
        } catch (err) {
        }
        distance = (player.x + player.w / 2) - mouseX
        for (i of players) {
            point(mouseX, mouseY)
            if (socket.id != i.id && collidePointEllipse(mouseX, mouseY, i.x + i.w / 2, i.y + i.h / 2, i.w, i.h)) {
                socket.emit('hit', {hitted: i.id, hitter: socket.id, damage: 10, x: mouseX, y: mouseY})
            }
        }
        socket.emit('attack', {dist: distance * -1, x: mouseX - 50, y: mouseY - 50})
    } else {

    }
}