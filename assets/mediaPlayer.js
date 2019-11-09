function MediaPlayer(config) {
    this.media = config.el;
    this.plugins = config.plugins || [];
    
    this._initPlugins();
}

MediaPlayer.prototype._initPlugins = function() {
    const player = {
        play: () => this.play(),
        pause: () => this.pause(),
        media: this.media,
        get muted() {
            return this.media.muted;
        },
        set muted(value) {
            this.media.muted = value;
            /*
            if (value === true) {
                this.media.muted = true;
            } else {
                this.media.muted = false;
            }
            */
        }
    };
    this.plugins.forEach(plugin => {
        plugin.run(player);
    });
}

MediaPlayer.prototype.play = function() {
    this.media.play();
};

MediaPlayer.prototype.pause = function() {
    this.media.pause();
};

MediaPlayer.prototype.mute = function() {
    this.media.muted = true;
};

MediaPlayer.prototype.unmute = function() {
    this.media.muted = false;
};

MediaPlayer.prototype.toggleMute = function toggleMute() {
    this.media.muted = !this.media.muted
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