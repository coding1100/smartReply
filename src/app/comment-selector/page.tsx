"use client";

import * as React from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/admin/AdminLayout";

type TabKey = "posts" | "igposts";

export default function CommentSelectorPage() {
  const [activeTab, setActiveTab] = React.useState<TabKey>("posts");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedComments, setSelectedComments] = React.useState<string[]>([]);
  const [selectedReplies, setSelectedReplies] = React.useState<string[]>(['694112bd1da09']);

  const showContent = (tab: TabKey) => {
    setActiveTab(tab);
  };

  const openModalWithLoader = (postId: string, url: string, platform: string) => {
    setPostUrl(url);
    setIsModalOpen(true);
  };

  const closeCommentModal = () => {
    setIsModalOpen(false);
  };

  const saveComments = () => {
    // TODO: Implement save logic
    console.log("Saving comments...");
  };

  const [postUrl, setPostUrl] = React.useState("");

  const handleCommentClick = (commentId: string) => {
    setSelectedComments(prev =>
      prev.includes(commentId)
        ? prev.filter(id => id !== commentId)
        : [...prev, commentId]
    );
    console.log("Comment clicked:", commentId);
  };

  const handleReplyClick = (commentId: string, replyId: string) => {
    // TODO: Implement reply selection logic
    console.log("Reply clicked:", commentId, replyId);
  };

  const showPrivateReplyBox = (commentId: string) => {
    const box = document.getElementById(`custom-private-reply-box-${commentId}`) as HTMLElement;
    if (box) {
      box.style.display = box.style.display === 'none' ? 'block' : 'none';
    }
  };

  const savePrivateReply = (commentId: string, replyId: string, text: string) => {
    // TODO: Implement save private reply
    console.log("Save private reply:", commentId, replyId, text);
  };

  const saveActionReply = (commentId: string, replyId: string, action: string) => {
    // TODO: Implement save action reply
    console.log("Save action reply:", commentId, replyId, action);
  };

  const showReplyBox = (commentId: string) => {
    const box = document.getElementById(`custom-reply-box-${commentId}`) as HTMLElement;
    if (box) {
      box.style.display = box.style.display === 'none' ? 'block' : 'none';
    }
  };

  const saveCustomReply = (commentId: string, replyId: string, text: string) => {
    // TODO: Implement save custom reply
    console.log("Save custom reply:", commentId, replyId, text);
  };

  const togglePrivateReply = (commentId: string, replyId: string) => {
    // TODO: Implement toggle private reply
    console.log("Toggle private reply:", commentId, replyId);
  };

  return (
    <AdminLayout>
      <div className="page-content">
        <div className="ml-auto" style={{ paddingBottom: "20px" }}>
          <Link href="/ai-agent-settings" className="primary-link">
            ← Back
          </Link>
        </div>

        <div className="container">
          <div className="d-flex justify-content-between align-items-center" style={{ marginBottom: "20px" }}>
            <div className="">
              <h3 className="mb-3">Comment Selector</h3>
              <p>
                The Comment Selector allows you to view Facebook and Instagram posts and select comments. You can use the selected comments to train your AI to respond to comments.
              </p>
            </div>

            {/* Need Help Button */}
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => window.open("https://knowledge.smartreply.io/en/ai-agent/comment-training", "_blank")}
            >
              Need Help?
            </button>
          </div>

          {/* Tabs for Ads and Twitter Replies */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            {/* Tabs for Ads and Twitter Replies */}
            <div className="btn-group">
              <button
                onClick={() => showContent("posts")}
                className={`btn btn-sm ${activeTab === "posts" ? "btn-primary" : "btn-outline-primary"}`}
                id="tab-posts"
              >
                Facebook Posts
              </button>
              <button
                onClick={() => showContent("igposts")}
                className={`btn btn-sm ${activeTab === "igposts" ? "btn-primary" : "btn-outline-primary"}`}
                id="tab-ig-posts"
              >
                Instagram Posts
              </button>
            </div>
          </div>



          <div id="ig-posts-section" style={{ display: activeTab === "igposts" ? "block" : "none" }}>
            <div className="container-fluid position-relative" style={{ padding: "0 15px", margin: "0 auto", maxWidth: "1200px" }}>
              <div className="row flex-nowrap overflow-auto" id="igposts-skeleton-loader" style={{ whiteSpace: "nowrap", width: "100%", display: "flex" }}>
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="col-lg-2 col-md-4 col-sm-6 mb-3 card-container">
                    <div className="card skeleton" style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                      <div className="skeleton-loader-image skeleton-cell" style={{ width: "100%", height: "250px", marginBottom: "15px" }}></div>
                      <div className="card-body">
                        <div className="skeleton-loader-title skeleton-cell" style={{ width: "90%", height: "20px", marginBottom: "10px" }}></div>
                        <div className="skeleton-loader-text skeleton-cell" style={{ width: "80%", height: "15px", marginBottom: "5px" }}></div>
                        <div className="skeleton-loader-text skeleton-cell" style={{ width: "70%", height: "15px", marginBottom: "5px" }}></div>
                        <div className="skeleton-loader-text skeleton-cell" style={{ width: "60%", height: "15px" }}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>



          <div id="posts-section" style={{ display: activeTab === "posts" ? "block" : "none" }}>
            <div className="container-fluid position-relative" style={{ padding: "0 15px", margin: "0 auto", maxWidth: "1200px" }}>
              <div id="postsCarousel" className="carousel slide" data-bs-ride="false" data-bs-interval="false">
                <div className="carousel-indicators">
                  <button type="button" data-bs-target="#postsCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                </div>

                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <div className="d-flex justify-content-center gap-4">
                      <div
                        className="custom-card-container"
                        style={{
                          flex: "1 1 0%",
                          maxWidth: "calc(20%)",
                          padding: "15px",
                          borderRadius: "20px",
                          transition: "transform 0.3s, box-shadow 0.3s",
                          transform: "scale(1)"
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.transform = "scale(1.05)";
                          e.currentTarget.style.boxShadow = "0 4px 10px rgba(0, 123, 255, 0.3)";
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.transform = "scale(1)";
                          e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
                        }}
                      >
                        <div className="card">
                          <div
                            className="custom-card"
                            onClick={() => openModalWithLoader("645232738675563_122146508888890127", "https://facebook.com/645232738675563_122146508888890127", "Facebook")}
                            style={{ cursor: "pointer", borderRadius: "15px" }}
                            role="button"
                            tabIndex={0}
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                openModalWithLoader("645232738675563_122146508888890127", "https://facebook.com/645232738675563_122146508888890127", "Facebook");
                              }
                            }}
                          >
                            <img
                              src="https://scontent-iad3-1.xx.fbcdn.net/v/t39.30808-6/561824335_122146508780890127_269311364933202105_n.jpg?stp=dst-jpg_p720x720_tt6&_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGe61CsNROzMHuUovCHorhGgx2HUKFJ6keDHYdQoUnqR5BPbmD8AgGDZBJYR2RqVCxKTVwijAAkzEo4sY1UJA1V&_nc_ohc=MQEjHQclOHcQ7kNvwE6I5e4&_nc_oc=AdkGBcKVzzSYXabxwNZJt5q7ApTP0s5vjCGsz1SnK5mV3bhonqTxZBoYhgb0-z3W172FOJyhE4BBgOupNO0vKgpj&_nc_zt=23&_nc_ht=scontent-iad3-1.xx&edm=AKK4YLsEAAAA&_nc_gid=908jCbB11PileYU9jOdLfQ&_nc_tpa=Q5bMBQHV825vk-mpMztqOfGA9dG3djPVzjpNkaCV4FK_nb78lnXc7yjvrRSlb0IC0IB3aREvKnKTmTW0&oh=00_AfnUuFDpDjbLUiCglVfwzfMFWXTBKWbNGcnQT53_5gzJbw&oe=694C20E7"
                              alt="Post Image"
                              style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px", marginBottom: "10px" }}
                            />
                            <div style={{ padding: "10px 0" }}>
                              <h5 style={{ fontSize: "1rem", fontWeight: "bold", marginBottom: "5px" }}>Post</h5>
                              <p style={{ fontSize: "0.9rem", marginBottom: "5px", overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                                House of My Dream
                              </p>
                              <small style={{ fontSize: "0.85rem" }}>Comments: 2</small>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="custom-card-container"
                        style={{
                          flex: "1 1 0%",
                          maxWidth: "calc(20%)",
                          padding: "15px",
                          borderRadius: "20px",
                          transition: "transform 0.3s, box-shadow 0.3s",
                          transform: "scale(1)"
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.transform = "scale(1.05)";
                          e.currentTarget.style.boxShadow = "0 4px 10px rgba(0, 123, 255, 0.3)";
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.transform = "scale(1)";
                          e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
                        }}
                      >
                        <div className="card">
                          <div
                            className="custom-card"
                            onClick={() => openModalWithLoader("645232738675563_122105647052890127", "https://facebook.com/645232738675563_122105647052890127", "Facebook")}
                            style={{ cursor: "pointer", borderRadius: "15px" }}
                            role="button"
                            tabIndex={0}
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                openModalWithLoader("645232738675563_122105647052890127", "https://facebook.com/645232738675563_122105647052890127", "Facebook");
                              }
                            }}
                          >
                            <img
                              src="https://scontent-iad3-1.xx.fbcdn.net/v/t39.30808-6/502586578_2121943574989801_801439392086419003_n.jpg?stp=dst-jpg_s1080x2048_tt6&_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGB6r9xqokwK7wrrTPZGgqlYfzXYouZ6bBh_Ndii5npsHdgWSOTEzsLrEA6hl0HVG0IQSGu-i1A0Hq8ujz1Tqfm&_nc_ohc=NMC5lFO6xAcQ7kNvwFA4zyi&_nc_oc=AdnvbUpSN0r2Ol4ajPkLTn2_iz3eRRY67mCCzFAKD5hHaDLdnJBymzaT7DUWKEuRTmZ4fYTwEEfXrfj5xyVHWLCg&_nc_zt=23&_nc_ht=scontent-iad3-1.xx&edm=AKK4YLsEAAAA&_nc_gid=908jCbB11PileYU9jOdLfQ&_nc_tpa=Q5bMBQHZ63I7k4asuos4ns-bhWZC1s_98vBZX5yhsH5rEQE1iMR-bHRhjXrj3rdKgKA8y1YvCuXnRAIR&oh=00_AfkC9npp-tprMQP_-8v17c-k3hJbV0WTatCBSN2WntQ9OQ&oe=694C488E"
                              alt="Post Image"
                              style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px", marginBottom: "10px" }}
                            />
                            <div style={{ padding: "10px 0" }}>
                              <h5 style={{ fontSize: "1rem", fontWeight: "bold", marginBottom: "5px" }}>Post</h5>
                              <p style={{ fontSize: "0.9rem", marginBottom: "5px", overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}></p>
                              <small style={{ fontSize: "0.85rem" }}>Comments: 0</small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-space-between">
                  <button
                    id="scroll-left-posts"
                    className="scroll-btn btn btn-primary"
                    type="button"
                    data-bs-target="#postsCarousel"
                    data-bs-slide="prev"
                    style={{ position: "absolute", left: "-25px", top: "50%", transform: "translateY(-50%)", width: "50px", height: "50px", borderRadius: "50%" }}
                  >
                    ←
                  </button>
                  <button
                    id="scroll-right-posts"
                    className="scroll-btn btn btn-primary"
                    type="button"
                    data-bs-target="#postsCarousel"
                    data-bs-slide="next"
                    style={{ position: "absolute", right: "-25px", top: "50%", transform: "translateY(-50%)", width: "50px", height: "50px", borderRadius: "50%" }}
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
          </div>


        </div>

        {/* Modal structure for showing comments */}
        <div className={`modal fade ${isModalOpen ? "show" : ""}`} id="commentModal" tabIndex={-1} role="dialog" aria-labelledby="commentModalLabel" aria-hidden={!isModalOpen} style={{ display: isModalOpen ? "block" : "none" }}>
          <div className="modal-dialog modal-dialog-centered" role="document" style={{ minWidth: '1000px' }}>
            <div className="modal-content">
              <div className="modal-header" style={{ alignItems: "center", justifyContent: "space-between" }}>
                <div className="flex align-items-center" style={{ paddingLeft: "15px" }}>
                  <h3 className="modal-title" id="commentModalLabel">
                    Comments
                  </h3>
                  <p className="form-text">Click on comments and replies on the left side to train your agent.</p>
                  <small className="form-text text-muted">Click on the left to move to the right. Changes here don't effect the comments.</small>
                </div>
                <div style={{ alignItems: "end" }}>
                  <a href={postUrl} target="_blank" id="goToPostBtn" className="btn btn-outline-primary btn-sm">
                    Go to Post
                  </a>
                  <button type="button" className="close" id="closeModalBtn" aria-label="Close" onClick={closeCommentModal}>
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
              </div>

              <div className="modal-body">
                <div className="container-fluid px-0">
                  <div className="row g-0">
                    <div className="col-12 col-lg-6">
                      <h5 className="sticky-header">Comments from Post</h5>
                      <div id="comment-list" className="comment-list-container comment-list" data-has-next-page="false">
                        <div id="skeleton-loader" style={{ display: "none" }}>
                          {Array.from({ length: 5 }).map((_, index) => (
                            <div key={index} className="page-item mb-3 p-3 border rounded">
                              <div className="skeleton-loader-title skeleton-cell mb-2" style={{ width: "50%", height: "20px" }}></div>
                              <div className="skeleton-loader-text skeleton-cell" style={{ width: "30%", height: "15px" }}></div>
                            </div>
                          ))}
                        </div>
                        <div className={`comment-item mb-3 p-3 rounded ${selectedComments.includes('122146508888890127_2078759359617457') ? 'pinned-card is-selected' : ''}`} data-comment-id="122146508888890127_2078759359617457">
                          <div onClick={() => handleCommentClick('122146508888890127_2078759359617457')}>
                            <div className="d-flex align-items-start justify-content-between">
                              <div className="d-flex">
                                <img src="https://app.smartreply.io/storage/company_logo/3552_1760582765.png" alt="Wise man" className="rounded-circle mr-2" width="50" height="50" />
                                <div>
                                  <div className="d-flex align-items-center gap-2">
                                    <h5 className="mb-1">Wise man</h5>
                                  </div>
                                  <small className="text-muted">Wed, Dec 17, 2025 12:13 PM</small>
                                </div>
                              </div>
                              <div className="comment-checkbox ms-3" id="comment-checkbox-comment-122146508888890127_2078759359617457">
                                <span className={selectedComments.includes('122146508888890127_2078759359617457') ? 'checked-circle' : 'unchecked-circle'}>{selectedComments.includes('122146508888890127_2078759359617457') ? '✓' : ''}</span>
                              </div>
                            </div>
                            <p className="mt-2" style={{ maxWidth: "100%" }}>that's awesome</p>
                          </div>
                        </div>
                        <div className={`comment-item mb-3 p-3 rounded ${selectedComments.includes('122146508888890127_885430057309494') ? 'pinned-card is-selected' : ''}`} data-comment-id="122146508888890127_885430057309494">
                          <div onClick={() => handleCommentClick('122146508888890127_885430057309494')}>
                            <div className="d-flex align-items-start justify-content-between">
                              <div className="d-flex">
                                <img src="https://platform-lookaside.fbsbx.com/platform/profilepic/?eai=Aa1GxIdmtnWAToazYI9jsad_QNO_NiAcL-T9bcT9-VUPvWQmh4B1blmSzbb18zib-IBYVlmnG_sJ&amp;psid=24362880443305426&amp;height=50&amp;width=50&amp;ext=1768817199&amp;hash=AT-PD-isvY1-MvfCzuvhJx1B" alt="Awais Jutt" className="rounded-circle mr-2" width="50" height="50" />
                                <div>
                                  <div className="d-flex align-items-center gap-2">
                                    <h5 className="mb-1">Awais Jutt</h5>
                                  </div>
                                  <small className="text-muted">Tue, Dec 16, 2025 8:04 AM</small>
                                </div>
                              </div>
                              <div className="comment-checkbox ms-3" id="comment-checkbox-comment-122146508888890127_885430057309494">
                                <span className={selectedComments.includes('122146508888890127_885430057309494') ? 'checked-circle' : 'unchecked-circle'}>{selectedComments.includes('122146508888890127_885430057309494') ? '✓' : ''}</span>
                              </div>
                            </div>
                            <p className="mt-2" style={{ maxWidth: "100%" }}>thats beautifull</p>
                          </div>
                          <div className="nested-comments ms-4 mt-3">
                            <div className="reply-item mb-2 p-2 border-start" data-comment-id="122146508888890127_847883224511765" onClick={() => handleReplyClick('122146508888890127_885430057309494','122146508888890127_847883224511765')}>
                              <div className="d-flex align-items-start">
                                <img src="https://app.smartreply.io/storage/company_logo/3552_1760582765.png" alt="Wise man" className="rounded-circle mr-2" width="40" height="40" />
                                <div className="flex-grow-1">
                                  <div className="d-flex align-items-center gap-2">
                                    <h6 className="mb-1">Wise man</h6>
                                  </div>
                                  <small className="text-muted">Tue, Dec 16, 2025 8:05 AM</small>
                                </div>
                                <div className="comment-checkbox ms-auto" id="comment-checkbox-reply-122146508888890127_847883224511765">
                                  <span className="unchecked-circle"></span>
                                </div>
                              </div>
                              <p className="mt-1" style={{ maxWidth: "100%" }}>Awais Jutt Thanks so much!</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-lg-6">
                      <h5 className="sticky-header">Selected Replies for AI Training</h5>
                      <div className="selected-comments-container">
                        {selectedComments.includes('122146508888890127_2078759359617457') && <div className="comment-item mb-3 p-3 rounded pinned-card is-selected" data-comment-id="122146508888890127_2078759359617457">
                          <div className="d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center" role="button" onClick={() => handleCommentClick('122146508888890127_2078759359617457')}>
                              <img src="https://app.smartreply.io/storage/company_logo/3552_1760582765.png" alt="Wise man" className="rounded-circle me-2" width="50" height="50" />
                              <div>
                                <h5 className="mb-1">Wise man</h5>
                                <small className="text-muted">Wed, Dec 17, 2025 12:13 PM</small>
                              </div>
                            </div>
                            <div className="comment-checkbox" id="comment-checkbox-comment-122146508888890127_2078759359617457">
                              <span className="checked-circle">✓</span>
                            </div>
                          </div>
                          <p className="mt-2">that's awesome</p>
                          <div className="mt-3 d-flex align-items-center">
                            <p className="text-muted mb-0 mr-2">Actions:</p>
                            <button className="icon-button mr-[10px]" title="Like" onClick={(e) => { e.stopPropagation(); saveActionReply('122146508888890127_2078759359617457', '122146508888890127_2078759359617457', 'like'); }}>
                              <i className="bi bi-heart-fill text-danger"></i>
                            </button>
                            <button className="icon-button mr-4" title="Hide" onClick={(e) => { e.stopPropagation(); saveActionReply('122146508888890127_2078759359617457', '122146508888890127_2078759359617457', 'remove'); }}>
                              <i className="bi bi-x text-secondary"></i>
                            </button>
                            <button className="icon-button" title="Don't reply" onClick={(e) => { e.stopPropagation(); saveActionReply('122146508888890127_2078759359617457', '122146508888890127_2078759359617457', 'stop'); }}>
                              <i className="bi bi-slash-circle text-danger"></i>
                            </button>
                          </div>
                          <div className="mt-3">
                            <button type="button" className="btn btn-outline-primary btn-sm" id="custom-reply-btn-122146508888890127_2078759359617457" onClick={(e) => { e.stopPropagation(); showReplyBox('122146508888890127_2078759359617457'); }}>
                              Add Custom Reply
                            </button>
                            <div id="custom-reply-box-122146508888890127_2078759359617457" className="mt-2" style={{ display: "none" }} onClick={(e) => e.stopPropagation()}>
                              <input type="text" id="custom-reply-input-122146508888890127_2078759359617457" className="form-control mb-2" placeholder="Type a custom reply…" onFocus={(e) => e.stopPropagation()} />
                              <button type="button" className="btn btn-primary btn-sm" onClick={(e) => { e.stopPropagation(); saveCustomReply('122146508888890127_2078759359617457', '122146508888890127_2078759359617457', (document.getElementById('custom-reply-input-122146508888890127_2078759359617457') as HTMLInputElement).value); }}>
                                Save
                              </button>
                            </div>
                          </div>
                          <div className="mt-3">
                            <button type="button" className="btn btn-outline-secondary btn-sm" id="custom-private-reply-btn-122146508888890127_2078759359617457" onClick={(e) => { e.stopPropagation(); showPrivateReplyBox('122146508888890127_2078759359617457'); }}>
                              Add Custom <strong>Private</strong> Reply
                            </button>
                            <div id="custom-private-reply-box-122146508888890127_2078759359617457" className="mt-2" style={{ display: "none" }} onClick={(e) => e.stopPropagation()}>
                              <input type="text" id="custom-private-reply-input-122146508888890127_2078759359617457" className="form-control mb-2" placeholder="Type a custom private reply…" onFocus={(e) => e.stopPropagation()} />
                              <button type="button" className="btn btn-secondary btn-sm" onClick={(e) => { e.stopPropagation(); savePrivateReply('122146508888890127_2078759359617457', '122146508888890127_2078759359617457', (document.getElementById('custom-private-reply-input-122146508888890127_2078759359617457') as HTMLInputElement).value); }}>
                                Save
                              </button>
                            </div>
                          </div>
                        </div>}
                        {selectedComments.includes('122146508888890127_885430057309494') && <div className="comment-item mb-3 p-3 rounded pinned-card is-selected" data-comment-id="122146508888890127_885430057309494">
                          <div className="d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center" role="button" onClick={() => handleCommentClick('122146508888890127_885430057309494')}>
                              <img src="https://platform-lookaside.fbsbx.com/platform/profilepic/?eai=Aa2XedUv86wNAa_METJQMSFwbxb0Ab0LZQVZN0IPwOjnFR_Ja_ipTqc0CO8Ltr_iDxIWof2dUG8r&amp;psid=24362880443305426&amp;height=50&amp;width=50&amp;ext=1768813518&amp;hash=AT-yvH7nymK-TRxPC0QvDALX" alt="Awais Jutt" className="rounded-circle me-2" width="50" height="50" />
                              <div>
                                <h5 className="mb-1">Awais Jutt</h5>
                                <small className="text-muted">Tue, Dec 16, 2025 8:04 AM</small>
                              </div>
                            </div>
                            <div className="comment-checkbox" id="comment-checkbox-comment-122146508888890127_885430057309494">
                              <span className="checked-circle">✓</span>
                            </div>
                          </div>
                          <p className="mt-2">thats beautifull</p>
                          <div className="private-reply-item mt-2 p-2" onClick={() => togglePrivateReply('122146508888890127_885430057309494','694112b5a7ebd')}>
                            <div className="d-flex align-items-center mb-1">
                              <i className="bi bi-send text-primary me-1"></i>
                              <small className="text-primary fw-bold">Private reply</small>
                            </div>
                            <div className="d-flex align-items-start">
                              <img src="https://app.smartreply.io/storage/company_logo/3552_1760582765.png" className="rounded-circle me-2" width="28" height="28" alt="Mindrind" />
                              <div>
                                <h6 className="mb-1">Mindrind</h6>
                                <p className="mb-1">we think alike</p>
                                <small className="text-muted">Tue, Dec 16, 2025 8:05 AM</small>
                              </div>
                            </div>
                          </div>
                          <div className="nested-comments ms-4 mt-3">
                            <div className="reply-item mb-2 p-2 border-start" data-comment-id="694112bd1da09" onClick={() => handleReplyClick('122146508888890127_885430057309494','694112bd1da09')}>
                              <div className="d-flex align-items-center">
                                <img src="https://app.smartreply.io/storage/company_logo/3552_1760582765.png" alt="Mindrind" className="rounded-circle me-2" width="40" height="40" />
                                <div>
                                  <h6 className="mb-1">Mindrind</h6>
                                  <small className="text-muted">Tue, Dec 16, 2025 8:05 AM</small>
                                </div>
                                <div className="comment-checkbox ms-auto" id="comment-checkbox-reply-694112bd1da09">
                                  <span className="checked-circle">✓</span>
                                </div>
                              </div>
                              <div className="d-flex align-items-center mt-2">
                                <p className="text-muted mb-0 mr-2">Action:</p>
                                <i className="bi bi-heart-fill text-danger mr-2"></i>
                                <p className="text-muted mb-0">Like the message</p>
                              </div>
                            </div>
                          </div>
                        </div>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" id="closeModalBtn2" onClick={closeCommentModal}>
                  Close
                </button>
                <button type="submit" onClick={saveComments} className="btn btn-primary">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
