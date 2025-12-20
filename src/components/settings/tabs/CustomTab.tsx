"use client";

import * as React from "react";

export function CustomTab() {
  const [customPrompt, setCustomPrompt] = React.useState("");
  const maxLength = 30000;

  const handleSave = () => {
    // TODO: Implement save logic
    console.log("Saving custom prompt:", customPrompt);
  };

  const handleSaveToAllAgents = () => {
    // TODO: Implement save to all agents logic
    console.log("Saving to all agents:", customPrompt);
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
          <div className="col-12">
            <h4>Custom Instructions</h4>
            <div className="mb-2">
              <label htmlFor="customPrompt">Enter custom instructions or examples for the AI</label>
              <textarea
                id="customPrompt"
                className="form-control"
                style={{ height: "60vh", resize: "vertical" }}
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                maxLength={maxLength}
                placeholder="Type any special guidance or examples…"
              />
              <div className="d-flex justify-content-end mt-2">
                <small className="text-muted">
                  {customPrompt.length}/{maxLength}
                </small>
              </div>
            </div>
            <div className="form-group mt-3">
              <button type="button" className="btn btn-primary" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

