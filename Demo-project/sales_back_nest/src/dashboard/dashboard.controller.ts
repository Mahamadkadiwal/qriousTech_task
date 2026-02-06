import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('counts')
  async getCount() {
    return await this.dashboardService.getCount();
  }

  @Get('charts')
  getCharts() {
    return this.dashboardService.getCharts();
  }

  @Get('statusCount')
  getStatusCount() {
    return this.dashboardService.getStatusCount();
  }

  @Get('productCount')
  getProductCount() {
    return this.dashboardService.getProductCount();
  }
}
