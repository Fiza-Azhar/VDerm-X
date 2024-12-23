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
    return this.vetModel.findById(id).exec();
  }

  async create(vetData: Partial<Vet>, certificate: Express.Multer.File): Promise<Vet> {
    const newVet = new this.vetModel({
      ...vetData,
      certificate: certificate.buffer, // Store file as binary data
      certificateType: certificate.mimetype, // Store MIME type
    });
    return newVet.save();
  }

  async update(id: string, updateData: Partial<Vet>): Promise<Vet> {
    return this.vetModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  async approve(id: string): Promise<Vet> {
    const vet = await this.vetModel.findById(id).exec();
    if (!vet) {
      throw new Error('Vet not found');
    }
    vet.approveStatus = true;
    await vet.save();
    this.notifyApproval(vet.email);
    return vet;
  }

  private async notifyApproval(email: string): Promise<void> {
    console.log(`Notification sent to: ${email}`);
  }

  async delete(id: string): Promise<Vet> {
    return this.vetModel.findByIdAndDelete(id).exec();
  }
}
