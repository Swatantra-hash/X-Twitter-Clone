// ─── STATE ───────────────────────────────────────────────────────────────────
let currentPage = 'home';
let bookmarkCount = 0;
let bookmarkedPosts = [];
let userPosts = [];
let activeTab = 'foryou';
let grokResponses = [
    "That's a great question! Let me think about that... 🤔",
    "I'd say the answer depends on context. Could you tell me more?",
    "Interesting! Here's my take: the key is to start small and iterate.",
    "Fun fact: did you know JavaScript was created in just 10 days? Wild, right?",
    "I'm an AI, but even I think that's a cool idea! 🚀",
    "Based on current trends, I'd recommend focusing on TypeScript + React.",
    "Let me break that down for you step by step...",
    "Great point! This is something a lot of developers struggle with.",
    "The short answer: yes. The long answer: it depends on your use case.",
    "I've analyzed billions of posts and the consensus is... it's complicated 😄"
];
let grokIdx = 0;

// ─── ROUTER ─────────────────────────────────────────────────────────────────
function navigateTo(page) {
    currentPage = page;
    window.location.hash = '#/' + page;
    const main = document.getElementById('page-content');
    const composeArea = document.getElementById('compose-area');
    const tabBar = document.getElementById('home-tab-bar');
    const rightSidebar = document.getElementById('right-sidebar');

    // Hide home-specific elements for non-home pages
    if (composeArea) composeArea.style.display = page === 'home' ? '' : 'none';
    if (tabBar) tabBar.style.display = page === 'home' ? '' : 'none';
    if (rightSidebar) rightSidebar.style.display = (page === 'messages' || page === 'grok') ? 'none' : '';

    // Update sidebar active state
    document.querySelectorAll('.nav-link').forEach(el => {
        const isActive = el.dataset.page === page;
        el.classList.toggle('font-bold', isActive);
        el.classList.toggle('text-[#1d9bf0]', isActive);
    });

    // Update title
    const titles = { home: 'Home / X', explore: 'Explore / X', notifications: 'Notifications / X', grok: 'Grok / X', messages: 'Messages / X', lists: 'Lists / X', bookmarks: 'Bookmarks / X', communities: 'Communities / X', premium: 'Premium / X', profile: 'Profile / X' };
    document.title = titles[page] || 'X';

    // Render page
    switch (page) {
        case 'home': renderHomeContent(); break;
        case 'explore': main.innerHTML = renderExplorePage(); break;
        case 'notifications': main.innerHTML = renderNotificationsPage(); break;
        case 'grok': main.innerHTML = renderGrokPage(); break;
        case 'messages': main.innerHTML = renderMessagesPage(); break;
        case 'lists': main.innerHTML = renderListsPage(); break;
        case 'bookmarks': main.innerHTML = renderBookmarksPage(); break;
        case 'communities': main.innerHTML = renderCommunitiesPage(); break;
        case 'premium': main.innerHTML = renderPremiumPage(); break;
        case 'profile': main.innerHTML = renderProfilePage(); renderProfilePosts(); break;
        default: renderHomeContent();
    }
    window.scrollTo({ top: 0 });
}

function renderHomeContent() {
    const main = document.getElementById('page-content');
    const posts = shuffle(ALL_POSTS);
    let html = '<div id="posts-foryou" class="divide-y divide-gray-800">';
    posts.forEach((p, i) => { html += renderPostHTML(p, i); });
    html += `<div id="scroll-sentinel" class="h-12 flex items-center justify-center"><div id="load-spinner" class="hidden"><div class="w-6 h-6 border-2 border-gray-700 border-t-[#1d9bf0] rounded-full animate-spin"></div></div></div>`;
    html += '</div>';
    html += '<div id="posts-following" class="hidden"><div id="following-empty" class="flex flex-col items-center justify-center py-16 px-6 text-center"><div class="w-16 h-16 rounded-full bg-[#1d9bf0]/10 flex items-center justify-center mb-4"><span class="material-symbols-outlined text-[32px] text-[#1d9bf0]">group</span></div><h2 class="text-xl font-bold mb-2">Follow people to see their posts</h2><p class="text-gray-500 text-sm max-w-xs">When you follow someone, their posts will show up here.</p></div><div id="following-posts" class="divide-y divide-gray-800"></div></div>';
    main.innerHTML = html;
}

