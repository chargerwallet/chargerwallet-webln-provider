import { IJsonRpcRequest } from '@chargerwallet/cross-inpage-provider-types';
import { ProviderWeblnBase } from './ProviderWeblnBase';
import type * as TypeUtils from './type-utils';
export interface RequestArguments {
    id?: number | string;
    method: string;
    params?: unknown[] | Record<string, unknown>;
}
export interface EnableResponse {
    enabled: boolean;
}
export interface GetInfoResponse {
    node: {
        alias: string;
        pubkey: string;
        color?: string;
    };
    methods: string[];
}
export interface RequestInvoiceArgs {
    amount?: string | number;
    defaultAmount?: string | number;
    minimumAmount?: string | number;
    maximumAmount?: string | number;
    defaultMemo?: string;
}
interface SendPaymentResponse {
    preimage: string;
}
export interface RequestInvoiceResponse {
    paymentRequest: string;
    paymentHash: string;
    rHash: string;
}
export interface SignMessageResponse {
    message: string;
    signature: string;
}
export interface VerifyMessageArgs {
    signature: string;
    message: string;
}
export type LNURLResponse = {
    status: "OK";
    data?: unknown;
} | {
    status: "ERROR";
    reason: string;
};
export type BalanceResponse = {
    balance: number;
    currency?: "sats" | "EUR" | "USD";
};
export type IProviderWebln = ProviderWeblnBase & Omit<WeblnRequeset, 'enable' | 'verifyMessage'> & {
    enable: () => Promise<void>;
    verifyMessage: (signature: string, message: string) => Promise<void>;
};
export type WeblnRequeset = {
    enable: () => Promise<EnableResponse>;
    getInfo: () => Promise<GetInfoResponse>;
    makeInvoice: (args: RequestInvoiceArgs) => Promise<RequestInvoiceResponse>;
    sendPayment: (paymentRequest: string) => Promise<SendPaymentResponse>;
    signMessage: (message: string) => Promise<SignMessageResponse>;
    verifyMessage: (args: VerifyMessageArgs) => Promise<void>;
    lnurl: (lnurl: string) => Promise<LNURLResponse>;
    getBalance: () => Promise<BalanceResponse>;
};
export type JsBridgeRequest = {
    [K in keyof WeblnRequeset]: (params: Parameters<WeblnRequeset[K]>[0]) => Promise<TypeUtils.WireStringified<TypeUtils.ResolvePromise<ReturnType<WeblnRequeset[K]>>>>;
};
export type JsBridgeRequestParams<T extends keyof JsBridgeRequest> = Parameters<JsBridgeRequest[T]>[0];
export type JsBridgeRequestResponse<T extends keyof JsBridgeRequest> = ReturnType<JsBridgeRequest[T]>;
declare const PROVIDER_EVENTS: {
    readonly connect: "connect";
    readonly disconnect: "disconnect";
    readonly accountChanged: "accountChanged";
    readonly message_low_level: "message_low_level";
};
export type WeblnProviderEventsMap = {
    [PROVIDER_EVENTS.connect]: (account: string) => void;
    [PROVIDER_EVENTS.disconnect]: () => void;
    [PROVIDER_EVENTS.accountChanged]: (account: string | null) => void;
    [PROVIDER_EVENTS.message_low_level]: (payload: IJsonRpcRequest) => void;
};
export {};
