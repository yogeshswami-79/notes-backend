import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from "@nestjs/typeorm";
import { User } from './entities/user.entity';


@Injectable()
export class AppService {
  constructor( @InjectRepository(User) private readonly userRepository: Repository<User> ){}

  async create(data:any): Promise<User> {
    return this.userRepository.save(data);
  }

}