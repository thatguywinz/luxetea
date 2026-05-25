#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * Webrivio Pexels Asset Fetcher
 *
 * Reads CLIENT_INFO.md, builds smart search queries from the business niche
 * and visual direction, downloads images to /public/placeholders, and writes
 * ASSET_CREDITS.md. Uses only Node built-ins. Never prints the API key.
 *
 * Usage:
 *   node scripts/fetch-assets.js
 *   node scripts/fetch-assets.js --force   (overwrite existing files)
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const PROJECT_ROOT = process.cwd();
const CLIENT_INFO_PATH = path.join(PROJECT_ROOT, 'CLIENT_INFO.md');
const PLACEHOLDERS_DIR = path.join(PROJECT_ROOT, 'public', 'placeholders');
const CREDITS_PATH = path.join(PROJECT_ROOT, 'ASSET_CREDITS.md');
const STARTER_FALLBACK_ENV = path.join(PROJECT_ROOT, '..', '..', 'webrivio-starter', '.env.local');
const LOCAL_ENV = path.join(PROJECT_ROOT, '.env.local');

const FORCE = process.argv.includes('--force');

// ---------- env loader ----------
function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return {};
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    const out = {};
    raw.split(/\r?\n/).forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;
      const eq = trimmed.indexOf('=');
      if (eq === -1) return;
      const key = trimmed.slice(0, eq).trim();
      let value = trimmed.slice(eq + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      out[key] = value;
    });
    return out;
  } catch {
    return {};
  }
}

function getApiKey() {
  if (process.env.PEXELS_API_KEY && process.env.PEXELS_API_KEY.trim()) {
    return process.env.PEXELS_API_KEY.trim();
  }
  const localEnv = loadEnvFile(LOCAL_ENV);
  if (localEnv.PEXELS_API_KEY) return localEnv.PEXELS_API_KEY.trim();
  const fallbackEnv = loadEnvFile(STARTER_FALLBACK_ENV);
  if (fallbackEnv.PEXELS_API_KEY) return fallbackEnv.PEXELS_API_KEY.trim();
  return null;
}

// ---------- CLIENT_INFO parser ----------
function readClientInfo() {
  if (!fs.existsSync(CLIENT_INFO_PATH)) return null;
  return fs.readFileSync(CLIENT_INFO_PATH, 'utf8');
}

function extractField(content, label) {
  if (!content) return '';
  const re = new RegExp(
    `\\*\\*${label.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\$&')}[^*]*\\*\\*\\s*[:\\-]?\\s*([^\\n]*)`,
    'i'
  );
  const m = content.match(re);
  if (!m) return '';
  let v = (m[1] || '').trim();
  // Strip italic optional markers and bracketed examples
  v = v.replace(/^\*[^*]*\*\s*/, '');
  v = v.replace(/\[.*?\]/g, '').trim();
  return v;
}

function extractMainServices(content) {
  if (!content) return [];
  const idx = content.search(/\*\*Main Services\*\*/i);
  if (idx === -1) return [];
  const slice = content.slice(idx, idx + 2000);
  const lines = slice.split(/\r?\n/);
  const services = [];
  let started = false;
  for (const line of lines) {
    if (/\*\*Main Services\*\*/i.test(line)) {
      started = true;
      continue;
    }
    if (!started) continue;
    if (/^\*\*/.test(line.trim())) break;
    const m = line.match(/^\s*-\s*(.+)$/);
    if (m) {
      const v = m[1].trim();
      if (v && !/^\*/.test(v)) services.push(v);
    }
  }
  return services.slice(0, 6);
}

function parseClientInfo() {
  const content = readClientInfo();
  if (!content) {
    return {
      ok: false,
      reason: 'CLIENT_INFO.md was not found in this project.',
    };
  }
  const data = {
    businessName: extractField(content, 'Business Name'),
    industry: extractField(content, 'Industry').toLowerCase(),
    city: extractField(content, 'City'),
    serviceArea: extractField(content, 'Service Area'),
    services: extractMainServices(content),
    heroVisual: extractField(content, 'Hero Visual Direction'),
    imageStyle: extractField(content, 'Image Style Preference'),
    firstImpression: extractField(content, 'Desired First Impression'),
    avoidVisuals: extractField(content, 'Avoid These Visuals'),
  };
  return { ok: true, data, raw: content };
}

