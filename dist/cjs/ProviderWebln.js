"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderWebln = void 0;
const ProviderWeblnBase_1 = require("./ProviderWeblnBase");
class ProviderWebln extends ProviderWeblnBase_1.ProviderWeblnBase {
    constructor(props) {
        super(props);
        this.states = {
            enabled: false,
            executing: false
        };
        this.handlerLnurl();
    }
    setExecuting(executing) {
        this.states.executing = executing;
    }
    checkEnabled(method) {
        if (!this.states.enabled) {
            const message = `Please allow the connection request of webln before calling the ${method} method`;
            alert(message);
            throw new Error(message);
        }
        if (this.states.executing) {
            const message = `window.webln call already executing`;
            alert(message);
            throw new Error(message);
        }
    }
    on(event, listener) {
        return super.on(event, listener);
    }
    emit(event, ...args) {
        return super.emit(event, ...args);
    }
    _callBridge(params) {
        return this.bridgeRequest(params);
    }
    enable() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.states.enabled) {
                return;
            }
            if (this.states.executing) {
                const message = `window.webln call already executing`;
                alert(message);
                throw new Error(message);
            }
            try {
                this.setExecuting(true);
                const result = yield this._callBridge({ method: "enable" });
                if (typeof result.enabled === "boolean") {
                    this.states.enabled = true;
                }
            }
            finally {
                this.setExecuting(false);
            }
        });
    }
    getInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            this.checkEnabled('getInfo');
            try {
                this.setExecuting(true);
                const response = yield this._callBridge({ method: "getInfo" });
                return response;
            }
            finally {
                this.setExecuting(false);
            }
        });
    }
    makeInvoice(args) {
        return __awaiter(this, void 0, void 0, function* () {
            this.checkEnabled('makeInvoice');
            try {
                this.setExecuting(true);
                const response = yield this._callBridge({ method: "makeInvoice", params: args });
                return response;
            }
            finally {
                this.setExecuting(false);
            }
        });
    }
    sendPayment(paymentRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            this.checkEnabled('sendPayment');
            try {
                this.setExecuting(true);
                const response = yield this._callBridge({ method: "sendPayment", params: paymentRequest });
                return response;
            }
            finally {
                this.setExecuting(false);
            }
        });
    }
    signMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            this.checkEnabled('signMessage');
            try {
                this.setExecuting(true);
                const response = yield this._callBridge({ method: "signMessage", params: message });
                return response;
            }
            finally {
                this.setExecuting(false);
            }
        });
    }
    verifyMessage(signature, message) {
        return __awaiter(this, void 0, void 0, function* () {
            this.checkEnabled('verifyMessage');
            try {
                this.setExecuting(true);
                const response = yield this._callBridge({
                    method: "verifyMessage",
                    params: { signature, message },
                });
                return response;
            }
            finally {
                this.setExecuting(false);
            }
        });
    }
    getBalance() {
        if (!this.states.enabled) {
            throw new Error("Please allow the connection request of webln before calling the getBalance method");
        }
        return this._callBridge({ method: "getBalance", params: undefined });
    }
    lnurl(lnurlString) {
        return __awaiter(this, void 0, void 0, function* () {
            this.checkEnabled('lnurl');
            try {
                this.setExecuting(true);
                const response = yield this._callBridge({ method: "lnurl", params: lnurlString });
                return response;
            }
            finally {
                this.setExecuting(false);
            }
        });
    }
    handlerLnurl() {
        if (document) {
            window.addEventListener("click", (ev) => {
                var _a, _b, _c, _d, _e;
                const target = ev.composedPath()[0];
                if (!target || !target.closest) {
                    return;
                }
                const lightningLink = target.closest('[href^="lightning:" i]');
                const lnurlLink = target.closest('[href^="lnurl" i]');
                const bitcoinLinkWithLighting = target.closest('[href*="lightning=ln" i]');
                let href;
                let paymentRequest;
                let lnurl;
                if (!lightningLink && !bitcoinLinkWithLighting && !lnurlLink) {
                    return;
                }
                ev.preventDefault();
                if (lightningLink) {
                    href = (_a = lightningLink.getAttribute("href")) === null || _a === void 0 ? void 0 : _a.toLowerCase();
                    paymentRequest = href === null || href === void 0 ? void 0 : href.replace("lightning:", "");
                }
                else if (bitcoinLinkWithLighting) {
                    href = (_b = bitcoinLinkWithLighting.getAttribute("href")) === null || _b === void 0 ? void 0 : _b.toLowerCase();
                    const url = new URL(href !== null && href !== void 0 ? href : "");
                    const query = new URLSearchParams(url.search);
                    paymentRequest = query.get("lightning");
                }
                else if (lnurlLink) {
                    href = (_c = lnurlLink.getAttribute("href")) === null || _c === void 0 ? void 0 : _c.toLowerCase();
                    lnurl = href === null || href === void 0 ? void 0 : href.replace(/^lnurl[pwc]:/i, "");
                }
                if (!paymentRequest && !lnurl) {
                    return;
                }
                if (paymentRequest && paymentRequest.startsWith("lnurl")) {
                    lnurl = paymentRequest.replace(/^lnurl[pwc]:/i, "");
                }
                if (paymentRequest && paymentRequest.match(/(\S+@\S+)/)) {
                    lnurl = (_e = (_d = paymentRequest.match) === null || _d === void 0 ? void 0 : _d.call(paymentRequest, /(\S+@\S+)/)) === null || _e === void 0 ? void 0 : _e[1];
                }
                window.webln.enable().then(() => {
                    if (lnurl) {
                        return window.webln.lnurl(lnurl);
                    }
                    if (paymentRequest) {
                        return window.webln.sendPayment(paymentRequest);
                    }
                });
            }, { capture: true });
        }
    }
}
exports.ProviderWebln = ProviderWebln;
