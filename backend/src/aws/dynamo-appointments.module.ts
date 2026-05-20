import { Global, Module } from '@nestjs/common';
import { DynamoAppointmentsService } from './dynamo-appointments.service';

@Global()
@Module({
  providers: [DynamoAppointmentsService],
  exports: [DynamoAppointmentsService],
})
export class DynamoAppointmentsModule {}
