import { RoleID } from "../interface/account.interface";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.entity";

@Entity({ name: 'account' })
export class Account {
    @PrimaryGeneratedColumn("uuid")
    Id: string;

    @Column()
    fullName: string;

    @Column()
    phone: string;

    @Column()
    password: string;

    @Column()
    role: RoleID;

    @Column({ default: true })
    active: boolean;
}