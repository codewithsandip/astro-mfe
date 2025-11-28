import React, { useEffect, useState } from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    NavLink,
    Navigate
} from "react-router-dom";

function Overview() {
    return (
        <div>
            <h3>Overview</h3>
            <p>This is the Overview tab inside the Webpack remote.</p>
        </div>
    );
}

function Team() {
    return (
        <div>
            <h3>Team</h3>
            <ul>
                <li>Alice (Engineer)</li>
                <li>Bob (Designer)</li>
                <li>Charlie (PM)</li>
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
            from: "webpack-remote",
            message: "Hello from Webpack Remote",
            at: new Date().toISOString()
        });
    };

    return (
        <div
            style={{
                fontFamily: "system-ui, sans-serif",
                border: "2px solid #2563eb",
                padding: "16px",
                borderRadius: "8px",
                background: "#eff6ff"
            }}
        >
            <h2>Webpack Remote (React 17)</h2>

            <nav style={{ marginBottom: "12px", display: "flex", gap: "8px" }}>
                <NavLink
                    end
                    to="/webpack"
                    style={({ isActive }) => ({
                        padding: "6px 12px",
                        borderRadius: "4px",
                        border: isActive ? "2px solid #1d4ed8" : "1px solid #9ca3af",
                        background: isActive ? "#bfdbfe" : "#f9fafb",
                        textDecoration: "none",
                        color: "black",
                        cursor: "pointer"
                    })}
                >
                    Overview
                </NavLink>

                <NavLink
                    to="/webpack/team"
                    style={({ isActive }) => ({
                        padding: "6px 12px",
                        borderRadius: "4px",
                        border: isActive ? "2px solid #1d4ed8" : "1px solid #9ca3af",
                        background: isActive ? "#bfdbfe" : "#f9fafb",
                        textDecoration: "none",
                        color: "black",
                        cursor: "pointer"
                    })}
                >
                    Team
                </NavLink>
            </nav>

            <button
                onClick={sendMessage}
                style={{
                    marginBottom: "12px",
                    padding: "6px 12px",
                    borderRadius: "4px",
                    border: "1px solid #1d4ed8",
                    background: "#e0ecff",
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
                        background: "#dbeafe",
                        fontSize: "0.9rem"
                    }}
                >
                    <strong>Last event bus message:</strong> {lastMessage}
                </div>
            )}

            <Routes>
                <Route path="/webpack" element={<Overview />} />
                <Route path="/webpack/team" element={<Team />} />
                {/* support /webpack and /webpack/* patterns */}
                <Route path="/" element={<Navigate to="/webpack" replace />} />
                <Route path="*" element={<Navigate to="/webpack" replace />} />
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
