import { Actor, HttpAgent } from "@dfinity/agent/lib/cjs";

export const backendCanisterId = process.env.MINTER_BACKEND_CANISTER_ID;

const createBackendActor = (canisterId, options = {}) => {
  const agent = options.agent || new HttpAgent({ ...options.agentOptions });
  
  if (process.env.DFX_NETWORK !== "ic") {
    agent.fetchRootKey().catch(err => {
      console.warn("Unable to fetch root key. Check to ensure that your local replica is running");
      console.error(err);
    });
  }

  return Actor.createActor(
    ({ IDL }) => {
        return IDL.Service({ 'greet' : IDL.Func([IDL.Text], [IDL.Text], ['query']) });
    }, {
    agent,
    canisterId,
    ...(options ? options.actorOptions : {}),
  });
};

export const backend = createBackendActor(backendCanisterId);
