import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { VetService } from './vets.service';
import { Vet } from './vet.entity';

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
  @UseInterceptors(FileInterceptor('certificate')) // Handle file upload
  async create(
    @Body() vetData: Partial<Vet>,
    @UploadedFile() certificate: Express.Multer.File, // Uploaded file
  ): Promise<Vet> {
    return this.vetService.create(vetData, certificate);
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
