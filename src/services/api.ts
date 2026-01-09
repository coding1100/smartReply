import { getSession } from "next-auth/react";

// --- Types ---

export interface ValidationError {
    loc: (string | number)[];
    msg: string;
    type: string;
}

export interface HTTPValidationError {
    detail: ValidationError[];
}

export interface Token {
    access_token: string;
    token_type: string;
}

export interface UserRegister {
    email: string;
    password: string;
    company_name: string;
}

export interface PageConnect {
    page_id: string;
    page_name: string;
    access_token: string;
    platform?: string | null;
}

export interface AgentSummary {
    page_id: string;
    page_name: string;
    platform: string;
    is_active: boolean;
}

export interface AgentFeatures {
    auto_message_enabled?: boolean;
    website_widget_enabled?: boolean;
    auto_followup_enabled?: boolean;
    followup_period?: string | null;
    followup_condition?: string | null;
    auto_comment_reply_enabled?: boolean;
    auto_private_reply_enabled?: boolean;
    private_reply_action?: string;
    auto_remove_comment_enabled?: boolean;
    moderation_rules?: string | null;
    removal_action?: string;
}

export interface AgentDetail {
    page_id: string;
    page_name: string;
    persona?: string | null;
    company_bio?: string | null;
    goal?: string | null;
    business_address?: string | null;
    support_email?: string | null;
    calendar_link?: string | null;
    promotion_code?: string | null;
    domain?: string | null;
    products?: Record<string, string>[] | null;
    faqs?: Record<string, string>[] | null;
    policy_pages?: Record<string, string> | null;
    features?: AgentFeatures | null;
    example_conversations?: Record<string, string>[] | null;
}

export interface AgentConfigUpdate {
    persona?: string | null;
    company_bio?: string | null;
    goal?: string | null;
    business_address?: string | null;
    support_email?: string | null;
    calendar_link?: string | null;
    promotion_code?: string | null;
    domain?: string | null;
    products?: Record<string, string>[] | null;
    faqs?: Record<string, string>[] | null;
    policy_pages?: Record<string, string> | null;
    features?: AgentFeatures | null;
    example_conversations?: Record<string, string>[] | null;
}

export interface PostSummary {
    id: string;
    message?: string | null;
    full_picture?: string | null;
    created_time: string;
    permalink_url?: string | null;
}

export interface CommentSummary {
    id: string;
    from?: Record<string, any> | null;
    message: string;
    created_time: string;
}

export interface TrainingExampleCreate {
    comment_id: string;
    comment_text: string;
    agent_reaction?: string | null;
    agent_comment_reply?: string | null;
    agent_private_reply?: string | null;
}

export interface ConversationSummary {
    id: string;
    snippet: string;
    updated_time: string;
    participants?: Record<string, any>[] | null;
}

export interface MessageSummary {
    id: string;
    from?: Record<string, any> | null;
    message: string;
    created_time: string;
}

export interface MessageTrainingExampleCreate {
    thread_id: string;
    user_message_text: string;
    agent_reply_text?: string | null;
    function_name?: string | null;
    function_response_example?: string | null;
}

export interface ChatRequest {
    session_id: string;
    message: string;
}

export interface AIToggleRequest {
    psid: string;
    enabled: boolean;
}

// --- API Service Class ---

class ApiService {
    private baseUrl: string;

    constructor() {
        this.baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://ec0466902e1b.ngrok-free.app";
    }

    private async getHeaders(): Promise<HeadersInit> {
        const headers: HeadersInit = {
            "Content-Type": "application/json",
        };

        // Try to get token from localStorage first (client-side)
        let token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
        let tokenType = typeof window !== "undefined" ? localStorage.getItem("tokenType") : "Bearer";

        // If no token in localStorage, try to get from NextAuth session (server-side/SSR)
        if (!token) {
            const session = await getSession();
            if (session && session.accessToken) {
                token = session.accessToken;
                tokenType = session.tokenType || "Bearer";
            }
        }

        if (token) {
            headers["Authorization"] = `${tokenType} ${token}`;
        }

        return headers;
    }

