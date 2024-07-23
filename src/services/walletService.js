<<<<<<< HEAD
import { ethers } from 'ethers';

const provider = new ethers.JsonRpcProvider("https://eth-rpc-api-testnet.thetatoken.org/rpc");

export const createWallet = () => {
    return ethers.Wallet.createRandom();
};

export const importWallet = (privateKey) => {
    return new ethers.Wallet(privateKey, provider);
};

export const getBalance = async (address) => {
    const balance = await provider.getBalance(address);
    return ethers.formatEther(balance);
};

export const sendTransaction = async (wallet, to, amount) => {
    const tx = await wallet.sendTransaction({
        to: to,
        value: ethers.parseEther(amount)
    });
    return tx;
};
=======
import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider(
  "https://eth-rpc-api-testnet.thetatoken.org/rpc"
);

export const createWallet = () => {
  return ethers.Wallet.createRandom();
};

export const importWallet = (privateKey) => {
  return new ethers.Wallet(privateKey, provider);
};

export const getBalance = async (address) => {
  const balance = await provider.getBalance(address);
  return ethers.formatEther(balance);
};

export const sendTransaction = async (wallet, to, amount) => {
  const tx = await wallet.sendTransaction({
    to: to,
    value: ethers.parseEther(amount),
  });
  return tx;
};
>>>>>>> d5b28e1b34a175722c6746f78f05cec7a08acaf2
