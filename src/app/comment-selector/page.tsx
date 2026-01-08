"use client";

import * as React from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { motion, AnimatePresence } from "framer-motion";
import { api, AgentSummary, PostSummary, CommentSummary } from "@/services/api";

type TabKey = "posts" | "igposts";

export default function CommentSelectorPage() {
  const [activeTab, setActiveTab] = React.useState<TabKey>("posts");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedComments, setSelectedComments] = React.useState<string[]>([]);
  const [selectedReplies, setSelectedReplies] = React.useState<string[]>([]);

  // API State
  const [agents, setAgents] = React.useState<AgentSummary[]>([]);
  const [selectedAgentId, setSelectedAgentId] = React.useState<string | null>(null);
  const [posts, setPosts] = React.useState<PostSummary[]>([]);
  const [currentPostComments, setCurrentPostComments] = React.useState<CommentSummary[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [postUrl, setPostUrl] = React.useState("");

  React.useEffect(() => {
    loadAgents();
  }, []);

  const loadAgents = async () => {
    try {
      const list = await api.agents.list();
      setAgents(list);
      if (list.length > 0) {
        setSelectedAgentId(list[0].page_id);
        loadPosts(list[0].page_id);
      }
    } catch (err) {
      console.error("Failed to load agents", err);
    }
  };

  const loadPosts = async (pageId: string) => {
    setLoading(true);
    try {
      const data = await api.agents.getPosts(pageId);
      setPosts(data);
    } catch (err) {
      console.error("Failed to load posts", err);
    } finally {
      setLoading(false);
    }
  };

  const loadComments = async (postId: string) => {
    if (!selectedAgentId) return;
    try {
      // Assuming API might need agentId + postId
      const comments = await api.agents.getPostComments(selectedAgentId, postId);
      setCurrentPostComments(comments);
    } catch (err) {
      console.error("Failed to load comments", err);
    }
  };

  const showContent = (tab: TabKey) => {
    setActiveTab(tab);
  };

  const openModalWithLoader = async (postId: string, url: string, platform: string) => {
    setPostUrl(url || "#");
    setIsModalOpen(true);
    await loadComments(postId);
  };

  const closeCommentModal = () => {
    setIsModalOpen(false);
    setSelectedComments([]);
    setCurrentPostComments([]); // Clear on close to avoid stale data
  };

  const saveComments = async () => {
    if (!selectedAgentId) return;
    setLoading(true);
    try {
      // Save selected comments as training examples
      for (const commentId of selectedComments) {
        const comment = currentPostComments.find(c => c.id === commentId);
        if (comment) {
          await api.agents.addTrainingExample(selectedAgentId, {
            comment_id: comment.id,
            comment_text: comment.message,
            agent_reaction: "like", // Default or derived from UI
            // agent_comment_reply: ... (if custom reply set)
          });
        }
      }

      // TODO: Handle custom replies and private replies mapping from UI state to API
      // For now, basic saving of selected comments

      alert("Training examples saved!");
      closeCommentModal();
    } catch (err) {
      console.error("Failed to save training data", err);
      alert("Failed to save training data");
    } finally {
      setLoading(false);
    }
  };

  const handleCommentClick = (commentId: string) => {
    setSelectedComments(prev =>
      prev.includes(commentId)
        ? prev.filter(id => id !== commentId)
        : [...prev, commentId]
    );
    console.log("Comment clicked:", commentId);
  };

  const handleReplyClick = (commentId: string, replyId: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation(); // Prevent triggering parent comment click
    }
    setSelectedReplies(prev =>
      prev.includes(replyId)
        ? prev.filter(id => id !== replyId)
        : [...prev, replyId]
    );
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
                className={`btn btn-sm !rounded-xl transition-all mr-[10px] ${activeTab === "posts" ? "btn-primary shadow-md shadow-indigo-100" : "btn-outline-primary hover:bg-indigo-50"}`}
                id="tab-posts"
              >
                Facebook Posts
              </button>
              &nbsp;
              <button
                onClick={() => showContent("igposts")}
                className={`btn btn-sm !rounded-xl transition-all ml-[10px] ${activeTab === "igposts" ? "btn-primary shadow-md shadow-indigo-100" : "btn-outline-primary hover:bg-indigo-50"}`}
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
                    <div className="d-flex justify-content-center gap-4 flex-wrap">
                      {posts.length === 0 ? (
                        <div className="text-center p-5 text-muted">No posts found for this agent.</div>
                      ) : (
                        posts.map(post => (
                          <div
                            key={post.id}
                            className="custom-card-container"
                            style={{
                              flex: "0 0 auto",
                              width: "300px",
                              padding: "15px",
                              borderRadius: "16px",
                              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                              transform: "scale(1)"
                            }}
                            onMouseOver={(e) => {
                              e.currentTarget.style.transform = "scale(1.03) translateY(-2px)";
                              e.currentTarget.style.boxShadow = "0 8px 16px rgba(79, 70, 229, 0.2)";
                            }}
                            onMouseOut={(e) => {
                              e.currentTarget.style.transform = "scale(1)";
                              e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
                            }}
                          >
                            <div className="card h-100">
                              <div
                                className="custom-card h-100 d-flex flex-column"
                                onClick={() => openModalWithLoader(post.id, post.permalink_url || "", "Facebook")}
                                style={{ cursor: "pointer", borderRadius: "12px" }}
                                role="button"
                                tabIndex={0}
                              >
                                {post.full_picture ? (
                                  <img
                                    src={post.full_picture}
                                    alt="Post Image"
                                    style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "10px", marginBottom: "10px" }}
                                  />
                                ) : (
                                  <div style={{ width: "100%", height: "200px", backgroundColor: "#f0f0f0", borderRadius: "10px", marginBottom: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <span className="text-muted">No Image</span>
                                  </div>
                                )}
                                <div style={{ padding: "10px 0" }} className="flex-grow-1">
                                  <h5 style={{ fontSize: "1rem", fontWeight: "bold", marginBottom: "5px" }}>Post</h5>
                                  <p style={{ fontSize: "0.9rem", marginBottom: "5px", overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }}>
                                    {post.message || "No content"}
                                  </p>
                                  <small style={{ fontSize: "0.85rem" }} className="text-muted">
                                    {new Date(post.created_time).toLocaleDateString()}
                                  </small>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
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
                    style={{ position: "absolute", left: "-25px", top: "50%", transform: "translateY(-50%)", width: "50px", height: "50px", borderRadius: "50%", boxShadow: "0 4px 6px rgba(79, 70, 229, 0.2)" }}
                  >
                    ←
                  </button>
                  <button
                    id="scroll-right-posts"
                    className="scroll-btn btn btn-primary"
                    type="button"
                    data-bs-target="#postsCarousel"
                    data-bs-slide="next"
                    style={{ position: "absolute", right: "-25px", top: "50%", transform: "translateY(-50%)", width: "50px", height: "50px", borderRadius: "50%", boxShadow: "0 4px 6px rgba(79, 70, 229, 0.2)" }}
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
                        <div className="h-10 w-10 !rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200">
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
                        className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-indigo-600 bg-white border border-indigo-100 rounded-full shadow-sm hover:bg-indigo-50 hover:border-indigo-200 transition-all !no-underline"
                      >
                        <i className="bi bi-box-arrow-up-right"></i>
                        View Original Post
                      </a>
                      <button
                        onClick={closeCommentModal}
                        className="group flex h-10 w-10 items-center justify-center !rounded-xl !hover:!rounded-xl text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 transition-all"
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
                        {currentPostComments.length === 0 ? (
                          <p className="text-muted text-center py-4">No comments found.</p>
                        ) : (
                          currentPostComments.map(comment => {
                            // Mock name/avatar logic if missing from API, assuming API gives basic comment structure
                            const name = comment.from?.name || "User";
                            const avatar = "https://app.smartreply.io/assets/images/placeholder.jpg";
                            const time = new Date(comment.created_time).toLocaleString();

                            return (
                              <div key={comment.id} className={`group relative p-3 rounded-2xl border transition-all cursor-pointer ${selectedComments.includes(comment.id) ? 'border-indigo-200 bg-indigo-50/30' : 'border-zinc-100 bg-white hover:border-indigo-100 hover:shadow-md'}`}
                                onClick={() => handleCommentClick(comment.id)}>
                                <div className="flex items-start justify-between">
                                  <div className="flex gap-4">
                                    <div className="relative">
                                      <img src={avatar} alt={name} className="h-12 w-12 rounded-full border-2 border-white shadow-sm object-cover" />
                                      <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-white flex items-center justify-center border border-zinc-100 shadow-sm">
                                        <i className="bi bi-facebook text-blue-600 text-[10px]"></i>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="flex items-center gap-2">
                                        <h6 className="text-[15px] font-bold text-zinc-900 m-0">{name}</h6>
                                        {selectedComments.includes(comment.id) && (
                                          <span className="text-[10px] bg-indigo-600 text-white px-1.5 py-0.5 rounded-full">Pinned</span>
                                        )}
                                      </div>
                                      <span className="text-[11px] text-zinc-500 block mt-0.5">{time}</span>
                                    </div>
                                  </div>
                                  <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all ${selectedComments.includes(comment.id) ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-zinc-200 group-hover:border-indigo-300'}`}>
                                    {selectedComments.includes(comment.id) && <i className="bi bi-check-lg text-xs"></i>}
                                  </div>
                                </div>
                                <p className="mt-4 text-[14px] leading-relaxed text-zinc-700">{comment.message}</p>
                              </div>
                            );
                          })
                        )}
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
                          {/* Selected Comments */}
                          {/* Selected Comments */}
                          {selectedComments.map(id => {
                            // Find comment in currentPostComments
                            // Note: In real app, selectedComments might include comments from other posts if we persisted them.
                            // For this UI, we might only be able to show details if they are in current set, 
                            // or we need a global store. Simplification: scan current.
                            const comment = currentPostComments.find(c => c.id === id);
                            if (!comment) return null; // Or show dummy

                            const name = comment.from?.name || "User";
                            const avatar = "https://app.smartreply.io/assets/images/placeholder.jpg";
                            const time = new Date(comment.created_time).toLocaleString();
                            const text = comment.message;

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
                                <p className="text-[14px] text-zinc-800 bg-zinc-50/50 p-3 !rounded-xl border border-dashed border-zinc-200 font-medium">{text}</p>

                                <div className="mt-3 pt-3 border-t border-zinc-100">
                                  <div className="flex items-center gap-4 mb-3">
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Define AI Response:</span>
                                    <div className="flex gap-2">
                                      <button onClick={() => saveActionReply(id, id, 'like')} className="flex items-center gap-2 px-3 py-1.5 !rounded-xl border border-zinc-100 bg-white text-zinc-600 hover:border-red-200 hover:bg-red-50 hover:text-red-500 transition-all text-xs font-semibold">
                                        <i className="bi bi-heart-fill"></i> Like
                                      </button>
                                      <button onClick={() => saveActionReply(id, id, 'remove')} className="flex items-center gap-2 px-3 py-1.5 !rounded-xl border border-zinc-100 bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-100 transition-all text-xs font-semibold">
                                        <i className="bi bi-eye-slash"></i> Hide
                                      </button>
                                      <button onClick={() => saveActionReply(id, id, 'stop')} className="flex items-center gap-2 px-3 py-1.5 !rounded-xl border border-zinc-100 bg-white text-zinc-600 hover:border-red-200 hover:bg-red-50 hover:text-red-500 transition-all text-xs font-semibold text-nowrap">
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
                                          className="flex-1 bg-white border border-zinc-200 !rounded-xl px-4 py-2 text-sm focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 outline-none transition-all"
                                          placeholder="How should the AI respond?"
                                        />
                                        <button
                                          onClick={() => saveCustomReply(id, id, (document.getElementById(`custom-reply-input-${id}`) as HTMLInputElement).value)}
                                          className="px-4 py-2 bg-indigo-600 text-white !rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100"
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
                                          className="flex-1 bg-white border border-zinc-200 !rounded-xl px-4 py-2 text-sm focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 outline-none transition-all"
                                          placeholder="Direct message response..."
                                        />
                                        <button
                                          onClick={() => savePrivateReply(id, id, (document.getElementById(`custom-private-reply-input-${id}`) as HTMLInputElement).value)}
                                          className="px-4 py-2 bg-zinc-800 text-white !rounded-xl text-xs font-bold hover:bg-black transition-all shadow-md shadow-zinc-200"
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

                          {/* Selected Replies */}
                          {selectedReplies.map(replyId => {
                            // Extract comment ID from reply ID (format: reply_commentId_replyId)
                            const parts = replyId.split('_');
                            const commentId = parts.slice(1, -1).join('_');
                            const isReplyFromWiseMan = replyId.includes('885430057309494');
                            const name = isReplyFromWiseMan ? "Wise man" : "Awais Jutt";
                            const avatar = isReplyFromWiseMan ? "https://app.smartreply.io/storage/company_logo/3552_1760582765.png" : "https://platform-lookaside.fbsbx.com/platform/profilepic/?eai=Aa1GxIdmtnWAToazYI9jsad_QNO_NiAcL-T9bcT9-VUPvWQmh4B1blmSzbb18zib-IBYVlmnG_sJ&psid=24362880443305426&height=50&width=50&ext=1768817199&hash=AT-PD-isvY1-MvfCzuvhJx1B";
                            const time = isReplyFromWiseMan ? "Tue, Dec 16, 2025 • 8:05 AM" : "Tue, Dec 16, 2025 • 8:05 AM";
                            const text = isReplyFromWiseMan ? "Awais Jutt Thanks so much!" : "Thanks for your feedback!";

                            return (
                              <motion.div
                                key={replyId}
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
                                      <div className="flex items-center gap-2">
                                        <h6 className="text-sm font-bold text-zinc-900 m-0">{name}</h6>
                                        <span className="text-[10px] bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full font-semibold">Reply</span>
                                      </div>
                                      <span className="text-[11px] text-zinc-400">{time}</span>
                                    </div>
                                  </div>
                                  <button
                                    onClick={(e) => { e.stopPropagation(); handleReplyClick(commentId, replyId, e); }}
                                    className="h-8 w-8 rounded-full bg-zinc-50 text-zinc-400 hover:bg-red-50 hover:text-red-500 transition-colors flex items-center justify-center"
                                  >
                                    <i className="bi bi-trash text-[13px]"></i>
                                  </button>
                                </div>
                                <p className="text-[14px] text-zinc-800 bg-zinc-50/50 p-3 !rounded-xl border border-dashed border-zinc-200 font-medium">{text}</p>

                                <div className="mt-3 pt-3 border-t border-zinc-100">
                                  <div className="flex items-center gap-4 mb-3">
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Define AI Response:</span>
                                    <div className="flex gap-2">
                                      <button onClick={() => saveActionReply(commentId, replyId, 'like')} className="flex items-center gap-2 px-3 py-1.5 !rounded-xl border border-zinc-100 bg-white text-zinc-600 hover:border-red-200 hover:bg-red-50 hover:text-red-500 transition-all text-xs font-semibold">
                                        <i className="bi bi-heart-fill"></i> Like
                                      </button>
                                      <button onClick={() => saveActionReply(commentId, replyId, 'remove')} className="flex items-center gap-2 px-3 py-1.5 !rounded-xl border border-zinc-100 bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-100 transition-all text-xs font-semibold">
                                        <i className="bi bi-eye-slash"></i> Hide
                                      </button>
                                      <button onClick={() => saveActionReply(commentId, replyId, 'stop')} className="flex items-center gap-2 px-3 py-1.5 !rounded-xl border border-zinc-100 bg-white text-zinc-600 hover:border-red-200 hover:bg-red-50 hover:text-red-500 transition-all text-xs font-semibold text-nowrap">
                                        <i className="bi bi-slash-circle"></i> Don't Reply
                                      </button>
                                    </div>
                                  </div>

                                  <div className="space-y-4">
                                    <div className="space-y-2">
                                      <label className="text-[12px] font-bold text-zinc-700">Custom AI Reply:</label>
                                      <div className="flex gap-2">
                                        <input
                                          id={`custom-reply-input-${replyId}`}
                                          className="flex-1 bg-white border border-zinc-200 !rounded-xl px-4 py-2 text-sm focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 outline-none transition-all"
                                          placeholder="How should the AI respond?"
                                        />
                                        <button
                                          onClick={() => saveCustomReply(commentId, replyId, (document.getElementById(`custom-reply-input-${replyId}`) as HTMLInputElement).value)}
                                          className="px-4 py-2 bg-indigo-600 text-white !rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100"
                                        >
                                          Save
                                        </button>
                                      </div>
                                    </div>

                                    <div className="space-y-2">
                                      <label className="text-[12px] font-bold text-zinc-700">Private AI Reply:</label>
                                      <div className="flex gap-2">
                                        <input
                                          id={`custom-private-reply-input-${replyId}`}
                                          className="flex-1 bg-white border border-zinc-200 !rounded-xl px-4 py-2 text-sm focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 outline-none transition-all"
                                          placeholder="Direct message response..."
                                        />
                                        <button
                                          onClick={() => savePrivateReply(commentId, replyId, (document.getElementById(`custom-private-reply-input-${replyId}`) as HTMLInputElement).value)}
                                          className="px-4 py-2 bg-zinc-800 text-white !rounded-xl text-xs font-bold hover:bg-black transition-all shadow-md shadow-zinc-200"
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

                        {selectedComments.length === 0 && selectedReplies.length === 0 && (
                          <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="h-16 w-16 rounded-full bg-zinc-50 flex items-center justify-center text-zinc-300 mb-4 border-2 border-dashed border-zinc-200">
                              <i className="bi bi-plus-lg text-2xl"></i>
                            </div>
                            <h6 className="text-zinc-600 font-bold m-0">No context selected</h6>
                            <p className="text-xs text-zinc-400 mt-1">Select comments or replies on the left to start training.</p>
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
                        className="px-8 py-2.5 !rounded-xl text-sm font-bold text-zinc-500 hover:bg-zinc-50 hover:!rounded-xl transition-all"
                      >
                        Discard Changes
                      </button>
                      <button
                        onClick={saveComments}
                        className="px-10 py-2.5 bg-indigo-600 text-white !rounded-xl text-sm font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-indigo-300 transform active:scale-95 transition-all"
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
