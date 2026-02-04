import { FastifyInstance } from "fastify";
import { getStatistics } from "./services/statistics.js";
import { statistics } from "./schema/statistics.js";

export const routes = (server: FastifyInstance) => {
  server.get("/", (req, reply) => {
    reply.sendFile("index.html");
  });

  server.get("/statistics", { schema: statistics }, getStatistics);
};
