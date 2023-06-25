import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateAuthorDto {
    @IsString()
    @IsNotEmpty({ message: 'name is required' })
    @MinLength(5)
    @ApiProperty({ 
        nullable: false, 
        description:'Imię i nazwisko autora', type: () => String 
        })
    public name: string;
}
