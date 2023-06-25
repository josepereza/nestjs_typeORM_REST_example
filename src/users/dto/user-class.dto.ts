import { IsEmail, IsNotEmpty } from "class-validator";

export class UserDto {  
    @IsNotEmpty()  
    id: number;

    fullname: string;

    @IsNotEmpty()  
    username: string;
     
    @IsNotEmpty()  
    @IsEmail()  
    email: string;
}