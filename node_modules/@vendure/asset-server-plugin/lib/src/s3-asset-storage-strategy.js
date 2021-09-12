"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3AssetStorageStrategy = exports.configureS3AssetStorage = void 0;
const core_1 = require("@vendure/core");
const path = __importStar(require("path"));
const stream_1 = require("stream");
const common_1 = require("./common");
const constants_1 = require("./constants");
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
function configureS3AssetStorage(s3Config) {
    return (options) => {
        const { assetUrlPrefix, route } = options;
        const prefixFn = common_1.getAssetUrlPrefixFn(options);
        const toAbsoluteUrlFn = (request, identifier) => {
            if (!identifier) {
                return '';
            }
            const prefix = prefixFn(request, identifier);
            return identifier.startsWith(prefix) ? identifier : `${prefix}${identifier}`;
        };
        return new S3AssetStorageStrategy(s3Config, toAbsoluteUrlFn);
    };
}
exports.configureS3AssetStorage = configureS3AssetStorage;
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
class S3AssetStorageStrategy {
    constructor(s3Config, toAbsoluteUrl) {
        this.s3Config = s3Config;
        this.toAbsoluteUrl = toAbsoluteUrl;
    }
    async init() {
        try {
            this.AWS = await Promise.resolve().then(() => __importStar(require('aws-sdk')));
        }
        catch (e) {
            core_1.Logger.error(`Could not find the "aws-sdk" package. Make sure it is installed`, constants_1.loggerCtx, e.stack);
        }
        const config = Object.assign({ credentials: this.getS3Credentials() }, this.s3Config.nativeS3Configuration);
        this.s3 = new this.AWS.S3(config);
        await this.ensureBucket(this.s3Config.bucket);
    }
    async writeFileFromBuffer(fileName, data) {
        const result = await this.s3
            .upload({
            Bucket: this.s3Config.bucket,
            Key: fileName,
            Body: data,
        }, this.s3Config.nativeS3UploadConfiguration)
            .promise();
        return result.Key;
    }
    async writeFileFromStream(fileName, data) {
        const result = await this.s3
            .upload({
            Bucket: this.s3Config.bucket,
            Key: fileName,
            Body: data,
        }, this.s3Config.nativeS3UploadConfiguration)
            .promise();
        return result.Key;
    }
    async readFileToBuffer(identifier) {
        const result = await this.s3.getObject(this.getObjectParams(identifier)).promise();
        const body = result.Body;
        if (!body) {
            core_1.Logger.error(`Got undefined Body for ${identifier}`, constants_1.loggerCtx);
            return Buffer.from('');
        }
        if (body instanceof Buffer) {
            return body;
        }
        if (body instanceof Uint8Array || typeof body === 'string') {
            return Buffer.from(body);
        }
        if (body instanceof stream_1.Readable) {
            return new Promise((resolve, reject) => {
                const buf = [];
                body.on('data', data => buf.push(data));
                body.on('error', err => reject(err));
                body.on('end', () => {
                    const intArray = Uint8Array.from(buf);
                    resolve(Buffer.concat([intArray]));
                });
            });
        }
        return Buffer.from(body);
    }
    async readFileToStream(identifier) {
        const result = await this.s3.getObject(this.getObjectParams(identifier)).promise();
        const body = result.Body;
        if (!(body instanceof stream_1.Stream)) {
            const readable = new stream_1.Readable();
            readable._read = () => {
                /* noop */
            };
            readable.push(body);
            readable.push(null);
            return readable;
        }
        return body;
    }
    async deleteFile(identifier) {
        await this.s3.deleteObject(this.getObjectParams(identifier)).promise();
    }
    async fileExists(fileName) {
        try {
            await this.s3.headObject(this.getObjectParams(fileName)).promise();
            return true;
        }
        catch (e) {
            return false;
        }
    }
    getObjectParams(identifier) {
        return {
            Bucket: this.s3Config.bucket,
            Key: path.join(identifier.replace(/^\//, '')),
        };
    }
    getS3Credentials() {
        const { credentials } = this.s3Config;
        if (credentials == null) {
            return null;
        }
        else if (this.isCredentialsProfile(credentials)) {
            return new this.AWS.SharedIniFileCredentials(credentials);
        }
        return new this.AWS.Credentials(credentials);
    }
    async ensureBucket(bucket) {
        let bucketExists = false;
        try {
            await this.s3.headBucket({ Bucket: this.s3Config.bucket }).promise();
            bucketExists = true;
            core_1.Logger.verbose(`Found S3 bucket "${bucket}"`, constants_1.loggerCtx);
        }
        catch (e) {
            core_1.Logger.verbose(`Could not find bucket "${bucket}". Attempting to create...`);
        }
        if (!bucketExists) {
            try {
                await this.s3.createBucket({ Bucket: bucket, ACL: 'private' }).promise();
                core_1.Logger.verbose(`Created S3 bucket "${bucket}"`, constants_1.loggerCtx);
            }
            catch (e) {
                core_1.Logger.error(`Could not find nor create the S3 bucket "${bucket}"`, constants_1.loggerCtx, e.stack);
            }
        }
    }
    isCredentialsProfile(credentials) {
        return credentials.hasOwnProperty('profile');
    }
}
exports.S3AssetStorageStrategy = S3AssetStorageStrategy;
//# sourceMappingURL=s3-asset-storage-strategy.js.map