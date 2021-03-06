import { Controller, Get, Request } from '@nestjs/common';
import { ServiceConfiguration } from './services/services.dto';
import AVAILABLE_SERVICES from './services/services.json';
import { IpAddr } from './utils/ip.decorator';
import { WidgetParameterConfiguration } from './widget/widget.dto';

type About = {
  client: {
    host: string;
  };
  server: {
    current_time: number;
    services: {
      name: string;
      widgets: {
        name: string;
        description: string;
        params: WidgetParameterConfiguration[];
      }[];
    }[];
  };
};

@Controller('')
export class AppController {
  @Get('about.json')
  async about(@Request() req, @IpAddr() addr: string): Promise<About> {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    return {
      client: {
        host: ip,
      },
      server: {
        current_time: Date.now(),
        services: <ServiceConfiguration[]>AVAILABLE_SERVICES.map((service) => ({
          name: service.name,
          widgets: service.widgets.map((widgets) => ({
            name: widgets.name,
            description: widgets.description,
            params: widgets.params,
          })),
        })),
      },
    };
  }
}
