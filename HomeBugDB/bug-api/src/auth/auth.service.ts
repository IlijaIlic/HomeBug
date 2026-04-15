import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from '@modules/bcryptjs';
import { CreateUserDto } from '@user/dto/create-user.dto';
import { UserService } from '@user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async register(createUserDto: CreateUserDto) {
        const user = await this.userService.create(createUserDto);

        return this.login(user)
    }

    async login(user: any) {
        const payload = { sub: user.id, email: user.email };

        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                name: user.name,
                surname: user.surname,
                email: user.email,
                gender: user.gender
            },
        };
    }

    async validateUser(email: string, password: string){
        const user = await this.userService.findByEmail(email);
        if(!user){
            throw new UnauthorizedException("Invalid email or password!")
        }

        const passValid = await bcrypt.compare(password, user.password);

        if(!passValid){
            throw new UnauthorizedException("Invalid email or password!")
        }

        return user;

    }
}
