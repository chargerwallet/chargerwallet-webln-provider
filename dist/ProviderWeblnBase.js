import { IInjectedProviderNames } from '@chargerwallet/cross-inpage-provider-types';
import { ProviderBase } from '@chargerwallet/cross-inpage-provider-core';
class ProviderWeblnBase extends ProviderBase {
    constructor(props) {
        super(props);
        this.providerName = IInjectedProviderNames.webln;
    }
    request(data) {
        return this.bridgeRequest(data);
    }
}
export { ProviderWeblnBase };
