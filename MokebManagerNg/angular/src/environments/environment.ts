import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';
const hostUrl = '192.168.1.103';

export const environment = {
  production: false,
  application: {
    baseUrl,
    name: 'MokebManagerNg',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: 'https://192.168.1.104:44355',
    redirectUri: baseUrl,
    clientId: 'MokebManagerNg_App',
    responseType: 'code',
    scope: 'offline_access MokebManagerNg',
    requireHttps: true,
  },
  apis: {
    default: {
      url: 'https://192.168.1.104:44355',
      rootNamespace: 'MokebManagerNg',
    },
  },
} as Environment;
