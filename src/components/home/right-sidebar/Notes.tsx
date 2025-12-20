import React from "react";

export function Notes() {
    return (
        <div className="border-t border-zinc-100 p-4">
            <div className="mb-2 flex items-center justify-between">
                <h4 className="!text-sm !font-semibold text-zinc-900">Notes</h4>
                <button className="text-xs font-medium text-blue-600 hover:text-blue-700 hover:underline">
                    Add note
                </button>
            </div>
            <p className="text-xs text-zinc-500">
                Keep track of important customer interactions.
            </p>
        </div>
    );
}
