"use client";

import { useEffect } from "react";

/**
 * NgrokBounce component
 * Detects if the app is running on an ngrok tunnel while containing 
 * authentication tokens in the URL. If so, it redirects to localhost:3000
 * to ensure tokens are captured in the local environment's localStorage.
 */
export function NgrokBounce() {
    useEffect(() => {
        if (typeof window === "undefined") return;

        const hostname = window.location.hostname;
        const isNgrok = hostname.includes("ngrok-free.dev") ||
            hostname.includes("ngrok-free.app");

        if (isNgrok) {
            const params = new URLSearchParams(window.location.search);
            const accessToken = params.get('accessToken') ||
                params.get('access_token') ||
                params.get('token');

            if (accessToken) {
                console.log("Detected ngrok tunnel with tokens - bouncing to localhost:3000...");
                const localUrl = new URL("http://localhost:3000" + window.location.pathname);
                params.forEach((value, key) => localUrl.searchParams.set(key, value));
                window.location.href = localUrl.toString();
            }
        }
    }, []);

    return null;
}
