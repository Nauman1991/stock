"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var AssetServerPlugin_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetServerPlugin = void 0;
const core_1 = require("@vendure/core");
const crypto_1 = require("crypto");
const express_1 = __importDefault(require("express"));
const file_type_1 = require("file-type");
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const constants_1 = require("./constants");
const default_asset_storage_strategy_factory_1 = require("./default-asset-storage-strategy-factory");
const hashed_asset_naming_strategy_1 = require("./hashed-asset-naming-strategy");
const sharp_asset_preview_strategy_1 = require("./sharp-asset-preview-strategy");
const transform_image_1 = require("./transform-image");
/**
 * @description
 * The `AssetServerPlugin` serves assets (images and other files) from the local file system, and can also be configured to use
 * other storage strategies (e.g. {@link S3AssetStorageStrategy}. It can also perform on-the-fly image transformations
 * and caches the results for subsequent calls.
 *
 * ## Installation
 *
 * `yarn add \@vendure/asset-server-plugin`
 *
 * or
 *
 * `npm install \@vendure/asset-server-plugin`
 *
 * @example
 * ```ts
 * import { AssetServerPlugin } from '\@vendure/asset-server-plugin';
 *
 * const config: VendureConfig = {
 *   // Add an instance of the plugin to the plugins array
 *   plugins: [
 *     AssetServerPlugin.init({
 *       route: 'assets',
 *       assetUploadDir: path.join(__dirname, 'assets'),
 *       port: 4000,
 *     }),
 *   ],
 * };
 * ```
 *
 * The full configuration is documented at [AssetServerOptions]({{< relref "asset-server-options" >}})
 *
 * ## Image transformation
 *
 * Asset preview images can be transformed (resized & cropped) on the fly by appending query parameters to the url:
 *
 * `http://localhost:3000/assets/some-asset.jpg?w=500&h=300&mode=resize`
 *
 * The above URL will return `some-asset.jpg`, resized to fit in the bounds of a 500px x 300px rectangle.
 *
 * ### Preview mode
 *
 * The `mode` parameter can be either `crop` or `resize`. See the [ImageTransformMode]({{< relref "image-transform-mode" >}}) docs for details.
 *
 * ### Focal point
 *
 * When cropping an image (`mode=crop`), Vendure will attempt to keep the most "interesting" area of the image in the cropped frame. It does this
 * by finding the area of the image with highest entropy (the busiest area of the image). However, sometimes this does not yield a satisfactory
 * result - part or all of the main subject may still be cropped out.
 *
 * This is where specifying the focal point can help. The focal point of the image may be specified by passing the `fpx` and `fpy` query parameters.
 * These are normalized coordinates (i.e. a number between 0 and 1), so the `fpx=0&fpy=0` corresponds to the top left of the image.
 *
 * For example, let's say there is a very wide landscape image which we want to crop to be square. The main subject is a house to the far left of the
 * image. The following query would crop it to a square with the house centered:
 *
 * `http://localhost:3000/assets/landscape.jpg?w=150&h=150&mode=crop&fpx=0.2&fpy=0.7`
 *
 * ### Transform presets
 *
 * Presets can be defined which allow a single preset name to be used instead of specifying the width, height and mode. Presets are
 * configured via the AssetServerOptions [presets property]({{< relref "asset-server-options" >}}#presets).
 *
 * For example, defining the following preset:
 *
 * ```ts
 * new AssetServerPlugin({
 *   // ...
 *   presets: [
 *     { name: 'my-preset', width: 85, height: 85, mode: 'crop' },
 *   ],
 * }),
 * ```
 *
 * means that a request to:
 *
 * `http://localhost:3000/assets/some-asset.jpg?preset=my-preset`
 *
 * is equivalent to:
 *
 * `http://localhost:3000/assets/some-asset.jpg?w=85&h=85&mode=crop`
 *
 * The AssetServerPlugin comes pre-configured with the following presets:
 *
 * name | width | height | mode
 * -----|-------|--------|-----
 * tiny | 50px | 50px | crop
 * thumb | 150px | 150px | crop
 * small | 300px | 300px | resize
 * medium | 500px | 500px | resize
 * large | 800px | 800px | resize
 *
 * ### Caching
 * By default, the AssetServerPlugin will cache every transformed image, so that the transformation only needs to be performed a single time for
 * a given configuration. Caching can be disabled per-request by setting the `?cache=false` query parameter.
 *
 * @docsCategory AssetServerPlugin
 */
