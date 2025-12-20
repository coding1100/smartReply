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

export default function HomeClient() {
  const [tab, setTab] = React.useState<"chats" | "comments" | "subscribers">("chats");
  const [activeChatId, setActiveChatId] = React.useState("t_2122612654922893");
  const [activeCommentId, setActiveCommentId] = React.useState(
    "122146508888890127_885430057309494",
  );
  const [composerText, setComposerText] = React.useState("");
  const [autoReply, setAutoReply] = React.useState(true);

  const isChats = tab === "chats";
  const isComments = tab === "comments";

  return (
    <div className="page-content">
      <div className="row chat-wrapper">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <div className="row position-relative">
                {/* Left: chat-aside */}
                <div className="col-xl-4 col-lg-5 chat-aside border-lg-right">
                  <div className="aside-content" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                    {/* Header with Tabs */}
                    <div className="aside-header">
                      <ul className="nav nav-tabs" role="tablist">
                        <li className="nav-item" role="presentation">
                          <a className={`nav-link ${tab === 'chats' ? 'active' : ''}`} id="chats-tab" data-bs-toggle="tab" href="#chats" role="tab" aria-controls="chats" aria-selected={tab === 'chats'} onClick={(e) => { e.preventDefault(); setTab('chats'); }}>
                            <div className="d-flex flex-row flex-lg-column flex-xl-row align-items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-message-square icon-sm mr-sm-2 mr-lg-0 mr-xl-2 mb-md-1 mb-xl-0">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                              </svg>
                              <p className="d-none d-sm-block">Chats</p>
                            </div>
                          </a>
                        </li>
                        <li className="nav-item" role="presentation">
                          <a className={`nav-link ${tab === 'comments' ? 'active' : ''}`} id="comments-tab" data-bs-toggle="tab" href="#comments" role="tab" aria-controls="comments" aria-selected={tab === 'comments'} onClick={(e) => { e.preventDefault(); setTab('comments'); }}>
                            <div className="d-flex flex-row flex-lg-column flex-xl-row align-items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-phone-call icon-sm mr-sm-2 mr-lg-0 mr-xl-2 mb-md-1 mb-xl-0">
                                <path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                              </svg>
                              <p className="d-none d-sm-block">Comments</p>
                            </div>
                          </a>
                        </li>
                        <li className="nav-item" role="presentation">
                          <a className={`nav-link ${tab === 'subscribers' ? 'active' : ''}`} id="subscribers-tab" data-bs-toggle="tab" href="#subscribers" role="tab" aria-controls="subscribers" aria-selected={tab === 'subscribers'} onClick={(e) => { e.preventDefault(); setTab('subscribers'); }}>
                            <div className="d-flex flex-row flex-lg-column flex-xl-row align-items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-users icon-sm mr-sm-2 mr-lg-0 mr-xl-2 mb-md-1 mb-xl-0">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                              </svg>
                              <p className="d-none d-sm-block">Subscribers</p>
                            </div>
                          </a>
                        </li>
                      </ul>

                      {/* Search Form */}
                      <form className="search-form">
                        <div className="input-group border rounded-sm">
                          <div className="input-group-prepend">
                            <div className="input-group-text border-0 rounded-sm">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                              </svg>
                            </div>
                          </div>
                          <input type="text" className="form-control border-0 rounded-sm" placeholder="Search here..." />
                        </div>
                      </form>
                    </div>

                    {/* Filters and Sort */}
                    <div className="filters-and-sort mt-3">
                      <div className="d-flex justify-content-between">
                        <div className="d-flex justify-content-between">
                          <div className="dropdown">
                            <span className="me-3">Filters:</span>
                            <a className="no-button dropdown-toggle" id="filtersDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              <i className="fa fa-filter"></i> <i className="fa fa-chevron-down"></i>
                            </a>
                            <div className="dropdown-menu" aria-labelledby="filtersDropdown">
                              <a className="dropdown-item" href="#">All</a>
                              <a className="dropdown-item" href="#">Actions</a>
                              <a className="dropdown-item" href="#">Open Actions</a>
                              <a className="dropdown-item" href="#">All Quality</a>
                              <a className="dropdown-item" href="#">Quality 3 & Up</a>
                              <a className="dropdown-item" href="#">Quality 4 & Up</a>
                              <a className="dropdown-item" href="#">Quality 5</a>
                              <a className="dropdown-item" href="#">Follow Up</a>
                              <a className="dropdown-item" href="#">Long Thread</a>
                              <a className="dropdown-item" href="#">Auto Reply Off</a>
                              <a className="dropdown-item" href="#">Link Clicks</a>
                              <a className="dropdown-item" href="#">Unsubscribed</a>
                            </div>
                          </div>
                          <div className="dropdown ms-3">
                            <span className="me-2">Platform:</span>
                            <a className="no-button dropdown-toggle" id="platformDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              <i className="fa fa-layer-group"></i> <i className="fa fa-chevron-down"></i>
                            </a>
                            <div className="dropdown-menu" aria-labelledby="platformDropdown">
                              <a className="dropdown-item" href="#">All</a>
                              <a className="dropdown-item" href="#">Social Media</a>
                              <a className="dropdown-item" href="#">Facebook</a>
                              <a className="dropdown-item" href="#">Instagram</a>
                              <a className="dropdown-item" href="#">WhatsApp</a>
                              <a className="dropdown-item" href="#">TikTok</a>
                              <a className="dropdown-item" href="#">TikTok Shop</a>
                              <a className="dropdown-item" href="#">Gmail</a>
                              <a className="dropdown-item" href="#">Website</a>
                            </div>
                          </div>
                          <div className="dropdown ms-3">
                            <span className="me-2">Sentiment:</span>
                            <a className="no-button dropdown-toggle" id="sentimentDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              <i className="fa fa-smile"></i> <i className="fa fa-chevron-down"></i>
                            </a>
                            <div className="dropdown-menu" aria-labelledby="sentimentDropdown">
                              <a className="dropdown-item" href="#">All</a>
                              <a className="dropdown-item" href="#">Positive</a>
                              <a className="dropdown-item" href="#">Neutral</a>
                              <a className="dropdown-item" href="#">Negative</a>
                            </div>
                          </div>
                        </div>

                        <div className="dropdown">
                          <button className="btn p-0" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-settings icon-lg text-muted pb-3px">
                              <circle cx="12" cy="12" r="3"></circle>
                              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                            </svg>
                          </button>
                          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a className="dropdown-item d-flex align-items-center" href="#">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit-2 icon-sm mr-2">
                                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                              </svg>
                              <span>Settings</span>
                            </a>
                            <a className="dropdown-item d-flex align-items-center" href="#">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-toggle-right icon-sm mr-2">
                                <rect x="1" y="5" width="22" height="14" rx="7" ry="7"></rect>
                                <circle cx="16" cy="12" r="3"></circle>
                              </svg>
                              <span>Turn off</span>
                            </a>
                            <a className="dropdown-item d-flex align-items-center" href="#" target="_blank">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-external-link icon-sm mr-2">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                <polyline points="15 3 21 3 21 9"></polyline>
                                <line x1="10" y1="14" x2="21" y2="3"></line>
                              </svg>
                              <span>Go to Facebook Page</span>
                            </a>
                            <a className="dropdown-item d-flex align-items-center" href="#">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-download icon-sm mr-2">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                <polyline points="7 10 12 15 17 10"></polyline>
                                <line x1="12" y1="15" x2="12" y2="3"></line>
                              </svg>
                              <span>Export to CSV</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Aside Body with Tabs Content */}
                  <div className="aside-body">
                    <div className="tab-content pt-3">
                      <div className={`tab-pane show ${tab === 'chats' ? 'active' : ''}`} id="chats" role="tabpanel" aria-labelledby="chats-tab">
                        <div className="preview-container1">
                          <p className="text-muted mb-1">Recent chats</p>
                          <ul id="chatPreviewList" className="list-unstyled chat-list px-1">
                            <li className="chat-item pr-1 active-chat">
                              <a href="javascript:;" className="d-flex align-items-center justify-content-between w-100 position-relative" onClick={() => setActiveChatId("t_2122612654922893")}>
                                <div className="d-flex align-items-center">
                                  <img src="https://app.smartreply.io/assets/images/traffic_sources/facebook.png" alt="Page" style={{ width: "20px", height: "20px", marginRight: "10px" }} />
                                  <div className="d-flex flex-column">
                                    <p className="text-body font-weight-bold mb-0">Awais Jutt</p>
                                    <p className="text-muted tx-13 mb-0">i like the 2nd option</p>
                                  </div>
                                </div>
                                <div className="position-relative text-right" style={{ minWidth: "140px", paddingRight: "28px" }}>
                                  <p className="text-muted tx-13 mb-0">4 days ago</p>
                                </div>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className={`tab-pane fade ${tab === 'comments' ? 'active' : ''}`} id="comments" role="tabpanel" aria-labelledby="comments-tab">
                        <div className="preview-container">
                          <p className="text-muted mb-1">Recent comments</p>
                          <ul id="commentPreviewList" className="list-unstyled chat-list px-1">
                            <div className="py-3 px-2">
                              <div className="d-flex align-items-center mb-3 skeleton-row">
                                <div className="profile-image-skeleton mr-3"></div>
                                <div className="flex-grow-1">
                                  <div className="skeleton-cell mb-1" style={{ width: "50%", height: "12px" }}></div>
                                  <div className="skeleton-cell" style={{ width: "80%", height: "10px" }}></div>
                                </div>
                              </div>
                            </div>
                          </ul>
                        </div>
                      </div>
                      <div className={`tab-pane fade ${tab === 'subscribers' ? 'active' : ''}`} id="subscribers" role="tabpanel" aria-labelledby="subscribers-tab">
                        <div className="preview-container">
                          <p className="text-muted mb-1">Recent Subscribers</p>
                          <ul className="list-unstyled chat-list px-1"></ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Middle: chat-content */}
                <div className="col-xl-5 col-lg-7 chat-content">
                  <div id="loading-spinner-overlay" className="loading-spinner-overlay" style={{ display: "none", position: "absolute", top: "0", left: "0", right: "0", bottom: "0", justifyContent: "center" }}>
                    <div id="loader" className="d-flex justify-content-center mt-3">
                      <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  </div>

                  <div className="chat-container" id="chatContainer" style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
                    {/* Chat Header */}
                    <div className="chat-header border-bottom" style={{ flexShrink: "0", overflow: "visible" }}>
                      <div className="d-flex justify-content-between">
                        <div className="d-flex align-items-center">
                          <span className="ml-n2 text-muted d-lg-none" style={{ cursor: "pointer" }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-corner-up-left icon-lg mr-2">
                              <polyline points="9 14 4 9 9 4"></polyline>
                              <path d="M20 20v-7a4 4 0 0 0-4-4H4"></path>
                            </svg>
                          </span>
                          <figure className="mb-0 mr-2">
                            <div className="profile-img-wrapper" style={{ position: "relative", minWidth: "37px", width: "37px", height: "37px", marginRight: "10px" }}>
                              <img src="https://platform-lookaside.fbsbx.com/platform/profilepic/?eai=Aa3ONGwp69DFukVj6z9n7HeND1QSoSBL2tO7vekAGEsiNInViWVFNXNvti9mQO_yNQW6jFMz77H8&psid=24362880443305426&width=1024&ext=1768823313&hash=AT84k2fd7nnUT-OF9S1Z_Q1_" className="img-sm rounded-circle fixed-aspect-ratio" alt="avatar" style={{ width: "37px", height: "37px" }} />
                              <div className="status online"></div>
                            </div>
                            <div>
                              <p>Awais Jutt</p>
                              <div style={{ paddingBottom: "5px" }}>
                                <p className="text-muted tx-13">Ad ID: </p>
                              </div>
                              <div className="d-flex align-items-center gap-2">
                                <BootstrapSwitch
                                  checked={autoReply}
                                  onChange={setAutoReply}
                                  id="formSwitch_auto_reply"
                                />
                                <label className="form-check-label" htmlFor="formSwitch_auto_reply">Auto Reply</label>
                              </div>
                            </div>
                          </figure>
                        </div>
                        <div className="d-flex align-items-center">
                          <div className="dropdown">
                            <button type="button" className="btn btn-link text-muted p-0 dropdown-toggle" id="chatHeaderMenuButton" aria-expanded="false">
                              <i className="fas fa-ellipsis-h"></i>
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end shadow" aria-labelledby="chatHeaderMenuButton" style={{ minWidth: "220px" }}>
                              <li>
                                <a className="dropdown-item" href="#">Edit conversation history</a>
                              </li>
                              <li>
                                <a className="dropdown-item" href="#">Clear agent thread history</a>
                              </li>
                              <li>
                                <a className="dropdown-item" href="#">Open AI Training</a>
                              </li>
                              <li>
                                <a className="dropdown-item" href="#">Block/Unblock User</a>
                              </li>
                              <li>
                                <a className="dropdown-item" href="#">Reprocess Message</a>
                              </li>
                              <li>
                                <a className="dropdown-item" href="#">Go to Profile</a>
                              </li>
                              <li>
                                <a className="dropdown-item" href="#">Create Subscriber Link</a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Chat Body */}
                    <div className="chat-body ps--active-y" style={{ flexGrow: "1", overflowY: "auto", paddingBottom: "10px" }}>
                      <ul className="messages" style={{ maxWidth: "100%" }} id="chatMessagesContainer">
                        <div className="date-header" style={{ textAlign: "center", color: "#6c757d", margin: "10px 0" }}>4 days 3 hours ago</div>
                        <li className="message-item me">
                          <img src="https://scontent-iad3-1.xx.fbcdn.net/v/t39.30808-1/502586578_2121943574989801_801439392086419003_n.jpg?stp=c341.0.1365.1365a_cp0_dst-jpg_s50x50_tt6&_nc_cat=104&ccb=1-7&_nc_sid=f907e8&_nc_eui2=AeGB6r9xqokwK7wrrTPZGgqlYfzXYouZ6bBh_Ndii5npsHdgWSOTEzsLrEA6hl0HVG0IQSGu-i1A0Hq8ujz1Tqfm&_nc_ohc=NMC5lFO6xAcQ7kNvwFA4zyi&_nc_oc=AdnvbUpSN0r2Ol4ajPkLTn2_iz3eRRY67mCCzFAKD5hHaDLdnJBymzaT7DUWKEuRTmZ4fYTwEEfXrfj5xyVHWLCg&_nc_zt=24&_nc_ht=scontent-iad3-1.xx&edm=AJdBtusEAAAA&_nc_gid=iiQstWdJ8sacy4DTUKQBLg&_nc_tpa=Q5bMBQFPXP6WO3T_NupE1cuPE62BP8-_5qz2xX7O3euD4tFgWXOSjCNzhZhAgQdhR-Jo_BJzYAaZQ3ro&oh=00_AfkOQAkb9vX_tzUMSXLfFHCuRNU49q1Q1_dDAc-UZcO6aw&oe=694C7BCC" className="img-xs rounded-circle" alt="avatar" />
                          <div className="content">
                            <div className="private-reply-note text-muted mb-2" style={{ fontSize: "12px" }}>
                              This was sent as a private message to a comment.
                              <a href="https://www.facebook.com/645232738675563_122146508888890127" target="_blank" rel="noopener noreferrer" className="font-weight-bold" style={{ color: "#1b74e4" }}>
                                View comment
                              </a>
                            </div>
                            <div className="sender-name">
                              <p style={{ maxWidth: "100%" }}>Wise man</p>
                              <span className="text-primary fw-bold" style={{ marginLeft: "4px" }}>AI</span>
                            </div>
                            <div className="message">
                              <div className="message d-flex align-items-center justify-content-left">
                                <div className="bubble">
                                  <p>Hi Awais! Thanks for the love, want behind-the-scenes shots or design details of this Modern Residential Home? Message us and we'll send them right away.</p>
                                </div>
                              </div>
                              <span>02:05 AM</span>
                            </div>
                          </div>
                        </li>
                        <li className="message-item friend">
                          <div className="profile-img-wrapper" style={{ position: "relative", minWidth: "37px", width: "37px", height: "37px", marginRight: "10px" }}>
                            <img src="https://platform-lookaside.fbsbx.com/platform/profilepic/?eai=Aa3ONGwp69DFukVj6z9n7HeND1QSoSBL2tO7vekAGEsiNInViWVFNXNvti9mQO_yNQW6jFMz77H8&psid=24362880443305426&width=1024&ext=1768823313&hash=AT84k2fd7nnUT-OF9S1Z_Q1_" className="img-xs rounded-circle" alt="avatar" style={{ marginRight: "10px" }} />
                          </div>
                          <div className="content">
                            <div className="sender-name">
                              <p>Awais Jutt</p>
                            </div>
                            <div className="message">
                              <div className="message d-flex align-items-center justify-content-right">
                                <div className="bubble" style={{ maxWidth: "100%" }}>
                                  <p>i like the 2nd option but can you provide something more better options</p>
                                </div>
                              </div>
                              <div className="d-flex align-items-center justify-content-start" style={{ marginTop: "8px" }}>
                                <span>02:10 AM</span>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li className="message-item me">
                          <img src="https://scontent-iad3-1.xx.fbcdn.net/v/t39.30808-1/502586578_2121943574989801_801439392086419003_n.jpg?stp=c341.0.1365.1365a_cp0_dst-jpg_s50x50_tt6&_nc_cat=104&ccb=1-7&_nc_sid=f907e8&_nc_eui2=AeGB6r9xqokwK7wrrTPZGgqlYfzXYouZ6bBh_Ndii5npsHdgWSOTEzsLrEA6hl0HVG0IQSGu-i1A0Hq8ujz1Tqfm&_nc_ohc=NMC5lFO6xAcQ7kNvwFA4zyi&_nc_oc=AdnvbUpSN0r2Ol4ajPkLTn2_iz3eRRY67mCCzFAKD5hHaDLdnJBymzaT7DUWKEuRTmZ4fYTwEEfXrfj5xyVHWLCg&_nc_zt=24&_nc_ht=scontent-iad3-1.xx&edm=AJdBtusEAAAA&_nc_gid=iiQstWdJ8sacy4DTUKQBLg&_nc_tpa=Q5bMBQFPXP6WO3T_NupE1cuPE62BP8-_5qz2xX7O3euD4tFgWXOSjCNzhZhAgQdhR-Jo_BJzYAaZQ3ro&oh=00_AfkOQAkb9vX_tzUMSXLfFHCuRNU49q1Q1_dDAc-UZcO6aw&oe=694C7BCC" className="img-xs rounded-circle" alt="avatar" />
                          <div className="content">
                            <div className="sender-name">
                              <p style={{ maxWidth: "100%" }}>Wise man</p>
                              <span className="text-primary fw-bold" style={{ marginLeft: "4px" }}>AI</span>
                            </div>
                            <div className="message">
                              <div className="message d-flex align-items-center justify-content-left">
                                <div className="bubble">
                                  <p>Love it, here are 3 upgraded directions you might like:<br />1) Sleek Minimal Modern, crisp lines, glass, monochrome elegance.<br />2) Warm Contemporary, wood accents, soft lighting, cozy livability.<br />3) Luxury Eco-Friendly, reclaimed materials, green roof, smart systems.<br />Pick a vibe and I'll pull the best matches and quotes for you, Olivia</p>
                                </div>
                              </div>
                              <span>02:11 AM</span>
                            </div>
                          </div>
                        </li>
                        <li className="message-item friend">
                          <div className="profile-img-wrapper" style={{ position: "relative", minWidth: "37px", width: "37px", height: "37px", marginRight: "10px" }}>
                            <img src="https://platform-lookaside.fbsbx.com/platform/profilepic/?eai=Aa3ONGwp69DFukVj6z9n7HeND1QSoSBL2tO7vekAGEsiNInViWVFNXNvti9mQO_yNQW6jFMz77H8&psid=24362880443305426&width=1024&ext=1768823313&hash=AT84k2fd7nnUT-OF9S1Z_Q1_" className="img-xs rounded-circle" alt="avatar" style={{ marginRight: "10px" }} />
                          </div>
                          <div className="content">
                            <div className="sender-name">
                              <p>Awais Jutt</p>
                            </div>
                            <div className="message">
                              <div className="message d-flex align-items-center justify-content-right">
                                <div className="bubble" style={{ maxWidth: "100%" }}>
                                  <p>i like the 2nd option</p>
                                </div>
                              </div>
                              <div className="d-flex align-items-center justify-content-start" style={{ marginTop: "8px" }}>
                                <span>02:12 AM</span>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li className="message-item me">
                          <img src="https://scontent-iad3-1.xx.fbcdn.net/v/t39.30808-1/502586578_2121943574989801_801439392086419003_n.jpg?stp=c341.0.1365.1365a_cp0_dst-jpg_s50x50_tt6&_nc_cat=104&ccb=1-7&_nc_sid=f907e8&_nc_eui2=AeGB6r9xqokwK7wrrTPZGgqlYfzXYouZ6bBh_Ndii5npsHdgWSOTEzsLrEA6hl0HVG0IQSGu-i1A0Hq8ujz1Tqfm&_nc_ohc=NMC5lFO6xAcQ7kNvwFA4zyi&_nc_oc=AdnvbUpSN0r2Ol4ajPkLTn2_iz3eRRY67mCCzFAKD5hHaDLdnJBymzaT7DUWKEuRTmZ4fYTwEEfXrfj5xyVHWLCg&_nc_zt=24&_nc_ht=scontent-iad3-1.xx&edm=AJdBtusEAAAA&_nc_gid=iiQstWdJ8sacy4DTUKQBLg&_nc_tpa=Q5bMBQFPXP6WO3T_NupE1cuPE62BP8-_5qz2xX7O3euD4tFgWXOSjCNzhZhAgQdhR-Jo_BJzYAaZQ3ro&oh=00_AfkOQAkb9vX_tzUMSXLfFHCuRNU49q1Q1_dDAc-UZcO6aw&oe=694C7BCC" className="img-xs rounded-circle" alt="avatar" />
                          <div className="content">
                            <div className="sender-name">
                              <p style={{ maxWidth: "100%" }}>Wise man</p>
                              <span className="text-primary fw-bold" style={{ marginLeft: "4px" }}>AI</span>
                            </div>
                            <div className="message">
                              <div className="message d-flex align-items-center justify-content-left">
                                <div className="bubble">
                                  <p>Awesome, Warm Contemporary it is!<br />Here are 3 curated directions I'll pull matches and quotes for:<br />1) Cozy Wood Haven, oak accents, warm neutrals, layered textiles.<br />2) Soft-Light Open Plan, breezy layout, soft pendant and floor lighting.<br />3) Rustic-Modern Blend, reclaimed wood, matte black fixtures, plush seating.<br />I'll go fetch the best product matches and price estimates now, Olivia</p>
                                </div>
                              </div>
                              <span>02:13 AM</span>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>

                    {/* Chat Footer */}
                    <div className="chat-footer d-flex" style={{ flexShrink: "0", padding: "10px", borderTop: "1px solid #444", backgroundColor: "inherit" }}>
                      <div>
                        <button type="button" className="btn border btn-icon rounded-circle mr-2" title="Add manual action">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check-square text-muted">
                            <polyline points="9 11 12 14 22 4"></polyline>
                            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                          </svg>
                        </button>
                      </div>
                      <form className="search-form flex-grow mr-2">
                        <div className="input-group">
                          <textarea rows={1} className="form-control rounded-pill" id="chatForm" placeholder="Type a message" style={{ resize: "none", width: "100%", boxSizing: "border-box" }} value={composerText} onChange={(e) => setComposerText(e.target.value)}></textarea>
                        </div>
                      </form>
                      <div>
                        <button type="button" className="btn btn-primary btn-icon rounded-circle" onClick={() => setComposerText("")}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-send">
                            <line x1="22" y1="2" x2="11" y2="13"></line>
                            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: chat-sidebar */}
                <div className="col-xl-3 d-none d-xl-flex flex-column chat-sidebar ps-xl-0">
                  <div className="conversation-sidebar d-flex flex-column h-100 position-relative">
                    <div className="sidebar-content position-relative">
                      <div className="sidebar-loading-overlay" style={{ display: "none" }}>
                        <div className="spinner-border text-primary" role="status">
                          <span className="visually-hidden">Loading sidebar…</span>
                        </div>
                      </div>
                      <div className="sidebar-customer-block">
                        <div className="d-flex align-items-center mb-2">
                          <div className="me-3">
                            <img src="https://platform-lookaside.fbsbx.com/platform/profilepic/?eai=Aa3ONGwp69DFukVj6z9n7HeND1QSoSBL2tO7vekAGEsiNInViWVFNXNvti9mQO_yNQW6jFMz77H8&psid=24362880443305426&width=1024&ext=1768823313&hash=AT84k2fd7nnUT-OF9S1Z_Q1_" alt="Customer" className="rounded-circle" style={{ width: "48px", height: "48px", minWidth: "48px", objectFit: "cover" }} />
                          </div>
                          <div className="flex-grow-1">
                            <div className="d-flex align-items-center gap-2 mb-1">
                              <h6 className="mb-0">Awais Jutt</h6>
                            </div>
                            <span className="text-muted small">No email on file</span>
                          </div>
                        </div>
                        <div className="sidebar-tags mt-2">
                          <span className="badge bg-primary me-1 tag-item" style={{ fontWeight: "normal" }}>Warm Contemporary</span>
                          <span className="badge bg-primary me-1 tag-item" style={{ fontWeight: "normal" }}>Cozy</span>
                          <span className="badge bg-primary me-1 tag-item" style={{ fontWeight: "normal" }}>Wood Accents</span>
                        </div>
                      </div>
                      <div className="conversation-sidebar-body">
                        <div className="conversation-sidebar-notes">
                          <div className="card shadow-sm">
                            <div className="card-body p-0">
                              <div className="d-flex align-items-start justify-content-between px-1 py-1">
                                <div className="flex-grow-1 me-3">
                                  <h6 className="mb-0">Notes</h6>
                                  <small className="text-muted">Keep track of important customer interactions.</small>
                                </div>
                                <a href="#" className="text-primary text-nowrap" style={{ textDecoration: "none", cursor: "pointer" }}>
                                  Add note
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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
