import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
    tag: string

    @Column("int")
    uid: Number;

}