import React, { PureComponent } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import stripe from 'tipsi-stripe'
import Button from '../components/Button'
import testID from '../utils/testID'
import { Item, Input } from 'native-base';

stripe.setOptions({
  publishableKey: 'pk_test_EYIErk4QX7mMqO8pwLFqqomg00vlqZmU7Y',
  androidPayMode: 'test',
})

export default class AndroidPayScreen extends PureComponent {
  static title = 'Android Pay'

  state = {
    amount: 0,
    loading: false,
    allowed: false,
    token: null,
  }

  async componentWillMount() {
    const allowed = await stripe.deviceSupportsNativePay()

    this.setState({ allowed })
  }

  handleAndroidPayPress = async () => {
    try {
      this.setState({
        loading: true,
        token: null,
      })
      const token = await stripe.paymentRequestWithNativePay({
        total_price: this.state.amount,
        currency_code: 'JPY',
      })
      this.setState({ token })
      await doPayment(this.state.amount * 100, this.state.token.tokenId)
      this.setState({ loading: false })
      this.gotoAccountPage()
    } catch (error) {
      this.setState({ loading: false })
    }
  }

  render() {
    const { loading, allowed, token } = this.state
    return (
      <View style={styles.container}>
        <Text style={styles.header} {...testID('headerText')}>
          Android Pay
        </Text>
        <Item  style={styles.input}>
            <Input autoFocus keyboardType="numeric" onChangeText={(amount) => this.setState({amount})} placeholder="USD" />
        </Item>
        <Text style={styles.instruction}>
          Click button to show Android Pay dialog.
        </Text>
        <Button
          text="Pay with Android Pay"
          disabledText="Not supported"
          loading={loading}
          disabled={!allowed}
          onPress={this.handleAndroidPayPress}
          {...testID('androidPayButton')}
        />
        <View
          style={styles.token}
          {...testID('androidPayToken')}>
          {token &&
            <Text style={styles.instruction}>
              Token: {token.tokenId}
            </Text>
          }
        </View>
      </View>
    )
  }

  gotoAccountPage = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: "Account",
        })
      ]
    });

    this.props.navigation.dispatch(resetAction);
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instruction: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  token: {
    height: 20,
  },
  input: {
    backgroundColor: "white",
    width: 270
  }
})
