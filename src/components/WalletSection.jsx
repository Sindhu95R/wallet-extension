import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Typography,
  Box,
  TextField,
  Select,
  MenuItem,
  Paper,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import LogoutIcon from "@mui/icons-material/Logout";
import LoadingSpinner from "./LoadingSpinner";
import { getBalance } from "../services/walletService"; // Make sure this import is correct

const WalletSection = ({ wallet, onLogout, onConfirmTransaction }) => {
  const [recipientAddress, setRecipientAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Private");
  const [balance, setBalance] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        setLoading(true);
        const fetchedBalance = await getBalance(wallet.address);
        setBalance(fetchedBalance);
      } catch (error) {
        console.error("Error fetching balance:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, [wallet.address]);

  const handleSend = () => {
    const transactionDetails = {
      sender: wallet.address,
      recipient: recipientAddress,
      amount,
      gasFee: "0.0010", // Sample value for gas fee
      category,
    };
    onConfirmTransaction(transactionDetails);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Wallet Details
      </Typography>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          <strong>Address:</strong>
        </Typography>
        <Typography variant="body2" sx={{ wordBreak: "break-all" }}>
          {wallet.address}
        </Typography>
      </Paper>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          <strong>Balance:</strong>
        </Typography>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <Typography variant="h6">{balance} TFUEL</Typography>
        )}
      </Paper>
      <Typography variant="h6" component="h3" gutterBottom>
        Send Transaction
      </Typography>
      <TextField
        label="Recipient Address"
        variant="outlined"
        value={recipientAddress}
        onChange={(e) => setRecipientAddress(e.target.value)}
        fullWidth
      />
      <TextField
        label="Amount (TFUEL)"
        variant="outlined"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        fullWidth
      />
      <Select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        fullWidth
      >
        <MenuItem value="Private">Private</MenuItem>
        <MenuItem value="Income & Earnings">Income & Earnings</MenuItem>
        <MenuItem value="Expenses & Payments">Expenses & Payments</MenuItem>
        <MenuItem value="Transfers & Transactions">
          Transfers & Transactions
        </MenuItem>
        <MenuItem value="Investments & Savings">Investments & Savings</MenuItem>
        <MenuItem value="Adjustments & Penalties">
          Adjustments & Penalties
        </MenuItem>
      </Select>
      <Button
        variant="contained"
        onClick={handleSend}
        disabled={!recipientAddress || !amount}
        startIcon={<SendIcon />}
      >
        Send
      </Button>
      <Button variant="outlined" onClick={onLogout} startIcon={<LogoutIcon />}>
        Logout
      </Button>
    </Box>
  );
};

WalletSection.propTypes = {
  wallet: PropTypes.shape({
    address: PropTypes.string.isRequired,
  }).isRequired,
  onLogout: PropTypes.func.isRequired,
  onConfirmTransaction: PropTypes.func.isRequired,
};

export default WalletSection;
// import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";
// import {
//   Button,
//   Typography,
//   Box,
//   TextField,
//   Select,
//   MenuItem,
//   Paper,
// } from "@mui/material";
// import LoadingSpinner from "./LoadingSpinner";
// import { getBalance } from "../services/walletService"; // Make sure this import is correct

// const WalletSection = ({ wallet, onLogout, onConfirmTransaction }) => {
//   const [recipientAddress, setRecipientAddress] = useState("");
//   const [amount, setAmount] = useState("");
//   const [category, setCategory] = useState("Private");
//   const [balance, setBalance] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchBalance = async () => {
//       try {
//         setLoading(true);
//         const fetchedBalance = await getBalance(wallet.address);
//         setBalance(fetchedBalance);
//       } catch (error) {
//         console.error("Error fetching balance:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBalance();
//   }, [wallet.address]);

//   const handleSend = () => {
//     const transactionDetails = {
//       sender: wallet.address,
//       recipient: recipientAddress,
//       amount,
//       gasFee: "0.0010", // Sample value for gas fee
//       category,
//     };
//     onConfirmTransaction(transactionDetails);
//   };

