import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('tags')
export class Tag{
    @PrimaryGeneratedColumn()
    tid:number;

    @Column('text')
    tag: string;
}