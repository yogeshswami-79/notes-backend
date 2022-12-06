import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from 'src/entities/note.entity';
import { User } from 'src/entities/user.entity';
import { ArrayContains, CollectionDistinctOptions, Equal, FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class NotesService {
   
    constructor(
        @InjectRepository(Note) private noteRepo: Repository<Note>,
        @InjectRepository(User) private readonly userRepo: Repository<User>
    ) { }



    async getTopTags() {
        return this.noteRepo
        .createQueryBuilder("notes")
        .select('DISTINCT ("tag")')
        .limit(10)
        .getRawMany();
    }

    private async userExists(uid: any ) {
        return this.userRepo.findOneBy(uid);
    }


    async getNotes(uid:any, skip: number = 0){
        const where: FindManyOptions<Note>['where']={};
        where.uid = Equal(uid);

        return this.noteRepo.findAndCount({
            where,
            skip,
            take:10
        })
    }

    async getNotesByTag(uid: string , tag: string, skip: number = 0){
        const where: FindManyOptions<Note>['where']={};
        where.uid = Equal(uid);
        where.tag = Equal(tag);

        return this.noteRepo.findAndCount({
            where,
            skip,
            take:10
        })
    }


    async insertNote( data:any ) {
        const user = await this.userExists({uid:data.uid});
        return this.noteRepo.save(data);
    }

    async deleteNote(obj:any) {
        const note = await this.noteRepo.findOneBy(obj);
        if(note)    this.noteRepo.delete(this.noteRepo.getId(note));
    }



}
