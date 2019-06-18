import React, { PureComponent } from 'react'
import { View, Platform, StyleSheet } from 'react-native'
import DrawerLayout from 'react-native-drawer-layout-polyfill'
import stripe from 'tipsi-stripe'
import { NavigationActions, StackActions } from "react-navigation";
import Header from './components/Header'
import MenuItem from './components/MenuItem'
import AndroidPayScreen from './scenes/AndroidPayScreen'
import CardFormScreen from './scenes/CardFormScreen'
import testID from './utils/testID'

stripe.setOptions({
  publishableKey: 'pk_test_EYIErk4QX7mMqO8pwLFqqomg00vlqZmU7Y',
  androidPayMode: 'test',
})

export default class Payment extends PureComponent {
  state = {
    index: 0,
    isDrawerOpen: false,
    routes: [
      CardFormScreen,
      AndroidPayScreen
    ].filter(item => item),
  }

  getCurrentScene = () => this.state.routes[this.state.index]

  handleChangeTab = (index) => {
    this.drawer.closeDrawer()
    this.setState({ index })
  }

  handleDrawerRef = (node) => {
    this.drawer = node
  }

  handleMenuPress = () => {
    if (this.state.isDrawerOpen) {
      this.drawer.closeDrawer()
    } else {
      this.drawer.openDrawer()
    }
  }

  handleDrawerOpen = () => {
    this.setState({ isDrawerOpen: true })
  }

  handleDrawerClose = () => {
    this.setState({ isDrawerOpen: false })
  }

  /* eslint-disable react/no-array-index-key */
  renderNavigation = () => (
    <View style={styles.drawer}>
      {this.state.routes.map((Scene, index) => (
        <MenuItem
          key={index}
          title={Scene.title}
          active={this.state.index === index}
          onPress={() => this.handleChangeTab(index)}
          {...testID(Scene.title)}
        />
      ))}
    </View>
  )

  render() {
    const Scene = this.getCurrentScene()

    return (
      <View style={styles.container}>
        <View style={styles.statusbar} />
        <Header title={`Example: ${Scene.title}`} onMenuPress={this.handleMenuPress} />
        <DrawerLayout
          drawerWidth={200}
          drawerPosition={DrawerLayout.positions.Left}
          renderNavigationView={this.renderNavigation}
          onDrawerOpen={this.handleDrawerOpen}
          onDrawerClose={this.handleDrawerClose}
          ref={this.handleDrawerRef}>
          <Scene />
        </DrawerLayout>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  statusbar: {
    height: Platform.select({ ios: 20, android: 0 }),
  },
  drawer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
})
