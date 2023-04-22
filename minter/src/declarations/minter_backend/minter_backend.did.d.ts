import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface GenerateAssetResult { 'msg' : string, 'image_url' : string }
export interface _SERVICE {
  'generate_asset' : ActorMethod<[string], GenerateAssetResult>,
}
