import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { User } from 'src/entities/user.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 9799,
      username: "icmi",
      password: "password",
      database: "testdbpg",
      logging: true,
      entities: [User],
    }),

    TypeOrmModule.forFeature([User]),

    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1d' }
    }),

  ],

  controllers: [ AuthController ],

  providers: [ AuthService ],

  exports: [ AuthService , JwtModule ]
})
export class AuthModule { }
