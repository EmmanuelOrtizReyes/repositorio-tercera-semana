import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateSaleDto } from './dto/create-sale.dto';
import { SalesService } from './sales.service';

@Controller('sales')
@UseGuards(AuthGuard('jwt'))
export class SalesController {
  constructor(private readonly sales: SalesService) {}
  @Post() create(@Req() req: { user: { id: number } }, @Body() dto: CreateSaleDto) { return this.sales.create(req.user.id, dto); }
}
