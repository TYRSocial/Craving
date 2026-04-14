import ClientWrapper from './client-wrapper';
import '../styles/globals.css';

export const metadata = {
  title: 'A Craving - Share Your Food Cravings',
  description:
    'Discover and share your food cravings with a community of food lovers',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
