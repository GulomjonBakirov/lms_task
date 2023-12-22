import { Module } from '@nestjs/common'
import { GroupController } from './group.controller'
import { GroupService } from './group.service'
import { PrismaModule } from '@clients'
import { UserModule } from '../user'

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule {}
