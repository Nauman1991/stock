import { EmailGenerator, EmailPluginDevModeOptions, EmailPluginOptions } from './types';
/**
 * @description
 * Uses Handlebars (https://handlebarsjs.com/) to output MJML (https://mjml.io) which is then
 * compiled down to responsive email HTML.
 *
 * @docsCategory EmailPlugin
 * @docsPage EmailGenerator
 */
export declare class HandlebarsMjmlGenerator implements EmailGenerator {
    onInit(options: EmailPluginOptions | EmailPluginDevModeOptions): void;
    generate(from: string, subject: string, template: string, templateVars: any): {
        from: string;
        subject: string;
        body: string;
    };
    private registerPartials;
    private registerHelpers;
}
