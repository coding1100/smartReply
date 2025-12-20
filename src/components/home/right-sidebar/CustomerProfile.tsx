import React from "react";

export interface Customer {
    id: string;
    name: string;
    avatarUrl: string;
    tags?: string[];
    email?: string;
}

interface CustomerProfileProps {
    customer: Customer;
}

export function CustomerProfile({ customer }: CustomerProfileProps) {
    return (
        <div className="p-4">
            {/* Profile Info */}
            <div className="flex items-start gap-3">
                <img
                    src={customer.avatarUrl}
                    alt={customer.name}
                    className="h-12 w-12 rounded-full border border-zinc-200 object-cover"
                />
                <div className="min-w-0 flex-1">
                    <h3 className="!text-sm !font-semibold text-zinc-900">{customer.name}</h3>
                    <p className="text-xs text-zinc-500">
                        {customer.email || "No email on file"}
                    </p>
                </div>
            </div>

            {/* Tags */}
            {customer.tags && customer.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                    {customer.tags.map((tag, index) => (
                        <span
                            key={index}
                            className="inline-flex items-center rounded bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}
