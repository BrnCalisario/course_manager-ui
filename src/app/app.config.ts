import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { Location } from '@angular/common';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { UserEndpoint } from './domain/user/user.endpoint';

import { environment as dev } from '@environment/environment';
import { environment as prod } from '@environment/environment.prod';

export const environment = isDevMode() ? dev : prod;

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

