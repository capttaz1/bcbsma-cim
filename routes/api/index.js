import express from "express";
import { authRoutes } from "../../module/auth/auth.routes";
import { stepRoutes } from "../../module/steps/step.routes";

const apiRoutes = express.Router();

apiRoutes.get("/", function(req, res, next) {
  res.json({ message: "hello world!" });
});

apiRoutes.use("/auth", authRoutes);
apiRoutes.use("/data", stepRoutes);

export default apiRoutes;
