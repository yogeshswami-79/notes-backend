import { Injectable } from '@nestjs/common';

@Injectable()
export class NotesService {

    async getNotesByUID( uid: string ) {

    }

    async getNotesByTag( uid: string, tag: string[] ) {

    }

    async deleteNote( uid: string, nid: string ) {

    }

    async getTopTags(){
        
    }
}
