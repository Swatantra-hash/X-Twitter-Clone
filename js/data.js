// ─── POST DATA ──────────────────────────────────────────────────────────────
const AVATARS = [
  'https://i.pravatar.cc/150?img=1','https://i.pravatar.cc/150?img=2','https://i.pravatar.cc/150?img=3',
  'https://i.pravatar.cc/150?img=4','https://i.pravatar.cc/150?img=5','https://i.pravatar.cc/150?img=6',
  'https://i.pravatar.cc/150?img=7','https://i.pravatar.cc/150?img=8','https://i.pravatar.cc/150?img=9',
  'https://i.pravatar.cc/150?img=10','https://i.pravatar.cc/150?img=11','https://i.pravatar.cc/150?img=12',
  'https://i.pravatar.cc/150?img=13','https://i.pravatar.cc/150?img=14','https://i.pravatar.cc/150?img=15'
];

const POST_IMAGES = [
  'https://picsum.photos/seed/xc1/600/400','https://picsum.photos/seed/xc2/600/400',
  'https://picsum.photos/seed/xc3/600/400','https://picsum.photos/seed/xc4/600/400',
  'https://picsum.photos/seed/xc5/600/400','https://picsum.photos/seed/xc6/600/400',
  'https://picsum.photos/seed/xc7/600/400','https://picsum.photos/seed/xc8/600/400'
];

