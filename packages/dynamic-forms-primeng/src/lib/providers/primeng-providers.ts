import { FieldTypeDefinition } from '@ng-forge/dynamic-forms';
import type { Provider } from '@angular/core';
import { PRIMENG_FIELD_TYPES } from '../config/primeng-field-config';
import { PrimeNGConfig } from '../models/primeng-config';
import { PRIMENG_CONFIG } from '../models/primeng-config.token';

/**
 * Field type definition with optional config providers.
 */
type FieldTypeDefinitionWithConfig = FieldTypeDefinition & {
  __configProviders?: Provider[];
};

/**
 * Field type definitions whose individual items may carry config providers.
 */
export type FieldTypeDefinitionsWithConfig = FieldTypeDefinitionWithConfig[];

/**
 * Provides PrimeNG field type definitions for the dynamic form system.
 *
 * Use this function in your application providers to register PrimeNG field components.
 *
 * @param config - Optional global configuration for PrimeNG form fields
 *
 * @example
 * ```typescript
 * // Application-level setup
 * import { ApplicationConfig } from '@angular/core';
 * import { provideDynamicForm } from '@ng-forge/dynamic-form';
 * import { withPrimeNGFields } from '@ng-forge/dynamic-form-primeng';
 *
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     provideDynamicForm(...withPrimeNGFields())
 *   ]
 * };
 * ```
 *
 * @example
 * ```typescript
 * // With global configuration
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     provideDynamicForm(
 *       ...withPrimeNGFields({
 *         variant: 'filled',
 *         size: 'large'
 *       })
 *     )
 *   ]
 * };
 * ```
 *
 * @returns Array of field type definitions for PrimeNG components
 */
export function withPrimeNGFields(config?: PrimeNGConfig): FieldTypeDefinitionsWithConfig {
  if (!config) {
    return PRIMENG_FIELD_TYPES;
  }

  const fields: FieldTypeDefinitionsWithConfig = [...PRIMENG_FIELD_TYPES];
  const firstField = fields[0];

  if (firstField) {
    const clonedField = { ...firstField };

    Object.defineProperty(clonedField, '__configProviders', {
      value: [
        {
          provide: PRIMENG_CONFIG,
          useValue: config,
        },
      ],
      enumerable: false,
    });

    fields[0] = clonedField;
  }

  return fields;
}
