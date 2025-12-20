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
  // State for action toggles
  const [refundOrder, setRefundOrder] = React.useState(true);
  const [updateShippingAddress, setUpdateShippingAddress] = React.useState(true);
  const [createInfluencerOrder, setCreateInfluencerOrder] = React.useState(true);
  const [replaceProduct, setReplaceProduct] = React.useState(true);
  const [modifySubscription, setModifySubscription] = React.useState(true);
  const [generateDiscountCode, setGenerateDiscountCode] = React.useState(true);

  // State for advanced settings visibility
  const [showRefundAdvanced, setShowRefundAdvanced] = React.useState(false);
  const [showShippingAdvanced, setShowShippingAdvanced] = React.useState(false);
  const [showInfluencerAdvanced, setShowInfluencerAdvanced] = React.useState(false);
  const [showSubscriptionAdvanced, setShowSubscriptionAdvanced] = React.useState(false);
  const [showDiscountAdvanced, setShowDiscountAdvanced] = React.useState(false);

  // State for notification emails
  const [notificationEmails, setNotificationEmails] = React.useState<string[]>([]);

  const addNotificationEmail = () => {
    setNotificationEmails([...notificationEmails, ""]);
  };

  const updateNotificationEmail = (index: number, value: string) => {
    const updated = [...notificationEmails];
    updated[index] = value;
    setNotificationEmails(updated);
  };

  const removeNotificationEmail = (index: number) => {
    const updated = notificationEmails.filter((_, i) => i !== index);
    setNotificationEmails(updated);
  };

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
            <h4>Action Settings</h4>
            <p>Enable or disable actions by the AI assistant</p>
          </div>

          <div className="row">
            {/* Left Column: Action Toggles */}
            <div className="col-md-6">
              <hr className="mb-3" />

              {/* Refund Order */}
              <div className="mb-4 d-flex align-items-start">
                <div className="me-3 pt-1">
                  <BootstrapSwitch
                    id="toggle_refund_order"
                    checked={refundOrder}
                    onChange={setRefundOrder}
                  />
                </div>
                <div>
                  <span className="small fw-medium d-block">Refund Order</span>
                  <small className="text-muted">
                    Process refunds through the AI assistant
                  </small>
                  <button
                    type="button"
                    className="btn btn-link p-0 text-primary text-decoration-none small d-block mt-1"
                    id="advanced-refund-btn"
                    onClick={() => setShowRefundAdvanced(!showRefundAdvanced)}
                  >
                    Additional Settings
                  </button>
                </div>
              </div>

              {/* Update Shipping Address */}
              <div className="mb-4 d-flex align-items-start">
                <div className="me-3 pt-1">
                  <BootstrapSwitch
                    id="toggle_update_shipping_address"
                    checked={updateShippingAddress}
                    onChange={setUpdateShippingAddress}
                  />
                </div>
                <div>
                  <span className="small fw-medium d-block">Update Shipping Address</span>
                  <small className="text-muted">
                    Allow AI to collect new shipping info
                  </small>
                  <button
                    type="button"
                    className="btn btn-link p-0 text-primary text-decoration-none small d-block mt-1"
                    id="advanced-btn"
                    onClick={() => setShowShippingAdvanced(!showShippingAdvanced)}
                  >
                    Additional Settings
                  </button>
                </div>
              </div>

              {/* Create Influencer Order */}
              <div className="mb-4 d-flex align-items-start">
                <div className="me-3 pt-1">
                  <BootstrapSwitch
                    id="toggle_create_influencer_order"
                    checked={createInfluencerOrder}
                    onChange={setCreateInfluencerOrder}
                  />
                </div>
                <div>
                  <span className="small fw-medium d-block">Create Influencer Order</span>
                  <small className="text-muted">
                    Let AI offer influencers sample orders
                  </small>
                  <button
                    type="button"
                    className="btn btn-link p-0 text-primary text-decoration-none small d-block mt-1"
                    onClick={() => setShowInfluencerAdvanced(!showInfluencerAdvanced)}
                  >
                    Influencer Additional Settings
                  </button>
                </div>
              </div>

              {/* Replace Product */}
              <div className="mb-4 d-flex align-items-start">
                <div className="me-3 pt-1">
                  <BootstrapSwitch
                    id="toggle_replace_product"
                    checked={replaceProduct}
                    onChange={setReplaceProduct}
                  />
                </div>
                <div>
                  <span className="small fw-medium d-block">Replace Product</span>
                  <small className="text-muted">
                    Allow AI to replace a product automatically
                  </small>
                </div>
              </div>

              {/* Modify Subscription */}
              <div className="mb-4 d-flex align-items-start">
                <div className="me-3 pt-1">
                  <BootstrapSwitch
                    id="toggle_modify_subscription"
                    checked={modifySubscription}
                    onChange={setModifySubscription}
                  />
                </div>
                <div>
                  <span className="small fw-medium d-block">Modify Subscription</span>
                  <small className="text-muted">
                    Allow AI to modify/cancel a subscription
                  </small>
                  <button
                    type="button"
                    className="btn btn-link p-0 text-primary text-decoration-none small d-block mt-1"
                    onClick={() => setShowSubscriptionAdvanced(!showSubscriptionAdvanced)}
                  >
                    Subscription Settings
                  </button>
                </div>
              </div>

              {/* Generate Discount Code */}
              <div className="mb-4 d-flex align-items-start">
                <div className="me-3 pt-1">
                  <BootstrapSwitch
                    id="toggle_generate_discount_code"
                    checked={generateDiscountCode}
                    onChange={setGenerateDiscountCode}
                  />
                </div>
                <div>
                  <span className="small fw-medium d-block">Generate Discount Code</span>
                  <small className="text-muted">
                    Let AI create discount codes for customers
                  </small>
                  <button
                    type="button"
                    className="btn btn-link p-0 text-primary text-decoration-none small d-block mt-1"
                    onClick={() => setShowDiscountAdvanced(!showDiscountAdvanced)}
                  >
                    Discount Code Settings
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Escalation Notification Emails */}
            <div className="col-md-6">
              <hr className="mb-3" />

              <div className="form-group">
                <label>Escalation Notification Emails</label>
                <small className="form-text text-muted mb-2 d-block">
                  Email addresses that should receive escalation alerts.
                </small>

                {notificationEmails.map((email, index) => (
                  <div key={index} className="mb-2 d-flex align-items-center">
                    <input
                      type="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => updateNotificationEmail(index, e.target.value)}
                      placeholder="email@example.com"
                    />
                    <button
                      type="button"
                      className="btn btn-link text-danger ms-2"
                      onClick={() => removeNotificationEmail(index)}
                    >
                      ×
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  className="btn btn-outline-primary btn-sm mt-2"
                  onClick={addNotificationEmail}
                  style={{ fontSize: "0.9rem" }}
                >
                  + Add another email
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

