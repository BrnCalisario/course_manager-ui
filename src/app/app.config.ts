import { Location } from '@angular/common';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { BaseEndpoint } from '@domain/base/base.endpoint';
import { environment as dev } from '@environment/environment';
import { environment as prod } from '@environment/environment.prod';
import { authInterceptor } from '@shared/middlewares/auth.interceptor';

import { routes } from './app.routes';

export const environment = isDevMode() ? dev : prod;

const provideDIs = () => [
	provideHttpClient(withInterceptors([authInterceptor])),
	{ provide: BaseEndpoint },
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

