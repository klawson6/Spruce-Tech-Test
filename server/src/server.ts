import fastify from "fastify";
import fastifyGracefulShutdown from "fastify-graceful-shutdown";
import { routes } from "./routes.js";
import fastifyStatic from "@fastify/static";
import path from "node:path";
import { fileURLToPath } from "node:url";
import prismaPlugin from "./plugins/prisma.js";

export const buildServer = () => {
  const server = fastify();

  server.register(fastifyGracefulShutdown);

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  server.register(fastifyStatic, {
    root: path.join(__dirname, "../public"),
    prefix: "/",
  });

  server.register(prismaPlugin);

  server.register(routes);

  return server;
};
