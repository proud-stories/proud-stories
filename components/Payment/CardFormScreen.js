import React, { PureComponent } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import stripe from 'tipsi-stripe'
import Button from './components/Button'
import testID from './utils/testID'
import { doPayment } from './api'
import { Item, Input } from 'native-base';
import {  withNavigation } from "react-navigation";
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

class CardFormScreen extends PureComponent {
  static title = 'Card Form'

  theme = {
    primaryBackgroundColor: "",
    secondaryBackgroundColor: "",
    primaryForegroundColor: "",
    secondaryForegroundColor: "",
    accentColor: "",
    errorColor: ""
  }

  componentDidMount = async () => {
    const id = await AsyncStorage.getItem('@id');
    this.setState({
      id: id
    })
  }

  state = {
    amount: 0,
    loading: false,
    token: null,
    id: ""
  }

  handleCardPayPress = async () => {
    try {
      console.log(this.props.navigation)
      this.setState({ loading: true, token: null })
      const token = await stripe.paymentRequestWithCardForm()
      this.setState({ token })
      console.log("got token")
      await doPayment(this.state.amount, this.state.token.tokenId )
      this.setState({ loading: false })
      console.log("finished payment")
      await this.updateBalance();
      console.log("balance updated")
      // await this.props.navigation.state.params.updateBalance(this.state.amount)
      this.props.navigation.navigate('ProfileHome')
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
            <Input autoFocus keyboardType="numeric" onChangeText={(amount) => this.setState({amount})} placeholder="JPY" />
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
              Charge Successful
            </Text>
          }
        </View>
      </View>
    )
  }

  updateBalance() {
    return axios.post('https://proud-stories.herokuapp.com/transactions', {auth_id: this.state.id, amount: this.state.amount, type: "deposit"});
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

export default withNavigation(CardFormScreen);