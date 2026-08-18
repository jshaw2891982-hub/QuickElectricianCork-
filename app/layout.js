import './globals.css';

export const metadata = {
  title: 'Quick Electrician Cork | Local Electrician Cork',
  description:
    'Local electrician serving Cork City and surrounding areas. Electrical repairs, lighting, sockets, fuse boards and more.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
