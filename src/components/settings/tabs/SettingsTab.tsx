"use client";

import * as React from "react";

export function SettingsTab() {
  const [activeAccordion, setActiveAccordion] = React.useState<string | null>("connect");
  const [goal, setGoal] = React.useState("sales");
  const [businessDescription, setBusinessDescription] = React.useState("");
  const [businessAddress, setBusinessAddress] = React.useState("");
  const [supportEmail, setSupportEmail] = React.useState("");
  const [personality, setPersonality] = React.useState("helpful");
  const [bookingLink, setBookingLink] = React.useState("");
  const [promotionOffers, setPromotionOffers] = React.useState("");
  const [domain, setDomain] = React.useState("");
  const [faqs, setFaqs] = React.useState([{ question: "", answer: "" }]);
  const [privacyPolicyUrl, setPrivacyPolicyUrl] = React.useState("");
  const [privacyPolicyText, setPrivacyPolicyText] = React.useState("");
  const [termsOfServiceUrl, setTermsOfServiceUrl] = React.useState("");
  const [termsOfServiceText, setTermsOfServiceText] = React.useState("");
  const [refundPolicyUrl, setRefundPolicyUrl] = React.useState("");
  const [refundPolicyText, setRefundPolicyText] = React.useState("");
  const [shippingPolicyUrl, setShippingPolicyUrl] = React.useState("");
  const [shippingPolicyText, setShippingPolicyText] = React.useState("");
  const [subscriptionPolicyUrl, setSubscriptionPolicyUrl] = React.useState("");
  const [subscriptionPolicyText, setSubscriptionPolicyText] = React.useState("");

  const toggleAccordion = (id: string) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  const addFaq = () => {
    setFaqs([...faqs, { question: "", answer: "" }]);
  };

  const updateFaq = (index: number, field: "question" | "answer", value: string) => {
    const updated = [...faqs];
    updated[index][field] = value;
    setFaqs(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement save logic
    console.log("Saving settings...");
  };

  const openAccountMetaModal = () => {
    // TODO: Implement account meta modal logic
    console.log("Opening account meta modal...");
  };

  return (
    <div className="container-fluid">
      <form onSubmit={handleSubmit}>
        <div id="custom-accordion">
          {/* 1. Connect Facebook page or Twitter Account */}
          <div className="card mb-3">
            <div
              className="mb-3-header"
              style={{ cursor: "pointer", backgroundColor: "#fff", padding: "0.75rem 1.25rem" }}
              onClick={() => toggleAccordion("connect")}
            >
              <h6 className="mb-0 d-flex justify-content-between align-items-center" id="headingConnect">
                <span>1. Connect Facebook page or Twitter Account</span>
                <span className="text-success">✓</span>
              </h6>
            </div>
            <div
              className={`collapse ${activeAccordion === "connect" ? "show" : ""}`}
              id="collapseConnect"
              aria-labelledby="headingConnect"
            >
              <div className="mb-3-body" style={{ backgroundColor: "#fff" }}>
                <div className="text-success mb-2">Page selected, ID: 645232738675563</div>
                <button
                  className="btn btn-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    openAccountMetaModal();
                  }}
                >
                  Change Page
                </button>
              </div>
            </div>
          </div>

          {/* 2. What's your Goal? */}
          <div className="card mb-3">
            <div
              className="mb-3-header"
              style={{ cursor: "pointer", backgroundColor: "#fff", padding: "0.75rem 1.25rem" }}
              onClick={() => toggleAccordion("goal")}
            >
              <h6 className="mb-0 d-flex justify-content-between align-items-center">
                <span>2. What's your Goal?</span>
                <span className="text-success">✓</span>
              </h6>
            </div>
            <div
              className={`collapse ${activeAccordion === "goal" ? "show" : ""}`}
              id="collapseGoal"
            >
              <div className="mb-3-body" style={{ backgroundColor: "#fff" }}>
                <div className="form-group">
                  <select
                    id="goal"
                    className="form-control"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                  >
                    <option value="sales">Sales</option>
                    <option value="appointments">Appointments</option>
                    <option value="engagement">Engagement</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Business Information */}
          <div className="card mb-3">
            <div
              className="mb-3-header"
              style={{ cursor: "pointer", backgroundColor: "#fff", padding: "0.75rem 1.25rem" }}
              onClick={() => toggleAccordion("bizInfo")}
            >
              <h6 className="mb-0 d-flex justify-content-between align-items-center">
                <span>3. Business Information</span>
                <span className="text-success">✓</span>
              </h6>
            </div>
            <div
              className={`collapse ${activeAccordion === "bizInfo" ? "show" : ""}`}
              id="collapseBizInfo"
            >
              <div className="mb-3-body" style={{ backgroundColor: "#fff" }}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0">Business Description</h5>
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-sm"
                    onClick={(e) => {
                      e.preventDefault();
                      window.open(
                        "https://knowledge.smartreply.io/en/ai-agent/custom-prompt-instructions",
                        "_blank"
                      );
                    }}
                  >
                    Need Help?
                  </button>
                </div>
                <textarea
                  id="description"
                  className="form-control"
                  style={{ minHeight: "200px" }}
                  value={businessDescription}
                  onChange={(e) => setBusinessDescription(e.target.value)}
                  maxLength={20000}
                  placeholder="Enter your business description..."
                />
                <small className="text-muted d-block mt-1">
                  {businessDescription.length}/20000
                </small>

                <h5 className="mt-4 mb-3">Business Address</h5>
                <span className="text-muted d-block mb-2">
                  Enter your full business address (address, city, state, country)
                </span>
                <input
                  type="text"
                  id="address"
                  className="form-control"
                  value={businessAddress}
                  onChange={(e) => setBusinessAddress(e.target.value)}
                  placeholder="Address, city, state, country"
                />
              </div>
            </div>
          </div>

          {/* 4. Support Email */}
          <div className="card mb-3">
            <div
              className="mb-3-header"
              style={{ cursor: "pointer", backgroundColor: "#fff", padding: "0.75rem 1.25rem" }}
              onClick={() => toggleAccordion("email")}
            >
              <h6 className="mb-0 d-flex justify-content-between align-items-center">
                <span>4. Support Email</span>
                <span className="text-success">✓</span>
              </h6>
            </div>
            <div
              className={`collapse ${activeAccordion === "email" ? "show" : ""}`}
              id="collapseEmail"
            >
              <div className="mb-3-body" style={{ backgroundColor: "#fff" }}>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  value={supportEmail}
                  onChange={(e) => setSupportEmail(e.target.value)}
                  placeholder="Your support email"
                />
              </div>
            </div>
          </div>

          {/* 5. Choose a personality for the agent */}
          <div className="card mb-3">
            <div
              className="mb-3-header"
              style={{ cursor: "pointer", backgroundColor: "#fff", padding: "0.75rem 1.25rem" }}
              onClick={() => toggleAccordion("personality")}
            >
              <h6 className="mb-0 d-flex justify-content-between align-items-center">
                <span>5. Choose a personality for the agent</span>
                <span className="text-success">✓</span>
              </h6>
            </div>
            <div
              className={`collapse ${activeAccordion === "personality" ? "show" : ""}`}
              id="collapsePersonality"
            >
              <div className="mb-3-body" style={{ backgroundColor: "#fff" }}>
                <div className="form-group">
                  <select
                    id="personality"
                    className="form-control"
                    value={personality}
                    onChange={(e) => setPersonality(e.target.value)}
                  >
                    <option value="helpful">Helpful</option>
                    <option value="charismatic">Charismatic</option>
                    <option value="sales focused">Sales Master</option>
                    <option value="funny">Funny</option>
                    <option value="engagement">Engagement</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* 6. Add Products (Up to 5) */}
          <div className="card mb-3">
            <div
              className="mb-3-header"
              style={{ cursor: "pointer", backgroundColor: "#fff", padding: "0.75rem 1.25rem" }}
              onClick={() => toggleAccordion("products")}
            >
              <h6 className="mb-0 d-flex justify-content-between align-items-center">
                <span>6. Add Products (Up to 5)</span>
              </h6>
            </div>
            <div
              className={`collapse ${activeAccordion === "products" ? "show" : ""}`}
              id="collapseProducts"
            >
              <div className="mb-3-body" style={{ backgroundColor: "#fff" }}>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    // TODO: Add product logic
                  }}
                >
                  Add Product
                </button>
              </div>
            </div>
          </div>

          {/* 7. Add Calendar Schedule Link */}
          <div className="card mb-3">
            <div
              className="mb-3-header"
              style={{ cursor: "pointer", backgroundColor: "#fff", padding: "0.75rem 1.25rem" }}
              onClick={() => toggleAccordion("calendar")}
            >
              <h6 className="mb-0 d-flex justify-content-between align-items-center">
                <span>7. Add Calendar Schedule Link</span>
              </h6>
            </div>
            <div
              className={`collapse ${activeAccordion === "calendar" ? "show" : ""}`}
              id="collapseCalendar"
            >
              <div className="mb-3-body" style={{ backgroundColor: "#fff" }}>
                <h5 className="mb-2">Add Calendar Schedule Link</h5>
                <input
                  type="text"
                  className="form-control"
                  value={bookingLink}
                  onChange={(e) => setBookingLink(e.target.value)}
                  placeholder="Calendar Link"
                />
              </div>
            </div>
          </div>

          {/* 8. Promotion offers or discount codes */}
          <div className="card mb-3">
            <div
              className="mb-3-header"
              style={{ cursor: "pointer", backgroundColor: "#fff", padding: "0.75rem 1.25rem" }}
              onClick={() => toggleAccordion("promotions")}
            >
              <h6 className="mb-0 d-flex justify-content-between align-items-center">
                <span>8. Promotion offers or discount codes (Optional)</span>
              </h6>
            </div>
            <div
              className={`collapse ${activeAccordion === "promotions" ? "show" : ""}`}
              id="collapsePromotions"
            >
              <div className="mb-3-body" style={{ backgroundColor: "#fff" }}>
                <input
                  type="text"
                  id="promotionOffers"
                  className="form-control"
                  value={promotionOffers}
                  onChange={(e) => setPromotionOffers(e.target.value)}
                  placeholder="Enter promotion or discount code"
                />
              </div>
            </div>
          </div>

          {/* 9. Add Domain */}
          <div className="card mb-3">
            <div
              className="mb-3-header"
              style={{ cursor: "pointer", backgroundColor: "#fff", padding: "0.75rem 1.25rem" }}
              onClick={() => toggleAccordion("domain")}
            >
              <h6 className="mb-0 d-flex justify-content-between align-items-center">
                <span>9. Add Domain</span>
              </h6>
            </div>
            <div
              className={`collapse ${activeAccordion === "domain" ? "show" : ""}`}
              id="collapseDomain"
            >
              <div className="mb-3-body" style={{ backgroundColor: "#fff" }}>
                <div className="mb-3 text-center">
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      // TODO: Handle site connection
                    }}
                  >
                    Have you connected your website?
                  </button>
                </div>
                <input
                  type="text"
                  id="domain"
                  className="form-control"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder="Your domain"
                />
              </div>
            </div>
          </div>

          {/* 10. Add FAQs */}
          <div className="card mb-3">
            <div
              className="mb-3-header"
              style={{ cursor: "pointer", backgroundColor: "#fff", padding: "0.75rem 1.25rem" }}
              onClick={() => toggleAccordion("faqs")}
            >
              <h6 className="mb-0 d-flex justify-content-between align-items-center">
                <span>10. Add FAQs</span>
              </h6>
            </div>
            <div
              className={`collapse ${activeAccordion === "faqs" ? "show" : ""}`}
              id="collapseFaqs"
            >
              <div className="mb-3-body" style={{ backgroundColor: "#fff" }}>
                {faqs.map((faq, index) => (
                  <div key={index} className="form-group mb-3">
                    <input
                      type="text"
                      className="form-control mb-2"
                      value={faq.question}
                      onChange={(e) => updateFaq(index, "question", e.target.value)}
                      placeholder="FAQ Question"
                    />
                    <textarea
                      className="form-control"
                      value={faq.answer}
                      onChange={(e) => updateFaq(index, "answer", e.target.value)}
                      placeholder="FAQ Answer"
                      rows={3}
                    />
                  </div>
                ))}
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    addFaq();
                  }}
                >
                  Add FAQ
                </button>
              </div>
            </div>
          </div>

          {/* 11. Policy Pages */}
          <div className="card mb-3">
            <div
              className="mb-3-header"
              style={{ cursor: "pointer", backgroundColor: "#fff", padding: "0.75rem 1.25rem" }}
              onClick={() => toggleAccordion("policies")}
            >
              <h6 className="mb-0 d-flex justify-content-between align-items-center">
                <span>11. Policy Pages</span>
              </h6>
            </div>
            <div
              className={`collapse ${activeAccordion === "policies" ? "show" : ""}`}
              id="collapsePolicyPages"
            >
              <div className="mb-3-body" style={{ backgroundColor: "#fff" }}>
                {/* Privacy Policy */}
                <div className="mb-4">
                  <h5 className="mb-2">Privacy Policy URL</h5>
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={privacyPolicyUrl}
                    onChange={(e) => setPrivacyPolicyUrl(e.target.value)}
                    placeholder="https://yourstore.com/policy-pages/privacy-policy"
                  />
                  <h5 className="mb-2">Privacy Policy Text</h5>
                  <textarea
                    className="form-control"
                    style={{ minHeight: "150px" }}
                    value={privacyPolicyText}
                    onChange={(e) => setPrivacyPolicyText(e.target.value)}
                    maxLength={20000}
                  />
                  <small className="text-muted d-block mt-1">
                    {privacyPolicyText.length}/20000
                  </small>
                </div>
                <hr />

                {/* Terms of Service */}
                <div className="mb-4">
                  <h5 className="mb-2">Terms of Service URL</h5>
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={termsOfServiceUrl}
                    onChange={(e) => setTermsOfServiceUrl(e.target.value)}
                    placeholder="https://yourstore.com/policy-pages/terms-of-service"
                  />
                  <h5 className="mb-2">Terms of Service Text</h5>
                  <textarea
                    className="form-control"
                    style={{ minHeight: "150px" }}
                    value={termsOfServiceText}
                    onChange={(e) => setTermsOfServiceText(e.target.value)}
                    maxLength={20000}
                  />
                  <small className="text-muted d-block mt-1">
                    {termsOfServiceText.length}/20000
                  </small>
                </div>
                <hr />

                {/* Refund Policy */}
                <div className="mb-4">
                  <h5 className="mb-2">Refund Policy URL</h5>
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={refundPolicyUrl}
                    onChange={(e) => setRefundPolicyUrl(e.target.value)}
                    placeholder="https://yourstore.com/policy-pages/refund-policy"
                  />
                  <h5 className="mb-2">Refund Policy Text</h5>
                  <textarea
                    className="form-control"
                    style={{ minHeight: "150px" }}
                    value={refundPolicyText}
                    onChange={(e) => setRefundPolicyText(e.target.value)}
                    maxLength={20000}
                  />
                  <small className="text-muted d-block mt-1">
                    {refundPolicyText.length}/20000
                  </small>
                </div>
                <hr />

                {/* Shipping Policy */}
                <div className="mb-4">
                  <h5 className="mb-2">Shipping Policy URL</h5>
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={shippingPolicyUrl}
                    onChange={(e) => setShippingPolicyUrl(e.target.value)}
                    placeholder="https://yourstore.com/policy-pages/shipping-policy"
                  />
                  <h5 className="mb-2">Shipping Policy Text</h5>
                  <textarea
                    className="form-control"
                    style={{ minHeight: "150px" }}
                    value={shippingPolicyText}
                    onChange={(e) => setShippingPolicyText(e.target.value)}
                    maxLength={20000}
                  />
                  <small className="text-muted d-block mt-1">
                    {shippingPolicyText.length}/20000
                  </small>
                </div>
                <hr />

                {/* Subscription Policy */}
                <div className="mb-4">
                  <h5 className="mb-2">Subscription Policy URL</h5>
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={subscriptionPolicyUrl}
                    onChange={(e) => setSubscriptionPolicyUrl(e.target.value)}
                    placeholder="https://yourstore.com/policy-pages/subscription-policy"
                  />
                  <h5 className="mb-2">Subscription Policy Text</h5>
                  <textarea
                    className="form-control"
                    style={{ minHeight: "150px" }}
                    value={subscriptionPolicyText}
                    onChange={(e) => setSubscriptionPolicyText(e.target.value)}
                    maxLength={20000}
                  />
                  <small className="text-muted d-block mt-1">
                    {subscriptionPolicyText.length}/20000
                  </small>
                </div>
              </div>
            </div>
          </div>

          {/* Activate SmartReply */}
          <div className="card mb-3">
            <div className="mb-3-header" style={{ backgroundColor: "#fff", padding: "0.75rem 1.25rem" }}>
              <h6 className="mb-0">Activate SmartReply</h6>
            </div>
            <div className="mb-3-body">
              <div className="form-group mt-3 text-center">
                <button
                  type="submit"
                  className="btn btn-primary d-block mx-auto"
                  style={{ width: "85%", maxWidth: "600px" }}
                >
                  Activate SmartReply
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

