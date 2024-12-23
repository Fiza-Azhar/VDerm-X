import { Schema, Document } from 'mongoose';

export const VetSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  qualification: { type: String, required: true },
  certificate: { type: Buffer, required: true }, // Certificate stored as binary data
  certificateType: { type: String, required: true }, // MIME type (e.g., 'application/pdf', 'image/png')
  contact: { type: String, required: true },
  area: { type: String, required: true },
  availability: { type: String },
  imageUrl: { type: String },
  approveStatus: { type: Boolean, default: false },
});

export interface Vet extends Document {
  id: string;
  name: string;
  email: string;
  qualification: string;
  certificate: Buffer;
  certificateType: string;
  contact: string;
  area: string;
  availability?: string;
  imageUrl?: string;
  approveStatus: boolean;
}
