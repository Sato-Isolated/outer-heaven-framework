import { mkdtemp, rm, writeFile, cp } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");
const demoRoot = path.join(repoRoot, "apps", "demo");
const outDir = path.join(demoRoot, "out");
const repoName = (process.env.GITHUB_PAGES_REPO ?? path.basename(repoRoot)).replace(
  /^\/+|\/+$/g,
  "",
);
const pagesEnv = {
  ...process.env,
  GITHUB_PAGES: "true",
  GITHUB_PAGES_REPO: repoName,
};

function resolveCommand(command) {
  return command;
}

function quoteForCmd(arg) {
  return `"${String(arg).replace(/"/g, '\\"')}"`;
}

function spawnCommand(command, args, options = {}) {
  if (process.platform === "win32" && command === "pnpm") {
    return spawnSync(
      "cmd.exe",
      ["/d", "/s", "/c", `pnpm ${args.map(quoteForCmd).join(" ")}`],
      {
        shell: false,
        ...options,
      },
    );
  }

  return spawnSync(resolveCommand(command), args, {
    shell: false,
    ...options,
  });
}

function run(command, args, options = {}) {
  const printable = [command, ...args].join(" ");
  console.log(`\n> ${printable}`);

  const result = spawnCommand(command, args, {
    cwd: repoRoot,
    env: pagesEnv,
    stdio: "inherit",
    ...options,
  });

  if (result.error) {
    console.error(result.error);
  }

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

function read(command, args, options = {}) {
  const result = spawnCommand(command, args, {
    cwd: repoRoot,
    env: pagesEnv,
    encoding: "utf8",
    ...options,
  });

  if (result.error) {
    console.error(result.error);
  }

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }

  return result.stdout.trim();
}

async function buildPagesSite() {
  run("pnpm", ["--filter", "@outerhaven/demo", "build"]);
  await writeFile(path.join(outDir, ".nojekyll"), "");
}

async function deployPagesSite() {
  await buildPagesSite();

  const remoteUrl = read("git", ["remote", "get-url", "origin"]);
  const tempDir = await mkdtemp(path.join(os.tmpdir(), "outerhaven-gh-pages-"));

  try {
    await cp(outDir, tempDir, { recursive: true });
    run("git", ["init"], { cwd: tempDir });
    run("git", ["checkout", "-b", "gh-pages"], { cwd: tempDir });
    run("git", ["add", "--all"], { cwd: tempDir });
    run("git", ["commit", "-m", `deploy: github pages ${new Date().toISOString()}`], {
      cwd: tempDir,
    });
    run("git", ["remote", "add", "origin", remoteUrl], { cwd: tempDir });
    run("git", ["push", "--force", "origin", "gh-pages"], { cwd: tempDir });
  } finally {
    await rm(tempDir, { recursive: true, force: true });
  }
}

const mode = process.argv[2] ?? "deploy";

if (mode === "build") {
  await buildPagesSite();
} else if (mode === "deploy") {
  await deployPagesSite();
} else {
  console.error(`Unknown mode: ${mode}`);
  process.exit(1);
}
