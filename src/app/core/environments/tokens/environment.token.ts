import {InjectionToken} from '@angular/core';
import {environment} from '../configs/environment';
import {Env} from '../interfaces/environment.interface';

export const ENVIRONMENT = new InjectionToken('environment', {
  factory: (): Env => environment,
});

