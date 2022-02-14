import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './controllers/app/app.controller';
import { LoginController } from './controllers/login/login.controller';
import { DbService } from './services/db/db.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '3y' },
    }),
  ],
  controllers: [
    AppController,
    LoginController],
  providers: [
    DbService
  ],
})
export class AppModule {}
