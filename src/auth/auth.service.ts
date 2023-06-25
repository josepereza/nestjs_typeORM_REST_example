import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {   

    constructor(private readonly userService: UsersService) {}

    async validateUser(username: string, password: string) : Promise<User>  {
        try {
            const user = await this.userService.findOneByUsername(username);
            
            const passwordMatch = await bcrypt.compare(
                password, user.password,
            );

            if (!passwordMatch) {
                throw new HttpException('Invalid Credentials', HttpStatus.BAD_REQUEST);
            }
    
            if(user && passwordMatch){
                const { password, username, ...rest } = user;
            }
            return user; 
        } catch (error) {
            throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
      }
    }

}