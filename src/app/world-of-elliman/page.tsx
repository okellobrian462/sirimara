import React from 'react';
import WorldOfEllimanClient from './WorldOfEllimanClient';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
    title: 'Explore the World of Elliman | Douglas Elliman',
    description: 'Discover the stories, insights, and inspirations behind Douglas Elliman.'
};

export default function WorldOfEllimanPage() {
    return (
        <WorldOfEllimanClient
            header={<Header theme="light" />}
            footer={<Footer />}
        />
    );
}
