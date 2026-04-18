import type { FieldTypeDefinition } from '@ng-forge/dynamic-forms';
import type { Provider } from '@angular/core';
import { MATERIAL_FIELD_TYPES } from '../config/material-field-config';
import { MaterialConfig } from '../models/material-config';
import { MATERIAL_CONFIG } from '../models/material-config.token';

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
 * Configure dynamic forms with Material Design field types.
 * Provides all Material Design field types for use with provideDynamicForm.
 *
 * @param config - Optional global configuration for Material form fields
 *
 * @example
 * ```typescript
 * // Application-level setup
 * import { ApplicationConfig } from '@angular/core';
 * import { provideDynamicForm } from '@ng-forge/dynamic-form';
 * import { withMaterialFields } from '@ng-forge/dynamic-form-material';
 *
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     provideDynamicForm(...withMaterialFields())
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
 *       ...withMaterialFields({
 *         appearance: 'fill',
 *         subscriptSizing: 'fixed'
 *       })
 *     )
 *   ]
 * };
 * ```
 *
 * @returns Array of field type definitions for Material Design components
 */
export function withMaterialFields(config?: MaterialConfig): FieldTypeDefinitionsWithConfig {
  if (!config) {
    return MATERIAL_FIELD_TYPES;
  }

  const fields: FieldTypeDefinitionsWithConfig = [...MATERIAL_FIELD_TYPES];
  const firstField = fields[0];

  if (firstField) {
    const clonedField = { ...firstField };

    Object.defineProperty(clonedField, '__configProviders', {
      value: [
        {
          provide: MATERIAL_CONFIG,
          useValue: config,
        },
      ],
      enumerable: false,
    });

    fields[0] = clonedField;
  }

  return fields;
}
