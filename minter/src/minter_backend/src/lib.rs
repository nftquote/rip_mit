mod types;

use crate::types::*;
use ic_cdk_macros::*;
use candid::candid_method;

#[update]
#[candid_method(update)]
fn generate_asset(arg: GenerateAssetArgs) -> GenerateAssetResult {
    let mut url = String::from("phrase: ");
    
    url.push_str(&arg.phrase);

    return GenerateAssetResult {
        url,
    }
}
