import { serve } from "./deps.ts";
import handler from "./api/run.ts";
serve(
  async (request: Request): Promise<Response> => {
    const response = await handler(request);
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Headers", "*");
    response.headers.set("Access-Control-Allow-Methods", "*");
    response.headers.set("Access-Control-Allow-Credentials", "true");
    return response;
  },
  { port: 3000 },
);
