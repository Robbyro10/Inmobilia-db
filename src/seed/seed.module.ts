import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { PropertiesModule } from 'src/properties/properties.module';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [PropertiesModule, AuthModule, ConfigModule.forRoot()]
})
export class SeedModule {}
