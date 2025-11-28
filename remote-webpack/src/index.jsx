import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

class RemoteWebpackApp extends HTMLElement {
    connectedCallback() {
        if (this._mounted) return;
        this._mounted = true;

        const shadow = this.attachShadow({ mode: "open" });
        this._container = document.createElement("div");
        shadow.appendChild(this._container);

        ReactDOM.render(<App />, this._container);
    }

    disconnectedCallback() {
        if (this._mounted && this._container) {
            ReactDOM.unmountComponentAtNode(this._container);
            this._mounted = false;
        }
    }
}

if (!customElements.get("remote-webpack-app")) {
    customElements.define("remote-webpack-app", RemoteWebpackApp);
}
