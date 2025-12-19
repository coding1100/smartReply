"use client";

import * as React from "react";
import Link from "next/link";

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
          width: "3rem",
          height: "1.5rem",
          cursor: "pointer",
        }}
      />
    </div>
  );
}

export function ControlsTab() {
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

  const handleSave = () => {
    // TODO: Implement save logic
    console.log("Saving agent settings...");
  };

  return (
    <div className="row">
      <div className="col-md-6">
        <div className="mt-2">
          <h3 className="h5 mb-1">AI Message Settings</h3>
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
              <Link
                href="/website-settings#"
                className="small text-primary text-decoration-none d-block mt-1"
              >
                Additional Website Settings
              </Link>
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
              className="btn btn-link p-0 text-primary text-decoration-none small"
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
          <Link
            href="/advanced-settings"
            className="small text-primary text-decoration-none d-block mb-3"
          >
            Additional Comment Settings
          </Link>
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
        <div className="text-center">
          <button
            type="button"
            className="btn btn-primary px-5"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