    private async handleResponse<T>(response: Response): Promise<T> {
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ detail: response.statusText }));
            throw {
                status: response.status,
                message: errorData.detail || "An error occurred",
                validationErrors: errorData.detail, // simplified for now, could be array
            };
        }
        return response.json();
    }

    // --- Auth ---

    public auth = {
        register: async (data: UserRegister): Promise<Token> => {
            const res = await fetch(`${this.baseUrl}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            return this.handleResponse<Token>(res);
        },

        login: async (formData: FormData): Promise<Token> => {
            const res = await fetch(`${this.baseUrl}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded" // Login expects form data
                },
                body: new URLSearchParams(formData as any).toString(),
            });
            return this.handleResponse<Token>(res);
        },

        // Note: Social Login redirects are usually handled by simple links, 
        // but these methods can be used if we need to fetch the redirect URL programmatically if API supports it.
        // Based on spec, these return schemas, so they might return a JSON with URL or redirect directly.
        loginProvider: async (provider: string, redirectUri?: string) => {
            let url = `${this.baseUrl}/auth/login/${provider}`;
            if (redirectUri) {
                // Determine if we should use ? or & based on existing params
                const separator = url.includes("?") ? "&" : "?";
                url += `${separator}redirect_url=${encodeURIComponent(redirectUri)}`;
            }
            console.log("Redirecting to social login:", url);
            window.location.href = url;
        },

        // Callbacks are usually handled by NextAuth or a specific route page capturing params
    };

    // --- Onboarding ---

    public onboarding = {
        connectFacebook: async (): Promise<any> => {
            const headers = await this.getHeaders();
            const res = await fetch(`${this.baseUrl}/onboarding/facebook/connect`, {
                method: "GET",
                headers,
            });
            return this.handleResponse(res);
        },

        // Callback handled by page route usually
    };

    // --- Agents ---

    public agents = {
        connect: async (data: PageConnect): Promise<AgentSummary> => {
            const headers = await this.getHeaders();
            const res = await fetch(`${this.baseUrl}/agents/connect`, {
                method: "POST",
                headers,
                body: JSON.stringify(data),
            });
            return this.handleResponse<AgentSummary>(res);
        },

        list: async (): Promise<AgentSummary[]> => {
            const headers = await this.getHeaders();
            const res = await fetch(`${this.baseUrl}/agents/`, {
                method: "GET",
                headers,
            });
            return this.handleResponse<AgentSummary[]>(res);
        },

        getDetails: async (pageId: string): Promise<AgentDetail> => {
            const headers = await this.getHeaders();
            const res = await fetch(`${this.baseUrl}/agents/${pageId}`, {
                method: "GET",
                headers,
            });
            return this.handleResponse<AgentDetail>(res);
        },

        updateConfig: async (pageId: string, data: AgentConfigUpdate): Promise<AgentDetail> => {
            const headers = await this.getHeaders();
            const res = await fetch(`${this.baseUrl}/agents/${pageId}/config`, {
                method: "PATCH",
                headers,
                body: JSON.stringify(data),
            });
            return this.handleResponse<AgentDetail>(res);
        },

        getPosts: async (pageId: string): Promise<PostSummary[]> => {
            const headers = await this.getHeaders();
            const res = await fetch(`${this.baseUrl}/agents/${pageId}/posts`, {
                method: "GET",
                headers,
            });
            return this.handleResponse<PostSummary[]>(res);
        },

        getPostComments: async (pageId: string, postId: string): Promise<CommentSummary[]> => {
            const headers = await this.getHeaders();
            const res = await fetch(`${this.baseUrl}/agents/${pageId}/posts/${postId}/comments`, {
                method: "GET",
                headers,
            });
            return this.handleResponse<CommentSummary[]>(res);
        },

        addTrainingExample: async (pageId: string, data: TrainingExampleCreate): Promise<AgentDetail> => {
            const headers = await this.getHeaders();
            const res = await fetch(`${this.baseUrl}/agents/${pageId}/training-examples`, {
                method: "POST",
                headers,
                body: JSON.stringify(data),
            });
            return this.handleResponse<AgentDetail>(res);
        },

        getConversations: async (pageId: string): Promise<ConversationSummary[]> => {
            const headers = await this.getHeaders();
            const res = await fetch(`${this.baseUrl}/agents/${pageId}/conversations`, {
                method: "GET",
                headers,
            });
            return this.handleResponse<ConversationSummary[]>(res);
        },

        getThreadMessages: async (pageId: string, threadId: string): Promise<MessageSummary[]> => {
            const headers = await this.getHeaders();
            const res = await fetch(`${this.baseUrl}/agents/${pageId}/conversations/${threadId}/messages`, {
                method: "GET",
                headers,
            });
            return this.handleResponse<MessageSummary[]>(res);
        },

        addMessageTraining: async (pageId: string, data: MessageTrainingExampleCreate): Promise<AgentDetail> => {
            const headers = await this.getHeaders();
            const res = await fetch(`${this.baseUrl}/agents/${pageId}/message-training`, {
                method: "POST",
                headers,
                body: JSON.stringify(data),
            });
            return this.handleResponse<AgentDetail>(res);
        },
    };

    // --- Comments Management (General) ---

    public comments = {
        getAll: async (): Promise<any> => {
            const headers = await this.getHeaders();
            const res = await fetch(`${this.baseUrl}/comments`, { method: "GET", headers });
            return this.handleResponse(res);
        },
        getPending: async (): Promise<any> => {
            const headers = await this.getHeaders();
            const res = await fetch(`${this.baseUrl}/comments/pending`, { method: "GET", headers });
            return this.handleResponse(res);
        },
        getInterested: async (): Promise<any> => {
            const headers = await this.getHeaders();
            const res = await fetch(`${this.baseUrl}/comments/interested`, { method: "GET", headers });
            return this.handleResponse(res);
        },
    };

    // --- API Chat Widget ---

    public chat = {
        send: async (data: ChatRequest): Promise<any> => {
            const headers = await this.getHeaders();
            const res = await fetch(`${this.baseUrl}/api/chat/send`, {
                method: "POST",
                headers,
                body: JSON.stringify(data)
            });
            return this.handleResponse(res);
        },
        welcome: async (data: ChatRequest): Promise<any> => {
            const headers = await this.getHeaders();
            const res = await fetch(`${this.baseUrl}/api/chat/welcome`, {
                method: "POST",
                headers,
                body: JSON.stringify(data)
            });
            return this.handleResponse(res);
        },
        history: async (sessionId: string): Promise<any> => {
            const headers = await this.getHeaders();
            const res = await fetch(`${this.baseUrl}/api/chat/history/${sessionId}`, { method: "GET", headers });
            return this.handleResponse(res);
        },
    };

    // --- Messenger Dashboard ---

    public messenger = {
        getConversations: async (): Promise<any> => {
            const headers = await this.getHeaders();
            const res = await fetch(`${this.baseUrl}/api/messenger/conversations`, { method: "GET", headers });
            return this.handleResponse(res);
        },
        getMessages: async (conversationId: string): Promise<any> => {
            const headers = await this.getHeaders();
            const res = await fetch(`${this.baseUrl}/api/messenger/conversations/${conversationId}/messages`, { method: "GET", headers });
            return this.handleResponse(res);
        },
        sendMessage: async (conversationId: string, message: string): Promise<any> => {
            const headers = await this.getHeaders();
            const res = await fetch(`${this.baseUrl}/api/messenger/conversations/${conversationId}/messages`, {
                method: "POST",
                headers,
                body: JSON.stringify({ message })
            });
            return this.handleResponse(res);
        },
        toggleAI: async (data: AIToggleRequest): Promise<any> => {
            const headers = await this.getHeaders();
            const res = await fetch(`${this.baseUrl}/api/messenger/conversations/toggle-ai`, {
                method: "POST",
                headers,
                body: JSON.stringify(data)
            });
            return this.handleResponse(res);
        },
        getAIStatus: async (psid: string): Promise<any> => {
            const headers = await this.getHeaders();
            const res = await fetch(`${this.baseUrl}/api/messenger/conversations/${psid}/ai-status`, { method: "GET", headers });
            return this.handleResponse(res);
        },
        toggleGlobalAI: async (data: any): Promise<any> => {
            const headers = await this.getHeaders();
            const res = await fetch(`${this.baseUrl}/api/messenger/global-ai/toggle`, {
                method: "POST",
                headers,
                body: JSON.stringify(data)
            });
            return this.handleResponse(res);
        },
        getGlobalAIStatus: async (): Promise<any> => {
            const headers = await this.getHeaders();
            const res = await fetch(`${this.baseUrl}/api/messenger/global-ai/status`, { method: "GET", headers });
            return this.handleResponse(res);
        },
        // For SSE, we usually consume it via EventSource in the component, not via simple fetch
        getEventsUrl: () => {
            const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://sme.namatechnologlies.com";
            return `${baseUrl}/api/messenger/events`;
        }
    };

    // --- System ---

    public system = {
        health: async (): Promise<any> => {
            const res = await fetch(`${this.baseUrl}/health`);
            return this.handleResponse(res);
        },
        // Webhook is usually called by Facebook, not by the frontend app
    };
}

export const api = new ApiService();
