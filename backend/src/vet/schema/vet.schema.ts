import { Schema, Document } from 'mongoose';

export const VetSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password:{type:String,required:true},
  qualification: { type: String, required: true },
  certificate: { type: String, required: true }, // MIME type (e.g., 'application/pdf', 'image/png')
  contact: { type: String, required: true },
  area: { type: String, required: true },
  availability: { type: String },
  imageUrl: { type: String,required:true },
  approveStatus: { type: Boolean, default: false },

});

export interface Vet extends Document {
  id: string;
  name: string;
  email: string;
  password:string;
  qualification: string;
  certificate: Buffer;
  contact: string;
  area: string;
  availability?: string;
  imageUrl?: string;
  approveStatus: boolean;
}