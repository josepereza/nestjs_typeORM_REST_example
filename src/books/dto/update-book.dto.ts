import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class UpdateBookDto {
    @IsString()
    @IsNotEmpty({ message: 'title is required' })
    @ApiProperty({ 
        nullable: false, 
        description:'Tytuł ksiązki', type: () => String 
    })
    public title: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ 
        nullable: false, 
        description:'Autor książki', type: () => Number 
        })
    public authorId: number;

}

