"use client";

import * as React from "react";

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

export function AdditionalTab() {
  // State for additional settings
  const [replyToStoryMentions, setReplyToStoryMentions] = React.useState(true);
  const [saveStoryMentions, setSaveStoryMentions] = React.useState(false);
  const [replyToReelShares, setReplyToReelShares] = React.useState(true);
  const [blockUserOnExternalAccountMessage, setBlockUserOnExternalAccountMessage] = React.useState(false);
  const [multiStore, setMultiStore] = React.useState(false);
  const [seperateTrainingByAgent, setSeperateTrainingByAgent] = React.useState(false);
  const [escalateType, setEscalateType] = React.useState("email");
  const [exclusionKeywords, setExclusionKeywords] = React.useState("");

  const handleSaveToAllAgents = () => {
    // TODO: Implement save to all agents logic
    console.log("Saving to all agents...");
  };

  return (
    <>
      <div className="col-auto d-flex justify-content-end mb-3">
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={handleSaveToAllAgents}
        >
          Save to all agents
        </button>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-8 offset-md-2">
            <div className="mb-2">
              <h4>Additional Settings</h4>
              <p>Manage settings for the AI assistant</p>
            </div>

            <div className="row">
              <div className="col-md-6">
                <hr className="mb-3" />

                {/* Reply To Story Mentions */}
                <div className="mb-4 d-flex align-items-start">
                  <div className="me-3 pt-1">
                    <BootstrapSwitch
                      id="toggle_reply_to_story_mentions"
                      checked={replyToStoryMentions}
                      onChange={setReplyToStoryMentions}
                    />
                  </div>
                  <div>
                    <label className="form-check-label fw-medium" htmlFor="toggle_reply_to_story_mentions">
                      Reply To Story Mentions
                    </label>
                    <small className="form-text text-muted d-block">
                      Enable AI replies to story mentions
                    </small>
                  </div>
                </div>

                {/* Save Story Mentions */}
                <div className="mb-4 d-flex align-items-start">
                  <div className="me-3 pt-1">
                    <BootstrapSwitch
                      id="toggle_save_story_mentions"
                      checked={saveStoryMentions}
                      onChange={setSaveStoryMentions}
                    />
                  </div>
                  <div>
                    <label className="form-check-label fw-medium" htmlFor="toggle_save_story_mentions">
                      Save Story Mentions
                    </label>
                    <small className="form-text text-muted d-block">
                      Enable AI saving of story mentions
                    </small>
                  </div>
                </div>

                {/* Reply To Reel Shares */}
                <div className="mb-4 d-flex align-items-start">
                  <div className="me-3 pt-1">
                    <BootstrapSwitch
                      id="toggle_reply_to_reel_shares"
                      checked={replyToReelShares}
                      onChange={setReplyToReelShares}
                    />
                  </div>
                  <div>
                    <label className="form-check-label fw-medium" htmlFor="toggle_reply_to_reel_shares">
                      Reply To Reel Shares
                    </label>
                    <small className="form-text text-muted d-block">
                      Allow AI to reply when users share reels
                    </small>
                  </div>
                </div>

                {/* Block User On External Account Message */}
                <div className="mb-4 d-flex align-items-start">
                  <div className="me-3 pt-1">
                    <BootstrapSwitch
                      id="toggle_block_user_on_external_account_message"
                      checked={blockUserOnExternalAccountMessage}
                      onChange={setBlockUserOnExternalAccountMessage}
                    />
                  </div>
                  <div>
                    <label className="form-check-label fw-medium" htmlFor="toggle_block_user_on_external_account_message">
                      Block User On External Account Message
                    </label>
                    <small className="form-text text-muted d-block">
                      Block users flagged from outside messages (e.g. influencer outreach)
                    </small>
                  </div>
                </div>

                {/* Multi Store */}
                <div className="mb-4 d-flex align-items-start">
                  <div className="me-3 pt-1">
                    <BootstrapSwitch
                      id="toggle_multi_store"
                      checked={multiStore}
                      onChange={setMultiStore}
                    />
                  </div>
                  <div>
                    <label className="form-check-label fw-medium" htmlFor="toggle_multi_store">
                      Multi Store
                    </label>
                    <small className="form-text text-muted d-block">
                      Enable connecting multiple Shopify stores to this account
                    </small>
                  </div>
                </div>

                {/* Seperate Training By Agent */}
                <div className="mb-4 d-flex align-items-start">
                  <div className="me-3 pt-1">
                    <BootstrapSwitch
                      id="toggle_seperate_training_by_agent"
                      checked={seperateTrainingByAgent}
                      onChange={setSeperateTrainingByAgent}
                    />
                  </div>
                  <div>
                    <label className="form-check-label fw-medium" htmlFor="toggle_seperate_training_by_agent">
                      Seperate Training By Agent
                    </label>
                    <small className="form-text text-muted d-block">
                      Seperate AI training data for this agent
                    </small>
                  </div>
                </div>

                {/* Escalation Type */}
                <div className="form-group mb-4">
                  <label htmlFor="escalate_type_select" className="fw-medium">Escalation Type</label>
                  <select
                    id="escalate_type_select"
                    className="form-control"
                    value={escalateType}
                    onChange={(e) => setEscalateType(e.target.value)}
                    style={{ cursor: "pointer" }}
                  >
                    <option value="email">Email</option>
                    <option value="action">Chat</option>
                  </select>
                  <small className="form-text text-muted">
                    Choose how escalations are handled—via email or real-time chat follow-up.
                  </small>
                </div>

                {/* Exclusion Keywords */}
                <div className="form-group mt-4">
                  <label htmlFor="exclusion_keywords" className="fw-medium">Exclusion Keywords</label>
                  <input
                    type="text"
                    id="exclusion_keywords"
                    className="form-control"
                    value={exclusionKeywords}
                    onChange={(e) => setExclusionKeywords(e.target.value)}
                    placeholder="Enter keywords separated by commas"
                    style={{ cursor: "text" }}
                  />
                  <small className="form-text text-muted">
                    AI will ignore messages or comments containing these keywords.
                  </small>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

