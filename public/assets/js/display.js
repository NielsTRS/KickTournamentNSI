function displayDeconnections(){
	for(i of deconnections){
		Text = {src: i.txt, x: 10, y: 50*deconnections.indexOf(i)+10, size: 20}
		if(deconnections.indexOf(i) == 0) Text.y += 20

		Image = {
			x: 10,
			y: Text.y-Text.size*1.1,
			width: textWidth(Text.src),
			height: Text.size*1.5
		}

		noSmooth()
		image(display,Image.x,Image.y,Image.width,Image.height,2,0,28,9)
		image(display,Image.x-2*3,Image.y,2*3,Image.height,0,0,2,9)
		image(display,Image.x+Image.width,Image.y,2*3,Image.height,30,0,2,9)

		textFont(pixelFont)
		textSize(Text.size)
		fill(i.color)
		text(Text.src, Text.x, Text.y)
		i.life--;
		if(i.life <= 0) deconnections.splice(deconnections.indexOf(i), 1);
	}
}

function displaySweeps(){
	for(i of sweeps){
		i.show()
		if(i.a > 8) sweeps.splice(sweeps.indexOf(i), 1)
	}
}

function displayPlayers(socket){
	for(i of players){
		fill(255, 0, 0);
		if(socket != i.id){
			image(bloodborn,i.x+i.w/2, i.y+i.h/2, i.w, i.h)
			// ellipse(i.x+i.w/2, i.y+i.h/2, i.w, i.h)
		}
	}
}

function displayParticles(){
	for(i of particles){
		i.update()
		i.show()
		if(i.opacity < 0.1) particles.splice(particles.indexOf(i), 1)
	}
}

function displayBackground(){
	// Herbe
	fill(149, 165, 166)
	noStroke()
	rect(0,Screen.y-Floor,Screen.x,Screen.y-(Screen.y-Floor))
	// Ciel
	fill(127, 140, 141)
	rect(0,0,Screen.x,Screen.y-Floor)
}