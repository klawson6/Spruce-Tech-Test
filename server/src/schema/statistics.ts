export const statistics = {
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
