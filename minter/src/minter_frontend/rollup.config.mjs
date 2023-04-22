import * as fs from "fs";
import * as path from "path";
import * as childprocess from "child_process";
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

function initCanisterIds() {
  const localCanisters = readJSON(path.resolve(
    "..",
    "..",
    ".dfx",
    "local",
    "canister_ids.json"
  ));
  const localIiCanister = readJSON(path.resolve(
    "..",
    "..",
    "internet-identity",
    ".dfx",
    "local",
    "canister_ids.json"
  ));
  const prodCanisters = readJSON(path.resolve(
    "..",
    "..",
    "canister_ids.json",
  ));

  const network =
    process.env.DFX_NETWORK ||
    (process.env.NODE_ENV === "production" ? "ic" : "local");

  const canisterIds =
    network === "local"
      ? { ...(localCanisters || {}), ...(localIiCanister || {}) }
      : prodCanisters;

  return { canisterIds, network };
}

function serve() {
  let server;

  function toExit() {
    if (server) server.kill(0);
  }

  return {
    writeBundle() {
      if (server) return;
      server = childprocess.spawn(
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

function readJSON(jsonPath) {
  try {
    const result =  fs.readFileSync(jsonPath, { encoding: "utf-8" })
    
    return JSON.parse(result);
  } catch (err) {}

  return null;
}

const { canisterIds, network } = initCanisterIds();

console.log("canisterIds: ", canisterIds)

export default {
  input: "src/main.js",
  output: {
    sourcemap: true,
    format: "umd",
    name: "app",
    file: "public/build.js",
    inlineDynamicImports: true,
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
      dedupe: ["svelte", "@dfinity/agent"],
    }),
    replace({
      ...Object.assign(
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
      ),
      preventAssignment: true,
    }),
    commonjs({
      browser: true,
    }),
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
