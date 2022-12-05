import { Body , Controller, Get, Post, Query , BadRequestException, Req, NotFoundException } from '@nestjs/common';
import { Request } from 'express';
import { User } from 'src/entities/user.entity';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {

    constructor(private readonly notesService: NotesService) { }


    @Get()
    async getNotes(
        @Req() req: Request,
        @Query('skip') skip: number,
    ){
        const uid = req.user['uid'];
        return await this.notesService.getNotes(uid, skip);
    }

    @Get()
    async getByTag(
        @Req() req: Request,
        @Query('tag') tag: string,
        @Query('skip') skip: number
    ){
        const uid = req.user['uid'];
        return await this.notesService.getNotesByTag(uid, tag, skip);  
    }

    @Post('tags')
    async getNotesByTag(
        @Req() req: Request, 
        @Query('tags') tags: string[]) {
        
    }


    @Get('/top')
    async getTopTags() {
        const res = await this.notesService.getTopTags();
        return res;
    }


    @Post('insert')
    async insertNote(
        @Req() req: Request,
        @Body('title') title: string,
        @Body('description') description: string,
        @Body('tag') tag: string[],
    ) {
        const uid = req.user['uid']

        const note = { time: new Date() , title , description , tag , uid };

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
