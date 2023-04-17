import { PrismaClient } from "@prisma/client";
import fastify from "fastify";

import { z } from "zod";

const app = fastify();

const prisma = new PrismaClient();

app.get("/periods", async () => {
  const periods = await prisma.soyPeriod.findMany();

  return { periods };
});

app.get("/periods/period/:uf", async (req, reply) => {
  const { uf } = req.params;
  console.log(uf);

  const period = await prisma.soyPeriod.findFirstOrThrow({
    where: { uf: uf },
  });

  if (period) {
    console.log('period',period)
    return reply.status(201).send(period);
  }
});

app.post("/periods", async (req, reply) => {
  const createSoyPeriodSchema = z.object({
    uf: z.string(),
    state: z.string(),
    region: z.string(),
    period: z.string(),
  });

  const { uf, state, region, period } = createSoyPeriodSchema.parse(req.body);

  await prisma.soyPeriod.create({
    data: {
      uf,
      state,
      region,
      period,
    },
  });
  return reply.status(201).send();
});

app
  .listen({
    host: "0.0.0.0",
    port: process.env.PORT ? Number(process.env.PORT) : 3333,
  })
  .then(() => {
    console.log("HTTP Server Running.");
  });
