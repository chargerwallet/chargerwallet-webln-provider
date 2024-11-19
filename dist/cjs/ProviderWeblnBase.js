"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderWeblnBase = void 0;
const cross_inpage_provider_types_1 = require("@chargerwallet/cross-inpage-provider-types");
const cross_inpage_provider_core_1 = require("@chargerwallet/cross-inpage-provider-core");
class ProviderWeblnBase extends cross_inpage_provider_core_1.ProviderBase {
    constructor(props) {
        super(props);
        this.providerName = cross_inpage_provider_types_1.IInjectedProviderNames.webln;
    }
    request(data) {
        return this.bridgeRequest(data);
    }
}
exports.ProviderWeblnBase = ProviderWeblnBase;
