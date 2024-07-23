import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Typography, Box, Paper } from "@mui/material";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const ConfirmTransaction = ({ transactionDetails, onConfirm, onReject }) => {
  const { sender, recipient, amount } = transactionDetails;
  const [gasFee, setGasFee] = useState("0");
  const [total, setTotal] = useState("0");
  const [optimizer, setOptimizer] = useState(null);
  const [loadingOptimizer, setLoadingOptimizer] = useState(true);

  useEffect(() => {
    const fetchGasFee = async () => {
      try {
        const rpcEndpoint = "https://eth-rpc-api.thetatoken.org/rpc";

        const gasPriceResponse = await axios.post(rpcEndpoint, {
          jsonrpc: "2.0",
          method: "eth_gasPrice",
          params: [],
          id: 1,
        });

        const gasPriceHex = gasPriceResponse.data.result;
        const gasPrice = parseInt(gasPriceHex, 16);

        if (isNaN(gasPrice)) {
          throw new Error("Invalid gas price");
        }

        // const gasPriceTFuel = gasPrice / 1e18;

        const transaction = {
          to: recipient,
          value: `0x${(parseFloat(amount) * 1e18).toString(16)}`,
        };

        const estimatedGasResponse = await axios.post(rpcEndpoint, {
          jsonrpc: "2.0",
          method: "eth_estimateGas",
          params: [transaction],
          id: 2,
        });

        const estimatedGasHex = estimatedGasResponse.data.result;
        const estimatedGas = parseInt(estimatedGasHex, 16);

        if (isNaN(estimatedGas)) {
          throw new Error("Invalid estimated gas");
        }

        const gasFeeWei = estimatedGas * gasPrice;
        const gasFeeTFuel = gasFeeWei / 1e18;

        setGasFee(gasFeeTFuel.toFixed(4));
        setTotal((parseFloat(amount) + gasFeeTFuel).toFixed(4));
      } catch (error) {
        console.error("Error fetching gas fee:", error);
        setGasFee("0");
        setTotal(amount);
      }
    };

    const fetchOptimizerData = async () => {
      try {
        setLoadingOptimizer(true);
        const response = await axios.get(
<<<<<<< HEAD
          "https://theta-wallet-app.onrender.com/api/gas-price/predict"
=======
          "https://theta-wallet-app.onrender.com/api/gas-price/predictaa"
>>>>>>> d5b28e1b34a175722c6746f78f05cec7a08acaf2
        );
        setOptimizer(response.data.predictions);
      } catch (error) {
        console.error("Error fetching optimizer data:", error);
      } finally {
        setLoadingOptimizer(false);
      }
    };

    fetchGasFee();
    fetchOptimizerData();
  }, [amount, recipient]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, p: 1 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Confirm Transaction
      </Typography>
      <Paper elevation={3} sx={{ p: 1 }}>
        <Typography variant="subtitle1" gutterBottom>
          <strong>Sender Address:</strong>
        </Typography>
        <Typography variant="body2" sx={{ wordBreak: "break-all" }}>
          {sender}
        </Typography>
      </Paper>
      <Paper elevation={3} sx={{ p: 1 }}>
        <Typography variant="subtitle1" gutterBottom>
          <strong>Recipient Address:</strong>
        </Typography>
        <Typography variant="body2" sx={{ wordBreak: "break-all" }}>
          {recipient}
        </Typography>
      </Paper>
      <Paper elevation={3} sx={{ p: 1 }}>
        <Typography variant="subtitle1" gutterBottom>
          <strong>Amount:</strong>
        </Typography>
        <Typography variant="body2">{amount} TFUEL</Typography>
      </Paper>
      <Paper elevation={3} sx={{ p: 1 }}>
        <Typography variant="subtitle1" gutterBottom>
          <strong>Estimated Gas Fee:</strong>
        </Typography>
        <Typography variant="body2">{gasFee} TFUEL</Typography>
      </Paper>
      <Paper elevation={3} sx={{ p: 1 }}>
        <Typography variant="subtitle1" gutterBottom>
          <strong>Total:</strong>
        </Typography>
        <Typography variant="body2">{total} TFUEL</Typography>
      </Paper>
      <Paper
        elevation={3}
        sx={{ p: 2, backgroundColor: "#f5f5f5", border: "2px solid #29B6AF" }}
      >
        <Typography variant="subtitle1" gutterBottom>
          <strong>AI Gas Fee Predictor:</strong>
        </Typography>
        {loadingOptimizer ? (
          <LoadingSpinner />
        ) : (
          <Typography variant="body2">
            {optimizer
              ? Object.entries(optimizer).map(([key, value]) => (
                  <div key={key}>
                    {key}: {value}
                  </div>
                ))
              : "No data available"}
          </Typography>
        )}
      </Paper>
      <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
        <Button
          variant="outlined"
          onClick={onReject}
          startIcon={<CancelIcon />}
        >
          Reject
        </Button>
        <Button
          variant="contained"
          onClick={() => onConfirm({ gasFee, total })}
          startIcon={<CheckCircleIcon />}
        >
          Confirm
        </Button>
      </Box>
    </Box>
  );
};

