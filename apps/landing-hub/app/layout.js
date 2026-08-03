import "./globals.css";

export const metadata = {
  title: "HUB ALL PROJECT",
  description: "Premium hub for all tools",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-neutral-950 text-neutral-100 min-h-screen antialiased selection:bg-white/20">
        {children}
      </body>
    </html>
  );
}
