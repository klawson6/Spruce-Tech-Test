import fastify from "fastify";
import fastifyGracefulShutdown from "fastify-graceful-shutdown";
import { routes } from "./routes.js";

export const buildServer = () => {
  const server = fastify();

  server.register(fastifyGracefulShutdown);

  server.register(routes);

  return server;
};
