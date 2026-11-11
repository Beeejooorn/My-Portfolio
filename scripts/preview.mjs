import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { URL } from "node:url";
import { log } from "node:console";
const root = path.resolve("build/client");
const types = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".data": "text/plain",
  ".json": "application/json",
  ".ttf": "font/ttf",
  ".svg": "image/svg+xml",
};
createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(
      new URL(req.url, "http://localhost").pathname,
    );
    let file = path.resolve(root, "." + pathname);
    if (file !== root && !file.startsWith(root + path.sep)) {
      res.writeHead(403).end();
      return;
    }
    try {
      if ((await stat(file)).isDirectory())
        file = path.join(file, "index.html");
      await stat(file);
    } catch {
      if (path.extname(pathname)) {
        res.writeHead(404).end();
        return;
      }
      file = path.join(root, "__spa-fallback.html");
    }
    const content = await readFile(file);
    res
      .writeHead(200, {
        "Content-Type": types[path.extname(file)] || "application/octet-stream",
      })
      .end(content);
  } catch {
    res.writeHead(500).end("Preview unavailable");
  }
}).listen(4173, "127.0.0.1", () =>
  log("Foundation preview: http://127.0.0.1:4173"),
);
