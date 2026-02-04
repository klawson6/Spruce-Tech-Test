import { FastifyInstance } from "fastify";
import { getResults, patchResults } from "./services/results.js";
import {
  getAllResults as getResultsSchema,
  patchResults as patchResultsSchema,
} from "./schema/results.js";

export const routes = (server: FastifyInstance) => {
  server.get("/", (req, reply) => {
    reply.sendFile("index.html");
  });

  server.get("/results", { schema: getResultsSchema }, getResults);
  server.patch("/results", { schema: patchResultsSchema }, patchResults);
};
