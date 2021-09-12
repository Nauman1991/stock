"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractSessionToken = void 0;
/**
 * Get the session token from either the cookie or the Authorization header, depending
 * on the configured tokenMethod.
 */
function extractSessionToken(req, tokenMethod) {
    if (tokenMethod === 'cookie') {
        if (req.session && req.session.token) {
            return req.session.token;
        }
    }
    else {
        const authHeader = req.get('Authorization');
        if (authHeader) {
            const matches = authHeader.match(/bearer\s+(.+)$/i);
            if (matches) {
                return matches[1];
            }
        }
    }
}
exports.extractSessionToken = extractSessionToken;
//# sourceMappingURL=extract-session-token.js.map