//   return (
//     <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2 }}>
//       <Typography variant="h5" component="h2" gutterBottom>
//         Wallet Details
//       </Typography>
//       <Paper elevation={3} sx={{ p: 2 }}>
//         <Typography variant="subtitle1" gutterBottom>
//           <strong>Address:</strong>
//         </Typography>
//         <Typography variant="body2" sx={{ wordBreak: "break-all" }}>
//           {wallet.address}
//         </Typography>
//       </Paper>
//       <Paper elevation={3} sx={{ p: 2 }}>
//         <Typography variant="subtitle1" gutterBottom>
//           <strong>Balance:</strong>
//         </Typography>
//         {loading ? (
//           <LoadingSpinner />
//         ) : (
//           <Typography variant="h6">{balance} TFUEL</Typography>
//         )}
//       </Paper>
//       <Typography variant="h6" component="h3" gutterBottom>
//         Send Transaction
//       </Typography>
//       <TextField
//         label="Recipient Address"
//         variant="outlined"
//         value={recipientAddress}
//         onChange={(e) => setRecipientAddress(e.target.value)}
//         fullWidth
//       />
//       <TextField
//         label="Amount (TFUEL)"
//         variant="outlined"
//         type="number"
//         value={amount}
//         onChange={(e) => setAmount(e.target.value)}
//         fullWidth
//       />
//       <Select
//         value={category}
//         onChange={(e) => setCategory(e.target.value)}
//         fullWidth
//       >
//         <MenuItem value="Private">Private</MenuItem>
//         <MenuItem value="Income & Earnings">Income & Earnings</MenuItem>
//         <MenuItem value="Expenses & Payments">Expenses & Payments</MenuItem>
//         <MenuItem value="Transfers & Transactions">
//           Transfers & Transactions
//         </MenuItem>
//         <MenuItem value="Investments & Savings">Investments & Savings</MenuItem>
//         <MenuItem value="Adjustments & Penalties">
//           Adjustments & Penalties
//         </MenuItem>
//       </Select>
//       <Button
//         variant="contained"
//         onClick={handleSend}
//         disabled={!recipientAddress || !amount}
//       >
//         Send
//       </Button>
//       <Button variant="outlined" onClick={onLogout}>
//         Logout
//       </Button>
//     </Box>
//   );
// };

// WalletSection.propTypes = {
//   wallet: PropTypes.shape({
//     address: PropTypes.string.isRequired,
//   }).isRequired,
//   onLogout: PropTypes.func.isRequired,
//   onConfirmTransaction: PropTypes.func.isRequired,
// };

// export default WalletSection;

// import React, { useState } from "react";
// import PropTypes from "prop-types";
// import {
//   Button,
//   Typography,
//   Box,
//   TextField,
//   Select,
//   MenuItem,
//   Paper,
// } from "@mui/material";

// const WalletSection = ({ wallet, balance, onLogout, onConfirmTransaction }) => {
//   const [recipientAddress, setRecipientAddress] = useState("");
//   const [amount, setAmount] = useState("");
//   const [category, setCategory] = useState("Private");

//   const handleSend = () => {
//     const transactionDetails = {
//       sender: wallet.address,
//       recipient: recipientAddress,
//       amount,
//       gasFee: "0.0010", // Sample value for gas fee
//       category,
//     };
//     onConfirmTransaction(transactionDetails);
//   };

//   return (
//     <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2 }}>
//       <Typography variant="h5" component="h2" gutterBottom>
//         Wallet Details
//       </Typography>
//       <Paper elevation={3} sx={{ p: 2 }}>
//         <Typography variant="subtitle1" gutterBottom>
//           <strong>Address:</strong>
//         </Typography>
//         <Typography variant="body2" sx={{ wordBreak: "break-all" }}>
//           {wallet.address}
//         </Typography>
//       </Paper>
//       <Paper elevation={3} sx={{ p: 2 }}>
//         <Typography variant="subtitle1" gutterBottom>
//           <strong>Balance:</strong>
//         </Typography>
//         <Typography variant="h6">{balance} TFUEL</Typography>
//       </Paper>
//       <Typography variant="h6" component="h3" gutterBottom>
//         Send Transaction
//       </Typography>
//       <TextField
//         label="Recipient Address"
//         variant="outlined"
//         value={recipientAddress}
//         onChange={(e) => setRecipientAddress(e.target.value)}
//         fullWidth
//       />
//       <TextField
//         label="Amount (TFUEL)"
//         variant="outlined"
//         type="number"
//         value={amount}
//         onChange={(e) => setAmount(e.target.value)}
//         fullWidth
//       />
//       <Select
//         value={category}
//         onChange={(e) => setCategory(e.target.value)}
//         fullWidth
//       >
//         <MenuItem value="Private">Private</MenuItem>
//         <MenuItem value="Income & Earnings">Income & Earnings</MenuItem>
//         <MenuItem value="Expenses & Payments">Expenses & Payments</MenuItem>
//         <MenuItem value="Transfers & Transactions">
//           Transfers & Transactions
//         </MenuItem>
//         <MenuItem value="Investments & Savings">Investments & Savings</MenuItem>
//         <MenuItem value="Adjustments & Penalties">
//           Adjustments & Penalties
//         </MenuItem>
//       </Select>
//       <Button
//         variant="contained"
//         onClick={handleSend}
//         disabled={!recipientAddress || !amount}
//       >
//         Send
//       </Button>
//       <Button variant="outlined" onClick={onLogout}>
//         Logout
//       </Button>
//     </Box>
//   );
// };

// WalletSection.propTypes = {
//   wallet: PropTypes.shape({
//     address: PropTypes.string.isRequired,
//   }).isRequired,
//   balance: PropTypes.string.isRequired,
//   onLogout: PropTypes.func.isRequired,
//   onConfirmTransaction: PropTypes.func.isRequired,
// };

// export default WalletSection;
