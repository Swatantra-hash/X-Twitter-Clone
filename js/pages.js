// ─── PAGE RENDERERS ─────────────────────────────────────────────────────────
function renderPostHTML(p, idx) {
    const av = typeof p.avatar === 'number' ? AVATARS[p.avatar % AVATARS.length] : p.avatar;
    const imgHTML = p.img !== null && p.img !== undefined
        ? `<div class="mt-2 rounded-xl sm:rounded-2xl overflow-hidden border border-gray-800 cursor-zoom-in" onclick="openLightbox(this)"><img class="w-full object-cover hover:opacity-95 transition-opacity" src="${POST_IMAGES[p.img % POST_IMAGES.length]}" alt="" loading="lazy"></div>` : '';
    const vBadge = p.verified ? '<svg class="w-4 h-4 inline ml-0.5" viewBox="0 0 24 24" fill="#1d9bf0"><path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81C14.67 2.88 13.43 2 12 2s-2.67.88-3.34 2.19c-1.39-.46-2.9-.2-3.91.81s-1.27 2.52-.81 3.91C2.88 9.33 2 10.57 2 12s.88 2.67 2.19 3.34c-.46 1.39-.2 2.9.81 3.91s2.52 1.27 3.91.81C9.33 21.12 10.57 22 12 22s2.67-.88 3.34-2.19c1.39.46 2.9.2 3.91-.81s1.27-2.52.81-3.91C21.12 14.67 22 13.43 22 12zm-11.07 4.83l-3.54-3.54 1.41-1.41 2.13 2.12 4.24-4.24 1.41 1.42-5.65 5.65z"/></svg>' : '';
    const textHTML = escapeHtml(p.text).replace(/\n/g, '<br>');
    return `<article class="flex gap-3 p-4 hover:bg-white/[0.03] transition-colors cursor-pointer" data-post-idx="${idx}">
    <img class="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover flex-shrink-0" src="${av}" alt="" loading="lazy">
    <div class="flex-1 min-w-0">
      <div class="flex items-center gap-1 flex-wrap text-sm">
        <span class="font-bold hover:underline cursor-pointer">${p.name}</span>${vBadge}
        <span class="text-gray-500 text-xs sm:text-sm">${p.handle} · ${p.time}</span>
      </div>
      <p class="mt-1 text-sm sm:text-[15px] leading-relaxed text-gray-100">${textHTML}</p>
      ${imgHTML}
      <div class="action-bar">
        <button onclick="toggleReply(${idx})" class="action-btn reply-btn"><span class="material-symbols-outlined">chat_bubble</span><span class="count">${p.replies || '0'}</span></button>
        <button onclick="toggleRetweet(this)" class="action-btn rt-btn"><span class="material-symbols-outlined">repeat</span><span class="count">${p.rts}</span></button>
        <button onclick="toggleLike(this)" class="action-btn like-btn"><span class="material-symbols-outlined">favorite</span><span class="count">${p.likes}</span></button>
        <button onclick="tickViews(this)" class="action-btn views-btn"><span class="material-symbols-outlined">bar_chart</span><span class="count view-num">${p.views}</span></button>
        <button onclick="toggleBookmark(this,${idx})" class="action-btn bk-btn"><span class="material-symbols-outlined">bookmark</span></button>
      </div>
      <div class="reply-box" id="reply-box-${idx}">
        <div class="flex gap-2 mt-3 pt-3 border-t border-gray-800">
          <div class="w-8 h-8 rounded-full bg-gray-700 flex-shrink-0 flex items-center justify-center"><span class="material-symbols-outlined text-[14px] text-gray-400">person</span></div>
          <div class="flex-1 min-w-0">
            <input class="w-full bg-transparent text-white text-sm placeholder-gray-600 outline-none py-1 border-b border-gray-700 focus:border-[#1d9bf0] transition-colors" placeholder="Post your reply…">
            <div class="flex justify-end mt-2"><button onclick="submitReply(this,${idx})" class="bg-[#1d9bf0] text-white text-xs font-bold px-4 py-1.5 rounded-full hover:bg-[#1a8cd8]">Reply</button></div>
          </div>
        </div>
      </div>
    </div>
  </article>`;
}

