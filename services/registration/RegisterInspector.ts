import { PluginRegistry, InspectorRegistration } from '../PluginRegistry';

/**
 * Registers an inspector panel for a given context type.
 * Idempotent and safe for hot reloads.
 * Throws if required fields are missing or duplicate config is used.
 *
 * @param inspector InspectorRegistration object
 */
export function registerInspector(inspector: InspectorRegistration): void {
  if (!inspector || typeof inspector !== 'object') {
    throw new Error('Inspector registration must be an object');
  }
  if (!inspector.contextType || typeof inspector.contextType !== 'string') {
    throw new Error('contextType is required and must be a string');
  }
  if (!inspector.inspectorComponent || typeof inspector.inspectorComponent !== 'function') {
    throw new Error('inspectorComponent is required and must be a React component');
  }
  // Idempotent: If already registered with same config, skip
  const existing = PluginRegistry.getInspector(inspector.contextType);
  if (
    existing &&
    existing.inspectorComponent === inspector.inspectorComponent
  ) {
    return;
  }
  PluginRegistry.registerInspector(inspector);
}

/**
 * Deregisters an inspector panel for a given context type.
 * @param contextType Context type string
 */
export function deregisterInspector(contextType: string): void {
  if (!contextType || typeof contextType !== 'string') {
    throw new Error('contextType is required and must be a string');
  }
  PluginRegistry.deregisterInspector(contextType);
}
