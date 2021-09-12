import { EmailGenerator } from './types';
/**
 * Simply passes through the subject and template content without modification.
 */
export declare class NoopEmailGenerator implements EmailGenerator {
    generate(from: string, subject: string, body: string, templateVars: any): {
        from: string;
        subject: string;
        body: string;
    };
}
