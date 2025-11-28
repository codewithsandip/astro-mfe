export default function ShellHeader() {
    return (
        <header
            style={{
                padding: "12px 20px",
                background: "#0f172a",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
            }}
        >
            <div style={{ fontWeight: 600 }}>Astro Shell</div>
            <nav style={{ display: "flex", gap: "12px" }}>
                <a href="/" style={{ color: "#e5e7eb", textDecoration: "none" }}>
                    Home
                </a>
                <a href="/webpack" style={{ color: "#e5e7eb", textDecoration: "none" }}>
                    Webpack Remote
                </a>
                <a href="/vite" style={{ color: "#e5e7eb", textDecoration: "none" }}>
                    Vite Remote
                </a>
            </nav>
        </header>
    );
}
