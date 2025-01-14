
import { NotFoundException } from '@nestjs/common';
// src/vets/vet.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vet } from './vet.entity';
@Injectable()
export class VetService {
  constructor(@InjectModel('Vet') private readonly vetModel: Model<Vet>) {}

  async findAll(): Promise<Vet[]> {
    return this.vetModel.find().exec();
  }
  
  async findOne(id: string): Promise<Vet> {
    const vet = await this.vetModel.findById(id).exec();
    if (!vet) {
      throw new NotFoundException('Vet not found');
    }
    return vet;
  }
  async getAllVets(): Promise<Vet[]> {
    return await this.vetModel.find().exec();
  }

  async create(vetData: Partial<Vet>, certificate: string | null, imageUrl: string | null): Promise<Vet> {
    const vet = new this.vetModel({
      ...vetData,
      certificate,
      imageUrl,
    });
    return vet.save(); // Save the vet to MongoDB
  }
  

  async update(id: string, updateData: Partial<Vet>): Promise<Vet> {
    const vet = await this.vetModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
    if (!vet) {
      throw new NotFoundException('Vet not found');
    }
    return vet;
  }

  async delete(id: string): Promise<Vet> {
    const vet = await this.vetModel.findById(id); // Retrieve the document
    if (!vet) {
      throw new NotFoundException('Vet not found');
    }
    await this.vetModel.deleteOne({ _id: id }); // Use deleteOne instead of remove
    return vet;
  }
  
    async approve(id: string): Promise<Vet> {
      const vet = await this.vetModel.findById(id); // Ensure you retrieve the full document
      if (!vet) {
        throw new NotFoundException('Vet not found');
      }
      vet.approveStatus = true;
      await vet.save(); // Save changes to the database
      return vet;
    }
}
