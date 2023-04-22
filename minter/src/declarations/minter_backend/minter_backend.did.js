export const idlFactory = ({ IDL }) => {
  const GenerateAssetResult = IDL.Record({
    'msg' : IDL.Text,
    'image_url' : IDL.Text,
  });
  return IDL.Service({
    'generate_asset' : IDL.Func([IDL.Text], [GenerateAssetResult], []),
  });
};
export const init = ({ IDL }) => { return []; };
