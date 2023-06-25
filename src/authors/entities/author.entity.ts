import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Book } from "src/books/entities/book.entity";

@Entity({
	name: 'authors',
	orderBy: {
		name: 'ASC'
	}
})
export class Author {
    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;
    
    @Column({ nullable: false, type:'varchar', length:150 })
    name: string; 
        
    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    // @OneToMany(() => Book, book => book.author, {
    //     onDelete: 'CASCADE',
    // })
    @OneToMany(() => Book, book => book.author)
    public books: Book[];
}
