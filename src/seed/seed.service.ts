import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/auth/entities/user.entity';
import { PropertiesService } from 'src/properties/properties.service';
import { initialData } from './data/seed-data';

@Injectable()
export class SeedService {
  constructor(
    private readonly propertiesService: PropertiesService,
    private readonly authService: AuthService
  ) {}
  
  async runSeed() {
    await this.propertiesService.removeAll();
    await this.authService.removeAll();
    
    const seedUsers = initialData.users;
    seedUsers.forEach(user => {
      this.authService.create(user)
    })

    const seedProperties = initialData.properties;
    seedProperties.forEach(property => {
      this.propertiesService.create(property)
    })
    return 'SEED EXECUTED';
  }
}
