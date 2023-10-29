import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get('healthcheck')
  async checkHealth(): Promise<string> {
    return 'App is running!';
  }
}
