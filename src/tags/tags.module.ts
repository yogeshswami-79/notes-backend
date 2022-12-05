import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Note } from 'src/entities/note.entity';
import { User } from 'src/entities/user.entity';
import { Tag } from 'src/entities/tag.entitt';

@Module({
  imports:[
    TypeOrmModule.forFeature( [ Note , User , Tag ] ) , 
    
    JwtModule.register( {
      secret: 'secret',
      signOptions: { expiresIn: '1d' }
      }
    )
  ],
  providers: [TagsService],
  controllers: [TagsController],
  exports: [ TagsService ]
})
export class TagsModule {}
