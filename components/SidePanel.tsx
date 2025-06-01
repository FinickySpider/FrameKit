import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme, Text } from 'react-native-paper';
import { usePluginRegistry } from '../hooks/usePluginRegistry';
import { useUIStore } from '../store/zustandStore';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const SIDEPANEL_WIDTH = 280;

const SidePanel: React.FC = () => {
  const theme = useTheme();
  const { sidePanels } = usePluginRegistry();
  const activeToolKey = useUIStore((state) => state.activeToolKey);

  // Memoize the panel component for the active tool
  const PanelComponent = useMemo(() => {
    if (!activeToolKey) return null;
    const reg = sidePanels[activeToolKey];
    return reg ? reg.panelComponent : null;
  }, [activeToolKey, sidePanels]);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: (theme.colors as any).sidePanel, borderRightColor: theme.colors.surface },
      ]}
      accessibilityRole={undefined}
      accessibilityLabel="Side Panel"
      testID="side-panel"
    >
      {PanelComponent ? (
        <PanelComponent />
      ) : (
        <View style={styles.emptyState}>
          <MaterialCommunityIcons name={"view-day-outline"} size={40} color={(theme.colors as any).disabled} />
          <Text style={[styles.emptyText, { color: (theme.colors as any).disabled }]}>No panel available</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SIDEPANEL_WIDTH,
    minWidth: SIDEPANEL_WIDTH,
    maxWidth: SIDEPANEL_WIDTH,
    height: '100%',
    borderRightWidth: 1,
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 0,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 0 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 2,
    justifyContent: 'flex-start',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.6,
  },
  emptyText: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
  },
});

export default SidePanel;
