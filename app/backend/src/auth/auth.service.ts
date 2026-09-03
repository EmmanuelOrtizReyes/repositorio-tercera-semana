import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly users: UsersService, private readonly jwt: JwtService) {}
  private publicUser(user: { id: number; name: string; email: string }) { return { id: user.id, name: user.name, email: user.email }; }
  async register(dto: RegisterDto) {
    if (await this.users.findByEmail(dto.email)) throw new ConflictException('Este correo ya está registrado.');
    const passwordHash = await bcrypt.hash(dto.password, 12);
    return { user: this.publicUser(await this.users.create(dto.name, dto.email, passwordHash)) };
  }
  async login(dto: LoginDto) {
    const user = await this.users.findByEmail(dto.email);
    if (!user || !(await bcrypt.compare(dto.password, user.password_hash))) throw new UnauthorizedException('Correo o contraseña incorrectos.');
    return { accessToken: await this.jwt.signAsync({ sub: user.id, email: user.email }), user: this.publicUser(user) };
  }
}
