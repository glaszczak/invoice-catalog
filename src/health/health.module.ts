import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { EmittedEventsIndicator } from './custom-indicators/emitted-events.indicator';
import { InvoiceModule } from 'src/invoices/invoices.module';
import { RabbitMQHealthIndicator } from './custom-indicators/rabbitmq-health.indicator';

@Module({
  imports: [
    TerminusModule.forRoot({
      errorLogStyle: 'pretty',
    }),
    HttpModule,
    InvoiceModule,
  ],
  controllers: [HealthController],
  providers: [RabbitMQHealthIndicator, EmittedEventsIndicator],
})
export class HealthModule {}
