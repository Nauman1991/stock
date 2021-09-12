"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateLoader = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
/**
 * Loads email templates according to the configured TemplateConfig values.
 */
class TemplateLoader {
    constructor(templatePath) {
        this.templatePath = templatePath;
    }
    async loadTemplate(type, templateFileName) {
        // TODO: logic to select other files based on channel / language
        const templatePath = path_1.default.join(this.templatePath, type, templateFileName);
        const body = await fs_extra_1.default.readFile(templatePath, 'utf-8');
        return body;
    }
}
exports.TemplateLoader = TemplateLoader;
//# sourceMappingURL=template-loader.js.map