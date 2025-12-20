import React, { Fragment } from "react";

interface ManualActionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: () => void;
}

export function ManualActionModal({
    isOpen,
    onClose,
    onSave,
}: ManualActionModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Panel */}
            <div className="flex min-h-screen items-center justify-center p-4 text-center">
                <div className="relative transform overflow-hidden rounded-xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl">
                    {/* Header */}
                    <div className="flex items-start justify-between border-b border-zinc-100 px-6 py-3">
                        <div className="flex flex-col">
                            <h3
                                className="text-xl font-bold leading-6 text-zinc-900"
                                id="manualActionModalLabel"
                            >
                                Log manual action
                            </h3>
                            <p className="mt-1 text-sm text-zinc-500">
                                Capture follow-up work for this conversation and
                                add it to your actions queue.
                            </p>
                        </div>
                        <button
                            type="button"
                            className="text-zinc-400 hover:text-zinc-500 focus:outline-none"
                            onClick={onClose}
                            aria-label="Close"
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Body */}
                    <div className="px-6 py-6">
                        <div className="manual-action-form space-y-6">
                            {/* Info Alert */}
                            <div
                                className="flex items-start rounded-lg bg-teal-50 p-3 border border-teal-100"
                                role="alert"
                            >
                                <div className="flex-shrink-0">
                                    <svg
                                        className="h-5 w-5 text-teal-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                        <path
                                            fillRule="evenodd"
                                            d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-teal-600 !mb-[0px]">
                                        Select an action to queue for your team.
                                        We'll attach it to the latest message in
                                        this conversation so it's easy to track.
                                    </p>
                                </div>
                            </div>

                            {/* Action Select */}
                            <div>
                                <label
                                    htmlFor="manual-action-select"
                                    className="block text-sm font-medium text-zinc-900 mb-2"
                                >
                                    Action type
                                </label>
                                <div className="relative">
                                    <select
                                        id="manual-action-select"
                                        className="block w-full appearance-none rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                                        required
                                        defaultValue=""
                                    >
                                        <option value="" disabled>
                                            Choose an action…
                                        </option>
                                        <option value="refund_order">
                                            Refund Order
                                        </option>
                                        <option value="replace_product">
                                            Replace Product
                                        </option>
                                        <option value="update_shipping_address">
                                            Update Shipping Address
                                        </option>
                                        <option value="modify_subscription">
                                            Modify Subscription
                                        </option>
                                        <option value="escalate">
                                            Escalate
                                        </option>
                                        <option value="create_influencer_order">
                                            Create Influencer Order
                                        </option>
                                        <option value="search_product">
                                            Search Product
                                        </option>
                                        <option value="get_policies">
                                            Get Policies
                                        </option>
                                        <option value="get_shopify_order_status">
                                            Get Shopify Order Status
                                        </option>
                                        <option value="generate_discount_code">
                                            Generate Discount Code
                                        </option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-zinc-500">
                                        <svg
                                            className="h-4 w-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M19 9l-7 7-7-7"
                                            ></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Notes */}
                            <div>
                                <label
                                    htmlFor="manual-action-notes"
                                    className="block text-sm font-medium text-zinc-900 mb-2"
                                >
                                    Notes for the team{" "}
                                    <span className="text-zinc-400 font-normal">
                                        (optional)
                                    </span>
                                </label>
                                <textarea
                                    id="manual-action-notes"
                                    className="block w-full rounded-lg border border-zinc-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3"
                                    rows={4}
                                    placeholder="Add context, customer requests, or next steps"
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-4 flex flex-row-reverse gap-3 pb-6">
                        <button
                            type="button"
                            className="inline-flex justify-center !rounded-md border border-transparent bg-[#5A6BF2] px-6 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            onClick={onSave}
                        >
                            Save action
                        </button>
                        <button
                            type="button"
                            className="inline-flex justify-center !rounded-md border border-zinc-300 bg-white px-6 py-2.5 text-sm font-medium text-zinc-600 shadow-sm hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
