import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import * as bcrypt from 'bcrypt';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  
  @Post('register')
  async register(
    @Body('name') name : string,
    @Body('email') email : string,
    @Body('password') password : string
    ) {
      const hash = await bcrypt.hash(password, 12 );

      return this.appService.create({
        name,
        email,
        password:hash
      });
    }

}
