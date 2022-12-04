import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [ TypeOrmModule.forRoot({
    type: "postgres",
    host: "localhost",
    port: 9799,
    username: "icmi",
    password: "password",
    database: "testdbpg",
    logging: true,
    entities:[ User ],
  }),
  TypeOrmModule.forFeature( [ User ] ) ,
],
  controllers: [ AppController ],
  providers: [ AppService ],
})
export class AppModule {}
