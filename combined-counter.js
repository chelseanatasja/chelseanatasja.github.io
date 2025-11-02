class CombinedCounter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    const title = this.getAttribute('title') || 'Lorem Ipsum Title';
    const value = parseInt(this.getAttribute('value')) || 0;


    this.shadowRoot.innerHTML = `
      <style>
        .wrapper {
          border: 1px solid #000;
          padding: 1px;
          width: 180px;
          font-family: sans-serif;
        }
        counter-display {
          display: block;
        }
      </style>
      <div class="wrapper">
        <counter-display id="display" title="${title}" value="${value}"></counter-display>
        <counter-controls id="controls"></counter-controls>
      </div>
    `;
  }


  connectedCallback() {
    const display = this.shadowRoot.getElementById('display');
    const controls = this.shadowRoot.getElementById('controls');
    controls.addEventListener('count-change', e => {
      display.count += e.detail.delta;
    });
  }
}


customElements.define('combined-counter', CombinedCounter);
