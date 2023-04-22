import { Actor } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import { wallet_backend } from "../../declarations/wallet_backend";

const APP_NAME = "rip_mit";
const APP_LOGO = "https://nfid.one/icons/favicon-96x96.png";

const IILogInBtn = document.getElementById("iiLoginBtn");
const LogOutBtn = document.getElementById("logoutBtn");
const NfidLogInBtn = document.getElementById("nfidLoginBtn");
const GreetForm = document.getElementById("greetForm");
const principalEl = document.getElementById("principal");

// https://github.com/dfinity/agent-js/blob/main/demos/sample-javascript/src/main.js
let authClient;

const getPrincipal = async () => await authClient.getIdentity().getPrincipal();

async function init() {
  authClient = await AuthClient.create({
    idleOptions: {
      idleTimeout: 1000 * 60 * 30, // set to 30 minutes
      disableDefaultIdleCallback: true, // disable the default reload behavior
    },
  });
  principalEl.innerText = "";
  authClient.idleManager?.registerCallback?.(handleIILogin);
}

// TODO: delete handle greeting event
GreetForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const button = e.target.querySelector("button");

  const name = document.getElementById("name").value.toString();

  button.setAttribute("disabled", true);

  // Interact with foo actor, calling the greet method
  const greeting = await wallet_backend.greet(name);

  button.removeAttribute("disabled");

  document.getElementById("greeting").innerText = greeting;

  return false;
});

// Redirect to the identity provider
IILogInBtn.addEventListener("click", async (e) => handleIILogin(e));

LogOutBtn.addEventListener("click", async (e) => {
  authClient.logout();
  handleLogoutSuccess();
});

NfidLogInBtn.addEventListener("click", async (e) => {
  if (!authClient) throw new Error("AuthClient not initialized");
  const CONFIG_QUERY = `?applicationName=${APP_NAME}&applicationLogo=${APP_LOGO}`;
  const identityProvider = `https://nfid.one/authenticate${CONFIG_QUERY}`;

  authClient.login({
    identityProvider,
    onSuccess: handleLoginSuccess,
    windowOpenerFeatures: `
      left=${window.screen.width / 2 - 525 / 2},
      top=${window.screen.height / 2 - 705 / 2},
      toolbar=0,location=0,menubar=0,width=525,height=705
    `,
  });
});

const handleIILogin = async () => {
  if (!authClient) throw new Error("AuthClient not initialized");

  authClient.login({
    // TODO: local or prod phase
    // https://forum.dfinity.org/t/how-to-run-internet-identity-locally-without-docker/17777/3
    identityProvider: "https://identity.ic0.app",
    onSuccess: handleLoginSuccess,
  });
};

const handleLoginSuccess = async () => {
  principalEl.innerText = await getPrincipal();
  Actor.agentOf(wallet_backend).replaceIdentity(authClient.getIdentity());
};

const handleLogoutSuccess = async () => {
  principalEl.innerText = "";
  Actor.agentOf(wallet_backend).invalidateIdentity();
};

init();