function renderHomePage() {
    const posts = shuffle(ALL_POSTS);
    let html = '';
    posts.forEach((p, i) => { html += renderPostHTML(p, i); });
    html += `<div id="scroll-sentinel" class="h-12 flex items-center justify-center"><div id="load-spinner" class="hidden"><div class="w-6 h-6 border-2 border-gray-700 border-t-[#1d9bf0] rounded-full animate-spin"></div></div></div>`;
    return html;
}

function renderExplorePage() {
    const tabs = ['For You', 'Trending', 'News', 'Sports', 'Entertainment'];
    let tabHTML = tabs.map((t, i) => `<button onclick="switchExploreTab(${i})" class="explore-tab flex-1 py-3 text-sm font-bold ${i === 0 ? 'text-white' : 'text-gray-500'} hover:bg-gray-900/40 transition-colors">${t}</button>`).join('');
    let topicsHTML = '';
    TRENDING_TOPICS.forEach(t => {
        const badge = t.badge ? `<span class="badge-${t.badge} text-[9px] font-bold px-1.5 py-0.5 rounded-full whitespace-nowrap">${t.badge === 'breaking' ? '🔴 BREAKING' : t.badge === 'hot' ? '🔥 HOT' : '🟢 NEW'}</span>` : '';
        topicsHTML += `<div class="px-4 py-3 hover:bg-gray-800/60 cursor-pointer transition-colors border-b border-gray-800">
      <div class="flex items-center justify-between gap-2"><div class="text-xs text-gray-500">${t.category} · Trending</div>${badge}</div>
      <div class="font-bold text-[15px] mt-0.5">${t.tag}</div>
      <div class="text-xs text-gray-500">${t.posts} posts</div>
    </div>`;
    });
    return `<div class="sticky top-0 z-10 bg-black/80 backdrop-blur-md border-b border-gray-800">
    <div class="p-3"><div class="relative"><span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-[20px] pointer-events-none">search</span>
    <input type="text" class="w-full bg-[#202327] text-white pl-10 pr-4 py-2.5 rounded-full placeholder-gray-500 outline-none focus:ring-2 focus:ring-[#1d9bf0] text-sm" placeholder="Search"></div></div>
    <div class="flex">${tabHTML}</div>
  </div>${topicsHTML}`;
}

function renderNotificationsPage() {
    const tabs = ['All', 'Verified', 'Mentions'];
    let tabHTML = tabs.map((t, i) => `<button class="flex-1 py-3 text-sm font-bold ${i === 0 ? 'text-white' : 'text-gray-500'} hover:bg-gray-900/40 transition-colors">${t}</button>`).join('');
    let items = '';
    NOTIFICATIONS_DATA.forEach(n => {
        const av = AVATARS[n.avatar % AVATARS.length];
        const icon = n.type === 'like' ? 'favorite' : n.type === 'retweet' ? 'repeat' : n.type === 'follow' ? 'person_add' : 'alternate_email';
        const iconColor = n.type === 'like' ? 'text-pink-500' : n.type === 'retweet' ? 'text-green-400' : n.type === 'follow' ? 'text-[#1d9bf0]' : 'text-purple-400';
        const target = n.target ? `<p class="text-gray-500 text-sm mt-1">${n.target}</p>` : '';
        items += `<div class="flex gap-3 p-4 hover:bg-white/[0.03] transition-colors cursor-pointer border-b border-gray-800">
      <div class="flex-shrink-0 w-8 flex justify-center pt-1"><span class="material-symbols-outlined ${iconColor} text-[20px]">${icon}</span></div>
      <div class="flex-1 min-w-0">
        <img class="w-8 h-8 rounded-full object-cover mb-1" src="${av}" alt="" loading="lazy">
        <p class="text-sm"><span class="font-bold">${n.user}</span> <span class="text-gray-400">${n.text}</span></p>
        ${target}
        <span class="text-xs text-gray-600 mt-1">${n.time}</span>
      </div>
    </div>`;
    });
    return `<div class="sticky top-0 z-10 bg-black/80 backdrop-blur-md border-b border-gray-800">
    <h1 class="text-xl font-bold px-4 py-3">Notifications</h1>
    <div class="flex">${tabHTML}</div>
  </div>${items}`;
}

