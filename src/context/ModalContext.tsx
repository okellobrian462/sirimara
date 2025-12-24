'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import ConnectModal from '@/components/ConnectModal';

interface ModalContextType {
    isConnectOpen: boolean;
    openConnectModal: () => void;
    closeConnectModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
    const [isConnectOpen, setIsConnectOpen] = useState(false);

    const openConnectModal = () => setIsConnectOpen(true);
    const closeConnectModal = () => setIsConnectOpen(false);

    return (
        <ModalContext.Provider value={{ isConnectOpen, openConnectModal, closeConnectModal }}>
            {children}
            <ConnectModal isOpen={isConnectOpen} onClose={closeConnectModal} />
        </ModalContext.Provider>
    );
}

export function useModal() {
    const context = useContext(ModalContext);
    if (context === undefined) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
}
