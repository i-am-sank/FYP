const Web3 = require('web3');
const PaymentABI = require('./Payment.json');
require('dotenv').config();
const axios = require('axios');

const paymentAddress = '0x466598fCDD496C218e2Eb07EB7aCbCeaD9C1A25E';
const WS_INFURA_URL = process.env.WS_INFURA_URL
const IP_ADDRESS = process.env.IP_ADDRESS

// Init web3
const web3 = new Web3(new Web3.providers.WebsocketProvider(WS_INFURA_URL))
const paymentContract = new web3.eth.Contract(PaymentABI, paymentAddress);

// set up event listeners
paymentContract.events.UserDeposited()
    .on('connected', subId => console.log('Subscript Id (User Deposited):', subId))
    .on('data', async (event) => {
        await parseUserDepositedAndSendMessage(event)

    })

const parseUserDepositedAndSendMessage = async (event) => {
    const values = event.returnValues;
    const [id, token, amount] = [values.id, values.token, values.amount]
    console.log(event);
    console.log('User deposited:', id, token, amount);

    const amountInEther = Number(web3.utils.fromWei(amount, 'ether'))

    const response = await axios.post(`http://${IP_ADDRESS}/update?value=${amountInEther}`);
    if (response.status == 200) {
        console.log('Sent data to ESP8266');
    }
}