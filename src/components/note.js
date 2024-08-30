class Note extends HTMLElement {
  static observedAttributes = 'data-note-container';

  constructor() {
    super();
    this._dataNoteContainer = this.getAttribute('data-note-container');
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
     <div class="container" id="noteList"></div>
      `;
  }
}

customElements.define('note-component', Note);
