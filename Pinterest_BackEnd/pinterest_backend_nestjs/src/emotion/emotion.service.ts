import { BadRequestException, Injectable } from '@nestjs/common';
import { CommentEmotionDto, ImageEmotionDto } from './types/emotion.dto';
import { cmt_emotion, img_emotion } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseApi } from 'src/types/ApiResponse';

@Injectable()
export class EmotionService {
  constructor(private readonly prisma: PrismaService) {}
  async createAndUpdateCmtEmotion(
    data: Omit<cmt_emotion, 'created'>,
  ): Promise<ResponseApi<cmt_emotion>> {
    const cmt = await this.prisma.comment.findUnique({
      where: {
        comment_id: data.comment_id,
      },
    });
    if (!cmt) {
      throw new BadRequestException('Comment does not exist!');
    }
    const cmt_emotion = await this.prisma.cmt_emotion.findUnique({
      where: {
        user_id_comment_id: {
          comment_id: data.comment_id,
          user_id: data.user_id,
        },
      },
    });
    if (cmt_emotion) {
      let update_cmt_emotion: cmt_emotion;
      if (cmt_emotion.status !== data.status) {
        update_cmt_emotion = await this.prisma.cmt_emotion.update({
          where: {
            user_id_comment_id: {
              comment_id: data.comment_id,
              user_id: data.user_id,
            },
          },
          data: {
            status: data.status,
          },
        });
      }
      return {
        message: 'Update comment emotion successfull!',
        data: update_cmt_emotion ? update_cmt_emotion : cmt_emotion,
      };
    }
    const result = await this.prisma.cmt_emotion.create({
      data,
    });
    return {
      message: 'create comment emotion successfull!',
      data: result,
    };
  }

  async deleteCmtEmotion(
    user_id: number,
    comment_id: number,
  ): Promise<ResponseApi<{}>> {
    const cmt_emotion = await this.prisma.cmt_emotion.findUnique({
      where: {
        user_id_comment_id: {
          comment_id,
          user_id,
        },
      },
    });
    if (!cmt_emotion) {
      throw new BadRequestException('Commnent emotion does not exist!');
    }
    const delete_cmt_emotion = await this.prisma.cmt_emotion.delete({
      where: {
        user_id_comment_id: {
          comment_id,
          user_id,
        },
      },
    });
    return {
      message: 'Delete comment emotion successfull!',
      data: {},
    };
  }

  async createAndUpdateImgEmotion(
    data: Omit<img_emotion, 'created'>,
  ): Promise<ResponseApi<img_emotion>> {
    const img = await this.prisma.image.findUnique({
      where: {
        image_id: data.image_id,
      },
    });
    if (!img) {
      throw new BadRequestException('Image does not exist!');
    }
    const img_emotion = await this.prisma.img_emotion.findUnique({
      where: {
        user_id_image_id: {
          image_id: data.image_id,
          user_id: data.user_id,
        },
      },
    });
    if (img_emotion) {
      let update_img_emotion: img_emotion;
      if (img_emotion.status !== data.status) {
        update_img_emotion = await this.prisma.img_emotion.update({
          where: {
            user_id_image_id: {
              image_id: data.image_id,
              user_id: data.user_id,
            },
          },
          data: {
            status: data.status,
          },
        });
      }
      return {
        message: 'Update image emotion successfull!',
        data: update_img_emotion ? update_img_emotion : img_emotion,
      };
    }
    const result = await this.prisma.img_emotion.create({
      data,
    });
    return {
      message: 'Create comment emotion successfull!',
      data: result,
    };
  }

  async deleteImgEmotion(
    user_id: number,
    image_id: number,
  ): Promise<ResponseApi<{}>> {
    const img_emotion = await this.prisma.img_emotion.findUnique({
      where: {
        user_id_image_id: {
          image_id,
          user_id,
        },
      },
    });
    if (!img_emotion) {
      throw new BadRequestException('Commnent emotion does not exist!');
    }
    const delete_img_emotion = await this.prisma.img_emotion.delete({
      where: {
        user_id_image_id: {
          image_id,
          user_id,
        },
      },
    });
    return {
      message: 'Delete comment emotion successfull!',
      data: {},
    };
  }
}
