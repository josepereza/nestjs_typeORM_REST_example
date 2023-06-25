import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;
    
    @Column({ nullable: true, type:'varchar', length:150 })
    fullname: string; 

    @Column({ nullable: false, type:'varchar', length:200 })
    username: string; 

    @Column({ nullable: false, type:'varchar', length:250 })
    password: string; 

    @Column({ nullable: false, type:'varchar', length:250 })
    email: string; 

    @Column({ nullable: true, default: true })
    active: boolean; 

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
   
    @BeforeInsert() async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);  
    }
}
