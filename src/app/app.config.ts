import { environment as dev } from 'src/assets/environment/environment';
import { environment as prod } from 'src/assets/environment/environment.prod';

import { Location } from '@angular/common';
import {
	provideHttpClient,
	withFetch,
	withInterceptors,
} from '@angular/common/http';
import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { BaseEndpoint } from '@domain/base/base.endpoint';
import { authInterceptor } from '@shared/middlewares/auth.interceptor';

import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { routes } from './app.routes';

export const environment = isDevMode() ? dev : prod;

const provideDIs = () => [
	provideHttpClient(withInterceptors([authInterceptor])),
	{ provide: BaseEndpoint },
	{ provide: Location },
];

export const appConfig: ApplicationConfig = {
	providers: [
		provideHttpClient(withFetch()),
		provideRouter(routes),
		// provideClientHydration(),
		provideAnimationsAsync(),
		provideDIs(),
		provideNativeDateAdapter(),
		{ provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }
	],
};
