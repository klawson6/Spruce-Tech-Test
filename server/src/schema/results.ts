export const getAllResults = {
  response: {
    200: {
      type: "object",
      properties: {
        X: { type: "number" },
        O: { type: "number" },
        draw: { type: "number" },
      },
    },
  },
};

export const patchResults = {
  body: {
    type: "object",
    required: ["size", "winner"],
    properties: {
      size: {
        type: "number",
        minimum: 3,
        maximum: 15,
      },
      winner: {
        type: "string",
        enum: ["X", "O", "draw"],
      },
    },
  },
  response: {
    201: {
      type: "object",
      properties: {
        size: { type: "number" },
        X: { type: "number" },
        O: { type: "number" },
        draw: { type: "number" },
      },
    },
  },
};
