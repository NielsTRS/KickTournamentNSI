var socket;
var players = [];
var particles = [];
var sweeps = [];
var deconnections = [];
var colors = {	
	red: 'rgba(231,76,60,1.0)',
	orange: 'rgba(243,156,18,1.0)',
	yellow: 'rgba(241,196,15,1.0)',
	green: 'rgba(46,204,115,1.0)',
	blue: 'rgba(52, 152, 219,1.0)',
	purple: 'rgba(155, 89, 182,1.0)',
	white: 'rgba(236, 240, 241,1.0)'
}
var Floor = 200;
var Screen = {x: 1000, y: 500, bx: 1920, by: 1080}
let d = false;
let deathTitle;


class Player {
	constructor(x, y, w, h, img){
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.life = 100;
		this.totalLife = 100;
		this.right = false;
		this.left = false;
		this.gravity = 0.2;
		this.vy = 0;
		this.speed = 10;
		this.lockSound = false;
		this.img = img;
		this.jumps = {count: 2, cooldown: 60}
	}

	update(){
		if(this.right && !this.left) {
			this.x += this.speed;
			this.pvx = this.speed*-1/20;
		}
		if(this.left && !this.right){
			this.x -= this.speed;
			this.pvx = this.speed*1/20;
		}
		if(this.y == Screen.y-this.h-Floor/2 && !this.lockSound){
			this.jumps.count = 2
			this.lockSound = true;
		};
		if(this.y != Screen.y-this.h-Floor/2) this.lockSound = false;
		this.y += this.vy;
		this.vy += this.gravity;
	}

	jump(){
		if(this.jumps.count > 0){
			try{playSound('/public/assets/sound/jump.wav',volume)}catch(err){}
			this.jumps.count--;
			this.vy = -5;
		}
	}

	constrain(){
		this.x = constrain(this.x, 0, Screen.x-this.w);
		this.y = constrain(this.y, 0, Screen.y-this.h-Floor/2);
	}

	show(){
		fill(255);
		// ellipse(this.x+this.w/2, this.y+this.h/2, this.w, this.h);
		image(this.img, this.x, this.y, this.w, this.h)
		fill(149, 165, 166)
		rect(this.x, this.y-20, this.w, 5)
		if(this.life > 0) fill(colors.red)
		if(this.life > this.totalLife/4*1) fill(colors.orange)
		if(this.life > this.totalLife/4*2) fill(colors.yellow)
		if(this.life > this.totalLife/4*3) fill(colors.green)
		rect(this.x, this.y-20, this.life/100*this.w, 5)

	}

	death(){
		return this.life <= 0 ? true : false
	}
}

class Particle {
	constructor(x,y,vx){
		this.x = x;
		this.y = y;
		this.vx = vx;
		this.r = 15;
		this.a = 30;
		this.lifeTime = 60;
		this.opacity = 0.2;
		this.o = this.opacity;
	}

	update(){
		this.x += this.vx
		this.opacity -= this.o/this.lifeTime;
	}

	show(){
		// this.a += 2;
		noStroke()
		fill('rgba(0, 0, 0,' + this.opacity + ')')
		rect(this.x, this.y, this.r, this.r)
	}
}

class Sweep {
	constructor(x,y,a,img){
		this.x = x;
		this.y = y;
		this.a = a;
		this.img = img;
		this.index = 0;
	}

	show(){
		noSmooth();
		image(this.img,this.x,this.y,100,100,100*parseInt(this.a),0,100,100);
		this.a += 0.6;
	}
}