function renderProfilePosts() {
    const el = document.getElementById('profile-posts');
    if (!el) return;
    let html = '';
    userPosts.forEach((p, i) => {
        html += `<article class="flex gap-3 p-4 hover:bg-white/[0.03] transition-colors cursor-pointer">
      <div class="w-10 h-10 rounded-full bg-gray-700 flex-shrink-0 flex items-center justify-center"><span class="material-symbols-outlined text-[18px] text-gray-400">person</span></div>
      <div class="flex-1 min-w-0"><div class="flex items-center gap-1 text-sm"><span class="font-bold">Swatantra Trivedi</span><span class="text-gray-500 text-xs">@unfazedswatantra · just now</span></div>
      <p class="mt-1 text-sm text-gray-100">${escapeHtml(p)}</p></div></article>`;
    });
    if (html === '') html = '<div class="p-8 text-center text-gray-500">No posts yet. Compose your first post!</div>';
    el.innerHTML = html;
}

// ─── COUNT UTILS ─────────────────────────────────────────────────────────────
function parseCount(s) { s = String(s).trim(); if (s.endsWith('M')) return Math.round(parseFloat(s) * 1e6); if (s.endsWith('k')) return Math.round(parseFloat(s) * 1e3); return parseInt(s, 10) || 0; }
function formatCount(n) { if (n >= 1e6) return (n / 1e6).toFixed(1).replace(/\.0$/, '') + 'M'; if (n >= 1e3) return (n / 1e3).toFixed(1).replace(/\.0$/, '') + 'k'; return String(n); }
function animateCount(el, val, dir) { el.classList.remove('count-up', 'count-down'); void el.offsetWidth; el.textContent = val; el.classList.add(dir === 'up' ? 'count-up' : 'count-down'); }
function escapeHtml(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

// ─── LIKE ────────────────────────────────────────────────────────────────────
function toggleLike(btn) {
    const icon = btn.querySelector('.material-symbols-outlined'), label = btn.querySelector('.count'), liked = btn.dataset.liked === 'true';
    if (!btn.dataset.baseNum) btn.dataset.baseNum = parseCount(label.textContent);
    const base = +btn.dataset.baseNum; btn.dataset.liked = String(!liked);
    if (!liked) { icon.style.color = '#ec4899'; icon.classList.add('heart-pop'); animateCount(label, formatCount(base + 1), 'up'); setTimeout(() => icon.classList.remove('heart-pop'), 450); }
    else { icon.style.color = ''; animateCount(label, formatCount(base), 'down'); }
}

// ─── RETWEET ─────────────────────────────────────────────────────────────────
function toggleRetweet(btn) {
    const icon = btn.querySelector('.material-symbols-outlined'), label = btn.querySelector('.count'), rted = btn.dataset.rted === 'true';
    if (!btn.dataset.baseNum) btn.dataset.baseNum = parseCount(label.textContent);
    const base = +btn.dataset.baseNum; btn.dataset.rted = String(!rted);
    if (!rted) { icon.style.color = '#4ade80'; icon.classList.add('rt-spin'); animateCount(label, formatCount(base + 1), 'up'); setTimeout(() => icon.classList.remove('rt-spin'), 450); }
    else { icon.style.color = ''; animateCount(label, formatCount(base), 'down'); }
}

// ─── BOOKMARK ────────────────────────────────────────────────────────────────
function toggleBookmark(btn, postIdx) {
    const icon = btn.querySelector('.material-symbols-outlined'), saved = btn.dataset.saved === 'true', badge = document.getElementById('bookmark-badge');
    btn.dataset.saved = String(!saved);
    if (!saved) { icon.style.color = '#1d9bf0'; icon.classList.add('bookmark-pop'); bookmarkCount++; bookmarkedPosts.push(postIdx); setTimeout(() => icon.classList.remove('bookmark-pop'), 380); }
    else { icon.style.color = ''; bookmarkCount = Math.max(0, bookmarkCount - 1); bookmarkedPosts = bookmarkedPosts.filter(i => i !== postIdx); }
    if (badge) { badge.textContent = bookmarkCount; if (bookmarkCount > 0) { badge.classList.remove('hidden'); badge.classList.add('flex'); } else { badge.classList.add('hidden'); badge.classList.remove('flex'); } }
}

// ─── REPLY ───────────────────────────────────────────────────────────────────
function toggleReply(id) { const box = document.getElementById('reply-box-' + id); if (box) { box.classList.toggle('open'); if (box.classList.contains('open')) setTimeout(() => box.querySelector('input')?.focus(), 350); } }
function submitReply(btn, idx) {
    const input = btn.closest('.reply-box').querySelector('input');
    if (!input || !input.value.trim()) return;
    const replyText = input.value;
    input.value = '';
    const replyEl = document.createElement('div');
    replyEl.className = 'flex gap-2 mt-2';
    replyEl.innerHTML = `<div class="w-6 h-6 rounded-full bg-gray-700 flex-shrink-0 flex items-center justify-center"><span class="material-symbols-outlined text-[12px] text-gray-400">person</span></div>
    <div><div class="text-xs"><b>Swatantra Trivedi</b> <span class="text-gray-500">@unfazedswatantra · now</span></div><p class="text-xs text-gray-300">${escapeHtml(replyText)}</p></div>`;
    btn.closest('.reply-box').appendChild(replyEl);
}

// ─── VIEWS ───────────────────────────────────────────────────────────────────
function tickViews(btn) {
    const span = btn.querySelector('.view-num'); if (!btn.dataset.baseNum) btn.dataset.baseNum = parseCount(span.textContent);
    const next = +btn.dataset.baseNum + Math.floor(Math.random() * 500 + 100); btn.dataset.baseNum = next;
    span.classList.add('tick-anim'); setTimeout(() => { span.textContent = formatCount(next); span.classList.remove('tick-anim'); }, 200);
}

// ─── COMPOSE ─────────────────────────────────────────────────────────────────
function updateCharCount(el) {
    const len = el.value.length, max = 280, rem = max - len, ring = document.getElementById('char-ring-fill'), lbl = document.getElementById('char-count');
    if (!ring) return;
    ring.style.strokeDashoffset = 75.4 - (75.4 * len / max);
    if (rem <= 20) { const color = rem <= 0 ? '#f4212e' : '#ffd400'; ring.style.stroke = color; lbl.textContent = rem; lbl.style.color = color; }
    else { ring.style.stroke = '#1d9bf0'; lbl.textContent = ''; }
}

function submitPost() {
    const input = document.getElementById('compose-input'); if (!input || !input.value.trim()) return;
    userPosts.unshift(input.value);
    const container = document.getElementById('posts-foryou');
    if (container) {
        const art = document.createElement('article');
        art.className = 'flex gap-3 p-4 hover:bg-white/[0.03] transition-colors cursor-pointer border-b border-gray-800';
        art.innerHTML = `<div class="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-700 flex-shrink-0 flex items-center justify-center"><span class="material-symbols-outlined text-[18px] text-gray-400">person</span></div>
      <div class="flex-1 min-w-0"><div class="flex items-center gap-1 text-sm flex-wrap"><span class="font-bold">Swatantra Trivedi</span><span class="text-gray-500 text-xs">@unfazedswatantra · just now</span></div>
      <p class="mt-1 text-sm text-gray-100">${escapeHtml(input.value)}</p>
      <div class="action-bar"><button onclick="toggleLike(this)" class="action-btn like-btn"><span class="material-symbols-outlined">favorite</span><span class="count">0</span></button><button onclick="toggleBookmark(this,-1)" class="action-btn bk-btn"><span class="material-symbols-outlined">bookmark</span></button></div></div>`;
        container.insertBefore(art, container.firstChild);
        spawnConfetti(document.getElementById('submit-post'));
    }
    input.value = ''; updateCharCount(input);
}

function openComposeModal() {
    document.getElementById('compose-modal').classList.remove('hidden');
    document.getElementById('compose-modal').classList.add('flex');
    setTimeout(() => document.getElementById('modal-compose-input')?.focus(), 100);
}
function closeComposeModal() {
    document.getElementById('compose-modal').classList.add('hidden');
    document.getElementById('compose-modal').classList.remove('flex');
}
function submitModalPost() {
    const input = document.getElementById('modal-compose-input'); if (!input || !input.value.trim()) return;
    userPosts.unshift(input.value);
    if (currentPage === 'home') { navigateTo('home'); }
    input.value = ''; closeComposeModal();
}

// ─── CONFETTI ────────────────────────────────────────────────────────────────
function spawnConfetti(el) {
    if (!el) return; const r = el.getBoundingClientRect(); const x = r.left + r.width / 2; const y = r.top;
    const colors = ['#1d9bf0', '#ec4899', '#4ade80', '#fbbf24', '#a78bfa', '#f87171'];
    for (let i = 0; i < 28; i++) { const c = document.createElement('div'); c.className = 'confetti-piece'; c.style.cssText = `left:${x + (Math.random() - .5) * 120}px;top:${y}px;background:${colors[i % colors.length]};animation-delay:${Math.random() * .3}s;animation-duration:${.7 + Math.random() * .6}s;border-radius:${Math.random() > .5 ? '50%' : '2px'}`; document.body.appendChild(c); setTimeout(() => c.remove(), 1400); }
}

// ─── LIGHTBOX ────────────────────────────────────────────────────────────────
function openLightbox(el) { document.getElementById('lightbox-img').src = el.querySelector('img').src; document.getElementById('lightbox').classList.add('open'); document.body.style.overflow = 'hidden'; }
function closeLightbox() { document.getElementById('lightbox').classList.remove('open'); document.body.style.overflow = ''; }

// ─── THEME ───────────────────────────────────────────────────────────────────
function setTheme(t) {
    document.body.classList.remove('dim', 'light'); if (t !== 'dark') document.body.classList.add(t);
    ['dark', 'dim', 'light'].forEach(id => { const el = document.getElementById('theme-' + id); if (el) el.style.borderColor = id === t ? '#1d9bf0' : ''; });
    localStorage.setItem('x-theme', t);
}

// ─── TAB SWITCH ──────────────────────────────────────────────────────────────
function switchTab(tab) {
    activeTab = tab;
    const foryou = document.getElementById('posts-foryou'), following = document.getElementById('posts-following');
    const btnFY = document.getElementById('tab-foryou'), btnFW = document.getElementById('tab-following');
    if (!foryou || !following) return;
    foryou.classList.toggle('hidden', tab !== 'foryou'); following.classList.toggle('hidden', tab === 'foryou');
    if (btnFY) btnFY.classList.toggle('text-gray-500', tab !== 'foryou'); if (btnFW) btnFW.classList.toggle('text-gray-500', tab !== 'following');
}

// ─── GROK ────────────────────────────────────────────────────────────────────
function sendGrokMsg() {
    const input = document.getElementById('grok-input'), msgs = document.getElementById('grok-messages');
    if (!input || !input.value.trim() || !msgs) return;
    const text = input.value; input.value = '';
    msgs.innerHTML += `<div class="flex gap-3 justify-end"><div class="bg-[#1d9bf0] rounded-2xl rounded-tr-sm px-4 py-3 max-w-[85%]"><p class="text-sm text-white">${escapeHtml(text)}</p></div></div>`;
    setTimeout(() => {
        const reply = grokResponses[grokIdx % grokResponses.length]; grokIdx++;
        msgs.innerHTML += `<div class="flex gap-3"><div class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex-shrink-0 flex items-center justify-center"><svg viewBox="0 0 24 24" class="w-4 h-4" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13l-4 8 8-4-8 4 4-8z"/></svg></div>
    <div class="bg-[#16181c] rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%]"><p class="text-sm text-gray-200">${reply}</p></div></div>`;
        msgs.scrollTop = msgs.scrollHeight;
    }, 800);
    msgs.scrollTop = msgs.scrollHeight;
}

// ─── MESSAGES ────────────────────────────────────────────────────────────────
function openConversation(id) {
    const conv = MESSAGES_DATA.find(c => c.id === id); if (!conv) return;
    const av = AVATARS[conv.avatar % AVATARS.length];
    let bubbles = conv.messages.map(m => {
        if (m.from === 'me') return `<div class="flex justify-end"><div class="bg-[#1d9bf0] rounded-2xl rounded-tr-sm px-4 py-2 max-w-[75%]"><p class="text-sm text-white">${m.text}</p><span class="text-[10px] text-blue-200">${m.time}</span></div></div>`;
        return `<div class="flex gap-2"><img class="w-8 h-8 rounded-full object-cover" src="${av}" alt=""><div class="bg-[#16181c] rounded-2xl rounded-tl-sm px-4 py-2 max-w-[75%]"><p class="text-sm text-gray-200">${m.text}</p><span class="text-[10px] text-gray-500">${m.time}</span></div></div>`;
    }).join('');
    const chat = document.getElementById('msg-chat'), list = document.getElementById('msg-list');
    if (list) list.classList.add('hidden'); if (!chat) return;
    chat.classList.remove('hidden');
    chat.innerHTML = `<div class="sticky top-0 z-10 bg-black/80 backdrop-blur-md border-b border-gray-800 px-4 py-2 flex items-center gap-3">
    <button onclick="closeConversation()" class="p-2 rounded-full hover:bg-gray-900"><span class="material-symbols-outlined">arrow_back</span></button>
    <img class="w-8 h-8 rounded-full object-cover" src="${av}" alt=""><div><div class="font-bold text-sm">${conv.name}</div><div class="text-xs text-gray-500">${conv.handle}</div></div></div>
  <div id="chat-bubbles" class="p-4 space-y-3 min-h-[60vh]">${bubbles}</div>
  <div class="sticky bottom-0 p-3 border-t border-gray-800 bg-black"><div class="flex gap-2">
    <input id="msg-input" class="flex-1 bg-[#202327] text-white px-4 py-2.5 rounded-full text-sm outline-none focus:ring-2 focus:ring-[#1d9bf0] placeholder-gray-500" placeholder="Start a new message" onkeydown="if(event.key==='Enter')sendMsg(${id})">
    <button onclick="sendMsg(${id})" class="text-[#1d9bf0] p-2 rounded-full hover:bg-[#1d9bf0]/10"><span class="material-symbols-outlined">send</span></button></div></div>`;
}
function closeConversation() {
    const chat = document.getElementById('msg-chat'), list = document.getElementById('msg-list');
    if (chat) chat.classList.add('hidden'); if (list) list.classList.remove('hidden');
}
function sendMsg(convId) {
    const input = document.getElementById('msg-input'), bubbles = document.getElementById('chat-bubbles');
    if (!input || !input.value.trim() || !bubbles) return;
    bubbles.innerHTML += `<div class="flex justify-end"><div class="bg-[#1d9bf0] rounded-2xl rounded-tr-sm px-4 py-2 max-w-[75%]"><p class="text-sm text-white">${escapeHtml(input.value)}</p><span class="text-[10px] text-blue-200">now</span></div></div>`;
    input.value = ''; bubbles.scrollTop = bubbles.scrollHeight;
}

// ─── FOLLOW (from right sidebar) ─────────────────────────────────────────────
function toggleFollow(btn) {
    const following = btn.dataset.following === 'true'; btn.dataset.following = String(!following);
    if (!following) { btn.textContent = 'Following'; btn.classList.remove('bg-white', 'text-black', 'hover:bg-gray-200'); btn.classList.add('bg-transparent', 'text-white', 'border', 'border-gray-600'); }
    else { btn.textContent = 'Follow'; btn.classList.remove('bg-transparent', 'text-white', 'border', 'border-gray-600'); btn.classList.add('bg-white', 'text-black', 'hover:bg-gray-200'); }
}

// ─── SEARCH FILTER ───────────────────────────────────────────────────────────
function filterPosts(q) { document.querySelectorAll('#posts-foryou article').forEach(p => { p.style.display = (!q.trim() || p.innerText.toLowerCase().includes(q.toLowerCase())) ? '' : 'none'; }); }

// ─── INIT ────────────────────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('x-theme'); if (saved) setTheme(saved);
    const hash = window.location.hash.replace('#/', '') || 'home';
    setTimeout(() => {
        document.getElementById('skeletons')?.remove();
        navigateTo(hash);
    }, 1200);
});
window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#/', '') || 'home';
    if (hash !== currentPage) navigateTo(hash);
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeLightbox(); closeComposeModal(); } });
