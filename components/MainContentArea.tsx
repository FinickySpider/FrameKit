import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme, Text } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { usePluginRegistry } from '../hooks/usePluginRegistry';
import { useUIStore } from '../store/zustandStore';

const MAINCONTENTAREA_MIN_WIDTH = 0; // Flexible, takes up remaining space

const MainContentArea: React.FC = () => {
  const theme = useTheme();
  const { mainContents } = usePluginRegistry();
  const activeToolKey = useUIStore((state) => state.activeToolKey);

  // Memoize the content component for the active tool
  const ContentComponent = useMemo(() => {
    if (!activeToolKey) return null;
    const reg = mainContents[activeToolKey];
    return reg ? reg.contentComponent : null;
  }, [activeToolKey, mainContents]);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.background },
      ]}
      accessibilityRole={undefined}
      accessibilityLabel="Main Content Area"
      testID="main-content-area"
    >
      {ContentComponent ? (
        <ContentComponent />
      ) : (
        <View style={styles.emptyState}>
          <MaterialCommunityIcons name={"application-outline"} size={56} color={(theme.colors as any).disabled} />
          <Text style={[styles.emptyText, { color: (theme.colors as any).disabled }]}>No content available</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minWidth: MAINCONTENTAREA_MIN_WIDTH,
    height: '100%',
    padding: 0,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    overflow: 'hidden',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.6,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
  },
});

export default MainContentArea;
