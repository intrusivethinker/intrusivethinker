# DNS Setup - Connecting intrusivethinker.com to GitHub Pages

## Prerequisites

- GitHub Pages is enabled and working (test at `https://YOUR_USERNAME.github.io/intrusivethinker/`)
- The `CNAME` file exists in your repo with `intrusivethinker.com`

## Step 1: Get GitHub Pages IP Addresses

GitHub Pages uses these IP addresses (as of 2026):

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

## Step 2: Configure DNS in Squarespace

1. Log into your Squarespace account
2. Go to **Domains** > **intrusivethinker.com** > **DNS Settings**
3. Delete any existing A records or CNAME records for the root domain (@)

### Option A: Using A Records (Recommended for apex domain)

Add four A records:

| Type | Host | Data |
|------|------|------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

Then add a CNAME for www:

| Type | Host | Data |
|------|------|------|
| CNAME | www | YOUR_USERNAME.github.io |

### Option B: Using CNAME only (for www subdomain)

If you only want `www.intrusivethinker.com` to work:

| Type | Host | Data |
|------|------|------|
| CNAME | www | YOUR_USERNAME.github.io |

## Step 3: Wait for DNS Propagation

- DNS changes can take up to 48 hours to propagate worldwide
- Usually it's much faster (15-30 minutes)
- You can check propagation at https://dnschecker.org

## Step 4: Enable HTTPS in GitHub

1. Go to your repo **Settings** > **Pages**
2. Under "Custom domain", enter `intrusivethinker.com`
3. Click **Save**
4. Wait a few minutes, then check **Enforce HTTPS**

GitHub will automatically provision a free SSL certificate via Let's Encrypt.

## Step 5: Verify Everything Works

Test these URLs:
- `https://intrusivethinker.com` - Should show your site
- `https://www.intrusivethinker.com` - Should redirect to above
- `http://intrusivethinker.com` - Should redirect to HTTPS

## Troubleshooting

### "Domain not configured correctly"

- Make sure the `CNAME` file contains exactly `intrusivethinker.com` (no `https://`, no trailing slash)
- Wait longer for DNS propagation
- Double-check the A records in Squarespace

### Certificate errors

- GitHub needs time to provision the SSL certificate (can take up to 24 hours)
- Make sure HTTPS is enforced in GitHub Pages settings

### Site shows GitHub 404

- Make sure the repo is public
- Make sure GitHub Pages is enabled and pointing to the correct branch
- Make sure `index.html` exists in the root of the repo

## Quick Reference

| Service | What to Set |
|---------|-------------|
| **Squarespace DNS** | A records → GitHub IPs |
| **Squarespace DNS** | CNAME www → your-username.github.io |
| **GitHub Repo** | `CNAME` file → intrusivethinker.com |
| **GitHub Settings** | Pages → Custom domain → intrusivethinker.com |
| **GitHub Settings** | Pages → Enforce HTTPS → checked |
