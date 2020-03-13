function preload() {
    loadImages();
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(51);
    socket = io.connect('localhost:2000');
    player = new Player(50, 50, 80, 160);
    pack = {
        x: player.x,
        y: player.y,
        w: player.w,
        h: player.h,
        life: player.life
    };
    socket.emit('start', pack);

    eventsHandler(socket);

    console.clear();
}

function draw() {
    background(51);

    displayBackground();
    displayParticles();
    displayPlayers(socket.id);

    if (!player.death()) player.update();
    if (!player.death()) player.constrain();
    if ((player.left && !player.right) || (!player.left && player.right)) {
        pack = [player.x + player.w / 2 + rndmInt(player.w * 0.1), player.y + rndmInt(player.h * 0.8), player.pvx];
        socket.emit('particle', pack)
    }
    if (!player.death()) player.show();

    displaySweeps();
    displayDeconnections();

    if (player.death() && !d) {
        console.info("Vous êtes mort.");
        canvas = document.getElementsByClassName('p5Canvas');
        canvas[0].style.cursor = "pointer";
        d = true;
        try {
            playSound('public/assets/sound/death.wav', volume);
        } catch (err) {
        }
        socket.emit('death', player.id);
        deathUi();
    }

    pack = {
        x: player.x,
        y: player.y,
        w: player.w,
        h: player.h,
        life: player.life,
        dead: player.death()
    };
    socket.emit('update', pack);

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    background(51);
}