function renderGrokPage() {
    return `<div class="sticky top-0 z-10 bg-black/80 backdrop-blur-md border-b border-gray-800 px-4 py-3 flex items-center gap-3">
    <svg viewBox="0 0 24 24" class="w-6 h-6" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13l-4 8 8-4-8 4 4-8z"/></svg>
    <h1 class="text-xl font-bold">Grok</h1></div>
  <div id="grok-messages" class="flex-1 p-4 space-y-4 min-h-[60vh]">
    <div class="flex gap-3"><div class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex-shrink-0 flex items-center justify-center"><svg viewBox="0 0 24 24" class="w-4 h-4" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13l-4 8 8-4-8 4 4-8z"/></svg></div>
    <div class="bg-[#16181c] rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%]"><p class="text-sm text-gray-200">Hey! I'm Grok, your AI assistant. I can help with coding, answer questions, or just chat. What's on your mind? 🤖</p></div></div>
  </div>
  <div class="sticky bottom-0 p-4 border-t border-gray-800 bg-black">
    <div class="flex gap-2"><input id="grok-input" class="flex-1 bg-[#202327] text-white px-4 py-3 rounded-full text-sm outline-none focus:ring-2 focus:ring-[#1d9bf0] placeholder-gray-500" placeholder="Ask Grok anything..." onkeydown="if(event.key==='Enter')sendGrokMsg()">
    <button onclick="sendGrokMsg()" class="bg-[#1d9bf0] hover:bg-[#1a8cd8] text-white px-4 py-2 rounded-full transition-colors"><span class="material-symbols-outlined text-[20px]">send</span></button></div>
  </div>`;
}

function renderMessagesPage() {
    let convList = '';
    MESSAGES_DATA.forEach(c => {
        const av = AVATARS[c.avatar % AVATARS.length];
        const last = c.messages[c.messages.length - 1];
        convList += `<div onclick="openConversation(${c.id})" class="msg-conv flex items-center gap-3 px-4 py-3 hover:bg-white/[0.03] cursor-pointer transition-colors border-b border-gray-800" data-conv="${c.id}">
      <img class="w-12 h-12 rounded-full object-cover flex-shrink-0" src="${av}" alt="" loading="lazy">
      <div class="flex-1 min-w-0"><div class="flex justify-between"><span class="font-bold text-sm">${c.name}</span><span class="text-xs text-gray-500">${last.time}</span></div>
      <p class="text-sm text-gray-500 truncate">${last.text}</p></div>
    </div>`;
    });
    return `<div class="sticky top-0 z-10 bg-black/80 backdrop-blur-md border-b border-gray-800 px-4 py-3 flex items-center justify-between">
    <h1 class="text-xl font-bold">Messages</h1>
    <span class="material-symbols-outlined text-gray-400 cursor-pointer hover:text-white">settings</span></div>
  <div id="msg-list">${convList}</div>
  <div id="msg-chat" class="hidden"></div>`;
}

function renderListsPage() {
    let html = `<div class="sticky top-0 z-10 bg-black/80 backdrop-blur-md border-b border-gray-800 px-4 py-3 flex items-center justify-between">
    <div><h1 class="text-xl font-bold">Lists</h1><p class="text-xs text-gray-500">@unfazedswatantra</p></div>
    <button class="bg-[#1d9bf0] hover:bg-[#1a8cd8] text-white text-sm font-bold px-4 py-2 rounded-full"><span class="material-symbols-outlined text-[16px] align-middle mr-1">add</span>New</button></div>
  <div class="p-4"><h2 class="font-bold mb-3">Discover new Lists</h2>`;
    LISTS_DATA.forEach(l => {
        html += `<div class="flex items-center justify-between p-3 rounded-xl hover:bg-white/[0.03] transition-colors cursor-pointer mb-1">
      <div class="flex items-center gap-3"><div class="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1d9bf0] to-purple-500 flex items-center justify-center"><span class="material-symbols-outlined text-white text-[20px]">list</span></div>
      <div><div class="font-bold text-sm">${l.name}</div><p class="text-xs text-gray-500">${l.desc}</p>
      <div class="text-xs text-gray-600 mt-0.5">${l.members} members · ${l.followers} followers</div></div></div>
      <button onclick="this.textContent=this.textContent==='Follow'?'Following':'Follow';this.classList.toggle('bg-white');this.classList.toggle('text-black');this.classList.toggle('bg-transparent');this.classList.toggle('text-white');this.classList.toggle('border-gray-600')" class="bg-white text-black text-sm font-bold px-4 py-1.5 rounded-full hover:bg-gray-200 transition-colors">Follow</button>
    </div>`;
    });
    return html + '</div>';
}

