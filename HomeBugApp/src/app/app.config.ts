import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideIcons } from '@ng-icons/core'
import {
  featherSearch,
  featherMessageCircle,
  featherGlobe,
  featherArrowDown,
  featherArrowUp,
  featherTrash2,
  featherUpload,
  featherArrowLeft,
  featherArrowRight,
  featherBookmark,
  featherXCircle,
  featherCamera,
  featherDatabase,
  featherLoader

} from '@ng-icons/feather-icons'
import { authInterceptor } from './interceptors/auth.interceptor';
import { IMAGE_CONFIG } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: IMAGE_CONFIG,
      useValue: {
        disableImageSizeWarning: true,
        disableImageLazyLoadWarning: true
      }
    },
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding(), withInMemoryScrolling({
      scrollPositionRestoration: 'enabled'
    })),
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
    provideIcons({
      featherSearch,
      featherMessageCircle,
      featherGlobe,
      featherArrowDown,
      featherArrowUp,
      featherTrash2,
      featherUpload,
      featherArrowLeft,
      featherArrowRight,
      featherBookmark,
      featherXCircle,
      featherCamera,
      featherDatabase,
      featherLoader,
    }),
  ]
};
