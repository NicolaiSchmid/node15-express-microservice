import { Router } from "express";

export default ({ app }) => {
  const router = Router();

  router.post("/", (request, response) => {
    return response.json({ message: "Hello world!", body: request.body });
  });

  return router;
};
