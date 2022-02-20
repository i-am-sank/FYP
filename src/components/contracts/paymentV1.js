import {ethers, BigNumber, wait} from "ethers";
import paymentContractAbi from "./abi/PaymentV1.json"
import erc20Abi from "./abi/ERC20.json"


const contractAddress = '0x466598fCDD496C218e2Eb07EB7aCbCeaD9C1A25E';

// Helper functions
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

export const toHumanReadable = (amount, decimals) => {
    return amount.div(BigNumber.from('10').pow(decimals))
}

export const toDecimals = (amount, decimals) => {
    return BigNumber.from(amount).mul(BigNumber.from('10').pow(decimals))
}

// View functions

export const getAcceptedTokensList = async () => {
    const provider = await getProvider();
    const paymentContract = await getPaymentContract(provider);
    const acceptedTokensList = await paymentContract.getAllAcceptedTokens();
    return acceptedTokensList;
}

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

    const userData = await paymentContract.getUserData(signerAddress);

    return {
        id: userData.id.toString(),
        balances: await Promise.all(userData.tokens.map(async (tokenAddress, index) => {
            const tokenContract = await getTokenContract(provider, tokenAddress);
            const symbol = await tokenContract.symbol();
            const decimals = await tokenContract.decimals();
            
            return {
              symbol: symbol,
              balance: toHumanReadable(userData.balances[index], decimals)
            }
          }))
    }
}


export const getAcceptedTokens = async () => {
    const provider = await getProvider();
    const signer = await provider.getSigner();
    const signerAddress = await signer.getAddress();
    const acceptedTokens = await getAcceptedTokensList();

    return await Promise.all(acceptedTokens.map(async (tokenAddress, ) => {
      const tokenContract = await getTokenContract(provider, tokenAddress);
      const tokenName = await tokenContract.name();
      const symbol = await tokenContract.symbol();
      const decimals = await tokenContract.decimals();
      const userBalance = await tokenContract.balanceOf(signerAddress);
      const userAllowance = await tokenContract.allowance(signerAddress, contractAddress);
      
      return {
        address: tokenAddress,
        name: tokenName,
        symbol: symbol,
        decimals: decimals.toString(),
        balance: toHumanReadable(userBalance, decimals).toString(),
        allowance: toHumanReadable(userAllowance, decimals).toString()
      }
    }));
}

// State changing functions

export const initializeUser = async (ipAddress) => {
    const provider = await getProvider();
    const signer = await provider.getSigner();
    const paymentContract = await getPaymentContract(signer);
    const transaction = await paymentContract.initializeUser(ipAddress);
    const receipt = await transaction.wait()
    return receipt.transactionHash;
}

export const approveToken = async (tokenAddress, amount) => {
    const provider = await getProvider();
    const signer = await provider.getSigner();
    const tokenContract = await getTokenContract(signer, tokenAddress);
    
    const tokenDecimals = await tokenContract.decimals();
    const amountWithDecimals = toDecimals(amount, tokenDecimals);

    const transaction = await tokenContract.approve(contractAddress, amountWithDecimals);
    const receipt = await transaction.wait()
    return receipt.transactionHash;
}

export const recharge = async (tokenAddress, amount) => {
    const provider = await getProvider();
    const signer = await provider.getSigner();
    const paymentContract = await getPaymentContract(signer);

    const tokenContract = await getTokenContract(signer, tokenAddress);
    const tokenDecimals = await tokenContract.decimals();
    const amountWithDecimals = toDecimals(amount, tokenDecimals);

    const transaction = await paymentContract.recharge(tokenAddress, amountWithDecimals);
    const receipt = await transaction.wait()
    return receipt.transactionHash;
}
