import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

class RemoteViteApp extends HTMLElement {
    connectedCallback() {
        if (this._root) return;

        const shadow = this.attachShadow({ mode: "open" });
        const mountPoint = document.createElement("div");
        shadow.appendChild(mountPoint);

        this._root = ReactDOM.createRoot(mountPoint);
        this._root.render(<App />);
    }

    disconnectedCallback() {
        if (this._root) {
            this._root.unmount();
            this._root = null;
        }
    }
}

if (!customElements.get("remote-vite-app")) {
    customElements.define("remote-vite-app", RemoteViteApp);
}