let AssetServerPlugin = AssetServerPlugin_1 = class AssetServerPlugin {
    constructor() {
        this.cacheDir = 'cache';
        this.presets = [
            { name: 'tiny', width: 50, height: 50, mode: 'crop' },
            { name: 'thumb', width: 150, height: 150, mode: 'crop' },
            { name: 'small', width: 300, height: 300, mode: 'resize' },
            { name: 'medium', width: 500, height: 500, mode: 'resize' },
            { name: 'large', width: 800, height: 800, mode: 'resize' },
        ];
    }
    /**
     * @description
     * Set the plugin options.
     */
    static init(options) {
        AssetServerPlugin_1.options = options;
        return this;
    }
    /** @internal */
    static async configure(config) {
        const storageStrategyFactory = this.options.storageStrategyFactory || default_asset_storage_strategy_factory_1.defaultAssetStorageStrategyFactory;
        this.assetStorage = await storageStrategyFactory(this.options);
        config.assetOptions.assetPreviewStrategy = new sharp_asset_preview_strategy_1.SharpAssetPreviewStrategy({
            maxWidth: this.options.previewMaxWidth || 1600,
            maxHeight: this.options.previewMaxHeight || 1600,
        });
        config.assetOptions.assetStorageStrategy = this.assetStorage;
        config.assetOptions.assetNamingStrategy =
            this.options.namingStrategy || new hashed_asset_naming_strategy_1.HashedAssetNamingStrategy();
        return config;
    }
    /** @internal */
    onApplicationBootstrap() {
        if (AssetServerPlugin_1.options.presets) {
            for (const preset of AssetServerPlugin_1.options.presets) {
                const existingIndex = this.presets.findIndex(p => p.name === preset.name);
                if (-1 < existingIndex) {
                    this.presets.splice(existingIndex, 1, preset);
                }
                else {
                    this.presets.push(preset);
                }
            }
        }
        const cachePath = path_1.default.join(AssetServerPlugin_1.options.assetUploadDir, this.cacheDir);
        fs_extra_1.default.ensureDirSync(cachePath);
    }
    configure(consumer) {
        core_1.Logger.info('Creating asset server middleware', constants_1.loggerCtx);
        consumer.apply(this.createAssetServer()).forRoutes(AssetServerPlugin_1.options.route);
        core_1.registerPluginStartupMessage('Asset server', AssetServerPlugin_1.options.route);
    }
    /**
     * Creates the image server instance
     */
    createAssetServer() {
        const assetServer = express_1.default.Router();
        assetServer.use(this.sendAsset(), this.generateTransformedImage());
        return assetServer;
    }
    /**
     * Reads the file requested and send the response to the browser.
     */
    sendAsset() {
        return async (req, res, next) => {
            var _a;
            const key = this.getFileNameFromRequest(req);
            try {
                const file = await AssetServerPlugin_1.assetStorage.readFileToBuffer(key);
                let mimeType = this.getMimeType(key);
                if (!mimeType) {
                    mimeType = ((_a = (await file_type_1.fromBuffer(file))) === null || _a === void 0 ? void 0 : _a.mime) || 'application/octet-stream';
                }
                res.contentType(mimeType);
                res.send(file);
            }
            catch (e) {
                const err = new Error('File not found');
                err.status = 404;
                return next(err);
            }
        };
    }
    /**
     * If an exception was thrown by the first handler, then it may be because a transformed image
     * is being requested which does not yet exist. In this case, this handler will generate the
     * transformed image, save it to cache, and serve the result as a response.
     */
    generateTransformedImage() {
        return async (err, req, res, next) => {
            if (err && (err.status === 404 || err.statusCode === 404)) {
                if (req.query) {
                    core_1.Logger.debug(`Pre-cached Asset not found: ${req.path}`, constants_1.loggerCtx);
                    let file;
                    try {
                        file = await AssetServerPlugin_1.assetStorage.readFileToBuffer(req.path);
                    }
                    catch (err) {
                        res.status(404).send('Resource not found');
                        return;
                    }
                    const image = await transform_image_1.transformImage(file, req.query, this.presets || []);
                    try {
                        const imageBuffer = await image.toBuffer();
                        if (!req.query.cache || req.query.cache === 'true') {
                            const cachedFileName = this.getFileNameFromRequest(req);
                            await AssetServerPlugin_1.assetStorage.writeFileFromBuffer(cachedFileName, imageBuffer);
                            core_1.Logger.debug(`Saved cached asset: ${cachedFileName}`, constants_1.loggerCtx);
                        }
                        res.set('Content-Type', `image/${(await image.metadata()).format}`);
                        res.send(imageBuffer);
                        return;
                    }
                    catch (e) {
                        core_1.Logger.error(e, 'AssetServerPlugin', e.stack);
                        res.status(500).send(e.message);
                        return;
                    }
                }
            }
            next();
        };
    }
    getFileNameFromRequest(req) {
        const { w, h, mode, preset, fpx, fpy } = req.query;
        const focalPoint = fpx && fpy ? `_fpx${fpx}_fpy${fpy}` : '';
        let imageParamHash = null;
        if (w || h) {
            const width = w || '';
            const height = h || '';
            imageParamHash = this.md5(`_transform_w${width}_h${height}_m${mode}${focalPoint}`);
        }
        else if (preset) {
            if (this.presets && !!this.presets.find(p => p.name === preset)) {
                imageParamHash = this.md5(`_transform_pre_${preset}${focalPoint}`);
            }
        }
        if (imageParamHash) {
            return path_1.default.join(this.cacheDir, this.addSuffix(req.path, imageParamHash));
        }
        else {
            return req.path;
        }
    }
    md5(input) {
        return crypto_1.createHash('md5').update(input).digest('hex');
    }
    addSuffix(fileName, suffix) {
        const ext = path_1.default.extname(fileName);
        const baseName = path_1.default.basename(fileName, ext);
        const dirName = path_1.default.dirname(fileName);
        return path_1.default.join(dirName, `${baseName}${suffix}${ext}`);
    }
    /**
     * Attempt to get the mime type from the file name.
     */
    getMimeType(fileName) {
        const ext = path_1.default.extname(fileName);
        switch (ext) {
            case '.jpg':
            case '.jpeg':
                return 'image/jpeg';
            case '.png':
                return 'image/png';
            case '.gif':
                return 'image/gif';
            case '.svg':
                return 'image/svg+xml';
            case '.tiff':
                return 'image/tiff';
            case '.webp':
                return 'image/webp';
        }
    }
};
AssetServerPlugin = AssetServerPlugin_1 = __decorate([
    core_1.VendurePlugin({
        imports: [core_1.PluginCommonModule],
        configuration: config => AssetServerPlugin_1.configure(config),
    })
], AssetServerPlugin);
exports.AssetServerPlugin = AssetServerPlugin;
//# sourceMappingURL=plugin.js.map