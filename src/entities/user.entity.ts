import { Entity , Column , PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column( "text" , { unique:true,  } )
    email:string;

    @Column("text")
    password:string;
    
}