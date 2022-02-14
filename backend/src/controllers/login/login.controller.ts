import { Body, Controller, Get, Post, UnauthorizedException, Headers, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DbService } from 'src/services/db/db.service';
import { LoginDto, LoginJwt } from 'src/types/login.type';

@Controller('login')
export class LoginController {

    constructor(
        private dbService: DbService,
        private jwtService: JwtService
    ) { }

    @Get()
    async check(@Headers('Authorization') authorizationHeader: string): Promise<LoginJwt> {
        let loginJwt: LoginJwt;
        
        try {
            loginJwt = this.jwtService.verify(authorizationHeader.substring(7));
            return loginJwt as LoginJwt;
        }
        catch {
            throw new UnauthorizedException();
        }          
    }

    @Post()
    async login(@Body() body): Promise<LoginDto> {
        let collection = await this.dbService.getCollection('users');
        let user = await collection.findOne({ pin: parseInt(body.pin) });

        if(!user)
            throw new ForbiddenException();

        return {
            jwt: this.jwtService.sign({
                id: user._id,
                name: user.name
            })
        }
    }
}
