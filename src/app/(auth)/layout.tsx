export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen bg-auth h-full">
            <div className="min-h-screen w-full bg-products h-full flex">
                {children}
            </div>
        </div>
    )
}