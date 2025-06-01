import React from 'react';
import { View, StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';
import ThemeProvider from '../components/ThemeProvider';
import NavBar from '../components/NavBar';
import SidePanel from '../components/SidePanel';
import MainContentArea from '../components/MainContentArea';
import InspectorPanel from '../components/InspectorPanel';

const AppShell: React.FC = () => {
  // ThemeProvider wraps the entire app for Paper UI and custom theme
  return (
    <ThemeProvider>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.root}>
          <NavBar />
          <SidePanel />
          <MainContentArea />
          <InspectorPanel />
        </View>
      </SafeAreaView>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  root: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    minHeight: 0,
    minWidth: 0,
    backgroundColor: '#F5F5F5',
  },
});

export default AppShell;
