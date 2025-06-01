import { useEffect, useState } from 'react';
import { PluginRegistry } from '../services/PluginRegistry';
import type {
  ToolRegistration,
  SidePanelRegistration,
  MainContentRegistration,
  InspectorRegistration,
} from '../services/PluginRegistry';

interface UsePluginRegistryResult {
  tools: Record<string, ToolRegistration>;
  sidePanels: Record<string, SidePanelRegistration>;
  mainContents: Record<string, MainContentRegistration>;
  inspectors: Record<string, InspectorRegistration>;
}

/**
 * React hook to access and subscribe to PluginRegistry updates.
 * Returns the current registry state and updates on any change.
 */
export function usePluginRegistry(): UsePluginRegistryResult {
  const [state, setState] = useState(PluginRegistry.getState());

  useEffect(() => {
    const unsubscribe = PluginRegistry.subscribe(setState);
    return unsubscribe;
  }, []);

  return state;
}
