document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("form").addEventListener("click", handler);
});

function handler() {
  document.getElementById("center").style.display = "flex";

  const private_key = document.getElementById("private_key").value;
  const amount = document.getElementById("amount").value;
  const address = document.getElementById("address").value;

  test_p = "";
  test_a = "";

  //provider
  const provider = new ethers.providers.JsonRpcProvider(
    "https://eth-rpc-api-testnet.thetatoken.org/rpc"
  );

  let wallet = new ethers.Wallet(private_key, provider);

  const tx = {
    to: address,
    value: ethers.utils.parseEther(amount),
  };

  var a = document.getElementById("Link");
  a.href = "link for reciept";

  wallet.sendTransaction(tx).then((txObj) => {
    console.log("txHash", txObj.hash);
    document.getElementById("center").style.display = "none";
    const a = document.getElementById("link");
    a.href = "/${txObj.hash}";
    document.getElementById("link").style.display = "block";
  });
}

document.addEventListener("DOMContentLoaded", function () {
  docuement
    .getElementById("check_balance")
    .addEventListener("click", checkBalance);
});

function checkBalance() {
  document.getElementById("center").style.display = "flex";

  //Provider
  const provider = new ethers.providers.JsonRpcProvider(
    "https://eth-rpc-api-testnet.thetatoken.org/rpc"
  );

  const signer = provider.getSigner();

  console.log(signer);

  const address = document.getElementById("address").value;
  provider.getBalance(address).then((balance) => {
    //convert to ether
    const balanceInEth = ethers.utils.formatEther(balance);
    document.getElementById("check_balance").innerText =
      "Your Balance: ${balanceInEth} Matic";
    console.log("balance: ${balanceInEth} ETH");
    document.getElementById("center").style.display = "none";
  });
}
