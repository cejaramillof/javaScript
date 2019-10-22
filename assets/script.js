import MediaPlayer from './mediaPlayer.js';
import AutoPlay from './plugins/autoPlay.js';
import AutoPause from './plugins/autoPause.ts'

const video = document.querySelector('video');
const playButton = document.querySelector('#btn-video-play');
const muteButton = document.querySelector('#btn-video-mute');

const player = new MediaPlayer({ 
    el: video, 
    plugins: [ new AutoPlay(), new AutoPause() ] 
});

/*
// Funciona, pero no es muy extensible
playButton.onclick = () => video.play();
// Por eso desarrollamos una clase (obj en js) MediaPlayer

playButton.onclick = () => player.togglePlay();
*/

playButton.onclick = () => {
    player.media.paused? player.play() : player.pause()
}

muteButton.onclick = () => player.toggleMute();

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch( err => {
        console.log(err.message);
    });
}