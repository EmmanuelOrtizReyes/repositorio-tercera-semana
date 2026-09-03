import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() { return this.prisma.products.findMany({ orderBy: { name: 'asc' } }); }

  async findOne(id: number) {
    const product = await this.prisma.products.findUnique({ where: { id } });
    if (!product) throw new NotFoundException('Producto no encontrado.');
    return product;
  }

  create(dto: CreateProductDto) {
    return this.prisma.products.create({ data: { name: dto.name, description: dto.description, price: dto.price, stock: dto.stock, category: dto.category } });
  }
}
