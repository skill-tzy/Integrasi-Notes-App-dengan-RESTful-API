class ArchivedNote extends HTMLElement {
  static observedAttributes = 'data-archived-note-container';

  constructor() {
    super();
    this._dataArchivedNoteContainer = this.getAttribute(
      'data-archived-note-container',
    );
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
       <div class="container" id="archivedNoteList"></div>
        `;
  }
}

customElements.define('archived-note-component', ArchivedNote);
