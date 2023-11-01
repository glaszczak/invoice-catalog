import { Injectable } from '@nestjs/common';
import {
  HealthIndicator,
  HealthIndicatorResult,
  HealthCheckError,
} from '@nestjs/terminus';
import { InvoicesService } from '../../../src/invoices/invoices.service';

@Injectable()
export class EmittedEventsIndicator extends HealthIndicator {
  constructor(private invoicesService: InvoicesService) {
    super();
  }

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    const emittedEventsCount = this.invoicesService.getEmittedEventsCount();

    const result = this.getStatus(key, true, {
      emited_events: emittedEventsCount,
    });

    if (!result[key].status) {
      throw new HealthCheckError('Emitted Events check failed', result);
    }

    return result;
  }
}
