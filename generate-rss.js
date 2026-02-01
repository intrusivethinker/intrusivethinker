const fs = require('fs');

// Configuration
const SITE_URL = 'https://intrusivethinker.com';
const FEED_TITLE = 'Intrusive Thinker';
const FEED_DESCRIPTION = 'Random intrusive thoughts';

// Read thoughts.json
const thoughts = JSON.parse(fs.readFileSync('thoughts.json', 'utf8'));

// Parse date string like "Fed 1, 2026 1:43pm" to RFC 822 format
function parseDate(dateStr) {
  // Handle common typos in month names
  const monthFixes = {
    'Fed': 'Feb',
    'Jen': 'Jan',
    'Mer': 'Mar',
    'Arp': 'Apr'
  };
  
  let fixedStr = dateStr;
  for (const [typo, correct] of Object.entries(monthFixes)) {
    fixedStr = fixedStr.replace(typo, correct);
  }
  
  try {
    const date = new Date(fixedStr);
    if (isNaN(date.getTime())) {
      return new Date().toUTCString();
    }
    return date.toUTCString();
  } catch {
    return new Date().toUTCString();
  }
}

// Escape XML special characters
function escapeXml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Generate a unique ID for each thought based on content hash
function generateGuid(thought) {
  const hash = Buffer.from(thought.t).toString('base64').slice(0, 16);
  return `${SITE_URL}/thought-${hash}`;
}

// Generate RSS items
const items = thoughts.map(thought => {
  const pubDate = parseDate(thought.d);
  const guid = generateGuid(thought);
  // Use first 50 chars as title
  const title = thought.t.length > 50 
    ? thought.t.slice(0, 50) + '...' 
    : thought.t;
  
  return `    <item>
      <title>${escapeXml(title)}</title>
      <description>${escapeXml(thought.t)}</description>
      <pubDate>${pubDate}</pubDate>
      <guid isPermaLink="false">${guid}</guid>
    </item>`;
}).join('\n');

// Generate full RSS feed
const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${FEED_TITLE}</title>
    <link>${SITE_URL}</link>
    <description>${FEED_DESCRIPTION}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;

// Write RSS file
fs.writeFileSync('rss.xml', rss);
console.log('Generated rss.xml with', thoughts.length, 'items');
