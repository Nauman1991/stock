"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultEmailHandlers = exports.emailAddressChangeHandler = exports.passwordResetHandler = exports.emailVerificationHandler = exports.orderConfirmationHandler = void 0;
/* tslint:disable:no-non-null-assertion */
const core_1 = require("@vendure/core");
const event_listener_1 = require("./event-listener");
const mock_events_1 = require("./mock-events");
exports.orderConfirmationHandler = new event_listener_1.EmailEventListener('order-confirmation')
    .on(core_1.OrderStateTransitionEvent)
    .filter(event => event.toState === 'PaymentSettled' && event.fromState !== 'Modifying' && !!event.order.customer)
    .loadData(async (context) => {
    const shippingMethods = [];
    for (const line of context.event.order.shippingLines || []) {
        let shippingMethod;
        if (!line.shippingMethod && line.shippingMethodId) {
            shippingMethod = await context.injector
                .get(core_1.TransactionalConnection)
                .getRepository(core_1.ShippingMethod)
                .findOne(line.shippingMethodId);
        }
        else if (line.shippingMethod) {
            shippingMethod = line.shippingMethod;
        }
        if (shippingMethod) {
            shippingMethods.push(shippingMethod);
        }
    }
    return { shippingMethods };
})
    .setRecipient(event => event.order.customer.emailAddress)
    .setFrom(`{{ fromAddress }}`)
    .setSubject(`Order confirmation for #{{ order.code }}`)
    .setTemplateVars(event => ({ order: event.order, shippingMethods: event.data.shippingMethods }))
    .setMockEvent(mock_events_1.mockOrderStateTransitionEvent);
exports.emailVerificationHandler = new event_listener_1.EmailEventListener('email-verification')
    .on(core_1.AccountRegistrationEvent)
    .filter(event => !!event.user.getNativeAuthenticationMethod().identifier)
    .filter(event => {
    const nativeAuthMethod = event.user.authenticationMethods.find(m => m instanceof core_1.NativeAuthenticationMethod);
    return (nativeAuthMethod && !!nativeAuthMethod.identifier) || false;
})
    .setRecipient(event => event.user.identifier)
    .setFrom(`{{ fromAddress }}`)
    .setSubject(`Please verify your email address`)
    .setTemplateVars(event => ({
    verificationToken: event.user.getNativeAuthenticationMethod().verificationToken,
}))
    .setMockEvent(mock_events_1.mockAccountRegistrationEvent);
exports.passwordResetHandler = new event_listener_1.EmailEventListener('password-reset')
    .on(core_1.PasswordResetEvent)
    .setRecipient(event => event.user.identifier)
    .setFrom(`{{ fromAddress }}`)
    .setSubject(`Forgotten password reset`)
    .setTemplateVars(event => ({
    passwordResetToken: event.user.getNativeAuthenticationMethod().passwordResetToken,
}))
    .setMockEvent(mock_events_1.mockPasswordResetEvent);
exports.emailAddressChangeHandler = new event_listener_1.EmailEventListener('email-address-change')
    .on(core_1.IdentifierChangeRequestEvent)
    .setRecipient(event => event.user.getNativeAuthenticationMethod().pendingIdentifier)
    .setFrom(`{{ fromAddress }}`)
    .setSubject(`Please verify your change of email address`)
    .setTemplateVars(event => ({
    identifierChangeToken: event.user.getNativeAuthenticationMethod().identifierChangeToken,
}))
    .setMockEvent(mock_events_1.mockEmailAddressChangeEvent);
exports.defaultEmailHandlers = [
    exports.orderConfirmationHandler,
    exports.emailVerificationHandler,
    exports.passwordResetHandler,
    exports.emailAddressChangeHandler,
];
//# sourceMappingURL=default-email-handlers.js.map