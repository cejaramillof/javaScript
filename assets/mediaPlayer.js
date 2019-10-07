function MediaPlayer(config) {
    this.media = config.el;
}
  
MediaPlayer.prototype.play = function() {
    this.media.play();
};

MediaPlayer.prototype.pause = function() {
    this.media.pause();
};

export default MediaPlayer;
  
/*
MediaPlayer.prototype.togglePlay = function() {
    if (this.media.paused) {
        this.play();
    } else {
        this.pause();
    }
};
*/