import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email?: string | null;
      name?: string | null;
      image?: string | null;
    };
    accessToken?: string;
    tokenType?: string;
    backendUserId?: string;
  }

  interface User {
    id: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    email?: string;
    name?: string;
    image?: string;
    accessToken?: string;
    tokenType?: string;
    backendUserId?: string;
    provider?: string;
    providerAccountId?: string;
  }
}

