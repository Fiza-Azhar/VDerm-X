import { Injectable, NotFoundException } from '@nestjs/common';
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

  async create(
    vetData: Partial<Vet>,
    certificate?: Express.Multer.File,
    image?: Express.Multer.File,
  ): Promise<Vet> {
    const newVet = new this.vetModel({
      ...vetData,
      certificate: certificate?.buffer.toString('base64'), // Store as Base64
      imageUrl: image?.buffer.toString('base64'), // Store as Base64
    });
    return newVet.save();
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
