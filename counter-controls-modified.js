class CounterControlsModified extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = `
      <style>
        .controls {
          display: flex;
          border: 1px solid #000;
          width: 180px;
          flex-direction: column;
        }
        .buttons {
          display: flex;
        }
        button {
          flex: 1;
          background-color: #d3d3d3;
          border: none;
          font-size: 1.2rem;
          cursor: pointer;
          height: 30px;
        }
        button:not(:last-child) {
          border-right: 1px solid #000;
        }
        button:hover {
          background-color: #bdbdbd;
        }
        .step-selector {
          display: flex;
          border-top: 1px solid #000;
          background-color: #e8e8e8;
          padding: 4px;
          font-size: 0.8rem;
          align-items: center;
          justify-content: center;
          gap: 4px;
        }
        select {
          font-size: 0.8rem;
          border: 1px solid #000;
          padding: 2px;
        }
      </style>
      <div class="controls">
        <div class="buttons">
          <button id="minus">-</button>
          <button id="reset">Reset</button>
          <button id="plus">+</button>
        </div>
        <div class="step-selector">
          Step: 
          <select id="step">
            <option value="1">1</option>
            <option value="5">5</option>
            <option value="10">10</option>
          </select>
        </div>
      </div>
    `;
  }

  connectedCallback() {
    this.shadowRoot.getElementById('plus')
      .addEventListener('click', () => this.emitChange(this.getStep()));
    this.shadowRoot.getElementById('minus')
      .addEventListener('click', () => this.emitChange(-this.getStep()));
    this.shadowRoot.getElementById('reset')
      .addEventListener('click', () => this.emitReset());
  }

  getStep() {
    return parseInt(this.shadowRoot.getElementById('step').value);
  }

  emitChange(delta) {
    this.dispatchEvent(new CustomEvent('count-change', {
      detail: { delta },
      bubbles: true,
      composed: true
    }));
  }

  emitReset() {
    this.dispatchEvent(new CustomEvent('count-reset', {
      bubbles: true,
      composed: true
    }));
  }
}

customElements.define('counter-controls-modified', CounterControlsModified);
