import React from 'react';

// Types for registration APIs
export type ToolRegistration = {
  key: string;
  label: string;
  icon: string; // MaterialCommunityIcons name
  component: React.ComponentType<any>;
};

export type SidePanelRegistration = {
  toolKey: string;
  panelComponent: React.ComponentType<any>;
};

export type MainContentRegistration = {
  toolKey: string;
  contentComponent: React.ComponentType<any>;
};

export type InspectorRegistration = {
  contextType: string;
  inspectorComponent: React.ComponentType<any>;
};

// Internal registry state
interface RegistryState {
  tools: Record<string, ToolRegistration>;
  sidePanels: Record<string, SidePanelRegistration>;
  mainContents: Record<string, MainContentRegistration>;
  inspectors: Record<string, InspectorRegistration>;
}

type RegistryListener = (state: RegistryState) => void;

class PluginRegistryClass {
  private state: RegistryState = {
    tools: {},
    sidePanels: {},
    mainContents: {},
    inspectors: {},
  };
  private listeners: Set<RegistryListener> = new Set();

  // --- Subscription API ---
  subscribe(listener: RegistryListener): () => void {
    this.listeners.add(listener);
    // Initial call
    listener(this.state);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    for (const listener of this.listeners) {
      listener(this.state);
    }
  }

  // --- Tool Registration ---
  registerTool(tool: ToolRegistration) {
    if (!tool.key) throw new Error('Tool key is required');
    this.state.tools[tool.key] = tool;
    this.notify();
  }
  deregisterTool(key: string) {
    delete this.state.tools[key];
    this.notify();
  }
  getTools(): ToolRegistration[] {
    return Object.values(this.state.tools);
  }
  getTool(key: string): ToolRegistration | undefined {
    return this.state.tools[key];
  }

  // --- SidePanel Registration ---
  registerSidePanel(panel: SidePanelRegistration) {
    if (!panel.toolKey) throw new Error('toolKey is required');
    this.state.sidePanels[panel.toolKey] = panel;
    this.notify();
  }
  deregisterSidePanel(toolKey: string) {
    delete this.state.sidePanels[toolKey];
    this.notify();
  }
  getSidePanel(toolKey: string): SidePanelRegistration | undefined {
    return this.state.sidePanels[toolKey];
  }

  // --- MainContent Registration ---
  registerMainContent(content: MainContentRegistration) {
    if (!content.toolKey) throw new Error('toolKey is required');
    this.state.mainContents[content.toolKey] = content;
    this.notify();
  }
  deregisterMainContent(toolKey: string) {
    delete this.state.mainContents[toolKey];
    this.notify();
  }
  getMainContent(toolKey: string): MainContentRegistration | undefined {
    return this.state.mainContents[toolKey];
  }

  // --- Inspector Registration ---
  registerInspector(inspector: InspectorRegistration) {
    if (!inspector.contextType) throw new Error('contextType is required');
    this.state.inspectors[inspector.contextType] = inspector;
    this.notify();
  }
  deregisterInspector(contextType: string) {
    delete this.state.inspectors[contextType];
    this.notify();
  }
  getInspector(contextType: string): InspectorRegistration | undefined {
    return this.state.inspectors[contextType];
  }

  // --- Debug/Dev ---
  getState(): RegistryState {
    return this.state;
  }
}

// Singleton instance
export const PluginRegistry = new PluginRegistryClass();
