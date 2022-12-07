import { BadRequestException, Body, Controller, Get, NotAcceptableException, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
        private jwtService: JwtService
    ) { }


    @Post('register')
    async register(
        @Body('name') name: string,
        @Body('uname') uname: string,
        @Body('email') email: string,
        @Body('password') password: string
    ) {

        console.log('d', name, uname, email, password);
        const hash = await bcrypt.hash(password, 12);

        try {
            const user = await this.authService.create({ name, uname, email, password: hash });
            delete user.password;
            return user;
        }
        catch (err) {
            throw new NotAcceptableException();
        }
    }

    @Post('login')
    async login(
        @Body('uname') uname: string,
        @Body('password') password: string,
        @Res({ passthrough: true }) response: Response
    ) {
        console.log('d',uname);
        const user = await this.authService.userExists({ uname });

        if (!user) {
            throw new BadRequestException("User not found!");
        }

        if (! await bcrypt.compare(password, user.password)) {
            throw new BadRequestException("Wrong password!");
        }

        const payload = {
            uid: user.uid,
            name: user.name,
            email: user.email,
        }

        const jwt = await this.jwtService.signAsync(payload);

        response.cookie('jwt', jwt, { httpOnly: true } );

        const msg = { message: 'Success' }
        return msg;

    }



    @Post('logout')
    async logout(@Res({ passthrough: true }) response: Response) {
        response.clearCookie('jwt');
        return { message: 'success' };
    }


    @Get('user')
    async user(
        @Req() request: Request
    ) {

        try {
            const cookie = request.cookies['jwt'];

            const data = await this.jwtService.verifyAsync(cookie);
            if (!data) throw new UnauthorizedException();

            const user = await this.authService.userExists({ uid: data['uid'] })

            const { password, ...result } = user;

            return result;

        } catch (error) {
            throw new UnauthorizedException();
        }
    }

}
