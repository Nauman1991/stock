"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAssetUrlPrefixFn = void 0;
const constants_1 = require("@vendure/core/dist/common/constants");
function getAssetUrlPrefixFn(options) {
    const { assetUrlPrefix, route } = options;
    if (assetUrlPrefix == null) {
        return (request, identifier) => `${request.protocol}://${request.get('host')}/${route}/`;
    }
    if (typeof assetUrlPrefix === 'string') {
        return (...args) => assetUrlPrefix;
    }
    if (typeof assetUrlPrefix === 'function') {
        return (request, identifier) => {
            const ctx = request[constants_1.REQUEST_CONTEXT_KEY];
            return assetUrlPrefix(ctx, identifier);
        };
    }
    throw new Error(`The assetUrlPrefix option was of an unexpected type: ${JSON.stringify(assetUrlPrefix)}`);
}
exports.getAssetUrlPrefixFn = getAssetUrlPrefixFn;
//# sourceMappingURL=common.js.map