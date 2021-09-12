"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandlebarsMjmlGenerator = void 0;
const dateformat_1 = __importDefault(require("dateformat"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const handlebars_1 = __importDefault(require("handlebars"));
const mjml_1 = __importDefault(require("mjml"));
const path_1 = __importDefault(require("path"));
/**
 * @description
 * Uses Handlebars (https://handlebarsjs.com/) to output MJML (https://mjml.io) which is then
 * compiled down to responsive email HTML.
 *
 * @docsCategory EmailPlugin
 * @docsPage EmailGenerator
 */
class HandlebarsMjmlGenerator {
    onInit(options) {
        const partialsPath = path_1.default.join(options.templatePath, 'partials');
        this.registerPartials(partialsPath);
        this.registerHelpers();
    }
    generate(from, subject, template, templateVars) {
        const compiledFrom = handlebars_1.default.compile(from, { noEscape: true });
        const compiledSubject = handlebars_1.default.compile(subject);
        const compiledTemplate = handlebars_1.default.compile(template);
        // We enable prototype properties here, aware of the security implications
        // described here: https://handlebarsjs.com/api-reference/runtime-options.html#options-to-control-prototype-access
        // This is needed because some Vendure entities use getters on the entity
        // prototype (e.g. Order.total) which may need to be interpolated.
        const templateOptions = { allowProtoPropertiesByDefault: true };
        const fromResult = compiledFrom(templateVars, { allowProtoPropertiesByDefault: true });
        const subjectResult = compiledSubject(templateVars, { allowProtoPropertiesByDefault: true });
        const mjml = compiledTemplate(templateVars, { allowProtoPropertiesByDefault: true });
        const body = mjml_1.default(mjml).html;
        return { from: fromResult, subject: subjectResult, body };
    }
    registerPartials(partialsPath) {
        const partialsFiles = fs_extra_1.default.readdirSync(partialsPath);
        for (const partialFile of partialsFiles) {
            const partialContent = fs_extra_1.default.readFileSync(path_1.default.join(partialsPath, partialFile), 'utf-8');
            handlebars_1.default.registerPartial(path_1.default.basename(partialFile, '.hbs'), partialContent);
        }
    }
    registerHelpers() {
        handlebars_1.default.registerHelper('formatDate', (date, format) => {
            if (!date) {
                return date;
            }
            if (typeof format !== 'string') {
                format = 'default';
            }
            return dateformat_1.default(date, format);
        });
        handlebars_1.default.registerHelper('formatMoney', (amount) => {
            if (amount == null) {
                return amount;
            }
            return (amount / 100).toFixed(2);
        });
    }
}
exports.HandlebarsMjmlGenerator = HandlebarsMjmlGenerator;
//# sourceMappingURL=handlebars-mjml-generator.js.map