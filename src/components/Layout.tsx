import { Box } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import Head from 'next/head';
import { setupQueryDefaultsWithoutRefetch } from '../utils/queryModifications';
import Navbar from './Navbar';
import { Analytics } from '@vercel/analytics/react';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    const queryClient = useQueryClient();

    setupQueryDefaultsWithoutRefetch(queryClient);

    return (
        <>
            <Box>
                <Head>
                    <title>Fika</title>
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
                    />
                </Head>
                <Navbar />
                {children}
                <Analytics />
            </Box>
        </>
    );
};

export default Layout;
