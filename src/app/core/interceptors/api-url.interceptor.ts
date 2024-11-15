import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {ENVIRONMENT} from '../environments/tokens/environment.token';

const blackList = ['/assets', 'assets'];

export const apiUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const url = req.url;
  const env = inject(ENVIRONMENT);

  const isBlackListUrl = blackList.find((item) => url.startsWith(item));

  if (isBlackListUrl) {
    return next(req);
  }

  const api = '/api/json/v1/1/';

  req = req.clone({
    url: env.apiUrl + api + req.url,
  });

  return next(req);
};
