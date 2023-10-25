import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
} from '@nestjs/terminus';
import { EmittedEventsIndicator } from './custom-indicators/emitted-events.indicator';
import { RabbitMQHealthIndicator } from './custom-indicators/rabbitmq-health.indicator';

@Controller('health')
export class HealthController {
  constructor(
    private healthCheckService: HealthCheckService,
    private http: HttpHealthIndicator,
    private emittedEventsIndicator: EmittedEventsIndicator,
    private rabbitMQHealthIndicator: RabbitMQHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  async check() {
    return this.healthCheckService.check([
      async () =>
        this.http.pingCheck('App', `${process.env.HOST}:${process.env.PORT}`),
      async () => this.rabbitMQHealthIndicator.isHealthy('RabbitMQ'),
      async () => this.emittedEventsIndicator.isHealthy('Emitted Events'),
    ]);
  }
}
