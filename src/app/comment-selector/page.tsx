"use client";

import * as React from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { motion, AnimatePresence } from "framer-motion";

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
        <AnimatePresence>
          {isModalOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeCommentModal}
                className="fixed inset-0 z-[1050] bg-black/40 backdrop-blur-[2px]"
              />

              {/* Modal Content */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="fixed inset-0 z-[1060] flex items-center justify-center p-4 pointer-events-none"
              >
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col pointer-events-auto overflow-hidden">
                  {/* Enhanced Modal Header */}
                  <div className="flex shrink-0 items-center justify-between border-b border-zinc-100 bg-zinc-50/50 px-8 py-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                          <i className="bi bi-chat-dots-fill text-xl"></i>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-zinc-900 leading-tight">Post Comments</h3>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[13px] text-zinc-500">Train your AI agent by selecting relevant interactions below.</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <a
                        href={postUrl}
                        target="_blank"
                        className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-indigo-600 bg-white border border-indigo-100 rounded-full shadow-sm hover:bg-indigo-50 hover:border-indigo-200 transition-all no-underline"
                      >
                        <i className="bi bi-box-arrow-up-right"></i>
                        View Original Post
                      </a>
                      <button
                        onClick={closeCommentModal}
                        className="group flex h-10 w-10 items-center justify-center !rounded-lg !hover:rounded-lg text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 transition-all"
                      >
                        <i className="bi bi-x-lg text-lg group-hover:rotate-90 transition-transform duration-300"></i>
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 overflow-hidden flex">
                    {/* Left Panel: Post Comments */}
                    <div className="flex-1 overflow-y-auto border-r border-zinc-100 p-4 custom-scrollbar">
                      <div className="flex items-center justify-between mb-6">
                        <h5 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Available Comments</h5>
                        <div className="px-2 py-0.5 rounded-full bg-indigo-50 text-[11px] font-bold text-indigo-600 uppercase">Interactive List</div>
                      </div>

                      <div id="comment-list" className="space-y-4">
                        <div className={`group relative p-3 rounded-2xl border transition-all cursor-pointer ${selectedComments.includes('122146508888890127_2078759359617457') ? 'border-indigo-200 bg-indigo-50/30' : 'border-zinc-100 bg-white hover:border-indigo-100 hover:shadow-md'}`}
                          onClick={() => handleCommentClick('122146508888890127_2078759359617457')}>
                          <div className="flex items-start justify-between">
                            <div className="flex gap-4">
                              <div className="relative">
                                <img src="https://app.smartreply.io/storage/company_logo/3552_1760582765.png" alt="Wise man" className="h-12 w-12 rounded-full border-2 border-white shadow-sm object-cover" />
                                <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-white flex items-center justify-center border border-zinc-100 shadow-sm">
                                  <i className="bi bi-facebook text-blue-600 text-[10px]"></i>
                                </div>
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h6 className="text-[15px] font-bold text-zinc-900 m-0">Wise man</h6>
                                  {selectedComments.includes('122146508888890127_2078759359617457') && (
                                    <span className="text-[10px] bg-indigo-600 text-white px-1.5 py-0.5 rounded-full">Pinned</span>
                                  )}
                                </div>
                                <span className="text-[11px] text-zinc-500 block mt-0.5">Wed, Dec 17, 2025 • 12:13 PM</span>
                              </div>
                            </div>
                            <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all ${selectedComments.includes('122146508888890127_2078759359617457') ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-zinc-200 group-hover:border-indigo-300'}`}>
                              {selectedComments.includes('122146508888890127_2078759359617457') && <i className="bi bi-check-lg text-xs"></i>}
                            </div>
                          </div>
                          <p className="mt-4 text-[14px] leading-relaxed text-zinc-700">that's awesome</p>
                        </div>

                        <div className={`group relative p-3 rounded-2xl border transition-all cursor-pointer ${selectedComments.includes('122146508888890127_885430057309494') ? 'border-indigo-200 bg-indigo-50/30' : 'border-zinc-100 bg-white hover:border-indigo-100 hover:shadow-md'}`}
                          onClick={() => handleCommentClick('122146508888890127_885430057309494')}>
                          <div className="flex items-start justify-between">
                            <div className="flex gap-4">
                              <div className="relative">
                                <img src="https://platform-lookaside.fbsbx.com/platform/profilepic/?eai=Aa1GxIdmtnWAToazYI9jsad_QNO_NiAcL-T9bcT9-VUPvWQmh4B1blmSzbb18zib-IBYVlmnG_sJ&psid=24362880443305426&height=50&width=50&ext=1768817199&hash=AT-PD-isvY1-MvfCzuvhJx1B" alt="Awais Jutt" className="h-12 w-12 rounded-full border-2 border-white shadow-sm object-cover" />
                                <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-white flex items-center justify-center border border-zinc-100 shadow-sm">
                                  <i className="bi bi-facebook text-blue-600 text-[10px]"></i>
                                </div>
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h6 className="text-[15px] font-bold text-zinc-900 m-0">Awais Jutt</h6>
                                </div>
                                <span className="text-[11px] text-zinc-500 block mt-0.5">Tue, Dec 16, 2025 • 8:04 AM</span>
                              </div>
                            </div>
                            <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all ${selectedComments.includes('122146508888890127_885430057309494') ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-zinc-200 group-hover:border-indigo-300'}`}>
                              {selectedComments.includes('122146508888890127_885430057309494') && <i className="bi bi-check-lg text-xs"></i>}
                            </div>
                          </div>
                          <p className="mt-4 text-[14px] leading-relaxed text-zinc-700">thats beautifull</p>

                          {/* Nested Replies */}
                          <div className="mt-6 pl-4 space-y-3 border-l-2 border-zinc-100">
                            <div className="relative p-3 rounded-xl bg-zinc-50 border border-zinc-100 flex items-start gap-3">
                              <img src="https://app.smartreply.io/storage/company_logo/3552_1760582765.png" alt="Wise man" className="h-8 w-8 rounded-full border border-white object-cover" />
                              <div className="flex-1">
                                <h6 className="text-[13px] font-bold text-zinc-800 m-0">Wise man</h6>
                                <p className="text-[12px] text-zinc-600 mt-1 mb-0">Awais Jutt Thanks so much!</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Panel: Selected for Training */}
                    <div className="flex-1 overflow-y-auto bg-zinc-50/30 p-4 custom-scrollbar">
                      <div className="flex items-center justify-between mb-6">
                        <h5 className="text-xs font-bold uppercase tracking-wider text-zinc-400">AI Training Selection</h5>
                        <div className="px-2 py-0.5 rounded-full bg-emerald-50 text-[11px] font-bold text-emerald-600 uppercase">Training Ready</div>
                      </div>

                      <div className="space-y-6">
                        <AnimatePresence>
                          {selectedComments.map(id => {
                            const isWiseMan = id.includes('2078759359617457');
                            const name = isWiseMan ? "Wise man" : "Awais Jutt";
                            const avatar = isWiseMan ? "https://app.smartreply.io/storage/company_logo/3552_1760582765.png" : "https://platform-lookaside.fbsbx.com/platform/profilepic/?eai=Aa1GxIdmtnWAToazYI9jsad_QNO_NiAcL-T9bcT9-VUPvWQmh4B1blmSzbb18zib-IBYVlmnG_sJ&psid=24362880443305426&height=50&width=50&ext=1768817199&hash=AT-PD-isvY1-MvfCzuvhJx1B";
                            const time = isWiseMan ? "Wed, Dec 17, 2025 • 12:13 PM" : "Tue, Dec 16, 2025 • 8:04 AM";
                            const text = isWiseMan ? "that's awesome" : "thats beautifull";

                            return (
                              <motion.div
                                key={id}
                                layout
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-100"
                              >
                                <div className="flex items-center justify-between mb-4">
                                  <div className="flex items-center gap-3">
                                    <img src={avatar} className="h-10 w-10 rounded-full border border-zinc-50 object-cover" alt={name} />
                                    <div>
                                      <h6 className="text-sm font-bold text-zinc-900 m-0">{name}</h6>
                                      <span className="text-[11px] text-zinc-400">{time}</span>
                                    </div>
                                  </div>
                                  <button
                                    onClick={(e) => { e.stopPropagation(); handleCommentClick(id); }}
                                    className="h-8 w-8 rounded-full bg-zinc-50 text-zinc-400 hover:bg-red-50 hover:text-red-500 transition-colors flex items-center justify-center"
                                  >
                                    <i className="bi bi-trash text-[13px]"></i>
                                  </button>
                                </div>
                                <p className="text-[14px] text-zinc-800 bg-zinc-50/50 p-3 rounded-xl border border-dashed border-zinc-200 font-medium">{text}</p>

                                <div className="mt-3 pt-3 border-t border-zinc-100">
                                  <div className="flex items-center gap-4 mb-3">
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Define AI Response:</span>
                                    <div className="flex gap-2">
                                      <button onClick={() => saveActionReply(id, id, 'like')} className="flex items-center gap-2 px-3 py-1.5 !rounded-lg border border-zinc-100 bg-white text-zinc-600 hover:border-red-200 hover:bg-red-50 hover:text-red-500 transition-all text-xs font-semibold">
                                        <i className="bi bi-heart-fill"></i> Like
                                      </button>
                                      <button onClick={() => saveActionReply(id, id, 'remove')} className="flex items-center gap-2 px-3 py-1.5 !rounded-lg border border-zinc-100 bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-100 transition-all text-xs font-semibold">
                                        <i className="bi bi-eye-slash"></i> Hide
                                      </button>
                                      <button onClick={() => saveActionReply(id, id, 'stop')} className="flex items-center gap-2 px-3 py-1.5 !rounded-lg border border-zinc-100 bg-white text-zinc-600 hover:border-red-200 hover:bg-red-50 hover:text-red-500 transition-all text-xs font-semibold text-nowrap">
                                        <i className="bi bi-slash-circle"></i> Don't Reply
                                      </button>
                                    </div>
                                  </div>

                                  <div className="space-y-4">
                                    <div className="space-y-2">
                                      <label className="text-[12px] font-bold text-zinc-700">Custom AI Reply:</label>
                                      <div className="flex gap-2">
                                        <input
                                          id={`custom-reply-input-${id}`}
                                          className="flex-1 bg-white border border-zinc-200 rounded-xl px-4 py-2 text-sm focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 outline-none transition-all"
                                          placeholder="How should the AI respond?"
                                        />
                                        <button
                                          onClick={() => saveCustomReply(id, id, (document.getElementById(`custom-reply-input-${id}`) as HTMLInputElement).value)}
                                          className="px-4 py-2 bg-indigo-600 text-white !rounded-lg text-xs font-bold hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100"
                                        >
                                          Save
                                        </button>
                                      </div>
                                    </div>

                                    <div className="space-y-2">
                                      <label className="text-[12px] font-bold text-zinc-700">Private AI Reply:</label>
                                      <div className="flex gap-2">
                                        <input
                                          id={`custom-private-reply-input-${id}`}
                                          className="flex-1 bg-white border border-zinc-200 rounded-xl px-4 py-2 text-sm focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 outline-none transition-all"
                                          placeholder="Direct message response..."
                                        />
                                        <button
                                          onClick={() => savePrivateReply(id, id, (document.getElementById(`custom-private-reply-input-${id}`) as HTMLInputElement).value)}
                                          className="px-4 py-2 bg-zinc-800 text-white !rounded-lg text-xs font-bold hover:bg-black transition-all shadow-md shadow-zinc-200"
                                        >
                                          Save
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            );
                          })}
                        </AnimatePresence>

                        {selectedComments.length === 0 && (
                          <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="h-16 w-16 rounded-full bg-zinc-50 flex items-center justify-center text-zinc-300 mb-4 border-2 border-dashed border-zinc-200">
                              <i className="bi bi-plus-lg text-2xl"></i>
                            </div>
                            <h6 className="text-zinc-600 font-bold m-0">No context selected</h6>
                            <p className="text-xs text-zinc-400 mt-1">Select comments on the left to start training.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Modal Footer */}
                  <div className="shrink-0 px-8 py-3 bg-white border-t border-zinc-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-indigo-600 animate-pulse"></span>
                      <span className="text-[12px] font-bold text-indigo-600 uppercase tracking-wider">Sync Active</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={closeCommentModal}
                        className="px-8 py-2.5 rounded-lg text-sm font-bold text-zinc-500 hover:bg-zinc-50 hover:rounded-lg transition-all"
                      >
                        Discard Changes
                      </button>
                      <button
                        onClick={saveComments}
                        className="px-10 py-2.5 bg-indigo-600 text-white !rounded-lg text-sm font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-indigo-300 transform active:scale-95 transition-all"
                      >
                        Publish Training
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </AdminLayout>
  );
}
