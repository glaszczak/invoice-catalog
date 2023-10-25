import { Injectable } from '@nestjs/common';
import {
  HealthIndicator,
  HealthIndicatorResult,
  HealthCheckError,
} from '@nestjs/terminus';
import * as amqp from 'amqp-connection-manager';

@Injectable()
export class RabbitMQHealthIndicator extends HealthIndicator {
  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    try {
      const connection = amqp.connect(
        `amqp://${process.env.RABBITMQ_DEFAULT_USER}:${process.env.RABBITMQ_DEFAULT_PASS}@${process.env.RABBITMQ_HOST}:5672`,
      );

      await connection.close();

      return this.getStatus(key, true);
    } catch (error) {
      throw new HealthCheckError(
        'RabbitMQ check failed',
        this.getStatus(key, false, { message: error.message }),
      );
    }
  }
}
