import {ethers} from "ethers";
import paymentContractAbi from "./abi/PaymentV1.json"
import erc20Abi from "./abi/ERC20.json"

const contractAddress = '0xF14b22D8830E6fB02eb80192102bB08156e00AB3';
// todo: Modify contract to returns this from the contract
const acceptedTokens = [
    '0xa36085F69e2889c224210F603D836748e7dC0088'
];

export const getProvider = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    return provider;
}

export const getPaymentContract = async (providerOrSigner) => {
    return new ethers.Contract(
        contractAddress,
        paymentContractAbi,
        providerOrSigner
    )
}

export const getTokenContract = async (providerOrSigner, tokenAddress) => {
    return new ethers.Contract(
        tokenAddress,
        erc20Abi,
        providerOrSigner
    )
}

// View functions

export const getPaymentContractAddress = () => {
    return contractAddress;
}

export const getOwner = async () => {
    const provider = await getProvider();
    const paymentContract = await getPaymentContract(provider);
    const owner = await paymentContract.owner();
    return owner;
}

export const getUserData = async () => {
    const provider = await getProvider();
    const paymentContract = await getPaymentContract(provider);

    const signer = await provider.getSigner();
    const signerAddress = await signer.getAddress();
    
    const userData = await paymentContract.users(signerAddress);
    return {
        id: userData.id.toString(),
        balance: userData.balance.toString()
    }
}


export const getAcceptedTokens = async () => {
    const provider = await getProvider();
    const signer = await provider.getSigner();
    const signerAddress = await signer.getAddress();

    return await Promise.all(acceptedTokens.map(async (tokenAddress, ) => {
      const tokenContract = await getTokenContract(provider, tokenAddress);
      const tokenName = await tokenContract.name();
      const symbol = await tokenContract.symbol();
      const userBalance = await tokenContract.balanceOf(signerAddress);
      const userAllowance = await tokenContract.allowance(signerAddress, contractAddress);

      return {
        address: tokenAddress,
        name: tokenName,
        symbol: symbol,
        balance: userBalance.toString(),
        allowance: userAllowance.toString()
      }
    }));
}

// State changing functions

export const initializeUser = async (ipAddress) => {
    const provider = await getProvider();
    const signer = await provider.getSigner();
    const paymentContract = await getPaymentContract(signer);
    await paymentContract.initializeUser(ipAddress);
}

export const approveToken = async (tokenAddress, amount) => {
    const provider = await getProvider();
    const signer = await provider.getSigner();
    const tokenContract = await getTokenContract(tokenAddress, signer);
    await tokenContract.approve(contractAddress, amount);
}

export const recharge = async (tokenAddress, amount) => {
    const provider = await getProvider();
    const signer = await provider.getSigner();
    const paymentContract = await getPaymentContract(signer);
    await paymentContract.recharge(tokenAddress, amount);
}
