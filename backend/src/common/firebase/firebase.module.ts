import { Global, Module } from '@nestjs/common';
import { firebaseAdminProvider } from './firebase-admin.provider';
import { FirebaseService } from './firebase.service';

@Global()
@Module({
  providers: [firebaseAdminProvider, FirebaseService],
  exports: [FirebaseService],
})
export class FirebaseModule {}
