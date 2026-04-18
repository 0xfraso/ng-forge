import { FieldTypeDefinition } from '@ng-forge/dynamic-forms';
import type { Provider } from '@angular/core';
import { BOOTSTRAP_FIELD_TYPES } from '../config/bootstrap-field-config';
import { BootstrapConfig } from '../models/bootstrap-config';
import { BOOTSTRAP_CONFIG } from '../models/bootstrap-config.token';

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
 * Provides Bootstrap field types for the dynamic form system.
 * Use with provideDynamicForm(...withBootstrapFields())
 *
 * @param config - Optional global configuration for Bootstrap form fields
 *
 * @example
 * ```typescript
 * // Application-level setup
 * import { ApplicationConfig } from '@angular/core';
 * import { provideDynamicForm } from '@ng-forge/dynamic-form';
 * import { withBootstrapFields } from '@ng-forge/dynamic-form-bootstrap';
 *
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     provideDynamicForm(...withBootstrapFields())
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
 *       ...withBootstrapFields({
 *         floatingLabel: true,
 *         size: 'lg'
 *       })
 *     )
 *   ]
 * };
 * ```
 *
 * @returns Array of field type definitions for Bootstrap components
 */
export function withBootstrapFields(config?: BootstrapConfig): FieldTypeDefinitionsWithConfig {
  if (!config) {
    return BOOTSTRAP_FIELD_TYPES;
  }

  const fields: FieldTypeDefinitionsWithConfig = [...BOOTSTRAP_FIELD_TYPES];
  const firstField = fields[0];

  if (firstField) {
    const clonedField = { ...firstField };

    Object.defineProperty(clonedField, '__configProviders', {
      value: [
        {
          provide: BOOTSTRAP_CONFIG,
          useValue: config,
        },
      ],
      enumerable: false,
    });

    fields[0] = clonedField;
  }

  return fields;
}
