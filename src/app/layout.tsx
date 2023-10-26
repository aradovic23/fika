import { type Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'Fika',
  description: 'Restaurant menu managing app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
