import { Body, Controller, Get, Post , Query } from '@nestjs/common';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
    
    constructor(private readonly notesService:NotesService) { }

    @Get()
    async getNotes( @Query('uid') uid: string ) {
        const res = await this.notesService.getNotesByUID(uid);
        return res;
    }

    @Post('tags')
    async getNotesByTag( @Query('uid') uid: string, @Body('tags') tags: string[] ) {
        const res = await this.notesService.getNotesByTag(uid, tags);
        return res;
    }

    

    @Get('/top')
    async getTopTags( ) {
        const res = await this.notesService.getTopTags();
        return res;
    }


    @Post('insert')
    async insertNote( @Body('note') note: any ) {

    }

    @Post('delete')
    async deleteNote(@Body('uid') uid: string, @Body('nid') nid: string ) {
        const res = await this.notesService.deleteNote(uid,nid);
        return res
    }


}
