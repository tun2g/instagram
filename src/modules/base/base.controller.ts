import { Get, Post, Req, Res,Delete } from '@nestjs/common';
import { Request, Response } from 'express';

export abstract class BaseController<T> {
    constructor(protected readonly service: any) {}
  
    @Post('create')
    async create(@Req() req: Request, @Res() res: Response) {
      try {
        const dto: T = req.body;
        await this.service.create(dto);
        res.json({ message: 'create successfully' });
      } catch (error) {
        console.log(error);
      }
    }
  
  
    @Post('update')
    async update(@Req() req: Request, @Res() res: Response) {
      try {
        const dto: T = req.body;
        await this.service.update(dto);
        res.json({ message: 'update successfully' });
      } catch (error) {
        console.log(error);
      }
    }
  
    @Delete('delete')
    async delete(@Req() req: Request, @Res() res: Response) {
      try {
        const id: number = req.body.id;
        await this.service.delete(id);
        res.json({ message: 'delete successfully' });
      } catch (error) {
        console.log(error);
      }
    }
  }
  