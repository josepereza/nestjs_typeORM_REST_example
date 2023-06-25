import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user-class.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
    @InjectRepository(User)
      private userRepository: Repository<User>
    ) {}

    async findOneByUsername(username: string): Promise<User> | undefined {
        return await this.userRepository.findOneOrFail({
            where:{ username: username},
          });
    }


  async findOne(id: number): Promise<User | null> {
    return await this.userRepository.findOneOrFail({
      where:{ id: +id },
      select: {
        id: true,
        fullname: true,
        username: true,
        email: true
      },
    //relations: ['author'],
    });
  }

  async findOneByEmail(email: string): Promise<User> | undefined {
    return await this.userRepository.findOneOrFail({
      where:{ email: email} });
    }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({ 
      select: { 
        id: true,
        fullname: true,
        username: true,
        email: true            
      },
      where: { active: true }}
    );
  }

    // Check is user exists (email OR username)
    async create(userDto: CreateUserDto): Promise<UserDto> {    
        const { fullname, username, password, email } = userDto;
        const exists = await this.userRepository.exist({ 
            where: [
                { username: userDto.username }, 
                { email: userDto.email } 
        ]});

        if(exists) throw new ConflictException('User already exists!');

        const user: User = await this.userRepository.create({ fullname, username, password, email });
        await this.userRepository.save(user);

        //Return user (only fields selected in userDTO - without password field)
        const userDTO = new UserDto();
        userDTO.id = user.id;
        userDTO.fullname = user.fullname;
        userDTO.username = user.username;
        userDTO.email = user.email;
        return userDTO;  
    }

}
