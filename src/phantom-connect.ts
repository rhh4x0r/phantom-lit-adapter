 import {LitElement, html, css} from 'lit';
 import {customElement, property, state} from 'lit/decorators.js';
 
 /**
  * Signs.
  *
  * @fires count-changed - Indicates when the count changes
  * @slot - This element has a slot
  * @csspart button - The button
  */
 @customElement('phantom-connect')
 export class PhantomConnect extends LitElement {

   static override styles = css`
     :host {
       display: block;
       border: solid 1px gray;
       padding: 16px;
       max-width: 800px;
     }
   `;

   @state()
   private status = "loading";

   @state()
   publicKey = "loading";
 
    @property()
    provider = "null";
 
  

  override connectedCallback(): void {
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

  private async getWalletStatus() {
    this.getProvider();

    await window.solana.connect().then( ({ publicKey }) => {
      this.publicKey = publicKey.toString();
      this.status = "connected";
      console.log('connected to: ', this.publicKey);
    });

  }
   

   override render() {
    
     return html`
       <h1>Connect to your Phantom Wallet.</h1>

       ${this.status == "connected"?
        html`<button @click=${this._onClickDisconnect} part="button">
                Disconnect
              </button>`:
        html`<button @click=${this._onClickConnect} part="button">
                Connect
             </button>`}

       <p>Phantom Wallet Detected: ${this.provider.isPhantom}</p>
       <p>Status: ${this.status} </p>
       <p>Public Address: ${this.publicKey} </p>
     `;
   }

  private getProvider () {
     if ("solana" in window) {
       const provider = window.solana;
       console.log(provider);
       if (provider.isPhantom) {
         this.provider = provider;
       } else {
        window.open("https://phantom.app/", "_blank");
       }
     }
   }
 
  private async _onClickConnect() {
    await window.solana.connect();
  }

   private async _onClickDisconnect() {
    await window.solana.disconnect();
  }

 }
 
 declare global {
   interface HTMLElementTagNameMap {
     'phantom-connect': PhantomConnect;
   }
 }
 