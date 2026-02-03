import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CommonModule } from './common/common.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        console.log(config.get('MONGO_URI'));
        return {
          uri: config.get<string>('MONGO_URI'),
        };
      },
    }),

    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
        tls: {
          rejectUnauthorized: false, // IMPORTANT for Windows/dev
        },
      },
    }),

    AuthModule,
    UserModule,
    CommonModule,
    ProductModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
