import { IsNotEmpty, IsEnum, IsString, IsNumber, IsOptional, ValidateIf } from 'class-validator';
import { RoleID } from '../interface/account.interface';

export class AccountSignUpDto {
    @IsNotEmpty()
    @IsString()
    fullName: string;

    @IsNotEmpty()
    @IsString()
    phone: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsEnum(RoleID)
    role: RoleID;

    constructor(fullName: string, phone: string, password: string, role: RoleID){
        this.fullName = fullName;
        this.password = password;
        this.phone = phone;
        this.role = role;
    }
}