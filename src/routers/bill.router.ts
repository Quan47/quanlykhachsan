import * as express from "express";
import { BillController } from "../controller/bill.controller";
import { isAuthenticated } from "../middleware/authentication/auth.strategy";

const Router = express.Router();

Router.post(
    "",
    isAuthenticated,
    BillController.createBill
)

Router.get(
    "",
    isAuthenticated,
    BillController.getAllBill
)

export { Router as billRouter };
