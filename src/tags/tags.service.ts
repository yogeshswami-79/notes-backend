import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from 'src/entities/tag.entitt';
import { Repository } from 'typeorm';

@Injectable()
export class TagsService {
    constructor( @InjectRepository(Tag) private tagRepo: Repository<Tag> ) { }

    async getTag(condition:any){
        return this.tagRepo.findOneBy(condition);
    }

    async getTopTags() {
        
    }

}
