import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Typography, Box, Paper, Alert } from '@mui/material';
import { createWallet } from '../services/walletService';

const CreateSection = ({ onSaveWallet }) => {
    const [newWallet, setNewWallet] = useState(null);

    const handleCreateWallet = () => {
        const wallet = createWallet();
        setNewWallet(wallet);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}>
            <Typography variant="h5" component="h2" gutterBottom>
                New Wallet
            </Typography>
            {newWallet ? (
                <>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Typography variant="subtitle1" gutterBottom><strong>Address:</strong></Typography>
                        <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>{newWallet.address}</Typography>
                    </Paper>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Typography variant="subtitle1" gutterBottom><strong>Private Key:</strong></Typography>
                        <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>{newWallet.privateKey}</Typography>
                    </Paper>
                    <Alert severity="warning">
                        Save your private key securely. You&apos;ll need it to access your wallet.
                    </Alert>
                    <Button variant="contained" onClick={() => onSaveWallet(newWallet)}>
                        Save and Continue
                    </Button>
                </>
            ) : (
                <Button variant="contained" onClick={handleCreateWallet}>
                    Create New Wallet
                </Button>
            )}
        </Box>
    );
};

CreateSection.propTypes = {
    onSaveWallet: PropTypes.func.isRequired,
};

export default CreateSection;