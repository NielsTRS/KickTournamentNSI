let ambientMusic;
function preload(){
	try{loadImages()}catch(err){};
	ambientMusic = createAudio('/public/assets/sound/ambient_music.mp3', soundLoaded)
	// disconnect = loadSound('disconnect.wav')
}

function soundLoaded(){
	if(getCookie("volume") == "") setCookie("volume",0.5,100000);
	if(getCookie("sound") == "") setCookie("sound",0,100000);
	if(getCookie("left") == "") setCookie("left","a",100000);
	if(getCookie("right") == "") setCookie("right","d",100000);
	sound = parseFloat(getCookie("sound"))
	volume = parseFloat(getCookie("volume"))
	ambientMusic.volume(sound);
	ambientMusic.play();
}

function setup(){
	ambientMusic.loop();
	createCanvas(Screen.x, Screen.y)
	background(51);
	socket = io.connect('localhost:2000')
	player = new Player(random(0,Screen.x-80/2),50,80,160,alucard)
	pack = {
		x: player.x,
		y: player.y,
		w: player.w,
		h: player.h,
		life: player.life,
	}
	socket.emit('start', pack)

	eventsHandler(socket);

	console.clear();
	ambientMusic.play()
}

function draw(){
	background(51);

	displayBackground();	
	displayParticles();
	displayPlayers(socket.id);

	if(!player.death()) player.update()
	if(!player.death()) player.constrain()
	if((player.left && !player.right) || (!player.left && player.right)){
		pack = [player.x+player.w/2+rndmInt(player.w*0.1),player.y+rndmInt(player.h*0.8),player.pvx];
		socket.emit('particle', pack)
	}
	if(!player.death()) player.show();
	
	displaySweeps();
	displayDeconnections();
	
	if(player.death() && !d){
		console.info("Vous êtes mort.")
		canvas = document.getElementsByClassName('p5Canvas')
		canvas[0].style.cursor = "pointer";
		d = true;
		try{playSound('/public/assets/sound/death.wav',volume)}catch(err){}
		socket.emit('death', player.id)
		deathUi();
	}

	/*fill(0)
	stroke(0)
	line(width/2,0,width/2,height)
	line(0,height/2,width,height/2)*/

	pack = {
		x: player.x,
		y: player.y,
		w: player.w,
		h: player.h,
		life: player.life,
		dead: player.death()
	}
	socket.emit('update', pack)

}

function windowResized(){
	resizeCanvas(Screen.x, Screen.y)
	background(51);
}