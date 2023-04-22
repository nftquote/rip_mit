import svelte from "rollup-plugin-svelte";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import livereload from "rollup-plugin-livereload";
import terser from '@rollup/plugin-terser';
import css from "rollup-plugin-css-only";
import replace from "@rollup/plugin-replace";
import inject from '@rollup/plugin-inject';
import json from "@rollup/plugin-json";

const production = !process.env.ROLLUP_WATCH;
const path = require("path");

function initCanisterIds() {
  let localCanisters, localIiCanister, prodCanisters, canisters;
  try {
    localCanisters = require(path.resolve(
      "..",
      "..",
      ".dfx",
      "local",
      "canister_ids.json"
    ));
  } catch (error) {
    console.log("No local canister_ids.json found. Continuing production");
  }
  try {
    localIiCanister = require(path.resolve(
      "..",
      "..",
      "internet-identity",
      ".dfx",
      "local",
      "canister_ids.json"
    ));
  } catch (error) {
    console.log("No local internet-identity canister_ids.json found. Continuing production");
  }
  try {
    prodCanisters = require(path.resolve("..", "..", "canister_ids.json"));
  } catch (error) {
    console.log("No production canister_ids.json found. Continuing with local");
  }

  const network =
    process.env.DFX_NETWORK ||
    (process.env.NODE_ENV === "production" ? "ic" : "local");

  const canisterIds =
    network === "local"
      ? { ...(localCanisters || {}), ...(localIiCanister || {}) }
      : prodCanisters;

  return { canisterIds, network };
}

const { canisterIds, network } = initCanisterIds();

function serve() {
  let server;

  function toExit() {
    if (server) server.kill(0);
  }

  return {
    writeBundle() {
      if (server) return;
      server = require("child_process").spawn(
        "npm",
        ["run", "start", "--", "--dev"],
        {
          stdio: ["ignore", "inherit", "inherit"],
          shell: true,
        }
      );

      process.on("SIGTERM", toExit);
      process.on("exit", toExit);
    },
  };
}

console.log(canisterIds)

export default {
  input: "src/main.js",
  output: {
    sourcemap: true,
    format: "umd",
    name: "app",
    file: "public/build.js",
  },
  plugins: [
    svelte({
      compilerOptions: {
        dev: !production,
      },
    }),
    css({ output: "bundle.css" }),
    resolve({
      preferBuiltins: false,
      browser: true,
      dedupe: ["svelte"],
    }),
    replace(
      Object.assign(
        {
          "process.env.DFX_NETWORK": JSON.stringify(network),
          "process.env.NODE_ENV": JSON.stringify(production ? "production" : "development"),
        },
        ...Object.keys(canisterIds)
          .filter((canisterName) => canisterName !== "__Candid_UI")
          .map((canisterName) => ({
            ["process.env." + canisterName.toUpperCase() + "_CANISTER_ID"]:
              JSON.stringify(canisterIds[canisterName][network]),
          }))
      )
    ),
    commonjs(),
    inject({
      Buffer: ["buffer", "Buffer"],
      process: "process/browser",
    }),
    json(),
    !production && serve(),
    !production && livereload("public"),
    production && terser(),
  ],
  watch: {
    clearScreen: false,
  },
};
