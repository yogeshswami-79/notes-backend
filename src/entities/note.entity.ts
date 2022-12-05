import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne , JoinColumn, OneToMany } from 'typeorm';
import { User } from './user.entity';

@Entity("notes")
export class Note {
    @PrimaryGeneratedColumn()
    nid: number;

    @Column("date")
    time: string;

    @Column("text", { unique: true, })
    title: string;

    @Column("text")
    description: string;

    @Column("text")
    tag: string;

    @Column("int")
    uid: Number;

}