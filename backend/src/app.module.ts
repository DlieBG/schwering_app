import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './controllers/app/app.controller';
import { LoginController } from './controllers/login/login.controller';
import { DbService } from './services/db/db.service';
import { JokeController } from './controllers/utils/joke/joke.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '3y' },
    }),
  ],
  controllers: [
    AppController,
    LoginController,
    JokeController
  ],
  providers: [
    DbService
  ],
})
export class AppModule {}
