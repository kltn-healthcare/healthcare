import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
import {
  FIREBASE_CONFIG_KEY,
  FIREBASE_CREDENTIAL_SOURCE,
  FIREBASE_ADMIN_TOKEN,
} from './constants/firebase.constants';

export const firebaseAdminProvider = {
  provide: FIREBASE_ADMIN_TOKEN,
  useFactory: (configService: ConfigService): admin.app.App => {
    const logger = new Logger('FirebaseAdminProvider');

    const projectId = configService.get<string>(FIREBASE_CONFIG_KEY.PROJECT_ID);
    const credentialSource = configService.get<string>(
      FIREBASE_CONFIG_KEY.CREDENTIAL_SOURCE,
      FIREBASE_CREDENTIAL_SOURCE.DEFAULT,
    );

    let credential: admin.credential.Credential;

    switch (credentialSource) {
      case FIREBASE_CREDENTIAL_SOURCE.FILE: {
        const keyPath = configService.getOrThrow<string>(
          FIREBASE_CONFIG_KEY.SERVICE_ACCOUNT_KEY_PATH,
        );
        credential = admin.credential.cert(keyPath);
        logger.log('Firebase initialized with service account file');
        break;
      }
      case FIREBASE_CREDENTIAL_SOURCE.JSON: {
        const jsonStr = configService.getOrThrow<string>(
          FIREBASE_CONFIG_KEY.SERVICE_ACCOUNT_JSON,
        );
        const serviceAccount = JSON.parse(jsonStr);
        credential = admin.credential.cert(serviceAccount);
        logger.log('Firebase initialized with service account JSON');
        break;
      }
      default: {
        credential = admin.credential.applicationDefault();
        logger.log('Firebase initialized with Application Default Credentials');
        break;
      }
    }

    if (admin.apps.length > 0) {
      return admin.apps[0]!;
    }

    return admin.initializeApp({ credential, projectId });
  },
  inject: [ConfigService],
};
