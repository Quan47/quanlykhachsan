import { AppDataSource } from "../database";
import { Bill } from "../model/bill.entity";
import { Renter } from "../model/renter.entity";
import { In } from "typeorm";
import { Room } from "../model/room.entity";

export class BillService {
    static async createBill(payload: any) {
        try {
            console.log(`${BillService.name} - createBill - started`);
            const renterRepository = await AppDataSource.getRepository(Renter);
            const renters = await renterRepository.find({
                where: {
                    Id: In(payload?.renters ?? ["6416895c-2ba3-ef11-88cd-00224826d2d5"])
                }
            });
            const roomRepository = await AppDataSource.getRepository(Room);
            const room = await roomRepository.findOne({
                where: {
                    Id: payload?.roomId
                },
                relations: {
                    type: true
                }
            });

            const bill = new Bill();
            bill.inDay = new Date(payload?.inDay);
            bill.outDay = payload?.outDay ? new Date(payload.outDay) : new Date();
            bill.total = Math.ceil(Math.abs(bill.inDay.getDate() - bill.outDay.getDate())) * room.type.price;
            bill.roomId = payload.roomId;
            bill.renters = renters;
            bill.note = payload?.note ?? '';
            // console.log(bill);
            const billRepository = await AppDataSource.getRepository(Bill);
            const billSaved = await billRepository.save(bill);
            return billSaved;

        } catch (error) {
            console.error(`${BillService.name} - createBill - Error: ${error}`);
            throw error;
        }
    }

    static async getAllBill(){
        try {
            console.log(`${BillService.name} - getAllBill - started`);
            const billRepository = await AppDataSource.getRepository(Bill);
            const bills = await billRepository.find({
                relations: {
                    renters: true
                }
            })
            return bills;
        } catch (error) {
            console.error(`${BillService.name} - getAllBill - Error: ${error}`);
            throw error;
        }
    }
}