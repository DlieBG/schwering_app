import { Controller, Get } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';

@Controller('joke')
export class JokeController {

    constructor(
        private httpService: HttpService
    ) { }

    @Get()
    async getJoke() {
        return this.httpService.get('https://witzapi.de/api/joke').pipe(map(res => res.data[0]));
    }

}
