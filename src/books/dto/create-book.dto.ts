import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";
import { Author } from "src/authors/entities/author.entity";

export class CreateBookDto {
    @IsString()
    @IsNotEmpty({ message: 'title is required' })
    @ApiProperty({ 
        nullable: false, 
        description:'Tytuł ksiązki', type: () => String 
        })
    public title: string;

    @IsNumber()
    @IsNotEmpty({ message: 'authorId is required' })
    @ApiProperty({ 
         nullable: false, 
         description:'Id autora książki', type: () => Number 
         })
    public author: Author;
}
