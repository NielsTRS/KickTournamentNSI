function deathUi() {
    if (menuOpened) menuUi();
    Text = {size: 60, src: 'Vous êtes mort'};
    deathText = createDiv('Vous êtes mort');
    deathText.addClass('ui');
    deathText.addClass('deathText')
}

let deathOpened;
let menuOpened;

function menuUi() {
    if (!menuOpened) { //Ouverture du menu
        try {
            playSound('public/assets/sound/confirm.wav', volume)
        } catch (err) {
        }
        menuOpened = true;
        div = createDiv('');
        div.addClass('ui');
        div.addClass('menu');
        quit = createDiv('');
        quit.addClass('ui');
        quit.addClass('menu-quit');
        quit.mousePressed(function (e) {
            menuUi();
        });

        volumeDiv = createDiv();
        volumeDiv.addClass('menu-volume-div');

        slider = createSlider(0.0, 1.0, volume, 0.05);
        slider.addClass('menu-volume');
        slider.parent(volumeDiv);
        slider.mouseMoved(function () {
            changeImage(slider)
        });
        slider.mouseReleased(function () {
            playSound('public/assets/sound/bit.wav', volume)
        });

        volumeImg = createImg('public/assets/images/ui/volume/3.png', '');
        changeImage(slider);
        volumeImg.addClass('menu-volume-img');
        volumeImg.parent(volumeDiv);

        actionsDiv = createDiv();
        actionsDiv.addClass('menu-actions-div');

        disconnect = createButton('Quitter la partie');
        disconnect.addClass('menu-actions');
        disconnect.addClass('ui');
        disconnect.parent(actionsDiv);
        disconnect.mousePressed(function () {
            window.location.href = 'about:blank'
        });

        if (player.death()) {
            replay = createButton('Rejouer');
            replay.addClass('menu-actions');
            replay.addClass('ui');
            replay.parent(actionsDiv);
            replay.mousePressed(function () {
                menuUi();
                d = undefined;
                try {
                    deathText.remove()
                } catch (err) {
                }
                players.splice(players.indexOf());
                player = new Player(50, 50, 80, 160);
                pack = {
                    x: player.x,
                    y: player.y,
                    w: player.w,
                    h: player.h,
                    life: player.life
                };
                socket.emit('start', pack)
            })
        }

    } else {
        menuOpened = false;
        try {
            playSound('public/assets/sound/cancel.wav', volume)
        } catch (err) {
        }
        try {
            replay.remove()
        } catch (err) {
        }
        disconnect.remove();
        actionsDiv.remove();
        volumeImg.remove();
        slider.remove();
        volumeDiv.remove();
        quit.remove();
        div.remove()
    }
}

function changeImage(slider) {
    volume = slider.value();
    if (volume <= 1 && volume > 2 / 3) {
        volumeImg.attribute('src', 'public/assets/images/ui/volume/3.png')
    } else if (volume <= 2 / 3 && volume > 1 / 3) {
        volumeImg.attribute('src', 'public/assets/images/ui/volume/2.png')
    } else if (volume <= 1 / 3 && volume > 0) {
        volumeImg.attribute('src', 'public/assets/images/ui/volume/1.png')
    } else {
        volumeImg.attribute('src', 'public/assets/images/ui/volume/mute.png')
    }
}