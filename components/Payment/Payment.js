import React, { PureComponent } from 'react'
import { View, Platform, StyleSheet } from 'react-native'
import stripe from 'tipsi-stripe'
import CardFormScreen from './CardFormScreen'
import { NavigationActions, StackActions } from "react-navigation";

stripe.setOptions({
  publishableKey: 'pk_test_EYIErk4QX7mMqO8pwLFqqomg00vlqZmU7Y',
  androidPayMode: 'test',
})

export default class Payment extends PureComponent {

  render() {

    return (
      <View style={styles.container}>
        <View style={styles.statusbar} />
        <CardFormScreen />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
})
