import React from "react";

interface BootstrapSwitchProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    id?: string;
}

export function BootstrapSwitch({
    checked,
    onChange,
    id,
}: BootstrapSwitchProps) {
    return (
        <div className="form-check form-switch">
            <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id={id}
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                style={{
                    width: "2.25rem",
                    height: "1.5rem",
                    cursor: "pointer",
                }}
            />
        </div>
    );
}