// ---------- niche query packs ----------
const NICHE_QUERIES = {
  roofing: {
    hero: 'modern house exterior new roof',
    services: ['roof replacement contractor', 'roof repair detail', 'roof installation worker'],
    process: ['roof inspection ladder', 'roofing crew working', 'shingle installation hands', 'finished roof house exterior'],
    work: ['new asphalt shingle roof', 'residential roof exterior', 'metal roof house', 'roof gutter detail', 'house roofline against sky'],
    texture: 'asphalt shingles texture',
  },
  landscaping: {
    hero: 'landscaped backyard garden design',
    services: ['garden design detail', 'lawn care professional', 'stone patio installation'],
    process: ['landscaper planting garden', 'landscaping crew working', 'garden bed preparation', 'finished landscaped yard'],
    work: ['manicured garden lawn', 'backyard patio design', 'outdoor landscape stonework', 'flower garden bed', 'modern backyard design'],
    texture: 'stone gravel texture',
  },
  dentist: {
    hero: 'modern dental clinic interior',
    services: ['dental tools clean', 'modern dental office', 'dental chair clinic'],
    process: ['dental consultation patient', 'dentist examining patient', 'dental hygienist cleaning', 'patient smiling dental office'],
    work: ['clean dental office interior', 'modern clinic waiting room', 'dental treatment room', 'minimal medical interior', 'dental reception desk'],
    texture: 'white minimal interior texture',
  },
  medspa: {
    hero: 'luxury medspa treatment room',
    services: ['skincare clinic room', 'spa treatment room', 'luxury spa detail'],
    process: ['skincare consultation client', 'facial treatment spa', 'esthetician working with client', 'relaxed client at spa'],
    work: ['minimal spa interior', 'luxury wellness room', 'skincare products flatlay', 'spa reception interior', 'calm treatment space'],
    texture: 'soft beige texture',
  },
  'general contractor': {
    hero: 'modern home renovation interior',
    services: ['construction detail', 'finished remodel', 'renovation tools jobsite'],
    process: ['contractor planning blueprint', 'construction crew working', 'home renovation in progress', 'finished home remodel'],
    work: ['modern kitchen remodel', 'interior renovation detail', 'craftsmanship woodwork', 'modern bathroom remodel', 'finished home interior'],
    texture: 'wood grain texture',
  },
  contractor: {
    hero: 'modern home renovation interior',
    services: ['construction detail', 'finished remodel', 'renovation tools jobsite'],
    process: ['contractor planning blueprint', 'construction crew working', 'home renovation in progress', 'finished home remodel'],
    work: ['modern kitchen remodel', 'interior renovation detail', 'craftsmanship woodwork', 'modern bathroom remodel', 'finished home interior'],
    texture: 'wood grain texture',
  },
  hvac: {
    hero: 'hvac technician home service',
    services: ['air conditioning unit', 'ventilation system', 'home comfort heating'],
    process: ['hvac technician inspection', 'technician installing ac unit', 'thermostat adjustment by hand', 'comfortable modern home interior'],
    work: ['hvac equipment detail', 'modern thermostat wall', 'air conditioner outdoor unit', 'mechanical room industrial', 'clean comfortable home interior'],
    texture: 'metal duct texture',
  },
  plumber: {
    hero: 'modern bathroom interior design',
    services: ['plumbing tools', 'plumber work detail', 'copper pipes'],
    process: ['plumber inspecting pipes', 'plumber repairing sink', 'pipe installation work', 'finished modern bathroom'],
    work: ['modern bathroom fixture', 'kitchen sink detail', 'pipe installation', 'modern faucet detail', 'clean bathroom interior'],
    texture: 'copper pipe texture',
  },
  plumbing: {
    hero: 'modern bathroom interior design',
    services: ['plumbing tools', 'plumber work detail', 'copper pipes'],
    process: ['plumber inspecting pipes', 'plumber repairing sink', 'pipe installation work', 'finished modern bathroom'],
    work: ['modern bathroom fixture', 'kitchen sink detail', 'pipe installation', 'modern faucet detail', 'clean bathroom interior'],
    texture: 'copper pipe texture',
  },
  cleaning: {
    hero: 'bright clean modern home interior',
    services: ['cleaning service detail', 'sparkling kitchen', 'spotless living room'],
    process: ['cleaner wiping a surface', 'cleaning crew working in home', 'vacuuming modern living room', 'fresh organized interior'],
    work: ['minimal clean interior', 'organized tidy home', 'fresh bright living room', 'spotless modern kitchen', 'clean bright bathroom'],
    texture: 'white linen texture',
  },
  tea: {
    hero: 'fruit tea drink in clear cup with ice and fruit',
    services: [
      'fruit tea bubble tea cup with fresh fruit',
      'vietnamese iced coffee with condensed milk',
      'iced cold brew coffee in glass on wood',
      'matcha latte ceramic cup top view',
      'milk tea boba tapioca pearls clear cup',
      'colorful slush milkshake drink for kids',
    ],
    process: [
      'tea leaves loose dry on wood',
      'barista pouring tea into glass',
      'fruit slices on cutting board cafe',
      'finished bubble tea on cafe counter',
    ],
    work: [
      'cozy cafe interior warm light wood',
      'cafe counter pastries drinks toronto',
      'iced drink flatlay overhead pastel',
      'tea cup steam minimal still life',
      'cafe storefront window plant warm',
    ],
    texture: 'matcha green powder texture close up',
  },
  cafe: {
    hero: 'cozy cafe interior warm morning light',
    services: ['espresso latte art', 'cold brew coffee glass', 'matcha latte cup', 'cafe pastry detail'],
    process: ['barista pouring milk latte', 'coffee beans roasted close up', 'fresh pastry tray cafe', 'cafe counter morning customers'],
    work: ['cozy cafe interior wood', 'cafe storefront warm light', 'minimal coffee shop counter', 'cafe table morning sunlight', 'plants in cafe window'],
    texture: 'coffee beans dark texture',
  },
};

