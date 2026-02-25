'use client';

import { useModal } from '@/context/ModalContext';

export default function ConnectButton() {
    const { openConnectModal } = useModal();

    return (
        <button
            onClick={openConnectModal}
            className="px-12 py-4 bg-[#100B28] text-white rounded-full text-xs font-semibold tracking-widest uppercase hover:bg-[#100B28]/90 transition-colors"
        >
            Connect
        </button>
    );
}
