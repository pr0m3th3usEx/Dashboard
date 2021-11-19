import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/local/jwt.stategy';
import { JWT_SECRET } from 'src/config';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
import { WidgetModule } from 'src/widget/widget.module';
import { ServiceController } from './service.controller';
import { ServicesService } from './service.service';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    WidgetModule,
  ],
  providers: [ServicesService, JwtStrategy],
  controllers: [ServiceController],
  exports: [ServicesService],
})
export class ServiceModule {}
