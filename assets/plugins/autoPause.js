class AutoPause {
    constructor() {
        this.threshold = 0.25;        
        this.handleInterseption = this.handleInterseption.bind(this);
    }

    run(player) {
        this.player = player;
        this.pausedByScroll = false;
        // const observer = new IntersectionObserver(handler, config)
        const observer = new IntersectionObserver(
            // threshold: umbral - define que % del elemento tiene que tener interseccion
            this.handleInterseption, { threshold: this.threshold }
        );
        observer.observe(this.player.media);
    }

    handleInterseption(entries) {
        const entry = entries[0];
        if ( !entry.isIntersecting && !this.player.media.paused ) {
            this.player.pause();  
            this.pausedByScroll = true;
        }
        if ( entry.isIntersecting && this.pausedByScroll ) {
            this.player.play();
            this.pausedByScroll = false;
        }         
    }
}
export default AutoPause;