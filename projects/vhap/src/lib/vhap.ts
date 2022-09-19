import { InjectionToken } from '@angular/core';

/**
 *
 */
export interface Client {
  api: string;
  token: string;
}

/**
 *
 */
export const CLIENT_TOKEN = new InjectionToken<Client>('CLIENT_TOKEN');
