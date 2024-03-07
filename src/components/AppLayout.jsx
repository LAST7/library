import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export const RootLayout = ({ className, children, ...props }) => {
    return (
        <main
            className={twMerge("flex flex-row h-screen", className)}
            {...props}
        >
            {children}
        </main>
    );
};

export const Sidebar = ({ className, children, ...props }) => {
    return (
        <aside
            className={twMerge(
                "bg-gray-800 h-full w-1/6 overflow-auto",
                className,
            )}
            {...props}
        >
            {children}
        </aside>
    );
};

export const Content = forwardRef(({ className, children, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={twMerge("flex-1 overflow-auto relative", className)}
            {...props}
        >
            {children}
        </div>
    );
});
Content.displayName = "Content";
