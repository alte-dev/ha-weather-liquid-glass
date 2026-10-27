import { html, LitElement, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('ios27-highlights')
export class Ios27Highlights extends LitElement {
  @property() public title: string = 'Highlights';
  @property() public message: string = '';

  protected createRenderRoot() {
    return this;
  }

  public render(): TemplateResult {
    if (!this.message) return html``;

    return html`
      <div class="ios-highlights-card">
        <div class="ios-highlights-header">
          <div class="ios-highlights-title-left">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15 13V5a3 3 0 0 0-6 0v8a5 5 0 1 0 6 0zm-3-10a1 1 0 0 1 1 1v4h-2V4a1 1 0 0 1 1-1z" />
            </svg>
            <span>${this.title}</span>
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" opacity="0.8">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
          </svg>
        </div>
        <div class="ios-highlights-body">
          ${this.message}
        </div>
      </div>
    `;
  }
}
