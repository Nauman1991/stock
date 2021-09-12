import { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AdminUiAppConfig, AdminUiAppDevModeConfig, AdminUiConfig, Type } from '@vendure/common/lib/shared-types';
import { ConfigService } from '@vendure/core';
/**
 * @description
 * Configuration options for the {@link AdminUiPlugin}.
 *
 * @docsCategory AdminUiPlugin
 */
export interface AdminUiPluginOptions {
    /**
     * @description
     * The route to the admin ui.
     */
    route: string;
    /**
     * @description
     * The port on which the server will listen. If not
     */
    port: number;
    /**
     * @description
     * The hostname of the server serving the static admin ui files.
     *
     * @default 'localhost'
     */
    hostname?: string;
    /**
     * @description
     * By default, the AdminUiPlugin comes bundles with a pre-built version of the
     * Admin UI. This option can be used to override this default build with a different
     * version, e.g. one pre-compiled with one or more ui extensions.
     */
    app?: AdminUiAppConfig | AdminUiAppDevModeConfig;
    /**
     * @description
     * Allows the contents of the `vendure-ui-config.json` file to be set, e.g.
     * for specifying the Vendure GraphQL API host, available UI languages, etc.
     */
    adminUiConfig?: Partial<AdminUiConfig>;
}
/**
 * @description
 * This plugin starts a static server for the Admin UI app, and proxies it via the `/admin/` path of the main Vendure server.
 *
 * The Admin UI allows you to administer all aspects of your store, from inventory management to order tracking. It is the tool used by
 * store administrators on a day-to-day basis for the management of the store.
 *
 * ## Installation
 *
 * `yarn add \@vendure/admin-ui-plugin`
 *
 * or
 *
 * `npm install \@vendure/admin-ui-plugin`
 *
 * @example
 * ```ts
 * import { AdminUiPlugin } from '\@vendure/admin-ui-plugin';
 *
 * const config: VendureConfig = {
 *   // Add an instance of the plugin to the plugins array
 *   plugins: [
 *     AdminUiPlugin.init({ port: 3002 }),
 *   ],
 * };
 * ```
 *
 * @docsCategory AdminUiPlugin
 */
export declare class AdminUiPlugin implements NestModule {
    private configService;
    private static options;
    constructor(configService: ConfigService);
    /**
     * @description
     * Set the plugin options
     */
    static init(options: AdminUiPluginOptions): Type<AdminUiPlugin>;
    configure(consumer: MiddlewareConsumer): Promise<void>;
    private createStaticServer;
    /**
     * Takes an optional AdminUiConfig provided in the plugin options, and returns a complete
     * config object for writing to disk.
     */
    private getAdminUiConfig;
    /**
     * Overwrites the parts of the admin-ui app's `vendure-ui-config.json` file relating to connecting to
     * the server admin API.
     */
    private overwriteAdminUiConfig;
    /**
     * It might be that the ui-devkit compiler has not yet copied the config
     * file to the expected location (particularly when running in watch mode),
     * so polling is used to check multiple times with a delay.
     */
    private pollForConfigFile;
    private static isDevModeApp;
}
