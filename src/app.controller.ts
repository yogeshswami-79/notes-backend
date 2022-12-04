import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import * as bcript from 'bcrypt';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  
  @Post('register')
  async register(
    @Body('name') name : string,
    @Body('email') email : string,
    @Body('password') password : string
    ) {
      const hashedPass = await bcript.hash(password, 12);
      return this.appService.create({
        name,
        email,
        hashedPass
      }) 
    }

}
