import MediaPlayer from './mediaPlayer.js';

const video = document.querySelector('video');
const button = document.querySelector('button');

const player = new MediaPlayer({ el: video });

/*
// Funciona, pero no es muy extensible
button.onclick = () => video.play();
// Por eso desarrollamos una clase (obj en js) MediaPlayer

button.onclick = () => player.togglePlay();
*/

button.onclick = () => {
    player.media.paused? player.play() : player.pause()
}