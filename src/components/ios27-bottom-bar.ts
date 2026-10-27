import { html, LitElement, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('ios27-bottom-bar')
export class Ios27BottomBar extends LitElement {
  @property({ type: Number }) public totalLocations: number = 1;
  @property({ type: Number }) public activeIndex: number = 0;

  protected createRenderRoot() {
    return this;
  }

  public render(): TemplateResult {
    const total = this.totalLocations;
    if (total <= 1) {
      return html``;
    }

    const active = Math.min(Math.max(0, this.activeIndex), total - 1);

    return html`
      <div class="ios-bottom-bar">
        <!-- Map button -->
        <button
          class="ios-bottom-btn"
          title="Open Weather Map"
          @click=${this.onMapClick}
        >
          <svg viewBox="0 0 24 24">
            <path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z" />
          </svg>
        </button>

        <!-- Pager Dots Pill (Interactive Multi-Location Switcher) -->
        <div class="ios-pager-pill" title="Konum Değiştir / Sağa-Sola Kaydır">
          <!-- Primary Location: Location Arrow -->
          <svg
            class="ios-pager-arrow ${active === 0 ? 'active' : ''}"
            viewBox="0 0 24 24"
            title="Konum 1 (Ana Konum)"
            @click=${(e: Event) => this.onDotClick(e, 0)}
          >
            <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
          </svg>

          <!-- Extra Locations: Dots -->
          ${Array.from({ length: total - 1 }).map((_, i) => {
            const locIdx = i + 1;
            return html`
              <div
                class="ios-pager-dot ${active === locIdx ? 'active' : ''}"
                title="Konum ${locIdx + 1}"
                @click=${(e: Event) => this.onDotClick(e, locIdx)}
              ></div>
            `;
          })}
        </div>

        <!-- Menu / List button -->
        <button
          class="ios-bottom-btn"
          title="Şehirler ve Konumlar Listesi"
          @click=${this.onListClick}
        >
          <svg viewBox="0 0 24 24">
            <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" />
          </svg>
        </button>
      </div>
    `;
  }

  private onDotClick(e: Event, index: number) {
    e.stopPropagation();
    this.dispatchEvent(
      new CustomEvent('location-select', {
        bubbles: true,
        composed: true,
        detail: { index },
      })
    );
  }

  private onMapClick(e: Event) {
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent('map-click', { bubbles: true, composed: true }));
  }

  private onListClick(e: Event) {
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent('list-click', { bubbles: true, composed: true }));
  }
}
