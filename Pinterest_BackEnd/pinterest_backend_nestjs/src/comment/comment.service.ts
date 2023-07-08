import { BadRequestException, Injectable } from '@nestjs/common';
import { cmt_emotion, comment, user } from '@prisma/client';
import { omit } from 'lodash';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseApi } from 'src/types/ApiResponse';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}
  async createComment({
    content,
    parent_id,
    user_id,
    image_id,
  }: Omit<comment, 'comment_id' | 'created'>): Promise<ResponseApi<comment>> {
    const image = await this.prisma.image.findUnique({ where: { image_id } });
    if (!image) {
      throw new BadRequestException('Image does not exist!');
    }
    if (parent_id) {
      const parent_cmt = await this.prisma.comment.findUnique({
        where: {
          comment_id: parent_id,
        },
      });
      if (!parent_cmt) {
        throw new BadRequestException('Commnent parent does not exist!');
      }
      // Có parent id nhưng chưa chắc thực sự parent id thuộc về hình ảnh này
      if (!(parent_cmt.image_id === image.image_id)) {
        throw new BadRequestException('Input data incorrect!');
      }
      const cmt = await this.prisma.comment.create({
        data: {
          content,
          user_id,
          image_id,
          parent_id,
        },
      });
      return {
        message: 'Create comment successfull!',
        data: cmt,
      };
    }
    const cmt = await this.prisma.comment.create({
      data: {
        content,
        user_id,
        image_id,
      },
    });
    return {
      message: 'Create comment successfull!',
      data: cmt,
    };
  }

  async findAll(image_id: number): Promise<
    ResponseApi<
      Partial<
        comment & {
          user: user;
          cmt_emotion: cmt_emotion[];
        }
      >[]
    >
  > {
    const cmts = await this.prisma.comment.findMany({
      where: {
        image_id,
      },
      include: {
        user: true,
        cmt_emotion: true,
      },
    });
    return {
      message: 'Get comments successfull!',
      data: cmts.map((e) => omit(e, ['user.password', 'user.token'])),
    };
  }

  async updateComment(
    comment_id: number,
    content: string,
  ): Promise<ResponseApi<comment>> {
    const cmt = await this.prisma.comment.findUnique({
      where: {
        comment_id,
      },
    });
    if (!cmt) {
      throw new BadRequestException('Comment does not exist!');
    }
    const update_cmt = await this.prisma.comment.update({
      where: {
        comment_id,
      },
      data: {
        content,
      },
    });
    return {
      message: 'Update comment successfull!',
      data: update_cmt,
    };
  }

  async deleteComment(
    user_id: number,
    comment_id: number,
  ): Promise<ResponseApi<{}>> {
    const cmt = await this.prisma.comment.findUnique({
      where: {
        comment_id,
      },
    });
    if (!cmt) {
      throw new BadRequestException('Commnet does not exist!');
    }
    const cmt_emotion = await this.prisma.cmt_emotion.findMany({
      where: {
        comment_id,
      },
    });
    if (cmt_emotion.length > 0) {
      const delete_cmt_emotion = await this.prisma.cmt_emotion.deleteMany({
        where: {
          comment_id,
        },
      });
    }
    const delete_cmt = await this.prisma.comment.delete({
      where: {
        comment_id,
      },
    });
    return {
      message: 'Delete comment successfull!',
      data: {},
    };
  }
}