function renderBookmarksPage() {
    if (bookmarkedPosts.length === 0) {
        return `<div class="sticky top-0 z-10 bg-black/80 backdrop-blur-md border-b border-gray-800 px-4 py-3"><h1 class="text-xl font-bold">Bookmarks</h1><p class="text-xs text-gray-500">@unfazedswatantra</p></div>
    <div class="flex flex-col items-center justify-center py-20 px-6 text-center">
      <div class="w-16 h-16 rounded-full bg-[#1d9bf0]/10 flex items-center justify-center mb-4"><span class="material-symbols-outlined text-[32px] text-[#1d9bf0]">bookmark</span></div>
      <h2 class="text-2xl font-bold mb-2">Save posts for later</h2>
      <p class="text-gray-500 text-sm max-w-xs">Bookmark posts to easily find them again in the future.</p></div>`;
    }
    let html = `<div class="sticky top-0 z-10 bg-black/80 backdrop-blur-md border-b border-gray-800 px-4 py-3"><h1 class="text-xl font-bold">Bookmarks</h1><p class="text-xs text-gray-500">@unfazedswatantra</p></div><div class="divide-y divide-gray-800">`;
    bookmarkedPosts.forEach(idx => {
        if (ALL_POSTS[idx]) html += renderPostHTML(ALL_POSTS[idx], idx);
    });
    return html + '</div>';
}

function renderCommunitiesPage() {
    let cards = '';
    COMMUNITIES_DATA.forEach(c => {
        cards += `<div class="p-4 rounded-2xl border border-gray-800 hover:border-gray-600 transition-colors cursor-pointer">
      <div class="flex items-center gap-2 mb-2"><div class="w-10 h-10 rounded-full flex items-center justify-center" style="background:${c.color}20"><span class="material-symbols-outlined" style="color:${c.color}">group</span></div>
      <div><div class="font-bold text-sm">${c.name}</div><span class="text-[10px] px-1.5 py-0.5 rounded-full bg-gray-800 text-gray-400">${c.category}</span></div></div>
      <p class="text-sm text-gray-400 mb-3">${c.desc}</p>
      <div class="flex items-center justify-between"><span class="text-xs text-gray-500">${c.members} members</span>
      <button onclick="this.textContent=this.textContent==='Join'?'Joined':'Join';this.classList.toggle('bg-[#1d9bf0]');this.classList.toggle('bg-transparent');this.classList.toggle('border');this.classList.toggle('border-gray-600')" class="bg-[#1d9bf0] hover:bg-[#1a8cd8] text-white text-sm font-bold px-4 py-1.5 rounded-full transition-colors">Join</button></div>
    </div>`;
    });
    return `<div class="sticky top-0 z-10 bg-black/80 backdrop-blur-md border-b border-gray-800 px-4 py-3"><h1 class="text-xl font-bold">Communities</h1></div>
  <div class="p-4"><h2 class="font-bold mb-3">Discover Communities</h2><div class="grid grid-cols-1 sm:grid-cols-2 gap-3">${cards}</div></div>`;
}

