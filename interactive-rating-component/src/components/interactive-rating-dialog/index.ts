export class InteractiveRatingDialog extends HTMLElement {
  private static readonly props = ['title', 'content'];
  private static readonly componentName = 'x-interactive-rating-dialog';

  constructor () {
    super();
    (async () => {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot!.innerHTML = await this.getComponent();
    })()
  }

  public static mountOnWindow() {
    window.customElements.define(this.componentName, InteractiveRatingDialog)
  }

  // Mount the component
  public async connectedCallback() {
    await new Promise(r => setTimeout(() => r(0), 50))
    this.addListenerToRatingButtons();
  }

  // Define the component properties to observe
  static get observedAttributes() {
    return this.props;
  }

  // Callback to observe properties
  public async attributeChangedCallback(name: string, _: string | null, newValue: string | null) {
    while (true) {
      await new Promise(r => setTimeout(() => r(0), 10))
      const $prop = this.shadowRoot!.querySelector(`#${name}`);

      if ($prop) {
        $prop.textContent = newValue;
        break;
      };
    }
  }

  private async getComponent(): Promise<string> {
    const { default: html } = await import('./interactive-rating-dialog.html?raw');
    const { default: css } = await import('./interactive-rating-dialog.css?raw');

    return `
      <link rel="stylesheet" href="/src/global.css" />
      <style>${css}</style>${html}
    `
  }

  private addListenerToRatingButtons(): void {
    const UNSELECTED = -1;
    const ratingButtons = this.shadowRoot?.querySelectorAll('.dialog__rating');
    const ratingInput = this.shadowRoot?.querySelector('#rating') as HTMLInputElement;
    let selectedRatingIndex = UNSELECTED;

    function updateRating() {
      ratingInput.value = `${selectedRatingIndex === UNSELECTED ? UNSELECTED : (selectedRatingIndex + 1)}`;
      ratingButtons?.forEach((button, index) => {
        button.classList.toggle('dialog__rating--active', selectedRatingIndex === index);
      });
    }

    ratingButtons?.forEach(($button, index) => {
      $button.addEventListener('click', () => {
        selectedRatingIndex = selectedRatingIndex === index ? UNSELECTED : index;
        updateRating();
      });
    });
  }
}