import './globals.css';

export const metadata = {
  title: 'HUB ALL PROJECT',
  description: 'Premium hub for all tools',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-gray-900 text-white antialiased">
        {children}
      </body>
    </html>
  );
}
