#!/usr/bin/env DENO_DIR=/tmp/deno_dir deno run

import { handleDenoCommand } from "../controllers/denoCommandController.ts";
import { ServerRequest } from "../deps.ts";

export default function run(request: ServerRequest) {
  return handleDenoCommand("run", request);
}