ConfirmTransaction.propTypes = {
  transactionDetails: PropTypes.shape({
    sender: PropTypes.string.isRequired,
    recipient: PropTypes.string.isRequired,
    amount: PropTypes.string.isRequired,
  }).isRequired,
  onConfirm: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired,
};

export default ConfirmTransaction; // import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
// import { Button, Typography, Box, Paper } from "@mui/material";
// import axios from "axios";
// import LoadingSpinner from "./LoadingSpinner";

// const ConfirmTransaction = ({ transactionDetails, onConfirm, onReject }) => {
//   const { sender, recipient, amount } = transactionDetails;
//   const [gasFee, setGasFee] = useState("0");
//   const [total, setTotal] = useState("0");
//   const [optimizer, setOptimizer] = useState(null);
//   const [loadingOptimizer, setLoadingOptimizer] = useState(true);

//   useEffect(() => {
//     const fetchGasFee = async () => {
//       try {
//         const rpcEndpoint = "https://eth-rpc-api.thetatoken.org/rpc";

//         const gasPriceResponse = await axios.post(rpcEndpoint, {
//           jsonrpc: "2.0",
//           method: "eth_gasPrice",
//           params: [],
//           id: 1,
//         });

//         const gasPriceHex = gasPriceResponse.data.result;
//         const gasPrice = parseInt(gasPriceHex, 16);

//         if (isNaN(gasPrice)) {
//           throw new Error("Invalid gas price");
//         }

//         // const gasPriceTFuel = gasPrice / 1e18;

//         const transaction = {
//           to: recipient,
//           value: `0x${(parseFloat(amount) * 1e18).toString(16)}`,
//         };

//         const estimatedGasResponse = await axios.post(rpcEndpoint, {
//           jsonrpc: "2.0",
//           method: "eth_estimateGas",
//           params: [transaction],
//           id: 2,
//         });

//         const estimatedGasHex = estimatedGasResponse.data.result;
//         const estimatedGas = parseInt(estimatedGasHex, 16);

//         if (isNaN(estimatedGas)) {
//           throw new Error("Invalid estimated gas");
//         }

//         const gasFeeWei = estimatedGas * gasPrice;
//         const gasFeeTFuel = gasFeeWei / 1e18;

//         setGasFee(gasFeeTFuel.toFixed(4));
//         setTotal((parseFloat(amount) + gasFeeTFuel).toFixed(4));
//       } catch (error) {
//         console.error("Error fetching gas fee:", error);
//         setGasFee("0");
//         setTotal(amount);
//       }
//     };

//     const fetchOptimizerData = async () => {
//       try {
//         setLoadingOptimizer(true);
//         const response = await axios.get(
//           "https://theta-wallet-app.onrender.com/api/gas-price/predictaa"
//         );
//         setOptimizer(response.data.predictions);
//       } catch (error) {
//         console.error("Error fetching optimizer data:", error);
//       } finally {
//         setLoadingOptimizer(false);
//       }
//     };

//     fetchGasFee();
//     fetchOptimizerData();
//   }, [amount, recipient]);

