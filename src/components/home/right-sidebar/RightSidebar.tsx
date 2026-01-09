import React from "react";
import { CustomerProfile, Customer } from "./CustomerProfile";
import { Notes } from "./Notes";

interface RightSidebarProps {
    customer: Customer | null;
}

export function RightSidebar({ customer }: RightSidebarProps) {
    return (
        <div className="hidden w-[300px] flex-none flex-col border-l border-zinc-200 bg-white lg:flex">
            <div className="flex h-full flex-col overflow-y-auto">
                {customer ? (
                    <>
                        <CustomerProfile customer={customer} />
                        <Notes />
                    </>
                ) : (
                    <div className="p-8 text-center">
                        <div className="mx-auto w-12 h-12 !rounded-xl bg-zinc-50 flex items-center justify-center mb-4">
                            <svg className="w-6 h-6 text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <p className="text-sm text-zinc-500 font-medium">No Customer Selected</p>
                        <p className="text-xs text-zinc-400 mt-1 italic">Select a conversation to view details</p>
                    </div>
                )}
            </div>
        </div>
    );
}
