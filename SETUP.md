# Intrusive Thinker - Setup Guide

## Step 1: Create Anonymous Email

Create a throwaway email account that's not connected to your identity:

- **ProtonMail** (https://proton.me) - Recommended, no phone number required
- **Tutanota** (https://tutanota.com) - Also good, privacy-focused

Use a random username like `quietmind847@proton.me` - nothing related to your real name.

## Step 2: Create Anonymous GitHub Account

1. Go to https://github.com/signup
2. Use your throwaway email
3. Pick a random username (e.g., `void-thoughts`, `quiet-static-99`, `thought-stream`)
4. Don't add a profile picture or bio
5. Don't connect any social accounts

## Step 3: Configure Git (Important!)

On every device you'll commit from, run these commands to hide your identity in commits:

```bash
# Set fake name and email for this repo only
cd /path/to/intrusivethinker
git config user.name "Anonymous"
git config user.email "noreply@users.noreply.github.com"
```

Or to set it globally (affects all repos - not recommended if you use git for work):

```bash
git config --global user.name "Anonymous"
git config --global user.email "noreply@users.noreply.github.com"
```

## Step 4: Create the Repository

1. Log into your anonymous GitHub account
2. Click "New repository"
3. Name it `intrusivethinker` (or your username + `.github.io` for easier setup)
4. Make it **Public** (required for free GitHub Pages)
5. Don't initialize with README (you'll push these files)

## Step 5: Push the Code

```bash
cd /path/to/IntrusiveThinker
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_ANONYMOUS_USERNAME/intrusivethinker.git
git push -u origin main
```

## Step 6: Enable GitHub Pages

1. Go to your repo on GitHub
2. Click **Settings** > **Pages**
3. Under "Source", select **Deploy from a branch**
4. Select **main** branch and **/ (root)** folder
5. Click **Save**

Your site will be live at `https://YOUR_USERNAME.github.io/intrusivethinker/` in a few minutes.

## Step 7: Connect Your Domain

See `DNS_SETUP.md` for instructions on connecting `intrusivethinker.com` to GitHub Pages.

---

## Adding New Thoughts

### From Phone (GitHub App)

1. Open GitHub app
2. Go to your repo
3. Tap `thoughts.json`
4. Tap the pencil icon to edit
5. Add your new thought at the TOP of the array:
   ```json
   {
     "t": "Your intrusive thought here",
     "d": "Jan 31, 2026 3:45pm"
   },
   ```
6. Tap "Commit changes"
7. Site updates in ~30 seconds

### From Laptop (github.com)

Same process - navigate to `thoughts.json`, click Edit, add your thought, commit.

### From Laptop (Command Line)

```bash
# Edit thoughts.json in your editor
# Then:
git add thoughts.json
git commit -m "new thought"
git push
```

---

## Security Reminders

- Never commit from your real GitHub account to this repo
- Don't mention identifying details in your thoughts (names, places, job specifics)
- Don't tell anyone this is your site
- Always use the anonymous account when editing on GitHub
