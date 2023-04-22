use candid::{CandidType, Deserialize};

#[derive(Clone, Debug, CandidType, Deserialize)]
pub struct GenerateAssetArgs {
    pub phrase: String,
}

#[derive(Clone, Debug, CandidType, Deserialize)]
pub struct GenerateAssetResult {
    pub url: String,
}
