// src/server.ts or src/app.ts
import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import { connectDB } from "./config/db";
import sampleRoutes from './routes/sample.routes';
import agentRoutes from './routes/agent.routes';

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

//Sample routes
app.use('/samples', sampleRoutes);

//Agent Routes

app.use('/agents', agentRoutes);



// Connect DB and start server
connectDB().then(() => {
  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`);
  });
});
