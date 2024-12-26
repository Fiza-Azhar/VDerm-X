import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { VetService } from './vets.service';
import { Vet } from './vet.entity';
import { FileFieldsInterceptor } from '@nestjs/platform-express';





@Controller('vets')
export class VetController {
  constructor(private readonly vetService: VetService) {}

  @Get()
  async getAll(): Promise<Vet[]> {
    return this.vetService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<Vet> {
    return this.vetService.findOne(id);
  }

  @Post('createvets')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'certificate', maxCount: 1 },
      { name: 'imageUrl', maxCount: 1 },
    ]),
  )
  async create(
    @Body() vetData: Partial<Vet>,
    @UploadedFiles()
    files: {
      certificate?: Express.Multer.File[];
      imageUrl?: Express.Multer.File[];
    },
  ): Promise<Vet> {
    const certificateFile = files.certificate?.[0];
    const imageFile = files.imageUrl?.[0];
  
    return this.vetService.create(vetData, certificateFile, imageFile);
  }
  

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateData: Partial<Vet>): Promise<Vet> {
    return this.vetService.update(id, updateData);
  }

  @Put(':id/approve')
  async approveVet(@Param('id') id: string): Promise<Vet> {
    return this.vetService.approve(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Vet> {
    return this.vetService.delete(id);
  }
}
