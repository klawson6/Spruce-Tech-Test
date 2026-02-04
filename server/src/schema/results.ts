export const getAllResults = {
  consumes: ["text/plain"],
  response: {
    "200": {
      description: "OK",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              X: {
                type: "number",
              },
              O: {
                type: "number",
              },
              draw: {
                type: "number",
              },
            },
          },
        },
      },
    },
  },
};

export const patchResults = {
  body: {
    type: "object",
    properties: {
      size: {
        type: "number",
      },
      winner: {
        type: "string",
        enum: ["X", "O", "draw"],
      },
    },
  },
  response: {
    "201": {
      description: "Created",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              size: { type: "number" },
              X: { type: "number" },
              O: { type: "number" },
              draw: { type: "number" },
            },
          },
        },
      },
    },
  },
};
