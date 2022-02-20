import {ethers, providers} from "ethers";
import paymentContractAbi from "./PaymentV1.json"

export const getProvider = () => {
    return new ethers.providers.Web3Provider(window.ethereum);
}

export const getPaymentContract = async (providerOrSigner) => {
    return new ethers.Contract(
        '0xF14b22D8830E6fB02eb80192102bB08156e00AB3',
        paymentContractAbi,
        providerOrSigner
    )
}
export const getOwner = async () => {
    const provider = getProvider();
    const paymentContract = await getPaymentContract(provider);
    const owner = await paymentContract.owner();
    console.log('owner', owner);
    return owner;
}

export const getUserData = async () => {
    const provider = getProvider();
    await provider.send("eth_requestAccounts", []);
    const paymentContract = await getPaymentContract(provider);
    const signer = await provider.getSigner();
    const signerAddress = await signer.getAddress();
    const userData = await paymentContract.users(signerAddress);
    console.log('userData', userData);
    return userData;
}

export const initializeUser = async () => {
    const provider = getProvider();
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const paymentContract = await getPaymentContract(signer);
    await paymentContract.initializeUser("255255255123");
}