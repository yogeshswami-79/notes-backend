import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { User } from 'src/entities/user.entity';
import { Note } from 'src/entities/note.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 9799,
      username: "icmi",
      password: "password",
      database: "notes",
      logging: true,
      entities: ['dist/**/*.entity.{js,ts}'],
    }),

    TypeOrmModule.forFeature( [ User, Note ] ),

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
