import { AccountRegistrationEvent, IdentifierChangeRequestEvent, OrderStateTransitionEvent, PasswordResetEvent, ShippingMethod } from '@vendure/core';
import { EmailEventHandler } from './event-handler';
export declare const orderConfirmationHandler: EmailEventHandler<"order-confirmation", import("./types").EventWithAsyncData<OrderStateTransitionEvent, {
    shippingMethods: ShippingMethod[];
}>>;
export declare const emailVerificationHandler: EmailEventHandler<"email-verification", AccountRegistrationEvent>;
export declare const passwordResetHandler: EmailEventHandler<"password-reset", PasswordResetEvent>;
export declare const emailAddressChangeHandler: EmailEventHandler<"email-address-change", IdentifierChangeRequestEvent>;
export declare const defaultEmailHandlers: Array<EmailEventHandler<any, any>>;
