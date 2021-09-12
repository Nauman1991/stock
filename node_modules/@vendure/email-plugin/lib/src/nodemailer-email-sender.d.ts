/// <reference types="node" />
import { Stream } from 'stream';
import { EmailDetails, EmailSender, EmailTransportOptions } from './types';
export declare type StreamTransportInfo = {
    envelope: {
        from: string;
        to: string[];
    };
    messageId: string;
    message: Stream;
};
/**
 * @description
 * Uses the configured transport to send the generated email.
 *
 * @docsCategory EmailPlugin
 * @docsPage EmailSender
 */
export declare class NodemailerEmailSender implements EmailSender {
    private _smtpTransport;
    private _sendMailTransport;
    send(email: EmailDetails, options: EmailTransportOptions): Promise<undefined>;
    private getSmtpTransport;
    private getSendMailTransport;
    private sendMail;
    private sendFileJson;
    private sendFileRaw;
    private writeStreamToFile;
    /**
     * Adapts the VendureLogger to work with the bunyan-compatible logger format
     * used by Nodemailer.
     */
    private createLogger;
}
