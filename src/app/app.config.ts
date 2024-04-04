import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { UserEndpoint } from './domain/user/user.endpoint';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { Location } from '@angular/common';

const provideDIs = () => [
  { provide: UserEndpoint },
  { provide: Location }
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideDIs()
  ]
};

