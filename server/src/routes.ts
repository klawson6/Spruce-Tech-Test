import { FastifyInstance } from "fastify";
import { getResults, postResults } from "./services/results.js";
import {
  getAllResults as getResultsSchema,
  postResults as postResultsSchema,
} from "./schema/results.js";

export const routes = (server: FastifyInstance) => {
  server.get("/", (req, reply) => {
    reply.sendFile("index.html");
  });

  server.get("/results", { schema: getResultsSchema }, getResults);
  server.post("/results", { schema: postResultsSchema }, postResults);
};
