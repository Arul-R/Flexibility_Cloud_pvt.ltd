import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptorsFromDi())
  ]
};


// import { ApplicationConfig } from '@angular/core';
// import { provideRouter } from '@angular/router';
// import { provideHttpClient } from '@angular/common/http'; // ✅ Keep this
// import { routes } from './app.routes';

// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideRouter(routes),
//     provideHttpClient() // ✅ Make sure this line is here
//   ]
// };
