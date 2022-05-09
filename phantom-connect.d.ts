import { LitElement } from 'lit';
/**
 * Signs.
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - This element has a slot
 * @csspart button - The button
 */
export declare class PhantomConnect extends LitElement {
    static styles: import("lit").CSSResult;
    private status;
    publicKey: string;
    provider: string;
    connectedCallback(): void;
    private getWalletStatus;
    render(): import("lit-html").TemplateResult<1>;
    private getProvider;
    private _onClickConnect;
    private _onClickDisconnect;
}
declare global {
    interface HTMLElementTagNameMap {
        'phantom-connect': PhantomConnect;
    }
}
//# sourceMappingURL=phantom-connect.d.ts.map