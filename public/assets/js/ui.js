function deathUi() {
    if (menuOpened) menuUi();
    Text = {size: 60, src: 'Vous êtes mort'}
    deathText = createDiv('Vous êtes mort')
    deathText.addClass('ui')
    deathText.addClass('deathText')
}

let deathOpened;
let menuOpened;
let downVolume;
let upVolume;

function menuUi() {
    if (!menuOpened) { //Ouverture du menu
        try {
            playSound('/public/assets/sound/confirm.wav', volume)
        } catch (err) {
        }
        menuOpened = true;
        div = createDiv('')
        div.addClass('ui')
        div.addClass('menu')
        // menuTitle = createDiv('')
        // menuTitle.addClass('menu-title')
        quit = createDiv('')
        quit.parent(div)
        quit.addClass('ui')
        quit.addClass('menu-quit')
        quit.mousePressed(function (e) {
            menuUi();
        })

        volumeDiv = createDiv()
        volumeDiv.parent(div)
        volumeDiv.addClass('menu-volume-div')

        slider = createSlider(0.0, 1.0, sound, 0.05)
        slider.addClass('menu-volume')
        slider.parent(volumeDiv)
        slider.mouseMoved(function () {
            changeImage(slider)
        })
        slider.mouseReleased(function () {
            playSound('/public/assets/sound/bit.wav', sound)
        })

        volumeImg = createImg('/public/assets/images/ui/volume/3.png', '')
        changeImage(slider)
        volumeImg.addClass('menu-volume-img')
        volumeImg.parent(volumeDiv)

        effect = createDiv('Volume des effets')
        effect.parent(div)
        effect.addClass('menu-effect-div')
        effect.addClass('effect-title')

        effectDown = createDiv('<')
        effectDown.parent(div)
        effectDown.mousePressed(function () {
            changeEffectVolume(-0.1)
        })
        effectDown.id('effect-down')
        effectDown.addClass('effect-change')
        effectDown.parent(effect)

        effectValue = createDiv(parseFloat(volume) * 100 + "%")
        effectValue.addClass('effect-value')
        effectValue.parent(effect)

        effectUp = createDiv('>')
        effectUp.mousePressed(function () {
            changeEffectVolume(0.1)
        })
        effectUp.id('effect-up')
        effectUp.addClass('effect-change')
        effectUp.parent(effect)

        keys = createDiv()
        keys.parent(div)
        keys.addClass('keys-menu')

        keyLeft = createButton("Gauche (" + getCookie("left") + ")")
        keyLeft.parent(keys)
        keyLeft.addClass('keys-key')
        keyLeft.addClass('keys-left')
        keyLeft.mousePressed(function () {
            changeControl("left")
        })

        keyRight = createButton("Droite (" + getCookie("right") + ")")
        keyRight.parent(keys)
        keyRight.addClass('keys-key')
        keyRight.addClass('keys-right')
        keyRight.mousePressed(function () {
            changeControl("right")
        })

        actionsDiv = createDiv()
        actionsDiv.parent(div)
        actionsDiv.addClass('menu-actions-div')

        disconnect = createButton('Quitter la partie')
        disconnect.addClass('menu-actions')
        disconnect.addClass('ui')
        disconnect.parent(actionsDiv)
        disconnect.mousePressed(function () {
            window.location.href = '/'
        })

        if (player.death()) {
            replay = createButton('Rejouer')
            replay.addClass('menu-actions')
            replay.addClass('ui')
            replay.parent(actionsDiv)
            replay.mousePressed(function () {
                menuUi();
                d = undefined;
                try {
                    deathText.remove()
                } catch (err) {
                }
                players.splice(players.indexOf(socket.id))
                player = new Player(random(0, Screen.x - 40), 50, 80, 160, alucard)
                pack = {
                    x: player.x,
                    y: player.y,
                    w: player.w,
                    h: player.h,
                    life: player.life
                }
                socket.emit('start', pack)
            })
        }

    } else {
        menuOpened = false;
        try {
            playSound('/public/assets/sound/cancel.wav', volume)
        } catch (err) {
        }
        try {
            replay.remove()
        } catch (err) {
        }
        disconnect.remove()
        actionsDiv.remove()
        volumeImg.remove()
        // keySpace.remove()
        keyRight.remove()
        keyLeft.remove()
        keys.remove()
        effectDown.remove()
        effectUp.remove()
        effectValue.remove()
        effect.remove()
        slider.remove()
        volumeDiv.remove()
        quit.remove()
        div.remove()
    }
}

function changeEffectVolume(i) {
    volume += i;
    if (volume < 0) volume = 0.0;
    if (volume > 1) volume = 1.0;
    volume = parseFloat(volume.toFixed(1))
    setCookie("volume", volume, 100000);
    effectValue.html(volume * 100 + "%", false)
    try {
        playSound('/public/assets/sound/bit.wav', volume)
    } catch (err) {
    }
    // console.log(i)
}

function changeControl(control) {
    let newCtrl = prompt("Quel touche voulez-vous attribuer ?")
    if (newCtrl != undefined || newCtrl != "") {
        setCookie(control, newCtrl.toString(), 100000)
    }
    try {
        keyRight.html("Droite (" + getCookie("right") + ")", false)
        keyLeft.html("Gauche (" + getCookie("left") + ")", false)
    } catch (err) {
    }
}

function changeImage(slider) {
    sound = slider.value();
    ambientMusic.volume(sound);
    setCookie("sound", sound, 2);
    if (sound <= 1 && sound > 2 / 3) {
        volumeImg.attribute('src', '/public/assets/images/ui/volume/3.png')
    } else if (sound <= 2 / 3 && sound > 1 / 3) {
        volumeImg.attribute('src', '/public/assets/images/ui/volume/2.png')
    } else if (sound <= 1 / 3 && sound > 0) {
        volumeImg.attribute('src', '/public/assets/images/ui/volume/1.png')
    } else {
        volumeImg.attribute('src', '/public/assets/images/ui/volume/mute.png')
    }
}
