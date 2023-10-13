export class MainFooter extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback () {
    this.innerHTML = `
      <footer class="footer">
        <div class="content has-text-centered">
          <p>
            <strong>Copyright © 2018 - 2023 · All rights reserved</strong>
        </div>
      </footer>
    `
  }
}