import React from 'react';
import PropTypes from 'prop-types';
import { Button, Typography, Box } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AddIcon from '@mui/icons-material/Add';
import DownloadIcon from '@mui/icons-material/Download';

const InitialSection = ({ onCreateWallet, onImportWallet }) => (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, p: 2 }}>
        <img src="/theta-logo.svg" alt="Theta Network" style={{ width: 60, height: 60 }} />
        <Typography variant="h4" component="h1" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            Theta Wallet <AccountBalanceWalletIcon sx={{ ml: 1 }} />
        </Typography>
        <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onCreateWallet}
            fullWidth
        >
            Create New Wallet
        </Button>
        <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={onImportWallet}
            fullWidth
        >
            Import Existing Wallet
        </Button>
    </Box>
);

InitialSection.propTypes = {
    onCreateWallet: PropTypes.func.isRequired,
    onImportWallet: PropTypes.func.isRequired,
};


export default InitialSection;