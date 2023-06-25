import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Author } from "src/authors/entities/author.entity";

@Entity({
	name: 'books',
	orderBy: {
		title: 'ASC'
	}
})
export class Book {
    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;
    
    @Column({ nullable: false, type:'varchar', length:200 })
    title: string; 

    @Column({ nullable: true, default: true })
    active: boolean; 

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Author, author => author.books, {
        //onDelete: 'CASCADE', 
        eager: false, // if true - all columns selected in find() method service
        cascade: ['insert','update'], // allow to create author when adding or edit book 
    })
    @JoinColumn({ name: "authorId" }) // <- optional
    public author: Author;

}
