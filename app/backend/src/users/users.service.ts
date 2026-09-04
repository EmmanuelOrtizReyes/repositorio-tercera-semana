import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  findByEmail(email: string) { return this.prisma.users.findUnique({ where: { email } }); }
  findById(id: number) { return this.prisma.users.findUnique({ where: { id } }); }
  create(name: string, email: string, passwordHash: string) { return this.prisma.users.create({ data: { name, email, password_hash: passwordHash } }); }
}
