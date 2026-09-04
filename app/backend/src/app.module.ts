import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { ProductsModule } from './products/products.module';
import { SalesModule } from './sales/sales.module';

@Module({ imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, UsersModule, AuthModule, ProductsModule, SalesModule], controllers: [AppController] })
export class AppModule {}
