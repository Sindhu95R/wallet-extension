import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Typography, Box, TextField } from '@mui/material';
import { importWallet } from '../services/walletService';

const ImportSection = ({ onImportWallet }) => {
    const [privateKey, setPrivateKey] = useState('');

    const handleImport = () => {
        try {
            const wallet = importWallet(privateKey);
            onImportWallet(wallet);
        } catch (error) {
            alert('Invalid private key. Please try again.');
        }
    };
    ImportSection.propTypes = {
        onImportWallet: PropTypes.func.isRequired,
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}>
            <Typography variant="h5" component="h2" gutterBottom>
                Import Wallet
            </Typography>
            <TextField
                label="Private Key"
                variant="outlined"
                value={privateKey}
                onChange={(e) => setPrivateKey(e.target.value)}
                fullWidth
            />
            <Button variant="contained" onClick={handleImport} disabled={!privateKey}>
                Import and Login
            </Button>
        </Box>
    );
};

export default ImportSection;