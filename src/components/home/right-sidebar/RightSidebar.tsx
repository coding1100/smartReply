import React from "react";
import { CustomerProfile, Customer } from "./CustomerProfile";
import { Notes } from "./Notes";

interface RightSidebarProps {
    customer: Customer;
}

export function RightSidebar({ customer }: RightSidebarProps) {
    return (
        <div className="hidden w-[320px] flex-none flex-col border-l border-zinc-200 bg-white xl:flex">
            <div className="flex h-full flex-col overflow-y-auto">
                <CustomerProfile customer={customer} />
                <Notes />
            </div>
        </div>
    );
}
