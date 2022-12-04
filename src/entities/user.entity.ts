import { Entity , Column , PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User{

    @PrimaryGeneratedColumn()
    id:number;

    @Column({length:80})
    name:string;

    @Column("text")
    email:string;

    @Column()
    password:string;
    
}