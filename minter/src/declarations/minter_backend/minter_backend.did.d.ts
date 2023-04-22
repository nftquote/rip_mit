import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface GenerateAssetArgs { 'phrase' : string }
export interface GenerateAssetResult { 'url' : string }
export interface _SERVICE {
  'generate_asset' : ActorMethod<[GenerateAssetArgs], GenerateAssetResult>,
}
