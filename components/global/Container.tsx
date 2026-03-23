import { cn } from '@/lib/utils'
import React from 'react'

function Container({ children, className }: { className?: string, children: React.ReactNode }) {
    return (
        <div className={cn('mx-auto max-w-6xl xl:max-w-7xl px-8', className)}>
            {children}
        </div>
    )
}

export default Container
