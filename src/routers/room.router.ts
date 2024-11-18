import * as express from "express";
import { isAuthenticated } from "../middleware/authentication/auth.strategy";
import { RoomController } from "../controller/room.controller";
import { isRole } from "../middleware/authentication/role.strategy";
import { RoleID } from "../interface/account.interface";

const Router = express.Router();


Router.get(
    "",
    isAuthenticated
    ,
    RoomController.getRooms
)

Router.get(
    "/room-type",
    isAuthenticated
    ,
    RoomController.getRoomType
)

Router.get(
    "/:roomId",
    isAuthenticated,
    RoomController.getRoomDetail
)

Router.post(
    "",
    isAuthenticated,
    isRole([RoleID.QL, RoleID.GD]),
    RoomController.insertRoom
)

Router.patch(
    "/status",
    isAuthenticated,
    RoomController.changeRoomStatus
)



export { Router as roomRouter };