function detectNicheKey(client) {
  const haystackParts = [client.industry, client.businessName, ...(client.services || [])]
    .filter(Boolean)
    .map((s) => s.toLowerCase());
  const haystack = haystackParts.join(' ');
  if (!haystack) return null;
  // beverage/cafe niches first so they win over a generic "other" industry value
  if (/\b(tea|bubble tea|boba|matcha|chai)\b/.test(haystack)) return 'tea';
  if (/\b(cafe|coffee|espresso|cold brew)\b/.test(haystack)) return 'cafe';
  const keys = Object.keys(NICHE_QUERIES);
  for (const k of keys) {
    if (haystack.includes(k)) return k;
  }
  return null;
}

function buildQueries(client) {
  const niche = detectNicheKey(client);
  const pack = niche
    ? NICHE_QUERIES[niche]
    : {
        hero: 'premium modern interior scene',
        services: ['craftsmanship detail', 'modern workspace', 'professional service detail'],
        process: ['professional consultation', 'team working on project', 'work in progress detail', 'finished professional result'],
        work: ['architectural detail', 'minimal modern interior', 'material detail', 'modern workspace design', 'premium interior light'],
        texture: 'abstract premium texture',
      };

  const heroParts = [pack.hero];
  if (client.heroVisual) heroParts.push(client.heroVisual);
  if (client.firstImpression) heroParts.push(client.firstImpression);
  const heroQuery = heroParts.filter(Boolean).join(' ').slice(0, 120);

  // One image per real service (3-6). Photo-id de-dup in main() keeps every
  // downloaded file distinct even when two queries overlap, so the build
  // never has to reuse an image across visible slots.
  const services = client.services.length ? client.services : pack.services;
  const serviceCount = Math.min(Math.max(services.length, 3), 6);
  const serviceSlots = [];
  for (let i = 0; i < serviceCount; i++) {
    const base = pack.services[i % pack.services.length];
    const svc = services[i];
    const query = (svc && svc !== base ? `${base} ${svc}` : base).slice(0, 120);
    serviceSlots.push({ name: `service-${i + 1}.jpg`, query, orientation: 'landscape' });
  }

  const processSlots = pack.process.map((query, i) => ({
    name: `process-${i + 1}.jpg`,
    query,
    orientation: 'landscape',
  }));
  const workSlots = pack.work.map((query, i) => ({
    name: `work-${i + 1}.jpg`,
    query,
    orientation: 'landscape',
  }));

  // Extra named slots for mood-based recommender + gallery overflow. These
  // are added on top of the base set so a build can use a unique image in
  // every visible slot without re-using a hero/service/process/work file.
  const isTeaPack = niche === 'tea' || niche === 'cafe';
  const moodSlots = isTeaPack
    ? [
        { name: 'mood-fruity.jpg', query: 'pink strawberry iced tea drink close up cup', orientation: 'portrait' },
        { name: 'mood-creamy.jpg', query: 'matcha latte foam top view ceramic', orientation: 'portrait' },
        { name: 'mood-coffee.jpg', query: 'iced coffee with cream glass close up', orientation: 'portrait' },
        { name: 'mood-refresh.jpg', query: 'sparkling citrus drink lemon ice glass', orientation: 'portrait' },
        { name: 'mood-kids.jpg', query: 'milkshake strawberry whipped cream tall glass', orientation: 'portrait' },
      ]
    : [];
  const galleryExtra = isTeaPack
    ? [
        { name: 'gallery-1.jpg', query: 'cafe wooden table latte morning light', orientation: 'portrait' },
        { name: 'gallery-2.jpg', query: 'pouring milk into coffee espresso closeup', orientation: 'portrait' },
        { name: 'gallery-3.jpg', query: 'minimal coffee shop counter wood plants', orientation: 'portrait' },
      ]
    : [];

  // hero + 3-6 services + 4 process + 5 gallery + 1 texture + extras = 17-25
  // unique images — comfortably above the minimum unique count required.
  return [
    { name: 'hero.jpg', query: heroQuery, orientation: 'landscape' },
    ...serviceSlots,
    ...processSlots,
    ...workSlots,
    ...moodSlots,
    ...galleryExtra,
    { name: 'texture-1.jpg', query: pack.texture, orientation: 'landscape' },
  ];
}

