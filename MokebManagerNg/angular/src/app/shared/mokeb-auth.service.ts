import { RestService, Rest, LoginParams } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MokebAuthService {
  apiName = 'Default';

  constructor(private restService: RestService) {}

  login = (input: any, config?: Partial<Rest.Config>) =>
    this.restService
      .request<any, any>(
        {
          method: 'POST',
          url: '/api/TokenAuth/Authenticate',
          body: input,
        },
        { apiName: this.apiName, ...config }
      )
      .pipe(
        map(response => {
          if (response.result === 1) {
            // اطلاعات لاگین موفقیت آمیز را ذخیره کنید
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('username', input.userNameOrEmailAddress);
            return response;
          } else {
            throw new Error(response.description);
          }
        })
      );
}
