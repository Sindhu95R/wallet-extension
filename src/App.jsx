/* global chrome */
import React, { useState, useEffect } from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
  useMediaQuery,
} from "@mui/material";
import { ethers } from "ethers";
import InitialSection from "./components/InitialSection";
import CreateSection from "./components/CreateSection";
import ImportSection from "./components/ImportSection";
import WalletSection from "./components/WalletSection";
import ConfirmTransaction from "./components/ConfirmTransaction";
import { getBalance, sendTransaction } from "./services/walletService";
import LoadingSpinner from "./components/LoadingSpinner";

const App = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
          primary: {
            main: "#29B6AF",
          },
          background: {
            default: prefersDarkMode ? "#000000" : "#FFFFFF",
          },
        },
      }),
    [prefersDarkMode]
  );

  const [currentSection, setCurrentSection] = useState("initial");
  const [wallet, setWallet] = useState(null);
  const [balance, setBalance] = useState("");
  const [loading, setLoading] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState(null);

  useEffect(() => {
    initializeWallet();
  }, []);

  const initializeWallet = async () => {
    setLoading(true);
    try {
      if (typeof chrome !== "undefined" && chrome.storage) {
        chrome.storage.local.get(
          ["privateKey", "walletAddress"],
          async function (result) {
            if (result.privateKey) {
              const provider = new ethers.JsonRpcProvider(
                "https://eth-rpc-api-testnet.thetatoken.org/rpc"
              );
              const newWallet = new ethers.Wallet(result.privateKey, provider);
              setWallet(newWallet);
              const balance = await getBalance(newWallet.address);
              setBalance(balance);
              setCurrentSection("wallet");
            } else {
              setCurrentSection("initial");
            }
          }
        );
      }
    } catch (error) {
      console.error("Error initializing wallet:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateWallet = (newWallet) => {
    setWallet(newWallet);
    if (typeof chrome !== "undefined" && chrome.storage) {
      chrome.storage.local.set(
        {
          privateKey: newWallet.privateKey,
          walletAddress: newWallet.address,
        },
        () => {
          setCurrentSection("wallet");
        }
      );
    }
    // Added else ;
   else {
    	setCurrentSection("wallet");
   }
  };

  const handleImportWallet = (importedWallet) => {
    setWallet(importedWallet);
    if (typeof chrome !== "undefined" && chrome.storage) {
      chrome.storage.local.set(
        {
          privateKey: importedWallet.privateKey,
          walletAddress: importedWallet.address,
        },
        () => {
          setCurrentSection("wallet");
        }
      );
    }
    // Added else
    else {
      	setCurrentSection("wallet");
    }
  };

  const handleLogout = () => {
    if (typeof chrome !== "undefined" && chrome.storage) {
      chrome.storage.local.remove(["privateKey", "walletAddress"], () => {
        setWallet(null);
        setBalance("");
        setCurrentSection("initial");
      });
    }
    //Added Else
    else {
      	setWallet(null);
      	setBalance("");
      	setCurrentSection("initial");
    }
  };

  const handleConfirmTransaction = (details) => {
    setTransactionDetails(details);
    setCurrentSection("confirm");
  };

  const handleTransactionConfirmed = async ({ gasFee, total }) => {
    try {
      setLoading(true);
      const tx = await sendTransaction(
        wallet,
        transactionDetails.recipient,
        transactionDetails.amount
      );
      alert(`Transaction sent! Hash: ${tx.hash}`);
      const payload = {
        wallet_address: wallet.address,
        sender: tx.from,
        recipient: transactionDetails.recipient,
        amount: transactionDetails.amount,
        gas_fee: gasFee,
        category: transactionDetails.category,
        nonce: tx.nonce,
        hash: tx.hash,
        date: new Date().toISOString().substring(0, 10),
        time: new Date().toTimeString().substring(0, 8),
        final_amount: total,
      };
      console.log("Payload for server:", payload);

      await sendCategoryDataToServer(payload);
      setCurrentSection("wallet");
    } catch (error) {
      alert("Error sending transaction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const sendCategoryDataToServer = async (payload) => {
    try {
      const response = await fetch(
        "https://theta-wallet-app.onrender.com/api/transaction",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      const data = await response.json();
      console.log("Success:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleTransactionRejected = () => {
    alert("Transaction declined.");
    setCurrentSection("wallet");
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{ width: 360, minHeight: 600, maxHeight: 600, overflow: "auto" }}
      >
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {currentSection === "initial" && (
              <InitialSection
                onCreateWallet={() => setCurrentSection("create")}
                onImportWallet={() => setCurrentSection("import")}
              />
            )}
            {currentSection === "create" && (
              <CreateSection onSaveWallet={handleCreateWallet} />
            )}
            {currentSection === "import" && (
              <ImportSection onImportWallet={handleImportWallet} />
            )}
            {currentSection === "wallet" && wallet && (
              <WalletSection
                wallet={wallet}
                balance={balance}
                onLogout={handleLogout}
                onConfirmTransaction={handleConfirmTransaction}
              />
            )}
            {currentSection === "confirm" && transactionDetails && (
              <ConfirmTransaction
                transactionDetails={transactionDetails}
                onConfirm={handleTransactionConfirmed}
                onReject={handleTransactionRejected}
              />
            )}
          </>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default App;
// import React, { useState, useEffect } from "react";
// import {
//   ThemeProvider,
//   createTheme,
//   CssBaseline,
//   Box,
//   useMediaQuery,
// } from "@mui/material";
// import { ethers } from "ethers";
// import InitialSection from "./components/InitialSection";
// import CreateSection from "./components/CreateSection";
// import ImportSection from "./components/ImportSection";
// import WalletSection from "./components/WalletSection";
// import ConfirmTransaction from "./components/ConfirmTransaction";
// import { getBalance, sendTransaction } from "./services/walletService";
// import LoadingSpinner from "./components/LoadingSpinner";

// const App = () => {
//   const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

//   const theme = React.useMemo(
//     () =>
//       createTheme({
//         palette: {
//           mode: prefersDarkMode ? "dark" : "light",
//           primary: {
//             main: "#29B6AF",
//           },
//           background: {
//             default: prefersDarkMode ? "#000000" : "#FFFFFF",
//           },
//         },
//       }),
//     [prefersDarkMode]
//   );

//   const [currentSection, setCurrentSection] = useState("initial");
//   const [wallet, setWallet] = useState(null);
//   const [balance, setBalance] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [transactionDetails, setTransactionDetails] = useState(null);

//   useEffect(() => {
//     initializeWallet();
//   }, []);

//   const initializeWallet = async () => {
//     setLoading(true);
//     try {
//       if (typeof chrome !== "undefined" && chrome.storage) {
//         chrome.storage.local.get(["privateKey"], async function (result) {
//           if (result.privateKey) {
//             const provider = new ethers.JsonRpcProvider(
//               "https://eth-rpc-api-testnet.thetatoken.org/rpc"
//             );
//             const newWallet = new ethers.Wallet(result.privateKey, provider);
//             setWallet(newWallet);
//             const balance = await getBalance(newWallet.address);
//             setBalance(balance);
//             setCurrentSection("wallet");
//           } else {
//             setCurrentSection("initial");
//           }
//         });
//       }
//     } catch (error) {
//       console.error("Error initializing wallet:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCreateWallet = (newWallet) => {
//     setWallet(newWallet);
//     if (typeof chrome !== "undefined" && chrome.storage) {
//       chrome.storage.local.set({ privateKey: newWallet.privateKey }, () => {
//         setCurrentSection("wallet");
//       });
//     }
//   };

//   const handleImportWallet = (importedWallet) => {
//     setWallet(importedWallet);
//     if (typeof chrome !== "undefined" && chrome.storage) {
//       chrome.storage.local.set(
//         { privateKey: importedWallet.privateKey },
//         () => {
//           setCurrentSection("wallet");
//         }
//       );
//     }
//   };

//   const handleLogout = () => {
//     if (typeof chrome !== "undefined" && chrome.storage) {
//       chrome.storage.local.remove(["privateKey"], () => {
//         setWallet(null);
//         setBalance("");
//         setCurrentSection("initial");
//       });
//     }
//   };

//   const handleConfirmTransaction = (details) => {
//     setTransactionDetails(details);
//     setCurrentSection("confirm");
//   };

//   const handleTransactionConfirmed = async ({ gasFee, total }) => {
//     try {
//       setLoading(true);
//       const tx = await sendTransaction(
//         wallet,
//         transactionDetails.recipient,
//         transactionDetails.amount
//       );
//       alert(`Transaction sent! Hash: ${tx.hash}`);
//       const payload = {
//         wallet_address: wallet.address,
//         sender: tx.from,
//         recipient: transactionDetails.recipient,
//         amount: transactionDetails.amount,
//         gas_fee: gasFee,
//         category: transactionDetails.category,
//         nonce: tx.nonce,
//         hash: tx.hash,
//         date: new Date().toISOString().substring(0, 10),
//         time: new Date().toTimeString().substring(0, 8),
//         final_amount: total,
//       };
//       console.log("Payload for server:", payload);

//       await sendCategoryDataToServer(payload);
//       setCurrentSection("wallet");
//     } catch (error) {
//       alert("Error sending transaction. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const sendCategoryDataToServer = async (payload) => {
//     try {
//       const response = await fetch(
//         "https://theta-wallet-app.onrender.com/api/transaction",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(payload),
//         }
//       );
//       const data = await response.json();
//       console.log("Success:", data);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   const handleTransactionRejected = () => {
//     alert("Transaction declined.");
//     setCurrentSection("wallet");
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Box
//         sx={{ width: 360, minHeight: 600, maxHeight: 600, overflow: "auto" }}
//       >
//         {loading ? (
//           <LoadingSpinner />
//         ) : (
//           <>
//             {currentSection === "initial" && (
//               <InitialSection
//                 onCreateWallet={() => setCurrentSection("create")}
//                 onImportWallet={() => setCurrentSection("import")}
//               />
//             )}
//             {currentSection === "create" && (
//               <CreateSection onSaveWallet={handleCreateWallet} />
//             )}
//             {currentSection === "import" && (
//               <ImportSection onImportWallet={handleImportWallet} />
//             )}
//             {currentSection === "wallet" && wallet && (
//               <WalletSection
//                 wallet={wallet}
//                 balance={balance}
//                 onLogout={handleLogout}
//                 onConfirmTransaction={handleConfirmTransaction}
//               />
//             )}
//             {currentSection === "confirm" && transactionDetails && (
//               <ConfirmTransaction
//                 transactionDetails={transactionDetails}
//                 onConfirm={handleTransactionConfirmed}
//                 onReject={handleTransactionRejected}
//               />
//             )}
//           </>
//         )}
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default App;