//   return (
//     <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2 }}>
//       <Typography variant="h5" component="h2" gutterBottom>
//         Confirm Transaction
//       </Typography>
//       <Paper elevation={3} sx={{ p: 2 }}>
//         <Typography variant="subtitle1" gutterBottom>
//           <strong>Sender Address:</strong>
//         </Typography>
//         <Typography variant="body2" sx={{ wordBreak: "break-all" }}>
//           {sender}
//         </Typography>
//       </Paper>
//       <Paper elevation={3} sx={{ p: 2 }}>
//         <Typography variant="subtitle1" gutterBottom>
//           <strong>Recipient Address:</strong>
//         </Typography>
//         <Typography variant="body2" sx={{ wordBreak: "break-all" }}>
//           {recipient}
//         </Typography>
//       </Paper>
//       <Paper elevation={3} sx={{ p: 2 }}>
//         <Typography variant="subtitle1" gutterBottom>
//           <strong>Amount:</strong>
//         </Typography>
//         <Typography variant="body2">{amount} TFUEL</Typography>
//       </Paper>
//       <Paper elevation={3} sx={{ p: 2 }}>
//         <Typography variant="subtitle1" gutterBottom>
//           <strong>Estimated Gas Fee:</strong>
//         </Typography>
//         <Typography variant="body2">{gasFee} TFUEL</Typography>
//       </Paper>
//       <Paper elevation={3} sx={{ p: 2 }}>
//         <Typography variant="subtitle1" gutterBottom>
//           <strong>Total:</strong>
//         </Typography>
//         <Typography variant="body2">{total} TFUEL</Typography>
//       </Paper>
//       <Paper elevation={3} sx={{ p: 2 }}>
//         <Typography variant="subtitle1" gutterBottom>
//           <strong>
//             AI Gas Fee Predictor Trained on Ethereum Wei Dataset using ARIMA
//             Model:
//           </strong>
//         </Typography>
//         {loadingOptimizer ? (
//           <LoadingSpinner />
//         ) : (
//           <Typography variant="body2">
//             {optimizer
//               ? Object.entries(optimizer).map(([key, value]) => (
//                   <div key={key}>
//                     {key}: {value}
//                   </div>
//                 ))
//               : "No data available"}
//           </Typography>
//         )}
//       </Paper>
//       <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
//         <Button variant="outlined" onClick={onReject}>
//           Reject
//         </Button>
//         <Button
//           variant="contained"
//           onClick={() => onConfirm({ gasFee, total })}
//         >
//           Confirm
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// ConfirmTransaction.propTypes = {
//   transactionDetails: PropTypes.shape({
//     sender: PropTypes.string.isRequired,
//     recipient: PropTypes.string.isRequired,
//     amount: PropTypes.string.isRequired,
//   }).isRequired,
//   onConfirm: PropTypes.func.isRequired,
//   onReject: PropTypes.func.isRequired,
// };

// export default ConfirmTransaction;

// import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
// import { Button, Typography, Box, Paper } from "@mui/material";
// import axios from "axios";

// const ConfirmTransaction = ({ transactionDetails, onConfirm, onReject }) => {
//   const { sender, recipient, amount } = transactionDetails;
//   const [gasFee, setGasFee] = useState("0");
//   const [total, setTotal] = useState("0");
//   const [optimizer, setOptimizer] = useState({});

//   useEffect(() => {
//     const fetchGasFee = async () => {
//       try {
//         const rpcEndpoint = "https://eth-rpc-api.thetatoken.org/rpc";

//         const gasPriceResponse = await axios.post(rpcEndpoint, {
//           jsonrpc: "2.0",
//           method: "eth_gasPrice",
//           params: [],
//           id: 1,
//         });

//         const gasPriceHex = gasPriceResponse.data.result;
//         const gasPrice = parseInt(gasPriceHex, 16);

//         if (isNaN(gasPrice)) {
//           throw new Error("Invalid gas price");
//         }

//         // const gasPriceTFuel = gasPrice / 1e18;

//         const transaction = {
//           to: recipient,
//           value: `0x${(parseFloat(amount) * 1e18).toString(16)}`,
//         };

