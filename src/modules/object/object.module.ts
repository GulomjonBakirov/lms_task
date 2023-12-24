import { Module } from '@nestjs/common'
import { PrismaModule } from '@clients'
import { ObjectController } from './object.controller'
import { ObjectService } from './object.service'

@Module({
  imports: [PrismaModule],
  controllers: [ObjectController],
  providers: [ObjectService],
})
export class ObjectModule {}
