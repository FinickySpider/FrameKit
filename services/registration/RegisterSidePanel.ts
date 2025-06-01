import { PluginRegistry, SidePanelRegistration } from '../PluginRegistry';

/**
 * Registers a contextual panel for a tool in the SidePanel.
 * Idempotent and safe for hot reloads.
 * Throws if required fields are missing or duplicate config is used.
 *
 * @param panel SidePanelRegistration object
 */
export function registerSidePanel(panel: SidePanelRegistration): void {
  if (!panel || typeof panel !== 'object') {
    throw new Error('SidePanel registration must be an object');
  }
  if (!panel.toolKey || typeof panel.toolKey !== 'string') {
    throw new Error('toolKey is required and must be a string');
  }
  if (!panel.panelComponent || typeof panel.panelComponent !== 'function') {
    throw new Error('panelComponent is required and must be a React component');
  }
  // Idempotent: If already registered with same config, skip
  const existing = PluginRegistry.getSidePanel(panel.toolKey);
  if (
    existing &&
    existing.panelComponent === panel.panelComponent
  ) {
    return;
  }
  PluginRegistry.registerSidePanel(panel);
}

/**
 * Deregisters a contextual panel from the SidePanel by toolKey.
 * @param toolKey Tool key
 */
export function deregisterSidePanel(toolKey: string): void {
  if (!toolKey || typeof toolKey !== 'string') {
    throw new Error('toolKey is required and must be a string');
  }
  PluginRegistry.deregisterSidePanel(toolKey);
}
