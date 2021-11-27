import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ScheduleModule } from '@nestjs/schedule';
import { CryptoService } from 'src/apis/crypto/crypto.service';
import { RedditService } from 'src/apis/reddit/reddit.service';
import { TwitterService } from 'src/apis/twitter/twitter.service';
import { JwtStrategy } from 'src/auth/local/jwt.stategy';
import { JWT_SECRET } from 'src/config';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
import { WidgetController } from './widget.controller';
import { WidgetService } from './widget.service';

@Module({
  imports: [
    PrismaModule,
    ScheduleModule.forRoot(),
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    UserModule,
  ],
  controllers: [WidgetController],
  providers: [
    WidgetService,
    JwtStrategy,
    CryptoService,
    RedditService,
    TwitterService,
  ],
  exports: [WidgetService],
})
export class WidgetModule {}
