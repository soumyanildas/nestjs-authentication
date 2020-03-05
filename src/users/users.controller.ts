import { Controller, Post, Body, Res, HttpStatus, UseFilters } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './create-user.dto';
import { MongoExceptionFilter } from 'src/filters/mongo-exception/mongo-exception.filter';

@Controller()
export class UsersController {

  constructor(private readonly userService: UsersService) { }

  @Post('users')
  @UseFilters(MongoExceptionFilter)
  async create(@Body() createUserDto: CreateUserDto, @Res() res: any) {
    const user = await this.userService.create(createUserDto);
    return res.status(HttpStatus.OK).json({
      error: false,
      message: 'User has been created successfully',
      user: {
        name: user.name,
        email: user.email
      }
    });
  }

}
