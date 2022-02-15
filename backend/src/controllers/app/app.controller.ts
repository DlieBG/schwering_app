import { Controller, Get, UnauthorizedException, Headers, Param, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ObjectId } from 'mongodb';
import { DbService } from 'src/services/db/db.service';
import { App } from 'src/types/app.type';
import { LoginJwt } from 'src/types/login.type';

@Controller('app')
export class AppController {

    constructor(
        private dbService: DbService,
        private jwtService: JwtService
    ) { }

    @Get()
    async getApps(@Headers('Authorization') authorizationHeader: string): Promise<App[]> {
        let loginJwt: LoginJwt;
        
        try {
            loginJwt = this.jwtService.verify(authorizationHeader.substring(7));
        }
        catch {
            throw new UnauthorizedException();
        }

        let userCollection = await this.dbService.getCollection('users');
        let appCollection = await this.dbService.getCollection('apps');
        
        let user = await userCollection.findOne({ _id: new ObjectId(loginJwt.id) }); 
        let apps = await appCollection.find({ appId: { $in: user.apps } }).sort({ sort: 1 }).toArray();

        return apps as any as  App[];
    }

    @Get(':appId')
    async getApp(@Headers('Authorization') authorizationHeader: string, @Param('appId') appId: string): Promise<App> {
        let loginJwt: LoginJwt;
        
        try {
            loginJwt = this.jwtService.verify(authorizationHeader.substring(7));
        }
        catch {
            throw new UnauthorizedException();
        }

        let userCollection = await this.dbService.getCollection('users');
        let appCollection = await this.dbService.getCollection('apps');
        
        let user = await userCollection.findOne({ _id: new ObjectId(loginJwt.id) }); 
        
        if(user.apps.indexOf(appId) > -1) {
            let app = await appCollection.findOne({ appId });

            return {
                appId: app['appId'],
                name: app['name'],
                shortName: app['shortName'],
                description: app['description'],
                icon: app['icon'],
                url: app['url'],
                widgetUrl: app['widgetUrl']
            };
        } else {
            throw new ForbiddenException();
        }
    }


}
