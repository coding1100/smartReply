# Environment Variables Setup

## Required Environment Variables

Create a `.env.local` file in the root of your project with the following variables:

```env
# Google OAuth Credentials (from Google Cloud Console)
GOOGLE_CLIENT_ID=234259137960-ib6rpcv6qdg9ubm7gklmu2otf9i7m26m.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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

# NextAuth Configuration
NEXTAUTH_SECRET=your-random-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# Backend API URL
NEXT_PUBLIC_API_URL=https://sme.namatechnologlies.com
```

## Environment Variables Explained

### Google OAuth Credentials

- **GOOGLE_CLIENT_ID**: Your Google OAuth 2.0 Client ID from Google Cloud Console
- **GOOGLE_CLIENT_SECRET**: Your Google OAuth 2.0 Client Secret from Google Cloud Console

### NextAuth Configuration

- **NEXTAUTH_SECRET**: A random secret string used to encrypt the JWT token. Generate one using:
  ```bash
  openssl rand -base64 32
  ```
  Or use an online generator: https://generate-secret.vercel.app/32

- **NEXTAUTH_URL**: The canonical URL of your site
  - Development: `http://localhost:3000`
  - Production: `https://sme.namatechnologlies.com`

### Backend API

- **NEXT_PUBLIC_API_URL**: Your backend API base URL

## Google Cloud Console Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** > **Credentials**
3. Create or select your OAuth 2.0 Client ID
4. Add authorized redirect URIs:
   - Development: `http://localhost:3000/api/auth/callback/google`
   - Production: `https://sme.namatechnologlies.com/api/auth/callback/google`
   
   **Important**: Both use `/api/auth/callback/google` as the redirect URI.

## Important Notes

- Never commit `.env.local` to version control
- The `.env.local` file is already in `.gitignore`
- Restart your development server after changing environment variables
- For production, set these variables in your hosting platform's environment settings

