class CombinedCounterModified extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    const title = this.getAttribute('title') || 'Modified Counter';
    const value = parseInt(this.getAttribute('value')) || 0;
    this.initialValue = value;

    this.shadowRoot.innerHTML = `
      <style>
        .wrapper {
          border: 1px solid #000;
          padding: 1px;
          width: 180px;
          font-family: sans-serif;
        }
        .display {
          background-color: #f8a8a8;
          padding: 12px;
          border: 1px solid #000;
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
        .controls {
          display: flex;
          border: 1px solid #000;
          flex-direction: column;
        }
        .buttons {
          display: flex;
        }
        .action-buttons {
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
        button:disabled {
          background-color: #e8e8e8;
          cursor: not-allowed;
          opacity: 0.5;
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
      <div class="wrapper">
        <div class="display">
          <div class="title">${title}</div>
          <div class="value">Value: <span class="number">${value}</span></div>
        </div>
        <div class="controls">
          <div class="buttons">
            <button id="minus">-</button>
            <button id="plus">+</button>
          </div>
          <div class="action-buttons">
            <button id="undo">Undo</button>
            <button id="reset">Reset</button>
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
      </div>
    `;

    this.currentValue = value;
    this.history = [value];
  }

  connectedCallback() {
    const numberSpan = this.shadowRoot.querySelector('.number');
    const stepSelect = this.shadowRoot.getElementById('step');
    const undoButton = this.shadowRoot.getElementById('undo');

    const updateValue = (newValue) => {
      this.currentValue = newValue;
      this.history.push(newValue);
      numberSpan.textContent = newValue;
      undoButton.disabled = this.history.length <= 1;
    };

    this.shadowRoot.getElementById('plus').addEventListener('click', () => {
      const step = parseInt(stepSelect.value);
      updateValue(this.currentValue + step);
    });

    this.shadowRoot.getElementById('minus').addEventListener('click', () => {
      const step = parseInt(stepSelect.value);
      updateValue(this.currentValue - step);
    });

    this.shadowRoot.getElementById('undo').addEventListener('click', () => {
      if (this.history.length > 1) {
        this.history.pop();
        this.currentValue = this.history[this.history.length - 1];
        numberSpan.textContent = this.currentValue;
        undoButton.disabled = this.history.length <= 1;
      }
    });

    this.shadowRoot.getElementById('reset').addEventListener('click', () => {
      this.currentValue = this.initialValue;
      this.history = [this.initialValue];
      numberSpan.textContent = this.currentValue;
      undoButton.disabled = true;
    });

    // Initialize undo button state
    undoButton.disabled = true;
  }
}

customElements.define('combined-counter-modified', CombinedCounterModified);