//         const estimatedGasResponse = await axios.post(rpcEndpoint, {
//           jsonrpc: "2.0",
//           method: "eth_estimateGas",
//           params: [transaction],
//           id: 2,
//         });

//         const estimatedGasHex = estimatedGasResponse.data.result;
//         const estimatedGas = parseInt(estimatedGasHex, 16);

//         if (isNaN(estimatedGas)) {
//           throw new Error("Invalid estimated gas");
//         }

//         const gasFeeWei = estimatedGas * gasPrice;
//         const gasFeeTFuel = gasFeeWei / 1e18;

//         setGasFee(gasFeeTFuel.toFixed(4));
//         setTotal((parseFloat(amount) + gasFeeTFuel).toFixed(4));
//       } catch (error) {
//         console.error("Error fetching gas fee:", error);
//         setGasFee("0");
//         setTotal(amount);
//       }
//     };

//     const fetchOptimizerData = async () => {
//       try {
//         const response = await axios.get(
//           "https://theta-wallet-app.onrender.com/api/gas-price/predict"
//         );
//         setOptimizer(response.data.predictions);
//       } catch (error) {
//         console.error("Error fetching optimizer data:", error);
//       }
//     };

//     fetchGasFee();
//     fetchOptimizerData();
//   }, [amount, recipient]);

//   return (
//     <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2 }}>
//       <Typography variant="h5" component="h2" gutterBottom>
//         Confirm Transaction
//       </Typography>
//       <Paper elevation={3} sx={{ p: 2 }}>
//         <Typography variant="subtitle1" gutterBottom>
//           <strong>Sender Address:</strong>
//         </Typography>
//         <Typography variant="body2" sx={{ wordBreak: "break-all" }}>
//           {sender}
//         </Typography>
//       </Paper>
//       <Paper elevation={3} sx={{ p: 2 }}>
//         <Typography variant="subtitle1" gutterBottom>
//           <strong>Recipient Address:</strong>
//         </Typography>
//         <Typography variant="body2" sx={{ wordBreak: "break-all" }}>
//           {recipient}
//         </Typography>
//       </Paper>
//       <Paper elevation={3} sx={{ p: 2 }}>
//         <Typography variant="subtitle1" gutterBottom>
//           <strong>Amount:</strong>
//         </Typography>
//         <Typography variant="body2">{amount} TFUEL</Typography>
//       </Paper>
//       <Paper elevation={3} sx={{ p: 2 }}>
//         <Typography variant="subtitle1" gutterBottom>
//           <strong>Estimated Gas Fee:</strong>
//         </Typography>
//         <Typography variant="body2">{gasFee} TFUEL</Typography>
//       </Paper>
//       <Paper elevation={3} sx={{ p: 2 }}>
//         <Typography variant="subtitle1" gutterBottom>
//           <strong>Total:</strong>
//         </Typography>
//         <Typography variant="body2">{total} TFUEL</Typography>
//       </Paper>
//       <Paper elevation={3} sx={{ p: 2 }}>
//         <Typography variant="subtitle1" gutterBottom>
//           <strong>AI Gas Fee Predictor Trained on Ethereum:</strong>
//         </Typography>
//         <Typography variant="body2">
//           {optimizer
//             ? Object.entries(optimizer).map(([key, value]) => (
//                 <div key={key}>
//                   {key}: {value}
//                 </div>
//               ))
//             : "Loading..."}
//         </Typography>
//       </Paper>
//       <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
//         <Button variant="outlined" onClick={onReject}>
//           Reject
//         </Button>
//         <Button
//           variant="contained"
//           onClick={() => onConfirm({ gasFee, total })}
//         >
//           Confirm
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// ConfirmTransaction.propTypes = {
//   transactionDetails: PropTypes.shape({
//     sender: PropTypes.string.isRequired,
//     recipient: PropTypes.string.isRequired,
//     amount: PropTypes.string.isRequired,
//   }).isRequired,
//   onConfirm: PropTypes.func.isRequired,
//   onReject: PropTypes.func.isRequired,
// };

// export default ConfirmTransaction;
