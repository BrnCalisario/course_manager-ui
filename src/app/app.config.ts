import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { Location } from '@angular/common';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';

import { BaseEndpoint } from '@domain/base/base.endpoint';
import { environment as dev } from '@environment/environment';
import { environment as prod } from '@environment/environment.prod';
import { AuthInterceptor } from '@shared/middlewares/auth.interceptor';

export const environment = isDevMode() ? dev : prod;

const provideDIs = () => [
	{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
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

