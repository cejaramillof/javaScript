import MediaPlayer from '../mediaPlayer';

class AutoPause {
    private threshold: number;
    player: MediaPlayer;
    pausedByScroll: boolean;
    pausedByTab: boolean;

    constructor() {
        this.threshold = 0.25;        
        this.handleInterseption = this.handleInterseption.bind(this);
        this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
    }

    run(player) {
        this.player = player;
        this.pausedByScroll = false;
        this.pausedByTab = false;
        // const observer = new IntersectionObserver(handler, config)
        const observer = new IntersectionObserver(
            // threshold: umbral - define que % del elemento tiene que tener interseccion
            this.handleInterseption, { threshold: this.threshold }
        );
        observer.observe(this.player.media);

        document.addEventListener("visibilitychange", this.handleVisibilityChange)
    }

    private handleInterseption(entries: IntersectionObserverEntry[]) {
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

    private handleVisibilityChange() {
        const isVisible = document.visibilityState === "visible";

        if ( !isVisible && !this.player.media.paused ) {
            this.player.pause();  
            this.pausedByTab = true;
        }
        if ( isVisible && this.pausedByTab ) {
            this.player.play();
            this.pausedByTab = false;
        }
    }
}
export default AutoPause;