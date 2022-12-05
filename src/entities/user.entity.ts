import { Entity , Column , PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Note } from './note.entity';


@Entity('users')
export class User{

    @PrimaryGeneratedColumn()
    uid:number;

    @Column()
    name:string;

    @Column("text", { unique:true, nullable:false} )
    uname:string
    
    @Column( "text" , { unique:true, nullable:false } )
    email:string;

    @Column("text", { nullable:false } )
    password:string;

    // @OneToMany(()=>Note, note=> note.user)
    // notes:Note[];

}