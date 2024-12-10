import { isPlatformBrowser } from '@angular/common';
import { KeycloakService } from 'keycloak-angular';
import { Inject, PLATFORM_ID } from '@angular/core';

export function initializeKeycloak(
  keycloak: KeycloakService,
  platformId: string
) {
  return () =>
    new Promise<void>((resolve, reject) => {
      if (isPlatformBrowser(platformId)) {
        keycloak
          .init({
            config: {
              url: 'http://localhost:8080',
              realm: 'myrealm',
              clientId: 'my-app-angular',
            },
            enableBearerInterceptor: true,
            bearerPrefix: 'Bearer',
            bearerExcludedUrls: ['/assets'],
            initOptions: {
              onLoad: 'check-sso',
              silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',

            },
          })
          .then(() => {
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        resolve();
      }
    });
}