function renderPremiumPage() {
    const plans = [
        { name: 'Basic', price: '$3', period: '/month', features: ['Small reply boost', 'Encrypted DMs', 'Bookmark folders', 'Edit post', 'Longer posts'], color: '#536471', popular: false },
        { name: 'Premium', price: '$8', period: '/month', features: ['Everything in Basic', 'Half ads in For You', 'Larger reply boost', 'Checkmark', 'Grok 2 access', 'Creator subscriptions', 'X Pro access'], color: '#1d9bf0', popular: true },
        { name: 'Premium+', price: '$16', period: '/month', features: ['Everything in Premium', 'No ads', 'Largest reply boost', 'Grok 2 unlimited', 'Write articles', 'Revenue sharing'], color: '#7856ff', popular: false }
    ];
    let cards = plans.map(p => {
        const badge = p.popular ? '<span class="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#1d9bf0] text-white text-[10px] font-bold px-3 py-0.5 rounded-full">POPULAR</span>' : '';
        const features = p.features.map(f => `<li class="flex items-center gap-2 text-sm text-gray-300"><span class="material-symbols-outlined text-[16px]" style="color:${p.color}">check_circle</span>${f}</li>`).join('');
        const border = p.popular ? 'border-[#1d9bf0]' : 'border-gray-800';
        return `<div class="relative rounded-2xl border ${border} p-6 flex flex-col">${badge}
      <h3 class="text-lg font-bold mb-1" style="color:${p.color}">${p.name}</h3>
      <div class="mb-4"><span class="text-3xl font-bold">${p.price}</span><span class="text-gray-500 text-sm">${p.period}</span></div>
      <ul class="space-y-2 flex-1 mb-6">${features}</ul>
      <button class="w-full py-3 rounded-full font-bold text-sm transition-colors" style="background:${p.color};color:white" onmouseover="this.style.opacity='0.9'" onmouseout="this.style.opacity='1'">Subscribe</button>
    </div>`;
    }).join('');
    return `<div class="sticky top-0 z-10 bg-black/80 backdrop-blur-md border-b border-gray-800 px-4 py-3"><h1 class="text-xl font-bold">Premium</h1></div>
  <div class="p-4 text-center mb-4"><h2 class="text-2xl font-bold mb-2">Upgrade to Premium</h2><p class="text-gray-500 text-sm">Enjoy an enhanced experience, exclusive creator tools, and top-tier verification.</p></div>
  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 pb-8">${cards}</div>`;
}

function renderProfilePage() {
    return `<div class="sticky top-0 z-10 bg-black/80 backdrop-blur-md border-b border-gray-800 px-4 py-2 flex items-center gap-4">
    <button onclick="navigateTo('home')" class="p-2 rounded-full hover:bg-gray-900"><span class="material-symbols-outlined">arrow_back</span></button>
    <div><h1 class="text-lg font-bold leading-tight">Swatantra Trivedi</h1><p class="text-xs text-gray-500">${userPosts.length} posts</p></div></div>
  <div class="h-32 sm:h-48 bg-gradient-to-r from-[#1d9bf0] to-purple-600 relative">
    <div class="absolute -bottom-12 left-4 w-24 h-24 rounded-full border-4 border-black bg-gray-700 flex items-center justify-center">
      <span class="material-symbols-outlined text-[40px] text-gray-400">person</span></div></div>
  <div class="flex justify-end px-4 pt-3"><button class="border border-gray-600 text-white text-sm font-bold px-4 py-1.5 rounded-full hover:bg-white/10 transition-colors">Edit profile</button></div>
  <div class="px-4 mt-6 mb-4">
    <h2 class="text-xl font-bold">Swatantra Trivedi</h2>
    <p class="text-gray-500 text-sm">@unfazedswatantra</p>
    <p class="text-sm mt-2 text-gray-200">Full-stack developer | Building cool stuff | Learning in public 🚀</p>
    <div class="flex items-center gap-4 mt-2 text-sm text-gray-500">
      <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[16px]">calendar_month</span>Joined March 2024</span>
      <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[16px]">location_on</span>India</span></div>
    <div class="flex gap-4 mt-2 text-sm"><span><b class="text-white">128</b> <span class="text-gray-500">Following</span></span><span><b class="text-white">1,247</b> <span class="text-gray-500">Followers</span></span></div>
  </div>
  <div class="flex border-b border-gray-800">
    <button class="flex-1 py-3 text-sm font-bold text-white border-b-4 border-[#1d9bf0]">Posts</button>
    <button class="flex-1 py-3 text-sm font-bold text-gray-500 hover:bg-gray-900/40">Replies</button>
    <button class="flex-1 py-3 text-sm font-bold text-gray-500 hover:bg-gray-900/40">Likes</button>
    <button class="flex-1 py-3 text-sm font-bold text-gray-500 hover:bg-gray-900/40">Media</button></div>
  <div class="divide-y divide-gray-800" id="profile-posts"></div>`;
}
