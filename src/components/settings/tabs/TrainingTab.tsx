"use client";

import * as React from "react";

export function TrainingTab() {
  const [openAccordions, setOpenAccordions] = React.useState<Set<string>>(
    new Set(["commentReplies", "messageReplies"])
  );

  const toggleAccordion = (id: string) => {
    setOpenAccordions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const isOpen = (id: string) => openAccordions.has(id);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 col-md-8 offset-md-2">
          <div className="mb-2">
            <h4>Reply Training</h4>
            <p>Select comment examples to train your agent.</p>
          </div>

          <div id="accordion" className="accordion" role="tablist">
            {/* Train your comment replies */}
            <div className="card mb-3">
              <div
                className="mb-3-header"
                style={{ cursor: "pointer", padding: "0.75rem 1.25rem" }}
                role="tab"
                id="headingCommentReplies"
                onClick={() => toggleAccordion("commentReplies")}
              >
                <h6 className="mb-0">
                  <span>Train your comment replies</span>
                </h6>
              </div>
              <div
                id="collapseCommentReplies"
                className={`collapse ${isOpen("commentReplies") ? "show" : ""}`}
                role="tabpanel"
                aria-labelledby="headingCommentReplies"
                data-parent="#accordion"
              >
                <div className="mb-3-body" >
                  <p className="mb-2">
                    Customize what your agent comment replies by selecting previously comment reply examples.
                  </p>

                  <div className="form-group mb-3">
                    <a
                      className="btn btn-primary"
                      href="/smartreply/comment-selector"
                      rel="noopener noreferrer"
                    >
                      Open Comment Selector
                    </a>
                    <small className="form-text text-muted d-block mt-2">
                      Your agent uses theses as examples.
                    </small>
                  </div>
                </div>
              </div>
            </div>

            <hr className="my-3" />

            {/* Train your message replies */}
            <div className="card mb-3">
              <div
                className="mb-3-header"
                style={{ cursor: "pointer", padding: "0.75rem 1.25rem" }}
                role="tab"
                id="headingMessageReplies"
                onClick={() => toggleAccordion("messageReplies")}
              >
                <h6 className="mb-0">
                  <span>Train your message replies</span>
                </h6>
              </div>
              <div
                id="collapseMessageReplies"
                className={`collapse ${isOpen("messageReplies") ? "show" : ""}`}
                role="tabpanel"
                aria-labelledby="headingMessageReplies"
                data-parent="#accordion"
              >
                <div className="mb-3-body" >
                  <p className="mb-2">
                    Customize what your agent replies in dms by selecting previously message examples.
                  </p>

                  <div className="form-group mb-3">
                    <a
                      className="btn btn-primary"
                      href="/smartreply/message-selector"
                      rel="noopener noreferrer"
                    >
                      Open Message Selector
                    </a>
                    <small className="form-text text-muted d-block mt-2">
                      Your agent uses theses as examples.
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

