import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { CreateSaleDto } from './dto/create-sale.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SalesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: number, dto: CreateSaleDto) {
    return this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const requested = new Map<number, number>();
      for (const item of dto.items) requested.set(item.productId, (requested.get(item.productId) ?? 0) + item.quantity);
      const products = await tx.products.findMany({ where: { id: { in: [...requested.keys()] } } });
      if (products.length !== requested.size) throw new NotFoundException('Uno o más productos no existen.');
      const byId = new Map(products.map(product => [product.id, product]));
      let total = new Prisma.Decimal(0);
      const details: Array<{ productId: number; quantity: number; unitPrice: Prisma.Decimal; subtotal: Prisma.Decimal }> = [];
      for (const [productId, quantity] of requested) {
        const product = byId.get(productId)!;
        if (product.stock < quantity) throw new ConflictException(`Stock insuficiente para ${product.name}.`);
        const subtotal = product.price.mul(quantity);
        total = total.add(subtotal);
        details.push({ productId, quantity, unitPrice: product.price, subtotal });
      }
      const sale = await tx.sales.create({ data: { user_id: userId, total } });
      for (const detail of details) {
        const updated = await tx.products.updateMany({ where: { id: detail.productId, stock: { gte: detail.quantity } }, data: { stock: { decrement: detail.quantity } } });
        if (updated.count !== 1) throw new ConflictException('El stock cambió; intenta nuevamente.');
        await tx.sale_items.create({ data: { sale_id: sale.id, product_id: detail.productId, quantity: detail.quantity, unit_price: detail.unitPrice, subtotal: detail.subtotal } });
      }
      return tx.sales.findUnique({ where: { id: sale.id }, include: { sale_items: true } });
    });
  }
}
