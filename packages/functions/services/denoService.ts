import { ensureDirSync, writeAll } from "../deps.ts";
import { SupportedDenoSubCommand } from "../interface.ts";
// import { run } from 'https://denopkg.com/denoflow/denoflow@main/mod.ts'
// Vercel timeout is 10 seconds for hobby tier:
// https://vercel.com/docs/platform/limits
const PROCESS_TIMEOUT = 30000;

export function executeCommand(
  commandType: SupportedDenoSubCommand,
  body: string,
  _url: string,
): Promise<{
  isSuccess: boolean;
  isKilled: boolean;
  out: string;
  error: string;
}> {
  // must enable env
  let command = ["deno", commandType];

  // const [_, search] = url.split('?')
  // const queryParams = new URLSearchParams(search || '')
  // if (queryParams.has("unstable")) {
  // }
  command.push("--unstable");
  // command.push('-L=debug')
  if (commandType === "run") {
    let directory = "/tmp";
    if (osType() === "darwin") {
      directory += ",/private/tmp";
    }
    command = command.concat(
      "--allow-read=" + directory,
      "--allow-write=" + directory,
      "--allow-net",
      // "--allow-run",
    );
  }
  command.push("https://deno.land/x/denoflow@0.0.33/cli.ts");
  command.push("run");
  command.push("--force");
  command.push("--stdin");

  return execute(Array.from(command), body);
}

async function execute(
  cmd: string[],
  source: string,
): Promise<{
  isSuccess: boolean;
  isKilled: boolean;
  out: string;
  error: string;
}> {
  let isKilled = false;
  // https://deno.land/manual@main/examples/subprocess
  // console.log("cmd", cmd);
  // ensure dir exists
  ensureDirSync("/tmp/denoflow");
  const deno = Deno.run({
    cmd,
    cwd: "/tmp/denoflow",
    env: {
      DENO_DIR: "/tmp/denoflow/deno_dir",
    },
    stdin: "piped",
    stdout: "piped",
    stderr: "piped",
  });

  try {
    await writeAll(deno.stdin, new TextEncoder().encode(source));
    deno.stdin.close();

    const timer = setTimeout(() => {
      isKilled = true;
      deno.kill("SIGKILL");
    }, PROCESS_TIMEOUT);

    const [status, stdout, stderr] = await Promise.all([
      deno.status(),
      deno.output(),
      deno.stderrOutput(),
    ]);

    clearTimeout(timer);

    const decoder = new TextDecoder();
    return {
      isSuccess: status.success,
      isKilled,
      out: decoder.decode(stdout),
      error: decoder.decode(stderr),
    };
  } finally {
    deno.close();
  }
}
export const osType = (): string => {
  // deno-lint-ignore no-explicit-any
  const { Deno } = globalThis as any;
  if (typeof Deno?.build?.os === "string") {
    return Deno.build.os;
  }

  // deno-lint-ignore no-explicit-any
  const { navigator } = globalThis as any;
  if (navigator?.appVersion?.includes?.("Win") ?? false) {
    return "windows";
  }

  return "linux";
};
