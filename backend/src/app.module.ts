// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ImageModule } from './model/image.module';
import { ImageModulee } from './image/image.module';
import { VetModule } from './vet/vets.module';
import * as dotenv from 'dotenv';
dotenv.config();


@Module({
  imports: [
    // Connect to MongoDB
    MongooseModule.forRoot(process.env.MONGODB_URI), // Replace with your MongoDB URL if different
    UserModule,
    //ImageModule,
    ImageModulee,
    VetModule,
  ],
})
export class AppModule {}
