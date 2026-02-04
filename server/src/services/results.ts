import { FastifyReply, FastifyRequest } from "fastify";
import { PostResultsRequestBody } from "./results.types";

export const getResults = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const results = await request.server.prisma.results.aggregate({
    _sum: {
      X: true,
      O: true,
      draw: true,
    },
  });

  if (Object.values(results._sum).some((s) => s === null))
    reply.code(500).send("Database error");

  reply.code(200).send({
    X: results._sum.X as number,
    O: results._sum.O as number,
    draw: results._sum.draw as number,
  });
};

export const postResults = async (
  request: FastifyRequest<{ Body: PostResultsRequestBody }>,
  reply: FastifyReply,
) => {
  const { size, winner } = request.body;

  const results = await request.server.prisma.results.upsert({
    where: {
      size: size,
    },
    update: {
      [winner]: {
        increment: 1,
      },
    },
    create: {
      size: size,
      [winner]: 1,
    },
    omit: {
      id: true,
    },
  });
  reply.code(201).send(results);
};
