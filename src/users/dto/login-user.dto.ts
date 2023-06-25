import { IsEmail, IsNotEmpty, MaxLength } from "class-validator";

export class LoginUserDto {  
    @IsNotEmpty()  
    @MaxLength(4)
    username: string;
     
    @IsNotEmpty()  
    @MaxLength(250)
    password: string;
}