const ALL_POSTS = [
  {name:'Linus Tech',handle:'@linusmediagroup',text:'Just built a mass storage server with 1 PETABYTE of storage. The drives alone cost more than most people\'s houses. Worth it? Absolutely. Full video dropping tomorrow. 🔥',time:'2m',likes:'45.2k',views:'2.1M',rts:'8.3k',replies:'1.2k',img:null,avatar:0,verified:true},
  {name:'Sarah Chen',handle:'@sarahcodes',text:'Hot take: TypeScript is not "just JavaScript with types." It fundamentally changes how you think about architecture, error handling, and API design.\n\nThe mental model shift is the real value, not the type safety.',time:'15m',likes:'12.8k',views:'890k',rts:'3.1k',replies:'2.4k',img:null,avatar:1,verified:false},
  {name:'Dev Community',handle:'@ThePracticalDev',text:'🧵 Thread: 10 Git commands that will save your life as a developer\n\n1. git reflog — undo almost anything\n2. git bisect — find the exact commit that broke things\n3. git stash — save work without committing\n\nMore below 👇',time:'1h',likes:'34.5k',views:'4.2M',rts:'15.7k',replies:'891',img:null,avatar:2,verified:true},
  {name:'Priya Sharma',handle:'@priyabuilds',text:'Day 100 of #100DaysOfCode 🎉\n\nStarted knowing nothing. Now I\'ve built 3 full-stack apps, contributed to open source, and got my first dev job!\n\nThe journey was hard but SO worth it. If you\'re starting out — KEEP GOING. 💪',time:'2h',likes:'28.9k',views:'1.8M',rts:'6.2k',replies:'3.1k',img:0,avatar:3,verified:false},
  {name:'Fireship',handle:'@firaborat',text:'JavaScript frameworks in 2026:\n\n- React 20: "We added more hooks"\n- Vue 5: "We\'re still here"\n- Svelte 6: "No virtual DOM, no problem"\n- Angular 20: "Enterprise loves us"\n- Solid 3: "We were right all along"\n- HTMX: "You don\'t need any of these"',time:'3h',likes:'67.3k',views:'8.9M',rts:'22.1k',replies:'5.6k',img:null,avatar:4,verified:true},
  {name:'Alex Rivera',handle:'@alexcodes_',text:'Just deployed to production on a Friday at 5pm. Pray for me. 🙏\n\nUpdate: It\'s fine. Everything is fine. *nervous laughter*',time:'4h',likes:'19.4k',views:'1.2M',rts:'4.8k',replies:'2.1k',img:null,avatar:5,verified:false},
  {name:'Tech Crunch',handle:'@TechCrunch',text:'BREAKING: OpenAI announces GPT-6 with real-time video understanding and 2M token context window. Available to Plus subscribers starting next week.\n\nThis changes everything for developers building AI applications.',time:'5h',likes:'89.1k',views:'12.3M',rts:'31.4k',replies:'7.8k',img:1,avatar:6,verified:true},
  {name:'Rahul Mehta',handle:'@rahulcodes',text:'CSS tip that blew my mind:\n\nInstead of media queries, use clamp() for responsive typography:\n\nfont-size: clamp(1rem, 2.5vw, 2rem);\n\nOne line. Works everywhere. No breakpoints needed. 🤯',time:'6h',likes:'15.6k',views:'920k',rts:'5.3k',replies:'412',img:null,avatar:7,verified:false},
  {name:'Vercel',handle:'@vercel',text:'⚡ v0 just shipped something wild. AI-generated full-stack apps with one prompt. Deploy to production in under 60 seconds.\n\nThe future of web development is here. Go try it → v0.dev',time:'7h',likes:'42.7k',views:'5.6M',rts:'12.8k',replies:'3.4k',img:2,avatar:8,verified:true},
  {name:'Maya Johnson',handle:'@mayabuilds',text:'Interview tip: When they ask "Do you have any questions?"\n\nDON\'T ask about WFH or salary yet.\n\nDO ask:\n- "What does success look like in this role at 90 days?"\n- "What\'s the biggest challenge the team is facing?"\n- "How do you handle technical debt?"\n\nYou\'ll stand out every time.',time:'8h',likes:'52.3k',views:'3.8M',rts:'18.9k',replies:'1.2k',img:null,avatar:9,verified:false},
  {name:'GitHub',handle:'@github',text:'🚀 Copilot Workspace is now GA. Write an issue → get a full implementation plan → review & merge.\n\nThis is the biggest change to how developers write code since autocomplete.',time:'9h',likes:'71.2k',views:'9.1M',rts:'24.5k',replies:'4.1k',img:3,avatar:10,verified:true},
  {name:'Arjun Patel',handle:'@arjundev',text:'Unpopular opinion: Junior developers should NOT learn Docker, Kubernetes, or microservices first.\n\nLearn to build a simple CRUD app. Deploy it on a $5 VPS. THEN scale.\n\nYou don\'t need Netflix architecture for your todo app.',time:'10h',likes:'38.6k',views:'2.7M',rts:'9.8k',replies:'6.3k',img:null,avatar:11,verified:false},
  {name:'React',handle:'@reactjs',text:'React 20 is officially here! 🎉\n\nWhat\'s new:\n✅ React Compiler is default\n✅ use() hook for async data\n✅ Server Components stable\n✅ 40% smaller bundle size\n✅ Automatic memoization\n\nUpgrade guide → react.dev/blog/react-20',time:'11h',likes:'98.4k',views:'15.2M',rts:'35.7k',replies:'8.9k',img:null,avatar:12,verified:true},
  {name:'Emma Liu',handle:'@emmabuilds',text:'My VS Code setup that gets compliments in every code review:\n\n🎨 Theme: Tokyo Night\n🔤 Font: JetBrains Mono\n📁 Icons: Material Icon Theme\n✨ Extensions: Prettier, ESLint, GitLens, Error Lens\n\nDark mode supremacy. 🌙',time:'12h',likes:'22.1k',views:'1.5M',rts:'7.4k',replies:'1.8k',img:null,avatar:13,verified:false},
  {name:'Tailwind CSS',handle:'@tailwindcss',text:'Tailwind v4 is here.\n\nZero config. CSS-first. 10x faster.\n\nclass="flex items-center justify-between" is poetry and I will die on this hill.',time:'14h',likes:'55.8k',views:'7.3M',rts:'19.2k',replies:'4.5k',img:4,avatar:14,verified:true},
  {name:'Nisha Kumar',handle:'@nishadev_',text:'Overheard at a startup:\n\n"We need to pivot to AI"\n"We\'re a pizza delivery app"\n"AI-powered pizza delivery"\n"...go on"\n\nThis is the state of tech in 2026. 😭',time:'16h',likes:'82.3k',views:'11.1M',rts:'28.4k',replies:'3.2k',img:null,avatar:0,verified:false},
  {name:'Node.js',handle:'@nodejs',text:'Node.js 24 LTS is now available! 🟢\n\nHighlights:\n- Native TypeScript support\n- Built-in test runner improvements\n- Permission model stable\n- fetch() and WebSocket globals\n\nUpgrade today: nodejs.org',time:'18h',likes:'33.7k',views:'4.5M',rts:'11.2k',replies:'2.1k',img:null,avatar:1,verified:true},
  {name:'James Wilson',handle:'@jameswdev',text:'The best code I ever wrote was the code I deleted.\n\n- Removed 3,000 lines of "just in case" abstractions\n- App got 2x faster\n- Tests went from 4 min to 40 sec\n- New devs could understand the codebase\n\nSimplicity wins. Every time.',time:'20h',likes:'41.9k',views:'3.2M',rts:'13.6k',replies:'982',img:null,avatar:2,verified:false},
  {name:'Supabase',handle:'@supabase',text:'We just launched Supabase Cron ⏰\n\nSchedule database functions with cron syntax. No infrastructure needed.\n\n- Recurring jobs\n- One-time scheduled tasks\n- Webhook triggers\n- Full SQL power\n\nAvailable now on all plans.',time:'22h',likes:'27.4k',views:'2.1M',rts:'8.7k',replies:'1.5k',img:5,avatar:3,verified:true},
  {name:'Zara Ahmed',handle:'@zaracodes',text:'Started freelancing 6 months ago.\n\nMonth 1: $0\nMonth 2: $500\nMonth 3: $2,000\nMonth 4: $4,500\nMonth 5: $8,000\nMonth 6: $12,000\n\nThe secret? I stopped competing on price and started selling outcomes.\n\nThread 🧵👇',time:'1d',likes:'64.7k',views:'8.4M',rts:'21.3k',replies:'5.7k',img:null,avatar:4,verified:false},
  {name:'Cloudflare',handle:'@Cloudflare',text:'Workers AI now supports 100+ models including Llama 3.1, Mistral, and Stable Diffusion XL.\n\nRun AI at the edge. No GPU management. Pay per request.\n\nThe future is serverless AI. 🌐',time:'1d',likes:'36.2k',views:'4.8M',rts:'10.5k',replies:'2.3k',img:6,avatar:5,verified:true},
  {name:'Dev Memes',handle:'@devmemes_',text:'"How long will this take?"\n\nProject manager: 2 weeks\nDesigner: 1 month\nSenior dev: 3 months\nJunior dev: "I can do it in a weekend"\n\nThe junior dev was wrong. It took 6 months.',time:'1d',likes:'73.8k',views:'10.2M',rts:'25.6k',replies:'4.1k',img:null,avatar:6,verified:false},
  {name:'Deno',handle:'@denoland',text:'Deno 3.0 is here 🦕\n\n- Full npm compatibility\n- Built-in package manager\n- JSR (JavaScript Registry) integration\n- 3x faster startup than Node\n- Native cloud deploy\n\nThe JavaScript runtime wars are heating up.',time:'1d',likes:'29.5k',views:'3.6M',rts:'9.8k',replies:'3.2k',img:null,avatar:7,verified:true},
  {name:'Carlos Ruiz',handle:'@carlosbuilds',text:'Just pair programmed with AI for 8 hours straight.\n\nReality check:\n✅ Great for boilerplate\n✅ Saves time on tests\n✅ Good rubber duck\n❌ Still writes bugs\n❌ Doesn\'t understand business logic\n❌ Confidently wrong sometimes\n\nAI is a tool, not a replacement.',time:'2d',likes:'47.1k',views:'5.9M',rts:'15.3k',replies:'3.8k',img:null,avatar:8,verified:false},
  {name:'Astro',handle:'@astaborat',text:'Astro 5.0 ships today 🚀\n\n- Content Layer API\n- Server Islands\n- 50% faster builds\n- Zero JS by default\n\nThe best framework for content-driven websites just got better.',time:'2d',likes:'24.8k',views:'2.9M',rts:'7.6k',replies:'1.4k',img:7,avatar:9,verified:true}
];

