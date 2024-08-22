import { create } from 'zustand';

interface ErrorStore {
  isErrorModalOpen: boolean;
  errorMessage: string;
  openErrorModal: (message: string) => void;
  closeErrorModal: () => void;
}

export const useErrorStore = create<ErrorStore>((set) => ({
  isErrorModalOpen: false,
  errorMessage: '',
  openErrorModal: (message: string) => set({ isErrorModalOpen: true, errorMessage: message }),
  closeErrorModal: () => set({ isErrorModalOpen: false, errorMessage: '' }),
}));
