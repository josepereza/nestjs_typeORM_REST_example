import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MaxLength } from "class-validator";

export class CreateUserDto {  
    @ApiProperty({ 
        nullable: false, 
        description:'User login', type: () => String })
    @IsNotEmpty()  
    @MaxLength(100)
    username: string;

    @ApiProperty({ 
        nullable: false, 
        description:'User full name', type: () => String })
    @IsNotEmpty()  
    fullname: string;

    @ApiProperty({ 
        nullable: false, 
        description:'User password', type: () => String })
    @IsNotEmpty()  
    @MaxLength(250)
    password: string;
    
    
    @ApiProperty({ 
        nullable: false, 
        description:'User E-mail', type: () => String })
    @IsNotEmpty()  
    @IsEmail()  
    email: string;
}