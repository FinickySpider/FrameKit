import { PluginRegistry, MainContentRegistration } from '../PluginRegistry';

/**
 * Registers a main content view for a tool in the MainContentArea.
 * Idempotent and safe for hot reloads.
 * Throws if required fields are missing or duplicate config is used.
 *
 * @param content MainContentRegistration object
 */
export function registerMainContent(content: MainContentRegistration): void {
  if (!content || typeof content !== 'object') {
    throw new Error('MainContent registration must be an object');
  }
  if (!content.toolKey || typeof content.toolKey !== 'string') {
    throw new Error('toolKey is required and must be a string');
  }
  if (!content.contentComponent || typeof content.contentComponent !== 'function') {
    throw new Error('contentComponent is required and must be a React component');
  }
  // Idempotent: If already registered with same config, skip
  const existing = PluginRegistry.getMainContent(content.toolKey);
  if (
    existing &&
    existing.contentComponent === content.contentComponent
  ) {
    return;
  }
  PluginRegistry.registerMainContent(content);
}

/**
 * Deregisters a main content view from the MainContentArea by toolKey.
 * @param toolKey Tool key
 */
export function deregisterMainContent(toolKey: string): void {
  if (!toolKey || typeof toolKey !== 'string') {
    throw new Error('toolKey is required and must be a string');
  }
  PluginRegistry.deregisterMainContent(toolKey);
}
