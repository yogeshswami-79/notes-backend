import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { NotesModule } from './notes/notes.module';


const man = {
  type: "postgres",
  host: "localhost",
  port: 9799,
  username: "icmi",
  password: "password",
  database: "notes",
  logging: true,
  entities: ['dist/**/*.entity.{js,ts}'],
}

@Module({

  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "postgresql-99214-0.cloudclusters.net",
      port: 17448,
      username: "icmi",
      password: "password",
      database: "notes",
      logging: true,
      entities: ['dist/**/*.entity.{js,ts}'],
    }),

    AuthModule,
    NotesModule
  ],

  controllers: [AppController],

  providers: [AppService],

})

export class AppModule { }
