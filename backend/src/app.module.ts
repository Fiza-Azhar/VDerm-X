import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { VetModule } from './vet/vets.module';
import { UserModule } from './user/user.module';
import { ImageModulee } from './image/image.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost:27017/fypcollection'),
    VetModule,
    UserModule,
    ImageModulee
  ],
})
export class AppModule {}
