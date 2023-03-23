export class Dialog extends HTMLElement {
  private static readonly props = ['size'];
  private static readonly componentName = 'x-dialog';

  constructor () {
    super();
    (async () => {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot!.innerHTML = await this.getComponent();
    })()
  }

  public static mountOnWindow() {
    window.customElements.define(this.componentName, Dialog)
  }

  // Define the component properties to observe
  static get observedAttributes() {
    return this.props;
  }

  // Callback to observe properties
  public async attributeChangedCallback(name: string, _: string | null, newValue: string | null) {
    while (true) {
      await new Promise(r => setTimeout(() => r(0), 10))
      const $prop = this.shadowRoot!.querySelector<HTMLElement>(`#${name}`);

      if ($prop) {
        $prop.style.maxWidth = newValue ?? '350px';
        break;
      };
    }
  }

  private async getComponent(): Promise<string> {
    const { default: html } = await import('./dialog.html?raw');
    const { default: css } = await import('./dialog.css?raw');

    return `
      <link rel="stylesheet" href="/src/global.css" />
      <style>${css}</style>${html}
    `
  }
}