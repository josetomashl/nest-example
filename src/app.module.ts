import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { customConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        synchronize: true,
        autoLoadEntities: true,
        host: configService.get('DB_host'),
        port: configService.get('DB_port'),
        username: configService.get('DB_username'),
        password: configService.get('DB_password'),
        database: configService.get('DB_database'),
      }),
    }),
    JwtModule.register({
      global: true,
      secret: customConstants.jwtSecret,
      signOptions: { expiresIn: '3600s' },
    }),
    AuthModule,
    TasksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
