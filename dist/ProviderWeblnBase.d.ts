import { IInjectedProviderNames } from '@chargerwallet/cross-inpage-provider-types';
import { ProviderBase, IInpageProviderConfig } from '@chargerwallet/cross-inpage-provider-core';
declare class ProviderWeblnBase extends ProviderBase {
    constructor(props: IInpageProviderConfig);
    protected readonly providerName = IInjectedProviderNames.webln;
    request(data: unknown): Promise<unknown>;
}
export { ProviderWeblnBase };
