/**
 * Loads email templates according to the configured TemplateConfig values.
 */
export declare class TemplateLoader {
    private templatePath;
    constructor(templatePath: string);
    loadTemplate(type: string, templateFileName: string): Promise<string>;
}
