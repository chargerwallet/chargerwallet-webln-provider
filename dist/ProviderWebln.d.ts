import { IInpageProviderConfig } from "@chargerwallet/cross-inpage-provider-core";
import { ProviderWeblnBase } from "./ProviderWeblnBase";
import { WeblnProviderEventsMap, GetInfoResponse, IProviderWebln, RequestInvoiceArgs, RequestInvoiceResponse } from "./types";
declare class ProviderWebln extends ProviderWeblnBase implements IProviderWebln {
    private states;
    constructor(props: IInpageProviderConfig);
    setExecuting(executing: boolean): void;
    private checkEnabled;
    on<E extends keyof WeblnProviderEventsMap>(event: E, listener: WeblnProviderEventsMap[E]): this;
    emit<E extends keyof WeblnProviderEventsMap>(event: E, ...args: Parameters<WeblnProviderEventsMap[E]>): boolean;
    private _callBridge;
    enable(): Promise<void>;
    getInfo(): Promise<GetInfoResponse>;
    makeInvoice(args: RequestInvoiceArgs): Promise<RequestInvoiceResponse>;
    sendPayment(paymentRequest: string): Promise<{
        preimage: string;
    }>;
    signMessage(message: string): Promise<{
        message: string;
        signature: string;
    }>;
    verifyMessage(signature: string, message: string): Promise<void>;
    getBalance(): Promise<{
        balance: number;
        currency?: "sats" | "EUR" | "USD" | undefined;
    }>;
    lnurl(lnurlString: string): Promise<{
        status: "OK";
        data?: unknown;
    } | {
        status: "ERROR";
        reason: string;
    }>;
    handlerLnurl(): void;
}
export { ProviderWebln };
