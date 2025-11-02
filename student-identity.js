class StudentIdentity extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = `
      <style>
        .identity {
          border: 1px solid #000;
          padding: 12px;
          font-family: sans-serif;
          background-color: #f0f0f0;
          width: 300px;
        }
        .label {
          font-weight: bold;
          margin-bottom: 4px;
        }
        .value {
          margin-bottom: 8px;
        }
      </style>
      <div class="identity">
        <div class="label">Name:</div>
        <div class="value">Chelsea Natasja Jesslyne Sembiring</div>
        <div class="label">NIM:</div>
        <div class="value">24/543571/PA/23097</div>
      </div>
    `;
  }
}

customElements.define('student-identity', StudentIdentity);
