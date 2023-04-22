use std::collections::HashMap;

use ic_cdk_macros::*;
use ic_cdk::api::management_canister::http_request::{
    http_request, CanisterHttpRequestArgument, HttpHeader, HttpMethod, HttpResponse, TransformArgs,
    TransformContext,
};
use candid::{CandidType, Deserialize};
use serde_json::Value;

#[derive(CandidType, Deserialize)]
struct GenerateAssetResult {
    msg: String,
    image_url: String,
}

#[query]
fn transform(raw: TransformArgs) -> HttpResponse {
    let mut res = HttpResponse {
        status: raw.response.status.clone(),
        ..Default::default()
    };
    if res.status == 200 {
        let mut new_body = vec![];
        let body = std::str::from_utf8(&raw.response.body).unwrap();

        let mut lookup: HashMap<String, Value> = serde_json::from_str(body).unwrap();
        let mut map = HashMap::new();
        let keys = ["title", "description"];
        for key in keys {
            let (k, v) = lookup.remove_entry(key).unwrap();
            map.insert(k, v);
        }

        let title = map.get("title").unwrap();
        let description = map.get("description").unwrap();

        new_body.append(&mut format!("title: {}, description: {}", title, description).as_bytes().to_vec());
        res.body = new_body;
    } else {
        ic_cdk::api::print(format!("Received an error from coinbase: err = {:?}", raw));
    }
    res
}

#[update]
async fn generate_asset(_phrase: String) -> GenerateAssetResult {
    let host = "dummyjson.com";
    let mut host_header = host.clone().to_owned();
    host_header.push_str(":443");
    // prepare system http_request call
    let request_headers = vec![
        HttpHeader {
            name: "Host".to_string(),
            value: host_header,
        },
        HttpHeader {
            name: "User-Agent".to_string(),
            value: "minter_backend_canister".to_string(),
        },
    ];
    
    let request = CanisterHttpRequestArgument{
        url: String::from("https://dummyjson.com/products/1"),
        method: HttpMethod::GET,
        body: None,
        max_response_bytes: Some(10 * 6 * 200),
        transform: Some(TransformContext::new(transform, vec![])),
        headers: request_headers,
    };

    match http_request(request).await {
        Ok((response,)) => {
            // put the result to hashmap
            let body = std::str::from_utf8(&response.body).unwrap();

            return GenerateAssetResult{
                msg: String::from("success"),
                image_url: String::from(body),
            };
        }
        Err((r, m)) => {
            let message =
                format!("The http_request resulted into error. RejectionCode: {r:?}, Error: {m}");

            return GenerateAssetResult{
                msg: message,
                image_url: String::from(""),
            };
        }
    }
}
