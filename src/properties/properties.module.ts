import { Module } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { PropertiesController } from './properties.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Property, PropertySchema } from './entities/property.entity';

@Module({
  controllers: [PropertiesController],
  providers: [PropertiesService],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: Property.name,
        schema: PropertySchema,
      }
    ])
  ],
  exports: [PropertiesService]
})
export class PropertiesModule {}
