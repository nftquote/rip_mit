#!/usr/bin/env bash
dfx stop
set -e
trap 'dfx stop' EXIT
dfx start --background
npm install
dfx deploy
npm start