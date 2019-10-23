import MediaPlayer from './mediaPlayer';
import AutoPlay from './plugins/autoPlay';
import AutoPause from './plugins/autoPause'
import Ads from './plugins/ads';

const video: HTMLMediaElement = document.querySelector('video');
const playButton: HTMLElement = document.querySelector('#btn-video-play');
const muteButton: HTMLElement = document.querySelector('#btn-video-mute');

const player: MediaPlayer = new MediaPlayer({ 
    el: video, 
    plugins: [ new AutoPlay(), new AutoPause(), new Ads() ] 
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