import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request , Response , NextFunction } from "express";


@Injectable()
export class ValidatorMiddleware implements NestMiddleware{

    constructor(private jwtService: JwtService ) { }

    async use(req: Request, res: Response, next: NextFunction) {
        
        const cookie = req.cookies['jwt'];

        if(!cookie){
            return res.send({err:'login or register user first'});
        }

        const data = await this.jwtService.verifyAsync(cookie);

        if(data){
            req.user = data;
            return next();
        }
        else throw new UnauthorizedException();
    }
}