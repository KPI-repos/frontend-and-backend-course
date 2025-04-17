import "reflect-metadata";
import "@/di/container";
import express from "express";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/errorHandler";
import plantRoutes from "./plant/routes/plantRoutes";
import categoryRoutes from "./category/routes/categoryRoutes";
import careGuideRoutes from "@/care-guide/routes/careGuideRoutes";
import authRoutes from "@/auth/routes/authRoutes";

dotenv.config();

const app = express();

app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/care-guide", careGuideRoutes);
app.use("/category", categoryRoutes);
app.use("/plant", plantRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is started on port ${PORT}`);
});

export default app;
