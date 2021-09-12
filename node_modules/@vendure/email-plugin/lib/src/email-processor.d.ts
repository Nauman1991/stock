import { TemplateLoader } from './template-loader';
import { EmailGenerator, EmailPluginOptions, EmailSender, EmailTransportOptions, IntermediateEmailDetails } from './types';
/**
 * This class combines the template loading, generation, and email sending - the actual "work" of
 * the EmailPlugin. It is arranged this way primarily to accommodate easier testing, so that the
 * tests can be run without needing all the JobQueue stuff which would require a full e2e test.
 */
export declare class EmailProcessor {
    protected options: EmailPluginOptions;
    protected templateLoader: TemplateLoader;
    protected emailSender: EmailSender;
    protected generator: EmailGenerator;
    protected transport: EmailTransportOptions;
    constructor(options: EmailPluginOptions);
    init(): Promise<void>;
    process(data: IntermediateEmailDetails): Promise<boolean>;
}
