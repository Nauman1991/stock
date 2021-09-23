import {
    dummyPaymentHandler,
    DefaultJobQueuePlugin,
    DefaultSearchPlugin,
    VendureConfig,
} from '@vendure/core';

import { defaultEmailHandlers, EmailPlugin } from '@vendure/email-plugin';
import { AssetServerPlugin } from '@vendure/asset-server-plugin';
import { AdminUiPlugin } from '@vendure/admin-ui-plugin';
import { compileUiExtensions } from '@vendure/ui-devkit/compiler';
import { ManualOrderController } from './manualOrder.controller';

import path from 'path';

export const config: VendureConfig = {
    apiOptions: {
        port: 4200,
        adminApiPath: 'admin-api',
        adminApiPlayground: {
            settings: {
                'request.credentials': 'include',
            } as any,
        },// turn this off for production
        adminApiDebug: true, // turn this off for production
        shopApiPath: 'shop-api',
        shopApiPlayground: {
            settings: {
                'request.credentials': 'include',
            } as any,
        },// turn this off for production
        shopApiDebug: true,// turn this off for production
    },
    authOptions: {
        superadminCredentials: {
            identifier: 'superadmin',
            password: 'superadmin',
        }
    },
    dbConnectionOptions: {
        type: 'mysql',
        synchronize: false, // turn this off for production
        logging: false,
        database: 'stock',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '@stock!@#$%'
        // migrations: [path.join(__dirname, '../migrations/*.ts')],
    },
    paymentOptions: {
        paymentMethodHandlers: [dummyPaymentHandler],
    },
    customFields: {},
    plugins: [
        AssetServerPlugin.init({
            route: 'assets',
            assetUploadDir: path.join(__dirname, '../static/assets'),
        }),
        DefaultJobQueuePlugin,
        DefaultSearchPlugin,
        ManualOrderController,
        EmailPlugin.init({
            devMode: true,
            outputPath: path.join(__dirname, '../static/email/test-emails'),
            route: 'mailbox',
            handlers: defaultEmailHandlers,
            templatePath: path.join(__dirname, '../static/email/templates'),
            globalTemplateVars: {
                // The following variables will change depending on your storefront implementation
                fromAddress: '"example" <noreply@example.com>',
                verifyEmailAddressUrl: 'http://localhost:8080/verify',
                passwordResetUrl: 'http://localhost:8080/password-reset',
                changeEmailAddressUrl: 'http://localhost:8080/verify-email-address-change'
            },
        }),
        // AdminUiPlugin.init({
        //     route: 'admin',
        //     port: 3002,
        // }),
        AdminUiPlugin.init({
            route: 'admin',
            port: 3002,
            app: compileUiExtensions(
                {
                    outputPath: path.join(__dirname, 'admin-ui'),
                    extensions: [{
                        extensionPath: path.join(__dirname, 'ui-extensions'),
                        ngModules: [
                            {
                                type: 'lazy',
                                route: 'greet',
                                ngModuleFileName: 'greeting.module.ts',
                                ngModuleName: 'GreeterModule',
                            },
                            {
                                type: 'lazy',
                                route: 'addManualOrder',
                                ngModuleFileName: 'add-manual-order.module.ts',
                                ngModuleName: 'AddManualOrderModule',
                            },
                            {
                                type: 'lazy',
                                route: 'orderSummary',
                                ngModuleFileName: 'order-summary.module.ts',
                                ngModuleName: 'OrderSummaryModule',
                            },
                            {
                                type: 'shared',
                                ngModuleFileName: 'order-list-custom.module.ts',
                                ngModuleName: 'OrderListCustomModule',
                            },
                            {
                                type: 'lazy',
                                route: 'orderView',
                                ngModuleFileName: 'order-view.module.ts',
                                ngModuleName: 'OrderViewModule',
                            },
                        ],
                    }],
                    devMode: false,
                },

            ),

        }),

    ]
};
