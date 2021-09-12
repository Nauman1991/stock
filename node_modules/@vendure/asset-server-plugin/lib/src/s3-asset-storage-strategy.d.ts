/// <reference types="node" />
import { AssetStorageStrategy } from '@vendure/core';
import { Request } from 'express';
import { Stream } from 'stream';
import { AssetServerOptions } from './types';
export declare type S3Credentials = {
    accessKeyId: string;
    secretAccessKey: string;
};
export declare type S3CredentialsProfile = {
    profile: string;
};
/**
 * @description
 * Configuration for connecting to AWS S3.
 *
 * @docsCategory asset-server-plugin
 * @docsPage S3AssetStorageStrategy
 */
export interface S3Config {
    /**
     * @description
     * The credentials used to access your s3 account. You can supply either the access key ID & secret,
     * or you can make use of a
     * [shared credentials file](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/loading-node-credentials-shared.html)
     * and supply the profile name (e.g. `'default'`).
     */
    credentials?: S3Credentials | S3CredentialsProfile;
    /**
     * @description
     * The S3 bucket in which to store the assets. If it does not exist, it will be created on startup.
     */
    bucket: string;
    /**
     * @description
     * Configuration object passed directly to the AWS SDK.
     * S3.Types.ClientConfiguration can be used after importing aws-sdk.
     * Using type `any` in order to avoid the need to include `aws-sdk` dependency in general.
     */
    nativeS3Configuration?: any;
    /**
     * @description
     * Configuration object passed directly to the AWS SDK.
     * ManagedUpload.ManagedUploadOptions can be used after importing aws-sdk.
     * Using type `any` in order to avoid the need to include `aws-sdk` dependency in general.
     */
    nativeS3UploadConfiguration?: any;
}
/**
 * @description
 * Returns a configured instance of the {@link S3AssetStorageStrategy} which can then be passed to the {@link AssetServerOptions}
 * `storageStrategyFactory` property.
 *
 * Before using this strategy, make sure you have the `aws-sdk` package installed:
 *
 * ```sh
 * npm install aws-sdk
 * ```
 *
 * @example
 * ```TypeScript
 * plugins: [
 *   AssetServerPlugin.init({
 *     route: 'assets',
 *     assetUploadDir: path.join(__dirname, 'assets'),
 *     port: 5002,
 *     namingStrategy: new DefaultAssetNamingStrategy(),
 *     storageStrategyFactory: configureS3AssetStorage({
 *       bucket: 'my-s3-bucket',
 *       credentials: {
 *         accessKeyId: process.env.AWS_ACCESS_KEY_ID,
 *         secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
 *       },
 *     }),
 * }),
 * ```
 *
 * @docsCategory asset-server-plugin
 * @docsPage S3AssetStorageStrategy
 */
export declare function configureS3AssetStorage(s3Config: S3Config): (options: AssetServerOptions) => S3AssetStorageStrategy;
/**
 * @description
 * An {@link AssetStorageStrategy} which uses [Amazon S3](https://aws.amazon.com/s3/) object storage service.
 * To us this strategy you must first have access to an AWS account.
 * See their [getting started guide](https://aws.amazon.com/s3/getting-started/?nc=sn&loc=5) for how to get set up.
 *
 * Before using this strategy, make sure you have the `aws-sdk` package installed:
 *
 * ```sh
 * npm install aws-sdk
 * ```
 *
 * **Note:** Rather than instantiating this manually, use the {@link configureS3AssetStorage} function.
 *
 * @docsCategory asset-server-plugin
 * @docsPage S3AssetStorageStrategy
 * @docsWeight 0
 */
export declare class S3AssetStorageStrategy implements AssetStorageStrategy {
    private s3Config;
    readonly toAbsoluteUrl: (request: Request, identifier: string) => string;
    private AWS;
    private s3;
    constructor(s3Config: S3Config, toAbsoluteUrl: (request: Request, identifier: string) => string);
    init(): Promise<void>;
    destroy?: (() => void | Promise<void>) | undefined;
    writeFileFromBuffer(fileName: string, data: Buffer): Promise<string>;
    writeFileFromStream(fileName: string, data: Stream): Promise<string>;
    readFileToBuffer(identifier: string): Promise<Buffer>;
    readFileToStream(identifier: string): Promise<Stream>;
    deleteFile(identifier: string): Promise<void>;
    fileExists(fileName: string): Promise<boolean>;
    private getObjectParams;
    private getS3Credentials;
    private ensureBucket;
    private isCredentialsProfile;
}
