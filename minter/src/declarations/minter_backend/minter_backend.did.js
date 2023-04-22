export const idlFactory = ({ IDL }) => {
  const GenerateAssetArgs = IDL.Record({ 'phrase' : IDL.Text });
  const GenerateAssetResult = IDL.Record({ 'url' : IDL.Text });
  return IDL.Service({
    'generate_asset' : IDL.Func([GenerateAssetArgs], [GenerateAssetResult], []),
  });
};
export const init = ({ IDL }) => { return []; };
