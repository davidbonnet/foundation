import express from "express";
import { createServer as createViteServer } from "vite";

async function main(port = 9696) {
  const app = express();

  const vite = await createViteServer({
    appType: "spa",
    server: { middlewareMode: true },
  });

  app.get("/setup", (request, response) => {
    response.json({
      projectName: "Foundation",
    });
  });

  app.use(vite.middlewares);

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
}

main();
