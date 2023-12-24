import { Module } from '@nestjs/common'
import { GroupModule } from '@modules'
import { PrismaModule } from '@clients'
import { ScheduleService } from './schedule.service'
import { ScheduleController } from './schedule.controller'

@Module({
  imports: [PrismaModule, GroupModule],
  providers: [ScheduleService],
  controllers: [ScheduleController],
  exports: [ScheduleService],
})
export class ScheduleModule {}