const NOTIFICATIONS_DATA = [
  {type:'like',user:'Fireship',handle:'@firaborat',avatar:4,text:'liked your post',target:'"Just shipped my new portfolio site!"',time:'2m'},
  {type:'retweet',user:'Vercel',handle:'@vercel',avatar:8,text:'reposted your post',target:'"The future of web dev is component-driven"',time:'15m'},
  {type:'follow',user:'Sarah Chen',handle:'@sarahcodes',avatar:1,text:'followed you',target:null,time:'1h'},
  {type:'mention',user:'Dev Community',handle:'@ThePracticalDev',avatar:2,text:'mentioned you in a post',target:'"Great thread by @unfazedswatantra on React patterns"',time:'2h'},
  {type:'like',user:'GitHub',handle:'@github',avatar:10,text:'liked your post',target:'"Open source changed my life"',time:'3h'},
  {type:'follow',user:'Priya Sharma',handle:'@priyabuilds',avatar:3,text:'followed you',target:null,time:'4h'},
  {type:'like',user:'Maya Johnson',handle:'@mayabuilds',avatar:9,text:'liked your reply',target:'"Totally agree with this approach!"',time:'5h'},
  {type:'retweet',user:'React',handle:'@reactjs',avatar:12,text:'reposted your post',target:'"React Server Components are a game changer"',time:'6h'},
  {type:'mention',user:'Arjun Patel',handle:'@arjundev',avatar:11,text:'replied to your post',target:'"@unfazedswatantra interesting take, but I disagree..."',time:'8h'},
  {type:'like',user:'Tailwind CSS',handle:'@tailwindcss',avatar:14,text:'liked your post',target:'"Utility-first CSS > BEM"',time:'12h'},
  {type:'follow',user:'Emma Liu',handle:'@emmabuilds',avatar:13,text:'followed you',target:null,time:'1d'},
  {type:'like',user:'Nisha Kumar',handle:'@nishadev_',avatar:0,text:'liked your post',target:'"Building in public day 45"',time:'1d'}
];

