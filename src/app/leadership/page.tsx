import React from 'react';
import LeadershipClient from './LeadershipClient';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function LeadershipPage() {
    return (
        <LeadershipClient
            header={<Header />}
            footer={<Footer />}
        />
    );
}
