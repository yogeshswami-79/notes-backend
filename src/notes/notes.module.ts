import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from 'src/entities/note.entity';
import { User } from 'src/entities/user.entity';
import { ValidatorMiddleware } from 'src/middleware/validator';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';

@Module({
  imports: [
    
    TypeOrmModule.forFeature( [ Note , User ] ) , 
    
    JwtModule.register( {
      secret: 'secret',
      signOptions: { expiresIn: '1d' }
      }
    )
     
] ,
  controllers: [ NotesController ] ,
  providers: [ NotesService ] ,
  exports: [ NotesService ]
})

export class NotesModule implements NestModule {
  
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidatorMiddleware).forRoutes('notes')
  }

}
