import React, { useEffect, useState } from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    NavLink,
    Navigate
} from "react-router-dom";

function Summary() {
    return (
        <div>
            <h3>Summary</h3>
            <p>This is the Summary tab inside the Vite remote.</p>
        </div>
    );
}

function Metrics() {
    return (
        <div>
            <h3>Metrics</h3>
            <ul>
                <li>Active users: 120</li>
                <li>Conversion rate: 4.2%</li>
                <li>Errors last 24h: 3</li>
            </ul>
        </div>
    );
}

function Layout() {
    const [lastMessage, setLastMessage] = useState(null);

    useEffect(() => {
        if (!window.eventBus) return;

        const handler = (e) => {
            setLastMessage(
                `From: ${e.detail.from}, msg: ${e.detail.message || ""}`
            );
        };

        window.eventBus.on("remote-message", handler);
        return () => window.eventBus.off("remote-message", handler);
    }, []);

    const sendMessage = () => {
        window.eventBus?.emit("remote-message", {
            from: "vite-remote",
            message: "Hello from Vite Remote",
            at: new Date().toISOString()
        });
    };

    return (
        <div
            style={{
                fontFamily: "system-ui, sans-serif",
                border: "2px solid #16a34a",
                padding: "16px",
                borderRadius: "8px",
                background: "#ecfdf3"
            }}
        >
            <h2>Vite Remote (React 18)</h2>

            <nav style={{ marginBottom: "12px", display: "flex", gap: "8px" }}>
                <NavLink
                    end
                    to="/vite"
                    style={({ isActive }) => ({
                        padding: "6px 12px",
                        borderRadius: "4px",
                        border: isActive ? "2px solid #15803d" : "1px solid #9ca3af",
                        background: isActive ? "#bbf7d0" : "#f9fafb",
                        textDecoration: "none",
                        color: "black",
                        cursor: "pointer"
                    })}
                >
                    Summary
                </NavLink>

                <NavLink
                    to="/vite/metrics"
                    style={({ isActive }) => ({
                        padding: "6px 12px",
                        borderRadius: "4px",
                        border: isActive ? "2px solid #15803d" : "1px solid #9ca3af",
                        background: isActive ? "#bbf7d0" : "#f9fafb",
                        textDecoration: "none",
                        color: "black",
                        cursor: "pointer"
                    })}
                >
                    Metrics
                </NavLink>
            </nav>

            <button
                onClick={sendMessage}
                style={{
                    marginBottom: "12px",
                    padding: "6px 12px",
                    borderRadius: "4px",
                    border: "1px solid #15803d",
                    background: "#dcfce7",
                    cursor: "pointer"
                }}
            >
                Send message via event bus
            </button>

            {lastMessage && (
                <div
                    style={{
                        marginBottom: "12px",
                        padding: "8px",
                        borderRadius: "4px",
                        background: "#bbf7d0",
                        fontSize: "0.9rem"
                    }}
                >
                    <strong>Last event bus message:</strong> {lastMessage}
                </div>
            )}

            <Routes>
                <Route path="/vite" element={<Summary />} />
                <Route path="/vite/metrics" element={<Metrics />} />
                <Route path="/" element={<Navigate to="/vite" replace />} />
                <Route path="*" element={<Navigate to="/vite" replace />} />
            </Routes>
        </div>
    );
}

export default function App() {
    return (
        <BrowserRouter basename="/">
            <Layout />
        </BrowserRouter>
    );
}