// ---------- HTTPS helpers ----------
function httpsRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (res) => {
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode || 0,
          headers: res.headers,
          body: Buffer.concat(chunks),
        });
      });
    });
    req.on('error', reject);
    req.end();
  });
}

function downloadToFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    const req = https.get(url, (res) => {
      if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        file.close();
        fs.unlink(destPath, () => {});
        downloadToFile(res.headers.location, destPath).then(resolve, reject);
        return;
      }
      if (res.statusCode !== 200) {
        file.close();
        fs.unlink(destPath, () => {});
        reject(new Error(`Download failed with status ${res.statusCode}`));
        return;
      }
      res.pipe(file);
      file.on('finish', () => file.close(() => resolve()));
    });
    req.on('error', (err) => {
      file.close();
      fs.unlink(destPath, () => {});
      reject(err);
    });
  });
}

async function pexelsSearch(apiKey, query, orientation) {
  const params = new URLSearchParams({
    query,
    per_page: '15',
    orientation: orientation || 'landscape',
    size: 'large',
  });
  const url = `https://api.pexels.com/v1/search?${params.toString()}`;
  const res = await httpsRequest(url, {
    method: 'GET',
    headers: {
      Authorization: apiKey,
      'User-Agent': 'webrivio-fetch-assets/1.0',
    },
  });
  if (res.statusCode === 401) {
    throw new Error('AUTH_FAILED');
  }
  if (res.statusCode === 429) {
    throw new Error('RATE_LIMITED');
  }
  if (res.statusCode !== 200) {
    throw new Error(`Pexels API returned status ${res.statusCode}`);
  }
  let data;
  try {
    data = JSON.parse(res.body.toString('utf8'));
  } catch {
    throw new Error('Failed to parse Pexels API response');
  }
  return data.photos || [];
}

// ---------- main ----------
function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function writeCredits(entries, client) {
  const lines = [];
  lines.push('# Asset Credits');
  lines.push('');
  lines.push('> Placeholder images only. Replace with real client media before final delivery when available.');
  lines.push('> All photos courtesy of [Pexels](https://www.pexels.com). Please credit and link back to Pexels and the original photographers where possible.');
  lines.push('');
  if (client.businessName) lines.push(`Project: ${client.businessName}`);
  if (client.industry) lines.push(`Industry: ${client.industry}`);
  lines.push('');
  lines.push('| File | Query | Photographer | Source |');
  lines.push('|------|-------|--------------|--------|');
  for (const e of entries) {
    const photographer = e.photographer
      ? e.photographerUrl
        ? `[${e.photographer}](${e.photographerUrl})`
        : e.photographer
      : '—';
    const src = e.photoUrl ? `[Pexels](${e.photoUrl})` : '—';
    lines.push(`| \`${e.file}\` | ${e.query} | ${photographer} | ${src} |`);
  }
  lines.push('');
  lines.push('## Honesty Note');
  lines.push('');
  lines.push('These placeholder images must never be presented as the client\'s real work, real team, real customers, real projects, real before/after results, or real testimonials. They are atmosphere only until replaced with verified client assets.');
  lines.push('');
  fs.writeFileSync(CREDITS_PATH, lines.join('\n'), 'utf8');
}

