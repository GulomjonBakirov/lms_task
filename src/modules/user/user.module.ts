import { Module, forwardRef } from '@nestjs/common'
import { AuthModule, GroupModule, ScheduleModule } from '@modules'
import { PrismaModule } from '@clients'
import { UserService } from './user.service'
import { StudentService } from './student.service'
import { UserController } from './user.controller'
import { StudentController } from './student.controller'

@Module({
  imports: [PrismaModule, AuthModule, forwardRef(() => GroupModule), forwardRef(() => ScheduleModule)],
  providers: [UserService, StudentService],
  controllers: [UserController, StudentController],
  exports: [UserService, StudentService],
})
export class UserModule {}
