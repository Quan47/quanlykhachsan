import * as express from "express";
import { AccountController } from "../controller/account.controller";
import passport from "passport";
import { isAuthenticated } from "../middleware/authentication/auth.strategy";
import { isRole } from "../middleware/authentication/role.strategy";
import { RoleID } from "../interface/account.interface";
import { isOwner } from "../middleware/interceptor/isOwner.interceptor";

const Router = express.Router();

Router.post(
  "/sign-in", (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err || !user)
        res.status(400).json({
          message: info.message
        })
      else {
        req['user']= user;
        next();
      }
    })(req, res, next)
  },
  AccountController.signIn
)

Router.post(
  "/sign-up",
  isAuthenticated,
  isRole([RoleID.GD, RoleID.QL]),
  AccountController.signUp
);

Router.get(
  "",
  isAuthenticated,
  isRole([RoleID.GD, RoleID.QL]),
  AccountController.getAllAccount
)

Router.get(
  "/:accountId",
  isAuthenticated,
  isOwner,
  AccountController.getAccountDetail
)

Router.patch(
  "/:accountId/status",
  isAuthenticated,
  isRole([RoleID.QL, RoleID.GD]),
  AccountController.updateAccountStatus
)

export { Router as accountRouter };