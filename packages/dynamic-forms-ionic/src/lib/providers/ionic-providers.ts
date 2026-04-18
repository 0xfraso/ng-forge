import type { FieldTypeDefinition } from '@ng-forge/dynamic-forms';
import type { Provider } from '@angular/core';
import { IONIC_FIELD_TYPES } from '../config/ionic-field-config';
import { IonicConfig } from '../models/ionic-config';
import { IONIC_CONFIG } from '../models/ionic-config.token';

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
 * Configure dynamic forms with Ionic field types.
 * Provides all Ionic field types for use with provideDynamicForm.
 *
 * @param config - Optional global configuration for Ionic form fields
 *
 * @example
 * ```typescript
 * // Application-level setup
 * import { ApplicationConfig } from '@angular/core';
 * import { provideDynamicForm } from '@ng-forge/dynamic-form';
 * import { withIonicFields } from '@ng-forge/dynamic-form-ionic';
 *
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     provideDynamicForm(...withIonicFields())
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
 *       ...withIonicFields({
 *         fill: 'outline',
 *         labelPlacement: 'floating'
 *       })
 *     )
 *   ]
 * };
 * ```
 *
 * @returns Array of field type definitions for Ionic components
 */
export function withIonicFields(config?: IonicConfig): FieldTypeDefinitionsWithConfig {
  if (!config) {
    return IONIC_FIELD_TYPES;
  }

  const fields: FieldTypeDefinitionsWithConfig = [...IONIC_FIELD_TYPES];
  const firstField = fields[0];

  if (firstField) {
    const clonedField = { ...firstField };

    Object.defineProperty(clonedField, '__configProviders', {
      value: [
        {
          provide: IONIC_CONFIG,
          useValue: config,
        },
      ],
      enumerable: false,
    });

    fields[0] = clonedField;
  }

  return fields;
}
