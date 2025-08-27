interface AppLayoutProp {
    children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProp) {
    return <main>{children}</main>;
}
