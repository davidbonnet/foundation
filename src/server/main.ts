import express from "express";
import { createServer as createViteServer } from "vite";

async function main(
  port = process.env.PORT ?? 5173,
  hostname = process.env.HOSTNAME ?? "",
) {
  const app = express();

  app.get("/setup", (_, response) => {
    response.json({
      projectName: "Foundation",
    });
  });

  if (process.env.NODE_ENV === "production") {
    app.use(express.static("public"));
  } else {
    // eslint-disable-next-line no-console
    console.log(
      `Using development server listening on http://localhost:${port}`,
    );
    const vite = await createViteServer({
      appType: "spa",
      server: { middlewareMode: true },
    });
    app.use(vite.middlewares);
  }

  app.listen(+port, hostname, () => {
    // eslint-disable-next-line no-console
    console.log(`Listening on ${hostname}:${port}`);
  });
}

main();
