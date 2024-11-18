import express from "express";
import { RenterController } from "../controller/renter.controller";
import { isAuthenticated } from "../middleware/authentication/auth.strategy";

const Router = express.Router();
Router.get("", isAuthenticated, RenterController.getRenters);
Router.post("", isAuthenticated, RenterController.insertRenter);

export { Router as renterRouter };