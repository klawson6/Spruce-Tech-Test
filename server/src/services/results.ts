import { FastifyReply, FastifyRequest } from "fastify";
import { PatchResultsRequestBody } from "./results.types";

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

  reply.code(200).send({
    X: results._sum.X ?? 0,
    O: results._sum.O ?? 0,
    draw: results._sum.draw ?? 0,
  });
};

export const patchResults = async (
  request: FastifyRequest<{ Body: PatchResultsRequestBody }>,
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
