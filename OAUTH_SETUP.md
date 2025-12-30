# Google OAuth Setup Guide

## Problem: redirect_uri_mismatch Error

The `redirect_uri_mismatch` error occurs when the redirect URI sent to Google doesn't exactly match what's configured in Google Cloud Console.

## Current Configuration

- **Google Cloud Console Redirect URI**: `https://sme.namatechnologlies.com/auth/callback/google`
- **Frontend sends**: This exact URI to the backend API
- **Backend API**: Must use this exact URI when making OAuth request to Google

## Solution

### Option 1: Backend Uses redirect_uri Parameter (Recommended)

The backend API at `${API_URL}/auth/login/google` should:
1. Accept the `redirect_uri` query parameter from the frontend
2. Use this exact `redirect_uri` when making the OAuth request to Google
3. NOT modify or construct the redirect_uri

**Backend code should look like:**
```python
# Example (Python/FastAPI)
redirect_uri = request.query_params.get('redirect_uri', 'default_uri')
# Use redirect_uri exactly as received when calling Google OAuth
```

### Option 2: Backend Has Hardcoded redirect_uri

If the backend doesn't accept the `redirect_uri` parameter, it must be configured with:
```
https://sme.namatechnologlies.com/auth/callback/google
```

**Backend configuration should include:**
- Environment variable: `GOOGLE_REDIRECT_URI=https://sme.namatechnologlies.com/auth/callback/google`
- Or hardcoded in backend config to match Google Cloud Console

## Verification Steps

1. **Check what redirect_uri the backend is sending to Google:**
   - Add logging in backend to see the exact redirect_uri being sent
   - Compare with Google Cloud Console authorized redirect URIs

2. **Verify Google Cloud Console:**
   - Go to Google Cloud Console > APIs & Services > Credentials
   - Find your OAuth 2.0 Client ID
   - Ensure `https://sme.namatechnologlies.com/auth/callback/google` is in "Authorized redirect URIs"
   - Must match EXACTLY (including https, no trailing slash unless specified)

3. **Test the flow:**
   - Frontend calls: `${API_URL}/auth/login/google?from=login&redirect_uri=https://sme.namatechnologlies.com/auth/callback/google`
   - Backend should use this redirect_uri when redirecting to Google
   - Google redirects back to: `https://sme.namatechnologlies.com/auth/callback/google`

## Common Issues

1. **Backend constructs redirect_uri from request origin:**
   - If frontend is at `http://localhost:3000`, backend might construct `http://localhost:3000/auth/callback/google`
   - Solution: Backend must use the redirect_uri parameter or configured value

2. **Trailing slash mismatch:**
   - Google Cloud Console: `https://sme.namatechnologlies.com/auth/callback/google`
   - Backend sends: `https://sme.namatechnologlies.com/auth/callback/google/` (with trailing slash)
   - Solution: Must match exactly, no trailing slash

3. **HTTP vs HTTPS:**
   - Google Cloud Console: `https://...`
   - Backend sends: `http://...`
   - Solution: Must use HTTPS

4. **Port number:**
   - If testing locally, ensure localhost redirect_uri is also in Google Cloud Console
   - For production, use the production domain URL

## Next Steps

1. Check backend logs to see what redirect_uri is being sent to Google
2. Verify backend is using the redirect_uri parameter we send
3. If backend doesn't use the parameter, configure backend with the correct redirect_uri: `https://sme.namatechnologlies.com/auth/callback/google`
4. Ensure Google Cloud Console has the exact redirect_uri listed: `https://sme.namatechnologlies.com/auth/callback/google`

