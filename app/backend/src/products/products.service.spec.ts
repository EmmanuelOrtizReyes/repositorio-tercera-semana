import { NotFoundException } from '@nestjs/common';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  const prisma = {
    products: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  } as any;
  const service = new ProductsService(prisma);

  beforeEach(() => jest.clearAllMocks());

  it('returns products ordered by name', async () => {
    prisma.products.findMany.mockResolvedValue([{ id: 1, name: 'Mazapán' }]);
    await expect(service.findAll()).resolves.toEqual([{ id: 1, name: 'Mazapán' }]);
    expect(prisma.products.findMany).toHaveBeenCalledWith({ orderBy: { name: 'asc' } });
  });

  it('rejects a product that does not exist', async () => {
    prisma.products.findUnique.mockResolvedValue(null);
    await expect(service.findOne(99)).rejects.toBeInstanceOf(NotFoundException);
  });

  it('creates a valid product through Prisma', async () => {
    const dto = { name: 'Paleta', description: 'Fresa', price: 5, stock: 10 };
    prisma.products.create.mockResolvedValue({ id: 2, ...dto });
    await expect(service.create(dto)).resolves.toMatchObject(dto);
    expect(prisma.products.create).toHaveBeenCalledWith({ data: { ...dto, category: undefined } });
  });
});
