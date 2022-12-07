import { Body , Controller, Get, Post, Query , BadRequestException, Req, NotFoundException } from '@nestjs/common';
import { Request } from 'express';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {

    constructor(private readonly notesService: NotesService) { }

    private getFilteredTags(tags:string){
        return tags.split(',').map( (t) => {
            const tag = t.trimEnd().trimStart();
            return tag.trim();
        });
    }

    @Get()
    async getNotes(
        @Req() req: Request,
        @Query('skip') skip: number,
    ){
        const uid = req.user['uid'];
        return await this.notesService.getNotes(uid, skip);
    }

    @Get('/bytag')
    async getByTag(
        @Req() req: Request,
        @Query('tag') tag: string,
        @Query('skip') skip: number = 0
    ){
        const uid = req.user['uid'];
        
        const filtTag = tag.trimEnd().trimStart().split(',')[0].trim();
        
        return await this.notesService.getNotesByTag(uid, filtTag ,skip);

    }


    @Get('/top')
    async getTopTags() {
        const res = await this.notesService.getTopTags();
        return res.map(obj=>obj.tag);
    }


    @Post('insert')
    async insertNote(
        @Req() req: Request,
        @Body('title') title: string,
        @Body('description') description: string,
        @Body('tag') tag: string,
    ) {
        const uid = req.user['uid']
        
        const filteredTag = this.getFilteredTags(tag)[0];

        const note = { time: new Date() , title , description , tag:filteredTag , uid };

        try {
            const res= await this.notesService.insertNote(note);
            return res;
        } catch (error) {
            throw new BadRequestException();
        }
    }

    @Post('delete')
    async deleteNote(
            @Req() req:Request, 
            @Body('nid') nid: string
        ) {
            const obj = {uid:req.user['uid'], nid };

            try {
                await this.notesService.deleteNote(obj);
                return {msg:'deleted'}
            } catch (error) {
                throw new NotFoundException();
            }
    }

}
