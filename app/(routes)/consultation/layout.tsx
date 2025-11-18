import React from 'react'

function ConsultationDashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
        {children}
        </div>
    )
}

export default ConsultationDashboardLayout
