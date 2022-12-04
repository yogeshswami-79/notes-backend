import { BadRequestException, Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import * as bcrypt from 'bcrypt';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) { }


  @Post('register')
  async register(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string
  ) {
    const hash = await bcrypt.hash(password, 12);

    let res;
    try {
      res = this.appService.create({
        name,
        email,
        password: hash
      });
    } catch (error) {
      res = { msg: "user exists" };
    }
    return res;
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string
  ) {
    const user = await this.appService.userExists({email});

    if (!user) {
      throw new BadRequestException("User not found!");
    }

    if (! await bcrypt.compare(password, user.password)) {
      throw new BadRequestException("Wrong password!");
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    }
  }

}
