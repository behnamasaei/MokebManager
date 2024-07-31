import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';
 
const hostLocalUrl = 'https://192.168.1.104:5000';
const pcHomeUrl = 'https://192.168.1.103:44355';

export const environment = {
  production: true,
  application: {
    baseUrl,
    name: 'MokebManagerNg',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: 'https://192.168.50.23:5000/',
    redirectUri: baseUrl,
    clientId: 'MokebManagerNg_App',
    responseType: 'code',
    scope: 'offline_access MokebManagerNg',
    requireHttps: true,
  },
  apis: {
    default: {
      url: 'https://192.168.50.23:5000',
      rootNamespace: 'MokebManagerNg',
    },
  },
} as Environment;
