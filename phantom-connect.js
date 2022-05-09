var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
/**
 * Signs.
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - This element has a slot
 * @csspart button - The button
 */
let PhantomConnect = class PhantomConnect extends LitElement {
    constructor() {
        super(...arguments);
        this.status = "loading";
        this.publicKey = "loading";
        this.provider = "null";
    }
    connectedCallback() {
        super.connectedCallback();
        this.getWalletStatus();
        window.solana.on('connect', (publicKey) => {
            console.log("Wallet Connected!");
            this.status = "connected";
            this.publicKey = publicKey.toString();
        });
        window.solana.on('disconnect', () => {
            console.log("Wallet Disconnected!");
            this.status = "disconnected";
            this.publicKey = "disconnected";
        });
    }
    async getWalletStatus() {
        this.getProvider();
        await window.solana.connect().then(({ publicKey }) => {
            this.publicKey = publicKey.toString();
            this.status = "connected";
            console.log('connected to: ', this.publicKey);
        });
    }
    render() {
        return html `
       <h1>Connect to your Phantom Wallet.</h1>

       ${this.status == "connected" ?
            html `<button @click=${this._onClickDisconnect} part="button">
                Disconnect
              </button>` :
            html `<button @click=${this._onClickConnect} part="button">
                Connect
             </button>`}

       <p>Phantom Wallet Detected: ${this.provider.isPhantom}</p>
       <p>Status: ${this.status} </p>
       <p>Public Address: ${this.publicKey} </p>
     `;
    }
    getProvider() {
        if ("solana" in window) {
            const provider = window.solana;
            console.log(provider);
            if (provider.isPhantom) {
                this.provider = provider;
            }
            else {
                window.open("https://phantom.app/", "_blank");
            }
        }
    }
    async _onClickConnect() {
        await window.solana.connect();
    }
    async _onClickDisconnect() {
        await window.solana.disconnect();
    }
};
PhantomConnect.styles = css `
     :host {
       display: block;
       border: solid 1px gray;
       padding: 16px;
       max-width: 800px;
     }
   `;
__decorate([
    state()
], PhantomConnect.prototype, "status", void 0);
__decorate([
    state()
], PhantomConnect.prototype, "publicKey", void 0);
__decorate([
    property()
], PhantomConnect.prototype, "provider", void 0);
PhantomConnect = __decorate([
    customElement('phantom-connect')
], PhantomConnect);
export { PhantomConnect };
//# sourceMappingURL=phantom-connect.js.map