import axios from 'axios';
import Config from 'react-native-config'

export const doPayment = (amount, tokenId, accessToken) => {
  const body = {
    amount: amount,
    tokenId: tokenId,
  };
  const headers = {
    'Content-Type': 'application/json',
    'api_key': Config.STRIPE_API_KEY
  };
  return axios
  
    .post(Config.APP_URL + '/api/doPayment', body, { headers })
    .then(({ data }) => {
      return data;
    })
    .catch(error => {
      return Promise.reject('Error in making payment', error);
    });
};