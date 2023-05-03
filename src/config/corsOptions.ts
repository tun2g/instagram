export const corsOptions={
    origin: `${process.env.CLIENT_API}`,
    methods: ["GET", "POST"],
    credentials: true,
  }