const video = document.querySelector('video');
const button = document.querySelector('button');

/*
// Funciona, pero no es muy extensible
button.onclick = () => video.play();
// Por eso desarrollamos una clase (obj en js) MediaPlayer
*/

function MediaPlayer(config) {
  this.media = config.el;
}

MediaPlayer.prototype.play = function() {
  this.media.play();
};

MediaPlayer.prototype.pause = function() {
  this.media.pause();
};

/*
MediaPlayer.prototype.togglePlay = function() {
  if (this.media.paused) {
    this.play();
  } else {
    this.pause();
  }
};

button.onclick = () => player.togglePlay();
*/

const player = new MediaPlayer({ el: video });


button.onclick = () => {
  player.media.paused? player.play() : player.pause()
}