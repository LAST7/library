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
                "w-[250px] mt-10 h-[100vh + 10px] overflow-auto",
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