import {
  Injectable,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { image, saved, user } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseApi } from 'src/types/ApiResponse';
import { ImageDTO } from './dto/image.dto';
import { omit } from 'lodash';
import axios from 'axios';

@Injectable()
export class ImageService {
  constructor(private readonly prisma: PrismaService) {}

  async isImageAndExist(url: string): Promise<boolean> {
    try {
      const response = await axios.get(url);
      const arr = url.split('.');
      return ['jpg', 'png', 'jpeg', 'svg'].includes(
        arr[arr.length - 1].toLowerCase(),
      );
    } catch (error) {
      return false;
    }
  }

  async getAllImage(name?: string): Promise<ResponseApi<image[]>> {
    const images = await this.prisma.image.findMany({
      where: {
        name: {
          contains: name,
        },
      },
    });
    if (images.length === 0) {
      throw new NotFoundException('No images found!');
    }
    return {
      message: 'Get images successfull!',
      data: images,
    };
  }

  async getAllImageCreated(user_id: number): Promise<ResponseApi<image[]>> {
    const image = await this.prisma.image.findMany({
      where: {
        user_id,
      },
    });
    if (image.length === 0) {
      throw new BadRequestException('Not images found!');
    }
    return {
      message: 'Get image successfull!',
      data: image,
    };
  }

  async getAllImageSaved(
    user_id: number,
  ): Promise<ResponseApi<(saved & { image: image })[]>> {
    const image = await this.prisma.saved.findMany({
      where: {
        user_id,
      },
      include: {
        image: true,
      },
    });
    if (image.length === 0) {
      throw new BadRequestException('Not images found!');
    }
    return {
      message: 'Get image successfull!',
      data: image,
    };
  }

  async getImageDetailAndSaved(user_id: number, image_id: number) {
    const image = await this.prisma.image.findUnique({
      where: {
        image_id,
      },
      include: {
        user: true,
      },
    });
    const saved = await this.prisma.saved.findFirst({
      where: {
        image_id,
        user_id,
      },
    });
    if (!image) {
      throw new NotFoundException('No images found!');
    }
    return {
      message: 'Get image successfull',
      data: {
        ...omit(image, ['user.password', 'user.token']),
        saved: Boolean(saved),
      },
    };
  }

  async unsaveImageById(
    user_id: number,
    image_id: number,
  ): Promise<ResponseApi<{}>> {
    const image = await this.prisma.saved.findFirst({
      where: {
        user_id,
        image_id,
      },
    });
    if (!image) {
      throw new BadRequestException('Image does not exist!');
    }
    const deleted_image = await this.prisma.saved.delete({
      where: { saved_id: image.saved_id },
    });
    return { message: 'Unsave image successfull', data: {} };
  }
  async deleteImageById(
    user_id: number,
    image_id: number,
  ): Promise<ResponseApi<{}>> {
    const image = await this.prisma.image.findFirst({
      where: {
        user_id,
        image_id,
      },
    });
    if (!image) {
      throw new BadRequestException('Image does not exist!');
    }
    const deleted_image = await this.prisma.image.delete({
      where: { image_id },
    });
    return { message: 'Delete image successfull', data: {} };
  }

  async createIdea(
    body: Omit<image, 'image_id' | 'created'>,
  ): Promise<ResponseApi<image>> {
    const data = await this.prisma.image.create({
      data: body,
    });
    return {
      message: 'Create image idea successfull!',
      data,
    };
  }

  async createSaved(
    user_id: number,
    image_id: number,
  ): Promise<ResponseApi<saved>> {
    const image = await this.prisma.image.findUnique({
      where: {
        image_id,
      },
    });
    if (!image) {
      throw new BadRequestException('Image does not exist!');
    }
    const saved = await this.prisma.saved.create({
      data: {
        user_id,
        image_id,
      },
    });
    return {
      message: 'Created saved successfull!',
      data: saved,
    };
  }
}
