import { PluginRegistry, ToolRegistration } from '../PluginRegistry';

/**
 * Registers a tool/mode in the NavBar.
 * Idempotent and safe for hot reloads.
 * Throws if required fields are missing or duplicate key is used.
 *
 * @param tool ToolRegistration object
 */
export function registerTool(tool: ToolRegistration): void {
  if (!tool || typeof tool !== 'object') {
    throw new Error('Tool registration must be an object');
  }
  if (!tool.key || typeof tool.key !== 'string') {
    throw new Error('Tool key is required and must be a string');
  }
  if (!tool.label || typeof tool.label !== 'string') {
    throw new Error('Tool label is required and must be a string');
  }
  if (!tool.icon || typeof tool.icon !== 'string') {
    throw new Error('Tool icon is required and must be a string');
  }
  if (!tool.component || typeof tool.component !== 'function') {
    throw new Error('Tool component is required and must be a React component');
  }
  // Idempotent: If already registered with same config, skip
  const existing = PluginRegistry.getTool(tool.key);
  if (
    existing &&
    existing.label === tool.label &&
    existing.icon === tool.icon &&
    existing.component === tool.component
  ) {
    return;
  }
  PluginRegistry.registerTool(tool);
}

/**
 * Deregisters a tool/mode from the NavBar by key.
 * @param key Tool key
 */
export function deregisterTool(key: string): void {
  if (!key || typeof key !== 'string') {
    throw new Error('Tool key is required and must be a string');
  }
  PluginRegistry.deregisterTool(key);
}
