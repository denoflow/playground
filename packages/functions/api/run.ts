import { handleDenoCommand } from "../controllers/denoCommandController.ts";

export default function run(request: Request) {
  return handleDenoCommand("run", request);
}
