import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';
const hostUrl = 'http://192.168.43.65:44355';
const hostLocalUrl = 'http://localhost:44355';

export const environment = {
  production: true,
  application: {
    baseUrl,
    name: 'MokebManagerNg',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: baseUrl,
    redirectUri: baseUrl,
    clientId: 'MokebManagerNg_App',
    responseType: 'code',
    scope: 'offline_access MokebManagerNg',
    requireHttps: true,
  },
  apis: {
    default: {
      url: baseUrl,
      rootNamespace: 'MokebManagerNg',
    },
  },
} as Environment;
