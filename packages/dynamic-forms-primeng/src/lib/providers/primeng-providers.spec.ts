import { TestBed } from '@angular/core/testing';
import { provideDynamicForm } from '@ng-forge/dynamic-forms';
import { afterEach, describe, expect, it } from 'vitest';
import { PRIMENG_FIELD_TYPES } from '../config/primeng-field-config';
import { PRIMENG_CONFIG } from '../models/primeng-config.token';
import type { PrimeNGConfig } from '../models/primeng-config';
import { withPrimeNGFields } from './primeng-providers';

describe('withPrimeNGFields', () => {
  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('preserves config metadata on a cloned field when config is provided', () => {
    const config = {
      size: 'large',
      variant: 'filled',
      severity: 'primary',
    } satisfies PrimeNGConfig;

    const fields = withPrimeNGFields(config);

    expect(fields).not.toBe(PRIMENG_FIELD_TYPES);
    expect(fields[0]).not.toBe(PRIMENG_FIELD_TYPES[0]);
    expect(fields[0]?.__configProviders).toEqual([
      {
        provide: PRIMENG_CONFIG,
        useValue: config,
      },
    ]);
  });

  it('registers PRIMENG_CONFIG when spread into provideDynamicForm', () => {
    const config = {
      size: 'large',
      variant: 'filled',
      severity: 'primary',
    } satisfies PrimeNGConfig;

    TestBed.configureTestingModule({
      providers: [provideDynamicForm(...withPrimeNGFields(config))],
    });

    expect(TestBed.inject(PRIMENG_CONFIG)).toEqual(config);
  });
});
