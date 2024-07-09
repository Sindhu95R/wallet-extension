document.addEventListener("DOMContentLoaded", function () {
  // Add event listener for the Transfer button
  document.getElementById("form").addEventListener("click", handler);

  // Add event listener for the Check Balance button
  document
    .getElementById("check_balance")
    .addEventListener("click", checkBalance);
});

function handler() {
  document.getElementById("center").style.display = "flex"; // Show loader

  const amount = document.getElementById("amount").value;
  const private_key = document.getElementById("private_key").value;
  // "2a53e1168984af1d12b34930c96118fbea616e27196a3ca6bad120b5a208f789"; // Predefined private key
  const address = document.getElementById("address").value;
  // "0xf6Ab2679E497592fCAE6F28Ce4F1062419BFDCFc"; // Predefined recipient address
  //Acc 1 PrivateK: 2a53e1168984af1d12b34930c96118fbea616e27196a3ca6bad120b5a208f789
  //Acc 1 PublicK: 0x9C19d640eBBeC83F5537CA7377013F76E4CA91eA
  //Acc 2 PublicK: 0xf6Ab2679E497592fCAE6F28Ce4F1062419BFDCFc
  //Acc 2 PrivateK: 215c65bcd9a542b78eec02fab25dde28bdd14452c560f19807d62173fd5d67ac
  // Initialize provider
  const provider = new ethers.providers.JsonRpcProvider(
    "https://eth-rpc-api-testnet.thetatoken.org/rpc"
  );

  let wallet = new ethers.Wallet(private_key, provider);

  const tx = {
    to: address,
    value: ethers.utils.parseEther(amount),
  };

  wallet
    .sendTransaction(tx)
    .then((txObj) => {
      console.log("txHash", txObj.hash);
      document.getElementById("center").style.display = "none"; // Hide loader
      const a = document.getElementById("link");
      a.href = `https://explorer.thetatoken.org/tx/${txObj.hash}`;
      document.getElementById("link").style.display = "block"; // Show transaction link
    })
    .catch((error) => {
      console.error("Transaction error:", error);
      document.getElementById("center").style.display = "none"; // Hide loader
      alert("Transaction failed: " + error.message);
    });
}

function checkBalance() {
  document.getElementById("center").style.display = "flex"; // Show loader

  // Initialize provider
  const provider = new ethers.providers.JsonRpcProvider(
    "https://eth-rpc-api-testnet.thetatoken.org/rpc"
  );

  const address = document.getElementById("address").value;
  provider
    .getBalance(address)
    .then((balance) => {
      // Convert balance to ether
      const balanceInEth = ethers.utils.formatEther(balance);
      document.getElementById(
        "check_balance"
      ).innerText = `Your Balance: ${balanceInEth} TFUEL`;
      console.log(`balance: ${balanceInEth} TFUEL`);
      document.getElementById("center").style.display = "none"; // Hide loader
    })
    .catch((error) => {
      console.error("Error fetching balance:", error);
      document.getElementById("center").style.display = "none"; // Hide loader
      alert("Failed to fetch balance: " + error.message);
    });
}
// document.addEventListener("DOMContentLoaded", function () {
//   document.getElementById("form").addEventListener("click", handler);
// });

// function handler() {
//   document.getElementById("center").style.display = "flex";

//   const private_key = document.getElementById("private_key").value;
//   const amount = document.getElementById("amount").value;
//   const address = document.getElementById("address").value;

//   test_p = "215c65bcd9a542b78eec02fab25dde28bdd14452c560f19807d62173fd5d67ac"; //Account with test money
//   test_a = "0x9C19d640eBBeC83F5537CA7377013F76E4CA91eA"; // Chrome extension account 1 empty account

//   //provider
//   const provider = new ethers.providers.JsonRpcProvider(
//     "https://eth-rpc-api-testnet.thetatoken.org/rpc"
//   );

//   let wallet = new ethers.Wallet(private_key, provider);

//   const tx = {
//     to: address,
//     value: ethers.utils.parseEther(amount),
//   };

//   var a = document.getElementById("link");
//   a.href = "link for reciept";

//   wallet.sendTransaction(tx).then((txObj) => {
//     console.log("txHash", txObj.hash);
//     document.getElementById("center").style.display = "none";
//     const a = document.getElementById("link");
//     a.href = "/${txObj.hash}";
//     document.getElementById("link").style.display = "block";
//   });
// }

// document.addEventListener("DOMContentLoaded", function () {
//   docuement
//     .getElementById("check_balance")
//     .addEventListener("click", checkBalance);
// });

// function checkBalance() {
//   document.getElementById("center").style.display = "flex";

//   //Provider
//   const provider = new ethers.providers.JsonRpcProvider(
//     "https://eth-rpc-api-testnet.thetatoken.org/rpc"
//   );

//   const signer = provider.getSigner();

//   console.log(signer);

//   const address = document.getElementById("address").value;
//   provider.getBalance(address).then((balance) => {
//     //convert to ether
//     const balanceInEth = ethers.utils.formatEther(balance);
//     document.getElementById("check_balance").innerText =
//       "Your Balance: ${balanceInEth} TFUEL";
//     console.log("balance: ${balanceInEth} ETH");
//     document.getElementById("center").style.display = "none";
//   });
// }
