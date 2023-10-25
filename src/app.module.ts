import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';
import { InvoiceModule } from './invoices/invoices.module';

@Module({
  imports: [HealthModule, InvoiceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
