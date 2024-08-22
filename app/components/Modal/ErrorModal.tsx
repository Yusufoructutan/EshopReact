'use client'
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { useErrorStore } from '@/app/Store/errorStore';

const ErrorModal: React.FC = () => {
  const { isErrorModalOpen, errorMessage, closeErrorModal } = useErrorStore();

  return (
    <Dialog open={isErrorModalOpen} onClose={closeErrorModal} aria-labelledby="error-modal-title" aria-describedby="error-modal-description">
      <DialogTitle id="error-modal-title">Hata</DialogTitle>
      <DialogContent>
        <p id="error-modal-description">{errorMessage}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeErrorModal} color="primary">
          Kapat
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ErrorModal;
