/*import {
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
*/
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
import sharp from 'sharp';  // Correct import
import * as fs from 'fs';
import * as fsPromises from 'fs/promises';
import { extname } from 'path';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

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
/*
  @Post('createvets')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'certificate', maxCount: 1 },
      { name: 'imageUrl', maxCount: 1 },
    ], {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        // Accept images only
        if (!file.mimetype.match(/^image\/(jpeg|png|gif|bmp)$/)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
    }),
  )
  async create(
    @Body() vetData: Partial<Vet>,
    @UploadedFiles() files: { certificate?: Express.Multer.File[]; imageUrl?: Express.Multer.File[] },
    @Res() res: Response,
  ) {
    const certificateFile = files.certificate?.[0];
    const imageFile = files.imageUrl?.[0];
  
    let compressedCertificateUrl: string | null = null;
    let compressedImageUrl: string | null = null;
  
    try {
      // Process the certificate file
      if (certificateFile) {
        const inputPath = `./uploads/${certificateFile.filename}`;
        const outputPath = `./uploads/compressed-${certificateFile.filename}`;
  
        const certificateImage = await Jimp.read(inputPath);
        await certificateImage
          .resize(300, Jimp.AUTO) // Resize width to 300px, auto height
          .quality(80) // Compress quality
          .writeAsync(outputPath);
  
        // Remove the original image file
        fs.unlinkSync(inputPath);
  
        compressedCertificateUrl = `/uploads/compressed-${certificateFile.filename}`;
      }
  
      // Process the image file
      if (imageFile) {
        const inputPath = `./uploads/${imageFile.filename}`;
        const outputPath = `./uploads/compressed-${imageFile.filename}`;
  
        const image = await Jimp.read(inputPath);
        await image
          .resize(300, Jimp.AUTO) // Resize width to 300px, auto height
          .quality(80) // Compress quality
          .writeAsync(outputPath);
  
        // Remove the original image file
        fs.unlinkSync(inputPath);
  
        compressedImageUrl = `/uploads/compressed-${imageFile.filename}`;
      }
  
      // Pass the compressed file paths to the vetService
      const vet = await this.vetService.create(vetData, compressedCertificateUrl, compressedImageUrl);
      return res.status(HttpStatus.CREATED).json(vet);
  
    } catch (error) {
      console.error('Error processing the images:', error);
  
      // Cleanup: remove files if they exist
      if (certificateFile && fs.existsSync(`./uploads/${certificateFile.filename}`)) {
        fs.unlinkSync(`./uploads/${certificateFile.filename}`);
      }
      if (imageFile && fs.existsSync(`./uploads/${imageFile.filename}`)) {
        fs.unlinkSync(`./uploads/${imageFile.filename}`);
      }
  
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error processing the images.' });
    }
  }
  */
  @Post('createvets')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'certificate', maxCount: 1 },
      { name: 'imageUrl', maxCount: 1 },
    ])
  )
  async create(
    @Body() vetData: Partial<Vet>,
    @UploadedFiles() files: { certificate?: Express.Multer.File[]; imageUrl?: Express.Multer.File[] }
  ): Promise<Vet> {
    const certificateFile = files.certificate?.[0];
    const imageFile = files.imageUrl?.[0];
  
    let compressedCertificateUrl: string | null = null;
    let compressedImageUrl: string | null = null;
  
    
    try {
      console.log('Uploaded Files:', files);
  
      // Ensure the uploads directory exists
      const uploadsDirectory = path.join(__dirname, '..', 'uploads');
      await fs.promises.mkdir(uploadsDirectory, { recursive: true });
  
      // Process the certificate file
      if (certificateFile && certificateFile.buffer) {
        const certificateFileName = `${uuidv4()}-${certificateFile.originalname}`;
        const certificateFilePath = path.join(uploadsDirectory, certificateFileName);
        await fs.promises.writeFile(certificateFilePath, certificateFile.buffer);
  
        const certificateOutputPath = path.join(uploadsDirectory, `compressed-${certificateFileName}`);
        await sharp(certificateFilePath)
          .resize(300)
          .jpeg({ quality: 80 })
          .toFile(certificateOutputPath);
  
        compressedCertificateUrl = `/uploads/compressed-${certificateFileName}`;
  
        // Remove original file after compression

      } else {
        console.error('Certificate file is missing or has no buffer.');
      }
  
      // Process the image file
      if (imageFile && imageFile.buffer) {
        const imageFileName = `${uuidv4()}-${imageFile.originalname}`;
        const imageFilePath = path.join(uploadsDirectory, imageFileName);
        await fs.promises.writeFile(imageFilePath, imageFile.buffer);
  
        const imageOutputPath = path.join(uploadsDirectory, `compressed-${imageFileName}`);
        await sharp(imageFilePath)
          .resize(300)
          .jpeg({ quality: 80 })
          .toFile(imageOutputPath);
  
        compressedImageUrl = `/uploads/compressed-${imageFileName}`;
  
        // Remove original file after compression
      } else {
        console.error('Image file is missing or has no buffer.');
      }
  
      // Pass the compressed file paths to the vetService
      return this.vetService.create(vetData, compressedCertificateUrl, compressedImageUrl);
  
    } catch (error) {
      console.error('Error processing the images:', error);
  
      // Cleanup: remove files if they exist
      if (certificateFile && fs.existsSync(certificateFile.path)) {
        await fs.promises.unlink(certificateFile.path);
      }
      if (imageFile && fs.existsSync(imageFile.path)) {
        await fs.promises.unlink(imageFile.path);
      }
  
      throw new Error('Error processing the images.');
    }
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
@Get('vets')
async getAllVets(): Promise<Vet[]> {
  const vets = await this.vetService.findAll();  // Assuming you have a service method for fetching vets
  return vets.map(vet => ({
    ...vet,
    certificateUrl: `/uploads/compressed-certificateFile.png`,  // Include the full URL to the certificate image
    imageUrl: `/uploads/compressed-imageFile.png`  // Include the full URL to the image
  }));
}

@Get('all')
async getAllVet(): Promise<Vet[]> {
  return await this.vetService.getAllVets();
}
@Post('send-notification') 
async sendNotification(@Body('email') email: string, @Body('name') name: string, @Body('message') message :string) {
  try {
    await this.vetService.sendNotificationEmail(email, name,message);

    return {
      success: true,
      message: 'Notification email sent successfully',
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to send notification email',
      error: error.message,
    };
  }
}

}