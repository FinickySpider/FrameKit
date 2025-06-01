import React, { useCallback } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme, Tooltip } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { usePluginRegistry } from '../hooks/usePluginRegistry';
import { useUIStore } from '../store/zustandStore';

const NAVBAR_WIDTH = 64;

const NavBar: React.FC = () => {
  const theme = useTheme();
  const { tools } = usePluginRegistry();
  const toolList = Object.values(tools);
  const activeToolKey = useUIStore((state) => state.activeToolKey);
  const setActiveToolKey = useUIStore((state) => state.setActiveToolKey);

  const handleToolPress = useCallback(
    (key: string) => {
      if (activeToolKey !== key) {
        setActiveToolKey(key);
      }
    },
    [activeToolKey, setActiveToolKey]
  );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: (theme.colors as any).navBar, borderRightColor: theme.colors.surface },
      ]}
      accessibilityRole={undefined}
      accessibilityLabel="Main Navigation Bar"
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {toolList.length === 0 ? (
          <View style={styles.emptyState}>
            <MaterialCommunityIcons name="plus-box-outline" size={32} color={(theme.colors as any).disabled} />
          </View>
        ) : (
          toolList.map((tool) => (
            <Tooltip key={tool.key} title={tool.label} enterTouchDelay={0}>
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityLabel={tool.label}
                accessibilityState={{ selected: activeToolKey === tool.key }}
                onPress={() => handleToolPress(tool.key)}
                style={[
                  styles.iconButton,
                  activeToolKey === tool.key && {
                    backgroundColor: (theme.colors as any).primary + '22',
                  },
                ]}
                testID={`navbar-tool-${tool.key}`}
              >
                <MaterialCommunityIcons
                  name={tool.icon as any}
                  size={28}
                  color={activeToolKey === tool.key ? (theme.colors as any).primary : (theme.colors as any).disabled}
                  accessibilityLabel={tool.label}
                />
              </TouchableOpacity>
            </Tooltip>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: NAVBAR_WIDTH,
    minWidth: NAVBAR_WIDTH,
    maxWidth: NAVBAR_WIDTH,
    height: '100%',
    borderRightWidth: 1,
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 0 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 2,
  },
  scrollContainer: {
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyState: {
    marginTop: 32,
    alignItems: 'center',
    opacity: 0.5,
  },
});

export default NavBar;
