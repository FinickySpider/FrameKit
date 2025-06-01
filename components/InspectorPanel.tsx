import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme, Text } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { usePluginRegistry } from '../hooks/usePluginRegistry';
import { useUIStore } from '../store/zustandStore';

const INSPECTOR_PANEL_WIDTH = 320;

const InspectorPanel: React.FC = () => {
  const theme = useTheme();
  const { inspectors } = usePluginRegistry();
  const selection = useUIStore((state) => state.selection);

  // Memoize the inspector component for the current selection context
  const InspectorComponent = useMemo(() => {
    if (!selection || !selection.type) return null;
    const reg = inspectors[selection.type];
    return reg ? reg.inspectorComponent : null;
  }, [selection, inspectors]);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: (theme.colors as any).inspectorPanel, borderLeftColor: theme.colors.surface },
      ]}
      accessibilityRole={undefined}
      accessibilityLabel="Inspector Panel"
      testID="inspector-panel"
    >
      {InspectorComponent ? (
        <InspectorComponent selection={selection} />
      ) : (
        <View style={styles.emptyState}>
          <MaterialCommunityIcons name={"file-document-outline"} size={40} color={(theme.colors as any).disabled} />
          <Text style={[styles.emptyText, { color: (theme.colors as any).disabled }]}>No details to display</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: INSPECTOR_PANEL_WIDTH,
    minWidth: INSPECTOR_PANEL_WIDTH,
    maxWidth: INSPECTOR_PANEL_WIDTH,
    height: '100%',
    borderLeftWidth: 1,
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: -1, height: 0 },
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

export default InspectorPanel;
