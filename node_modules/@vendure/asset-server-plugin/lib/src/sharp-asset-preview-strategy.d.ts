/// <reference types="node" />
import { AssetPreviewStrategy, RequestContext } from '@vendure/core';
export declare class SharpAssetPreviewStrategy implements AssetPreviewStrategy {
    private config;
    constructor(config: {
        maxHeight: number;
        maxWidth: number;
    });
    generatePreviewImage(ctx: RequestContext, mimeType: string, data: Buffer): Promise<Buffer>;
    private generateMimeTypeOverlay;
}