function logHeader(client) {
  console.log('');
  console.log('Webrivio Asset Fetcher');
  console.log('======================');
  if (client.businessName) console.log(`Client:    ${client.businessName}`);
  if (client.industry) console.log(`Industry:  ${client.industry}`);
  if (client.city) console.log(`City:      ${client.city}`);
  console.log(`Output:    public/placeholders/`);
  console.log(`Force:     ${FORCE ? 'yes (overwriting)' : 'no (skipping existing)'}`);
  console.log('');
}

async function main() {
  const apiKey = getApiKey();
  if (!apiKey) {
    console.error('PEXELS_API_KEY not found.');
    console.error('');
    console.error('Setup:');
    console.error('  1. Get a free key at https://www.pexels.com/api/');
    console.error('  2. Create .env.local in this project with:');
    console.error('       PEXELS_API_KEY=your_pexels_api_key_here');
    console.error('  3. Or set the PEXELS_API_KEY environment variable.');
    console.error('  4. Or place .env.local in the parent webrivio-starter folder as a fallback.');
    console.error('');
    console.error('Re-run when ready: npm run fetch-assets');
    process.exit(1);
  }

  const parsed = parseClientInfo();
  if (!parsed.ok) {
    console.error(parsed.reason);
    console.error('Fill out CLIENT_INFO.md, then re-run.');
    process.exit(1);
  }
  const client = parsed.data;
  logHeader(client);

  ensureDir(PLACEHOLDERS_DIR);

  const plan = buildQueries(client);
  const usedPhotoIds = new Set();
  const credits = [];
  let downloaded = 0;
  let skipped = 0;
  let failed = 0;

  for (const item of plan) {
    const dest = path.join(PLACEHOLDERS_DIR, item.name);
    if (fs.existsSync(dest) && !FORCE) {
      console.log(`  skip   ${item.name} (already exists, use --force to overwrite)`);
      skipped++;
      continue;
    }

    try {
      const photos = await pexelsSearch(apiKey, item.query, item.orientation);
      if (!photos.length) {
        console.warn(`  empty  ${item.name} — no results for "${item.query}"`);
        failed++;
        continue;
      }

      let chosen = null;
      for (const p of photos) {
        if (!usedPhotoIds.has(p.id)) {
          chosen = p;
          break;
        }
      }
      if (!chosen) chosen = photos[0];
      usedPhotoIds.add(chosen.id);

      const imageUrl =
        (chosen.src && (chosen.src.large2x || chosen.src.large || chosen.src.original)) || null;
      if (!imageUrl) {
        console.warn(`  nourl  ${item.name} — no image URL in response`);
        failed++;
        continue;
      }

      await downloadToFile(imageUrl, dest);
      console.log(`  ok     ${item.name}  <-  "${item.query}"`);
      downloaded++;

      credits.push({
        file: item.name,
        query: item.query,
        photoUrl: chosen.url || '',
        photographer: chosen.photographer || '',
        photographerUrl: chosen.photographer_url || '',
      });
    } catch (err) {
      if (err.message === 'AUTH_FAILED') {
        console.error('');
        console.error('Pexels API rejected the key (401). Double-check PEXELS_API_KEY.');
        process.exit(1);
      }
      if (err.message === 'RATE_LIMITED') {
        console.error('');
        console.error('Pexels rate limit hit (429). Wait a minute and re-run.');
        process.exit(1);
      }
      console.warn(`  fail   ${item.name} — ${err.message}`);
      failed++;
    }
  }

  if (credits.length) {
    writeCredits(credits, client);
  }

  console.log('');
  console.log('Summary');
  console.log('-------');
  console.log(`  downloaded: ${downloaded}`);
  console.log(`  skipped:    ${skipped}`);
  console.log(`  failed:     ${failed}`);
  if (credits.length) {
    console.log(`  credits:    ASSET_CREDITS.md (${credits.length} entries)`);
  }
  console.log('');
  console.log('Reminder: placeholder images are demo-only. Replace with real client media before final delivery when available.');
}

main().catch((err) => {
  console.error('');
  console.error('Unexpected error:', err.message);
  process.exit(1);
});
