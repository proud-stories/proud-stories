import React, { PureComponent } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import stripe from 'tipsi-stripe'
import Button from '../components/Button'
import testID from '../utils/testID'
import { doPayment } from '../api'
import { Item, Input } from 'native-base';

export default class CardFormScreen extends PureComponent {
  static title = 'Card Form'

  state = {
    amount: 0,
    loading: false,
    token: null,
  }

  handleCardPayPress = async () => {
    try {
      this.setState({ loading: true, token: null })
      const token = await stripe.paymentRequestWithCardForm()
      this.setState({ token })
      const payment = await doPayment(this.state.amount, this.state.token.tokenId)
      this.setState({ loading: false })
    } catch (error) {
      this.setState({ loading: false })
    }
  }

  render() {
    const { loading, token } = this.state

    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          Pay by Credit Card
        </Text>
        <Item  style={styles.input}>
            <Input autoFocus keyboardType="numeric" onChangeText={(amount) => this.setState({amount})} placeholder="How much credits to charge" />
        </Item>
        <Text style={styles.instruction}>
          Click button to show Card Form dialog.
        </Text>
        <Button
          text="Enter you card and pay"
          loading={loading}
          onPress={this.handleCardPayPress}
          {...testID('cardFormButton')}
        />
        <View
          style={styles.token}
          {...testID('cardFormToken')}>
          {token &&
            <Text style={styles.instruction}>
              Token: {token.tokenId}
            </Text>
          }
        </View>
      </View>
    )
  }
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
