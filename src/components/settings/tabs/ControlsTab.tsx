"use client";

import * as React from "react";
import Link from "next/link";
import { api, AgentSummary, AgentDetail } from "@/services/api";

// Bootstrap-style Switch Component
function BootstrapSwitch({
  checked,
  onChange,
  id,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  id?: string;
}) {
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

export function ControlsTab() {
  const [activeAccordion, setActiveAccordion] = React.useState<string | null>("connect");
  const [agents, setAgents] = React.useState<AgentSummary[]>([]);
  const [selectedAgentId, setSelectedAgentId] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  // State for form fields
  const [isActiveMessages, setIsActiveMessages] = React.useState(true);
  const [webChatActive, setWebChatActive] = React.useState(false);
  const [isActiveFollowUp, setIsActiveFollowUp] = React.useState(false);
  const [isActiveComments, setIsActiveComments] = React.useState(true);
  const [isActivePrivateReply, setIsActivePrivateReply] = React.useState(true);
  const [privateReplyAction, setPrivateReplyAction] = React.useState("message");
  const [isActiveRemoveComments, setIsActiveRemoveComments] = React.useState(true);
  const [deleteHideCommentPrompt, setDeleteHideCommentPrompt] = React.useState(
    "Remove message when it contains something negative about our product or brand or is spam, or anything that could deter someone from converting/purchasing/using our product or service. Or anything related to a meta phishing spam warning."
  );
  const [commentAction, setCommentAction] = React.useState("hide");

  React.useEffect(() => {
    loadAgents();
  }, []);

  const loadAgents = async () => {
    try {
      const list = await api.agents.list();
      setAgents(list);
      if (list.length > 0) {
        setSelectedAgentId(list[0].page_id);
        loadAgentDetails(list[0].page_id);
      }
    } catch (err) {
      console.error("Failed to load agents", err);
    }
  };

  const loadAgentDetails = async (pageId: string) => {
    setLoading(true);
    try {
      const details = await api.agents.getDetails(pageId);
      if (details && details.features) {
        const f = details.features;
        if (f.auto_message_enabled !== undefined) setIsActiveMessages(f.auto_message_enabled);
        if (f.website_widget_enabled !== undefined) setWebChatActive(f.website_widget_enabled);
        if (f.auto_followup_enabled !== undefined) setIsActiveFollowUp(f.auto_followup_enabled);
        if (f.auto_comment_reply_enabled !== undefined) setIsActiveComments(f.auto_comment_reply_enabled);
        if (f.auto_private_reply_enabled !== undefined) setIsActivePrivateReply(f.auto_private_reply_enabled);
        if (f.private_reply_action) setPrivateReplyAction(f.private_reply_action);
        if (f.auto_remove_comment_enabled !== undefined) setIsActiveRemoveComments(f.auto_remove_comment_enabled);
        if (f.moderation_rules) setDeleteHideCommentPrompt(f.moderation_rules);
        if (f.removal_action) setCommentAction(f.removal_action);
      }
    } catch (err) {
      console.error("Failed to load agent details", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!selectedAgentId) return;
    setLoading(true);
    try {
      const updateData = {
        features: {
          auto_message_enabled: isActiveMessages,
          website_widget_enabled: webChatActive,
          auto_followup_enabled: isActiveFollowUp,
          auto_comment_reply_enabled: isActiveComments,
          auto_private_reply_enabled: isActivePrivateReply,
          private_reply_action: privateReplyAction,
          auto_remove_comment_enabled: isActiveRemoveComments,
          moderation_rules: deleteHideCommentPrompt,
          removal_action: commentAction
        }
      };
      await api.agents.updateConfig(selectedAgentId, updateData);
      alert("Control settings saved successfully!");
    } catch (err) {
      console.error("Failed to save settings", err);
      alert("Failed to save settings.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row">
      <div className="col-md-6">
        <div className="mt-2">
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="h5 mb-1">AI Message Settings</h3>
            {selectedAgentId && agents.length > 0 && (
              <span className="badge bg-success text-white">
                Active: {agents.find(a => a.page_id === selectedAgentId)?.page_name}
              </span>
            )}
          </div>
          <p className="text-muted small mb-4">
            Configure settings for automated messaging and chat functionalities.
          </p>
          <hr className="mb-4" />

          <div className="mb-4 d-flex align-items-start">
            <div className="me-3 pt-1">
              <BootstrapSwitch
                checked={isActiveMessages}
                onChange={setIsActiveMessages}
                id="switch-active-messages"
              />
            </div>
            <div>
              <span className="small fw-medium d-block">AI Auto Message</span>
              <small className="text-muted">
                Enables the AI to automatically respond to direct messages.
              </small>
            </div>
          </div>

          <div className="mb-4 d-flex align-items-start">
            <div className="me-3 pt-1">
              <BootstrapSwitch
                checked={webChatActive}
                onChange={setWebChatActive}
                id="switch-web-chat"
              />
            </div>
            <div>
              <span className="small fw-medium d-block">Enable Website Chat Widget</span>
              <small className="text-muted">
                Activate this setting to display a chat widget on your website.
              </small>

              <button
                type="button"
                className="btn btn-link p-0 small text-primary text-decoration-none d-block mt-1"
                onClick={() => alert("Website settings configuration coming soon.")}
              >
                Additional Website Settings
              </button>
            </div>
          </div>

          <div className="mb-4 d-flex align-items-start">
            <div className="me-3 pt-1">
              <BootstrapSwitch
                checked={isActiveFollowUp}
                onChange={setIsActiveFollowUp}
                id="switch-follow-up"
              />
            </div>
            <div>
              <span className="small fw-medium d-block">AI Auto Follow Up</span>
              <small className="text-muted">
                Enables the AI to automatically follow up on DMs after a specified period.
              </small>
            </div>
          </div>

          <div className="mb-4">
            <button
              type="button"
              onClick={() => alert("Advanced messaging settings coming soon.")}
            >
              Advanced Settings
            </button>
          </div>
        </div>
      </div>

      <div className="col-md-6">
        <div className="mt-2">
          <h3 className="h5 mb-1">AI Comment Settings</h3>
          <p className="text-muted small mb-2">
            Configure settings for automated comment responses and moderation.
          </p>
          <button
            type="button"
            className="btn btn-link p-0 small text-primary text-decoration-none d-block mb-3"
            onClick={() => alert("Advanced comment settings coming soon.")}
          >
            Additional Comment Settings
          </button>
          <hr className="mb-4" />

          <div className="mb-4 d-flex align-items-start">
            <div className="me-3 pt-1">
              <BootstrapSwitch
                checked={isActiveComments}
                onChange={setIsActiveComments}
                id="switch-active-comments"
              />
            </div>
            <div>
              <span className="small fw-medium d-block">AI Auto Comment</span>
              <small className="text-muted">
                Enables the AI to automatically reply to comments.
              </small>
            </div>
          </div>

          <div className="mb-4 d-flex align-items-start">
            <div className="me-3 pt-1">
              <BootstrapSwitch
                checked={isActivePrivateReply}
                onChange={setIsActivePrivateReply}
                id="switch-private-reply"
              />
            </div>
            <div>
              <span className="small fw-medium d-block">AI Auto Send Private Message</span>
              <small className="text-muted">
                Enables the AI to send direct messages to users who comment on your posts.
              </small>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="private_reply_action" className="form-label small fw-medium">
              Private Reply Action
            </label>
            <select
              id="private_reply_action"
              className="form-select form-select-sm"
              value={privateReplyAction}
              onChange={(e) => setPrivateReplyAction(e.target.value)}
            >
              <option value="message">Text Message</option>
              <option value="url">Product / URL</option>
            </select>
          </div>

          <div className="mb-4 d-flex align-items-start">
            <div className="me-3 pt-1">
              <BootstrapSwitch
                checked={isActiveRemoveComments}
                onChange={setIsActiveRemoveComments}
                id="switch-remove-comments"
              />
            </div>
            <div>
              <span className="small fw-medium d-block">AI Auto Remove Comment</span>
              <small className="text-muted">
                Enables the AI to automatically remove or hide unwanted comments.
              </small>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="deleteHideCommentPrompt" className="form-label small fw-medium">
              Delete/Hide Comment When...
            </label>
            <textarea
              id="deleteHideCommentPrompt"
              className="form-control"
              value={deleteHideCommentPrompt}
              onChange={(e) => setDeleteHideCommentPrompt(e.target.value)}
              placeholder="Enter conditions for automatic deletion or hiding of comments"
              rows={6}
              maxLength={2500}
            />
            <small className="text-muted small">
              {deleteHideCommentPrompt.length}/2500
            </small>
          </div>

          <div>
            <label htmlFor="remove_action" className="form-label small fw-medium">
              Removal Action
            </label>
            <select
              id="remove_action"
              className="form-select form-select-sm"
              value={commentAction}
              onChange={(e) => setCommentAction(e.target.value)}
            >
              <option value="hide">Hide</option>
              <option value="delete">Delete</option>
            </select>
          </div>
        </div>
      </div>

      <div className="col-12 mt-4">
        <div className="text-left">
          <button
            type="button"
            className="btn btn-primary px-5"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Controls"}
          </button>
        </div>
      </div>
    </div >
  );
}

