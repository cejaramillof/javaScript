interface Observer {
  updated: (data: any) => void;
}
interface Subject {
  subscribe: (observer: Observer) => void;
  unsubscribe: (observer: Observer) => void;
}

// Observador - Texto
class PriceDisplay implements Observer {
  private el: HTMLElement;

  constructor() {
    this.el = document.querySelector("#price");
  }
  updated(data: any) {
    this.el.innerText = data;
  }
}

// Sujeto Observado - Input
class BitcoinPrice implements Subject {
  observers: Observer[] = [];

  constructor() {
    const el: HTMLInputElement = document.querySelector("#value");
    el.addEventListener("input", () => {
      this.notify(el.value);
    });
  }

  subscribe(observer: Observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer: Observer) {
    const index = this.observers.findIndex(obs => {
      return obs === observer;
    });

    this.observers.splice(index, 1);
  }

  notify(data: any) {
    this.observers.forEach(observer => observer.updated(data));
  }
}

const observed = new BitcoinPrice();
const observer = new PriceDisplay();

// Subscribimos
observed.subscribe(observer);
// Simulamos unsubscribe usando un setTimeout de 5 segundos
setTimeout(() => observed.unsubscribe(observer), 5000);
