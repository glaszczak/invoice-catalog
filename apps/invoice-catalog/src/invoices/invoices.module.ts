import { Module } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'RABBITMQ_CLIENT',
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => {
          const user = configService.get('RABBITMQ_DEFAULT_USER');
          const password = configService.get('RABBITMQ_DEFAULT_PASS');
          const host = configService.get('RABBITMQ_HOST');
          const port = configService.get('RABBITMQ_PORT');
          const queue = configService.get('RABBITMQ_QUEUE_NAME');

          return {
          transport: Transport.RMQ,
          options: {
              urls: [`amqp://${user}:${password}@${host}:${port}`],
              queue,
            queueOptions: {
              durable: false,
            },
          },
          };
        },
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [InvoicesService],
  controllers: [InvoicesController],
  exports: [InvoicesService],
})
export class InvoiceModule {}
