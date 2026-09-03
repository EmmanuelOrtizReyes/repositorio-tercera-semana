import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly products: ProductsService) {}
  @Get() findAll() { return this.products.findAll(); }
  @Get(':id') findOne(@Param('id', ParseIntPipe) id: number) { return this.products.findOne(id); }
  @UseGuards(AuthGuard('jwt')) @Post() create(@Body() dto: CreateProductDto) { return this.products.create(dto); }
}
