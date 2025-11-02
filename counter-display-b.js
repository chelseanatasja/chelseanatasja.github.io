class CounterDisplayB extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.title = this.getAttribute('title') || 'Lorem Ipsum Title';
    this.value = parseInt(this.getAttribute('value')) || 0;

    this.shadowRoot.innerHTML = `
      <style>
        .display {
          background-color: #f8a8a8;
          padding: 12px;
          border: 1px solid #000;
          font-family: sans-serif;
        }
        .title {
          font-size: 0.9rem;
          margin-bottom: 4px;
        }
        .value {
          font-size: 1rem;
        }
        .number {
          font-weight: bold;
          font-style: italic;
        }
      </style>
      <div class="display">
        <div class="title">${this.title}</div>
        <div class="value">Value: <span class="number">${this.value}</span></div>
      </div>
    `;
  }

  set count(val) {
    this.value = val;
    this.shadowRoot.querySelector('.number').textContent = val;
  }

  get count() {
    return this.value;
  }
}

customElements.define('counter-display-b', CounterDisplayB);