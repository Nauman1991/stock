"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unique = void 0;
/**
 * Returns an array with only unique values. Objects are compared by reference,
 * unless the `byKey` argument is supplied, in which case matching properties will
 * be used to check duplicates
 */
function unique(arr, byKey) {
    return arr.filter((item, index, self) => {
        return (index ===
            self.findIndex(i => {
                if (byKey === undefined) {
                    return i === item;
                }
                else {
                    return i[byKey] === item[byKey];
                }
            }));
    });
}
exports.unique = unique;
//# sourceMappingURL=unique.js.map