const MESSAGES_DATA = [
  {id:1,name:'Sarah Chen',handle:'@sarahcodes',avatar:1,messages:[
    {from:'them',text:'Hey! Loved your recent project. What stack did you use?',time:'2:30 PM'},
    {from:'me',text:'Thanks! React + Next.js with Tailwind for styling. Supabase for the backend.',time:'2:35 PM'},
    {from:'them',text:'Nice! I\'ve been meaning to try Supabase. How\'s the DX?',time:'2:38 PM'},
    {from:'me',text:'Really smooth. Auth, database, and storage all in one. Highly recommend.',time:'2:42 PM'}
  ]},
  {id:2,name:'Arjun Patel',handle:'@arjundev',avatar:11,messages:[
    {from:'them',text:'Want to collaborate on an open source project?',time:'Yesterday'},
    {from:'me',text:'Absolutely! What did you have in mind?',time:'Yesterday'},
    {from:'them',text:'A CLI tool for generating project boilerplates. Thinking Node.js + Commander.',time:'Yesterday'}
  ]},
  {id:3,name:'Priya Sharma',handle:'@priyabuilds',avatar:3,messages:[
    {from:'them',text:'Congrats on the new role! 🎉',time:'Mon'},
    {from:'me',text:'Thank you so much! Super excited to start.',time:'Mon'}
  ]},
  {id:4,name:'Dev Community',handle:'@ThePracticalDev',avatar:2,messages:[
    {from:'them',text:'Would you be interested in writing a guest post for our blog?',time:'Last week'},
    {from:'me',text:'I\'d love to! What topics are you looking for?',time:'Last week'},
    {from:'them',text:'Anything about modern web development practices. Your thread on Git was amazing!',time:'Last week'}
  ]}
];

const COMMUNITIES_DATA = [
  {name:'React Developers',members:'284k',desc:'Everything React — hooks, patterns, libraries, and best practices.',category:'Technology',color:'#61dafb'},
  {name:'Web Dev Hub',members:'512k',desc:'The largest web development community. HTML, CSS, JS and beyond.',category:'Technology',color:'#f7df1e'},
  {name:'AI & Machine Learning',members:'198k',desc:'Discuss the latest in AI, ML, deep learning, and LLMs.',category:'Science',color:'#10b981'},
  {name:'Open Source',members:'156k',desc:'Supporting and promoting open source software worldwide.',category:'Technology',color:'#f97316'},
  {name:'Startup Life',members:'89k',desc:'Founders, builders, and dreamers sharing the startup journey.',category:'Business',color:'#8b5cf6'},
  {name:'UI/UX Design',members:'203k',desc:'Design inspiration, Figma tips, and UX research discussions.',category:'Design',color:'#ec4899'},
  {name:'Python Developers',members:'341k',desc:'Python programming — from scripts to machine learning.',category:'Technology',color:'#3776ab'},
  {name:'Cloud & DevOps',members:'127k',desc:'AWS, GCP, Azure, Docker, Kubernetes, and CI/CD pipelines.',category:'Technology',color:'#0ea5e9'}
];

const LISTS_DATA = [
  {name:'Tech Leaders',desc:'CEOs and founders of top tech companies',members:45,followers:'12.3k'},
  {name:'Frontend Devs',desc:'The best frontend developers to follow',members:128,followers:'34.1k'},
  {name:'AI Researchers',desc:'Leading minds in artificial intelligence',members:67,followers:'8.9k'},
  {name:'Indie Hackers',desc:'Solo founders building profitable businesses',members:89,followers:'15.6k'},
  {name:'Design Inspiration',desc:'Designers who push creative boundaries',members:56,followers:'22.4k'},
  {name:'Open Source Maintainers',desc:'People keeping OSS alive',members:112,followers:'19.7k'}
];

const TRENDING_TOPICS = [
  {category:'Technology',tag:'#React20',posts:'125k',badge:'hot'},
  {category:'Technology',tag:'#TypeScript',posts:'89k',badge:'new'},
  {category:'Business',tag:'#StartupFunding',posts:'45k',badge:null},
  {category:'Technology',tag:'#RustLang',posts:'34k',badge:'hot'},
  {category:'Science',tag:'#SpaceX',posts:'67k',badge:'breaking'},
  {category:'Sports',tag:'#ChampionsLeague',posts:'234k',badge:'hot'},
  {category:'Entertainment',tag:'#GTA6',posts:'456k',badge:'breaking'},
  {category:'Technology',tag:'#NextJS15',posts:'78k',badge:'new'},
  {category:'Politics',tag:'#Election2026',posts:'890k',badge:'breaking'},
  {category:'Technology',tag:'#WebAssembly',posts:'23k',badge:null},
  {category:'Sports',tag:'#IPL2026',posts:'567k',badge:'hot'},
  {category:'Entertainment',tag:'#Minecraft2',posts:'345k',badge:'new'}
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
