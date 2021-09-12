import { Request } from 'express';
import { AssetServerOptions } from './types';
export declare function getAssetUrlPrefixFn(options: AssetServerOptions): ((request: Request, identifier: string) => string) | ((...args: any[]) => string);
