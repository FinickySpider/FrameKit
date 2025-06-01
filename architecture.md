graph TD
AppShell --> NavBar
AppShell --> SidePanel
AppShell --> MainContentArea
AppShell --> InspectorPanel
AppShell --> PluginRegistry
PluginRegistry --> RegisterTool
PluginRegistry --> RegisterSidePanel
PluginRegistry --> RegisterMainContent
PluginRegistry --> RegisterInspector
RegisterTool --> NavBar
RegisterSidePanel --> SidePanel
RegisterMainContent --> MainContentArea
RegisterInspector --> InspectorPanel
NavBar -- onToolSelect --> SidePanel
NavBar -- onToolSelect --> MainContentArea
MainContentArea -- onSelectItem --> InspectorPanel
