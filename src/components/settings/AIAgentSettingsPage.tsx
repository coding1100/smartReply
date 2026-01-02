"use client";

import * as React from "react";
import Link from "next/link";
import { ControlsTab } from "./tabs/ControlsTab";
import { SettingsTab } from "./tabs/SettingsTab";
import { TrainingTab } from "./tabs/TrainingTab";
import { CustomTab } from "./tabs/CustomTab";
import { ActionsTab } from "./tabs/ActionsTab";
import { AdditionalTab } from "./tabs/AdditionalTab";

type TabKey = "controls" | "settings" | "training" | "custom" | "actions" | "additional";

export function AIAgentSettingsPage() {
  const [activeTab, setActiveTab] = React.useState<TabKey>("controls");

  return (
    <div className="w-full">
      <div className="mb-5">
        <Link
          href="/settings"
          className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
        >
          ← Back
        </Link>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-zinc-900">AI Agent Settings</h1>
      </div>

        <div className="mx-auto" style={{ maxWidth: "1200px" }}>
          <div className="d-flex justify-content-center mb-4">
            {/* Bootstrap Tabs */}
            <ul className="nav nav-pills" role="tablist" style={{ gap: "8px" }}>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === "controls" ? "active" : ""} px-4 py-2 !rounded-xl transition-all ${activeTab === "controls" ? "bg-indigo-600 text-white shadow-md shadow-indigo-100" : "text-zinc-600 hover:bg-indigo-50"}`}
                  onClick={() => setActiveTab("controls")}
                  type="button"
                  role="tab"
                >
                  Controls
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === "settings" ? "active" : ""} px-4 py-2 !rounded-xl transition-all ${activeTab === "settings" ? "bg-indigo-600 text-white shadow-md shadow-indigo-100" : "text-zinc-600 hover:bg-indigo-50"}`}
                  onClick={() => setActiveTab("settings")}
                  type="button"
                  role="tab"
                >
                  Settings
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === "training" ? "active" : ""} px-4 py-2 !rounded-xl transition-all ${activeTab === "training" ? "bg-indigo-600 text-white shadow-md shadow-indigo-100" : "text-zinc-600 hover:bg-indigo-50"}`}
                  onClick={() => setActiveTab("training")}
                  type="button"
                  role="tab"
                >
                  Training
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === "custom" ? "active" : ""} px-4 py-2 !rounded-xl transition-all ${activeTab === "custom" ? "bg-indigo-600 text-white shadow-md shadow-indigo-100" : "text-zinc-600 hover:bg-indigo-50"}`}
                  onClick={() => setActiveTab("custom")}
                  type="button"
                  role="tab"
                >
                  Custom
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === "actions" ? "active" : ""} px-4 py-2 !rounded-xl transition-all ${activeTab === "actions" ? "bg-indigo-600 text-white shadow-md shadow-indigo-100" : "text-zinc-600 hover:bg-indigo-50"}`}
                  onClick={() => setActiveTab("actions")}
                  type="button"
                  role="tab"
                >
                  Actions
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === "additional" ? "active" : ""} px-4 py-2 !rounded-xl transition-all ${activeTab === "additional" ? "bg-indigo-600 text-white shadow-md shadow-indigo-100" : "text-zinc-600 hover:bg-indigo-50"}`}
                  onClick={() => setActiveTab("additional")}
                  type="button"
                  role="tab"
                >
                  Additional
                </button>
              </li>
            </ul>
          </div>

          <hr className="mb-4" />

          <div className="d-flex justify-content-center">
            <div className="w-100" style={{ maxWidth: "1100px" }}>
              {/* Tab Content */}
              {activeTab === "controls" && <ControlsTab />}
              {activeTab === "settings" && <SettingsTab />}
              {activeTab === "training" && <TrainingTab />}
              {activeTab === "custom" && <CustomTab />}
              {activeTab === "actions" && <ActionsTab />}
              {activeTab === "additional" && <AdditionalTab />}
            </div>
          </div>
        </div>
    </div>
  );
}

