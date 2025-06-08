import { createMcpHandler } from "@vercel/mcp-adapter";
import { z } from "zod";

const handler = createMcpHandler(
  (server) => {
    server.tool(
      "raccomandazioniCorso",
      "Dai consigli sui corsi in base al livello di esperienza",
      {
        livelloEsperienza: z.enum(["basico", "intermedio"]),
      },
      async ({ livelloEsperienza }) => ({
        content: [
          {
            type: "text",
            text: `Ti raccondo di prendere il livello : ${
              livelloEsperienza === "basico" ? "Javascript" : "React.js"
            } del corso`,
          },
        ],
      })
    );
  },
  {
    capabilities: {
      tools: {
        raccomandazioniCorso: {
          descizione: "Dai consigli sui corsi in base al livello di esperienza",
        },
      },
    },
  },
  {
    redisUrl: process.env.REDIS_URL,
    sseEndpoint: "/sse",
    streamableHttpEndpoint: "mcp",
    verboseLogs: true,
    maxDuration: 60,
  }
);

export { handler as GET, handler as POST, handler as DELETE };
