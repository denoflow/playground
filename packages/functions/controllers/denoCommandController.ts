import { SupportedDenoSubCommand } from "../interface.ts";
import { executeCommand } from "../services/denoService.ts";

export async function handleDenoCommand(
  commandType: SupportedDenoSubCommand,
  request: Request,
) {
  const { method, url } = request;

  if (method === "OPTIONS") {
    return new Response(null, {
      status: 200,
    });
  }

  if (method !== "POST") {
    return new Response("Method not allowed.", {
      status: 405,
    });
  }

  try {
    const body = await request.text();
    const { isSuccess, isKilled, out, error } = await executeCommand(
      commandType,
      body,
      url,
    );

    if (!isSuccess) {
      if (isKilled) {
        return new Response(
          out +
            "\n" +
            "Executing the given Deno command is taking too long to load.",
          {
            status: 504,
          },
        );
      }
      return new Response(out + "\n" + error, {
        status: 500,
      });
    }
    return new Response(out, {
      status: 200,
    });
  } catch (e) {
    if (e instanceof SyntaxError) {
      return new Response("Cannot process request body.", {
        status: 400,
      });
    }
    console.error(e);
    return new Response("Internal server error.", {
      status: 500,
    });
  }
}
