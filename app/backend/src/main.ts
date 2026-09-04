import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import type { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { AppModule } from './app.module';

function isPrivateFrontendOrigin(origin: string): boolean {
  try {
    const url = new URL(origin);
    if (url.protocol !== 'http:' || url.port !== '5173') return false;

    const { hostname } = url;
    if (hostname === 'localhost' || hostname === '127.0.0.1') return true;

    const parts = hostname.split('.').map(Number);
    if (parts.length !== 4 || parts.some((part) => !Number.isInteger(part) || part < 0 || part > 255)) return false;

    const [first, second] = parts;
    return first === 10 || first === 192 && second === 168 || first === 172 && second >= 16 && second <= 31;
  } catch {
    return false;
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const frontendUrl = config.get<string>('FRONTEND_URL') || 'http://localhost:5173';
  const isProduction = config.get<string>('NODE_ENV') === 'production';
  const corsOptions: CorsOptions = {
    credentials: true,
    origin: (origin, callback) => {
      const allowed = !origin || origin === frontendUrl || !isProduction && isPrivateFrontendOrigin(origin);
      callback(allowed ? null : new Error('Origen no permitido por CORS.'), allowed);
    },
  };
  app.enableCors(corsOptions);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true, forbidNonWhitelisted: true }));
  const port = config.get<number>('PORT') || 3000;
  await app.listen(port, '0.0.0.0');
}
bootstrap();
