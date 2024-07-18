let wallet;
const provider = new ethers.providers.JsonRpcProvider(
  "https://eth-rpc-api-testnet.thetatoken.org/rpc"
);

document.addEventListener("DOMContentLoaded", initializeWallet);
document.addEventListener("DOMContentLoaded", function () {
  chrome.storage.local.get(["transactionData"], function (result) {
    if (result.transactionData) {
      document.getElementById("recipientAddress").value =
        result.transactionData.recipientAddress;
      document.getElementById("amount").value = result.transactionData.amount;
      document.getElementById("categorySelect").value =
        result.transactionData.category;
      chrome.storage.local.remove(["transactionData"]); // Clean up after loading
    }
  });
});

document
  .getElementById("createWalletBtn")
  .addEventListener("click", showCreateSection);
document
  .getElementById("importWalletBtn")
  .addEventListener("click", showImportSection);
document
  .getElementById("saveNewWalletBtn")
  .addEventListener("click", saveNewWallet);
document.getElementById("loginBtn").addEventListener("click", importWallet);
document.getElementById("sendBtn").addEventListener("click", sendTransaction);
document.getElementById("logoutBtn").addEventListener("click", logout);

function showSection(sectionId) {
  const sections = [
    "initialSection",
    "createSection",
    "importSection",
    "walletSection",
  ];
  sections.forEach((section) => {
    document.getElementById(section).style.display =
      section === sectionId ? "block" : "none";
  });
}

function initializeWallet() {
  chrome.storage.local.get(["privateKey"], function (result) {
    if (result.privateKey) {
      wallet = new ethers.Wallet(result.privateKey, provider);
      displayWalletInfo();
    } else {
      showSection("initialSection");
    }
  });
}

function showCreateSection() {
  const newWallet = ethers.Wallet.createRandom();
  document.getElementById("newWalletAddress").textContent = newWallet.address;
  document.getElementById("newWalletPrivateKey").textContent =
    newWallet.privateKey;
  showSection("createSection");
}

function showImportSection() {
  showSection("importSection");
}

function saveNewWallet() {
  const privateKey = document.getElementById("newWalletPrivateKey").textContent;
  wallet = new ethers.Wallet(privateKey, provider);
  chrome.storage.local.set({ privateKey: privateKey }, function () {
    console.log("New wallet saved");
    displayWalletInfo();
  });
}

async function importWallet() {
  const privateKey = document.getElementById("privateKeyInput").value;
  try {
    wallet = new ethers.Wallet(privateKey, provider);
    chrome.storage.local.set({ privateKey: privateKey }, function () {
      console.log("Wallet imported");
      displayWalletInfo();
    });
  } catch (error) {
    alert("Invalid private key. Please try again.");
  }
}

async function displayWalletInfo() {
  const address = await wallet.getAddress();
  const balance = await provider.getBalance(address);

  document.getElementById("walletAddress").textContent = address;
  document.getElementById("walletBalance").textContent =
    ethers.utils.formatEther(balance);

  showSection("walletSection");
}

async function sendTransaction() {
  const recipientAddress = document.getElementById("recipientAddress").value;
  const amount = document.getElementById("amount").value;
  const category = document.getElementById("categorySelect").value;
  const address = await wallet.getAddress();

  if (!ethers.utils.isAddress(recipientAddress)) {
    alert("Invalid recipient address");
    return;
  }

  document.querySelector(".loader").style.display = "block";

  try {
    // This sends the actual transaction to the blockchain
    const txResponse = await wallet.sendTransaction({
      to: recipientAddress,
      value: ethers.utils.parseEther(amount),
    });

    alert(`Transaction sent! Hash: ${txResponse.hash}`);
    const txReceipt = await txResponse.wait();
    alert("Transaction confirmed!");

    const balance = await provider.getBalance(wallet.address);
    document.getElementById("walletBalance").textContent =
      ethers.utils.formatEther(balance);

    // Create the payload with all the required details
    const payload = {
      wallet_address: address,
      sender: address,
      recipient: recipientAddress,
      // gas_fee: ethers.utils.formatUnits(
      //   txReceipt.gasUsed.mul(txReceipt.effectiveGasPrice),
      //   "ether"
      // ),
      gas_fee: amount,
      amount: amount,
      category: category,
      hash: txResponse.hash,
      date: new Date().toISOString().substring(0, 10),
      time: new Date().toTimeString().substring(0, 8),
    };

    // Send the payload to your server for AI calculations
    sendCategoryDataToServer(payload);
  } catch (error) {
    alert("Error sending transaction to the db. Please try again.");
    console.error("Error sending transaction:", error);
  } finally {
    // Hide the loader whether the transaction succeeds or fails
    document.querySelector(".loader").style.display = "none";
  }
}

function sendCategoryDataToServer(payload) {
  fetch("https://theta-wallet-app.onrender.com/api/transaction", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function logout() {
  chrome.storage.local.remove(["privateKey"], function () {
    console.log("Wallet logged out");
  });
  wallet = null;
  showSection("initialSection");
}
