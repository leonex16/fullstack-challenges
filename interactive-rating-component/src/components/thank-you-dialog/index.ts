export class ThankYouDialog extends HTMLElement {
  private static readonly componentName = 'x-thank-you-dialog';
  private readonly RATING_VALUES = ['1', '2', '3', '4', '5'];

  constructor () {
    super();
    (async () => {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot!.innerHTML = await this.getComponent();
    })()
  }

  public static mountOnWindow() {
    window.customElements.define(this.componentName, ThankYouDialog)
  }

  // Mount the component
  public async connectedCallback() {
    await new Promise(r => setTimeout(() => r(0), 50))
    this.updateRatingResult();
  }

  private async getComponent(): Promise<string> {
    const { default: html } = await import('./thank-you-dialog.html?raw');
    const { default: css } = await import('./thank-you-dialog.css?raw');

    return `
      <link rel="stylesheet" href="/src/global.css" />
      <style>${css}</style>${html}
    `
  }

  private updateRatingResult() {
    const url = new URL(window.location.href);
    const rating = url.searchParams.get('rating') ?? '1';
    const $result = this.shadowRoot!.querySelector('#rating-sent') as HTMLSpanElement;
    
    $result.textContent = this.RATING_VALUES.includes(rating) ? rating : '1';
  }
}