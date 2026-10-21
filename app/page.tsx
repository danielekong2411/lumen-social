"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, Bell, Bookmark, CheckCircle2, Compass, Heart, Home, ImagePlus, Menu, MessageCircle, MoreHorizontal, Plus, Search, Send, Smile, Sparkles, TrendingUp, Users, Video, WandSparkles, X } from "lucide-react";

const stories = [
  { name: "Your story", initials: "+", tone: "story-add", own: true },
  { name: "Amara", initials: "AM", tone: "tone-peach" },
  { name: "Studio K", initials: "SK", tone: "tone-lilac" },
  { name: "Tobi James", initials: "TJ", tone: "tone-blue" },
  { name: "Nia Foods", initials: "NF", tone: "tone-green" },
  { name: "Chika", initials: "CN", tone: "tone-rose" },
];

const posts = [
  { id: 1, initials: "AM", avatar: "tone-peach", name: "amara.creates", verified: true, subtitle: "Lagos, Nigeria · 2h", kind: "art", caption: "A little reminder to make room for the things that make you feel alive. 🌷 What are you creating this week?", tags: "#CreativeLife #SlowMornings", likes: 248, comments: 18, imageLabel: "Make room for magic", imageSub: "a visual note by Amara" },
  { id: 2, initials: "SK", avatar: "tone-lilac", name: "studiokora", verified: false, subtitle: "Business · 4h", kind: "business", caption: "Small details. Thoughtful design. Big feelings. Our new collection is made for the everyday moments worth keeping.", tags: "#StudioKora #MadeWithCare", likes: 186, comments: 24, imageLabel: "Objects with meaning", imageSub: "The everyday collection · 2026" }
];

const suggestions = [
  { initials: "NF", name: "Nia Foods", handle: "@niafoods", tone: "tone-green", note: "Local business" },
  { initials: "TJ", name: "Tobi James", handle: "@tobijames", tone: "tone-blue", note: "Because you follow Amara" },
  { initials: "CN", name: "Chika N.", handle: "@chika.notes", tone: "tone-rose", note: "Creative community" },
];

export default function HomePage() {
  const [activeNav, setActiveNav] = useState("Home");
  const [liked, setLiked] = useState<number[]>([]);
  const [saved, setSaved] = useState<number[]>([]);
  const [following, setFollowing] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [notice, setNotice] = useState("");
  const filteredPosts = useMemo(() => posts.filter(post => !search || post.name.toLowerCase().includes(search.toLowerCase()) || post.caption.toLowerCase().includes(search.toLowerCase()) || post.tags.toLowerCase().includes(search.toLowerCase())), [search]);
  const navItems = [
    { label: "Home", icon: Home }, { label: "Explore", icon: Compass }, { label: "Reels", icon: Video },
    { label: "Messages", icon: MessageCircle, count: "3" }, { label: "Notifications", icon: Bell, count: "2" }, { label: "Saved", icon: Bookmark },
  ];
  function navTo(label: string) {
    setActiveNav(label); setMobileMenu(false);
    setNotice(label === "Home" ? "" : `${label} is planned for a later Lumen release. You're previewing the home feed for now.`);
  }

  return (
    <main className="min-h-screen">
      <header className="topbar"><div className="topbar-inner">
        <button className="brand" onClick={() => navTo("Home")} aria-label="Lumen home"><span className="brand-mark"><Sparkles size={19} strokeWidth={2.4} /></span><span>Lumen<span className="brand-dot">.</span></span></button>
        <label className="searchbox"><Search size={17} /><input aria-label="Search Lumen" placeholder="Search people, places, businesses..." value={search} onChange={e => setSearch(e.target.value)} />{search && <button className="icon-button clear-search" aria-label="Clear search" onClick={() => setSearch("")}><X size={15} /></button>}</label>
        <div className="top-actions"><button className="icon-button notification-button" aria-label="Notifications" onClick={() => navTo("Notifications")}><Bell size={20} /><i /></button><button className="avatar avatar-you" aria-label="Open your profile" onClick={() => navTo("Profile")}>DE</button><button className="mobile-menu-button icon-button" onClick={() => setMobileMenu(!mobileMenu)} aria-label={mobileMenu ? "Close menu" : "Open menu"}>{mobileMenu ? <X /> : <Menu />}</button></div>
      </div></header>

      <div className="app-shell">
        <aside className={`sidebar ${mobileMenu ? "sidebar-open" : ""}`}>
          <div className="sidebar-profile"><div className="avatar avatar-you avatar-large">DE</div><div className="sidebar-profile-copy"><strong>Your space</strong><span>@daniel.creates</span></div><button className="icon-button tiny-more" aria-label="More profile options"><MoreHorizontal size={19} /></button></div>
          <div className="nav-label">YOUR LUMEN</div>
          <nav className="main-nav" aria-label="Main navigation">{navItems.map(({ label, icon: Icon, count }) => <button key={label} className={`nav-item ${activeNav === label ? "nav-active" : ""}`} onClick={() => navTo(label)}><Icon size={20} strokeWidth={activeNav === label ? 2.4 : 1.8} /><span>{label}</span>{count && <span className="nav-count">{count}</span>}</button>)}</nav>
          <button className="create-button" onClick={() => navTo("Create")}><span><Plus size={19} /></span>Create a post</button>
          <div className="sidebar-bottom"><div className="mini-promo"><span className="promo-sparkle"><WandSparkles size={17} /></span><strong>Your ideas deserve a spotlight.</strong><p>Share something today and find your people.</p><button onClick={() => navTo("Create")}>Create something <ArrowUpRight size={14} /></button></div><div className="side-footer"><span>About</span><span>Guidelines</span><span>Privacy</span><span>© 2026 Lumen</span></div></div>
        </aside>

        <section className="feed-column" aria-label="Home feed">
          <div className="welcome-row"><div><p className="eyebrow">WELCOME TO YOUR COMMUNITY</p><h1>Your world, <span>in one place.</span></h1><p className="welcome-sub">Good things happen when we connect.</p></div><div className="welcome-spark"><Sparkles size={26} /></div></div>
          {notice && <div className="notice" role="status"><Sparkles size={16} /><span>{notice}</span><button onClick={() => setNotice("")} aria-label="Dismiss notice"><X size={15} /></button></div>}
          <section className="stories-card"><div className="section-heading"><div><h2>Stories</h2><p>A little peek into everyone’s day</p></div><button className="text-action" onClick={() => setNotice("You're all caught up on stories.")}>See all <ArrowUpRight size={14} /></button></div><div className="stories-list">{stories.map(story => <button className="story" key={story.name} onClick={() => setNotice(story.own ? "Your story composer is coming soon." : `You're viewing ${story.name}'s story preview.`)}><span className={`story-ring ${story.own ? "ring-own" : ""}`}><span className={`story-avatar ${story.tone}`}>{story.initials}</span>{story.own && <i><Plus size={12} /></i>}</span><span className="story-name">{story.name}</span></button>)}</div></section>
          <div className="feed-toolbar"><div><h2>For you <span className="feed-dot" /></h2><p>Fresh from your community</p></div><button className="filter-button" onClick={() => setNotice("Following and trending filters are coming soon.")}><TrendingUp size={16} /> For you <span>⌄</span></button></div>

          {filteredPosts.map(post => <article className="post-card" key={post.id}>
            <div className="post-header"><div className={`avatar ${post.avatar}`}>{post.initials}</div><div className="post-author"><div className="author-line"><strong>{post.name}</strong>{post.verified && <CheckCircle2 size={14} className="verified" />}</div><span>{post.subtitle}</span></div><button className="icon-button post-more" aria-label={`More options for ${post.name}'s post`} onClick={() => setNotice("Post options are coming soon.")}><MoreHorizontal size={21} /></button></div>
            <div className={`post-art post-art-${post.kind}`}><div className="art-orb art-orb-one" /><div className="art-orb art-orb-two" /><div className="art-topline"><span>LUMEN NOTES</span><span>NO. 0{post.id} / 26</span></div><div className="art-copy"><span className="art-kicker">{post.kind === "art" ? "A NOTE TO SELF" : "STUDIO JOURNAL"}</span><h3>{post.imageLabel}</h3><p>{post.imageSub}</p></div><div className="art-bottomline"><span>MADE WITH INTENTION</span><Sparkles size={18} /></div></div>
            <div className="post-actions"><div className="post-actions-left"><button className={`action-button ${liked.includes(post.id) ? "is-liked" : ""}`} aria-label={liked.includes(post.id) ? "Unlike post" : "Like post"} onClick={() => setLiked(prev => prev.includes(post.id) ? prev.filter(id => id !== post.id) : [...prev, post.id])}><Heart size={21} fill={liked.includes(post.id) ? "currentColor" : "none"} /></button><button className="action-button" aria-label="View comments" onClick={() => setNotice("Comments will be available when the backend is connected.")}><MessageCircle size={21} /></button><button className="action-button" aria-label="Share post" onClick={() => setNotice("Sharing will be available once Lumen messaging is connected.")}><Send size={20} /></button></div><button className={`action-button ${saved.includes(post.id) ? "is-saved" : ""}`} aria-label={saved.includes(post.id) ? "Remove bookmark" : "Save post"} onClick={() => setSaved(prev => prev.includes(post.id) ? prev.filter(id => id !== post.id) : [...prev, post.id])}><Bookmark size={21} fill={saved.includes(post.id) ? "currentColor" : "none"} /></button></div>
            <div className="post-details"><strong>{post.likes + (liked.includes(post.id) ? 1 : 0)} likes</strong><p><strong>{post.name}</strong> {post.caption}</p><p className="post-tags">{post.tags}</p><button className="comments-link" onClick={() => setNotice("The comments panel is coming soon.")}>View all {post.comments} comments</button><div className="comment-input"><input aria-label="Write a comment" placeholder="Add a thoughtful comment..." onKeyDown={e => { if (e.key === "Enter" && e.currentTarget.value.trim()) { setNotice("Comment posting will be available once accounts are connected."); e.currentTarget.value = ""; } }} /><button aria-label="Add emoji" onClick={() => setNotice("Emoji picker coming soon.")}><Smile size={19} /></button></div></div>
          </article>)}
          {filteredPosts.length === 0 && <div className="empty-search"><Search size={24} /><h3>No posts found</h3><p>Try another name, topic, or hashtag.</p><button onClick={() => setSearch("")}>Clear search</button></div>}
          <div className="end-of-feed"><span><Sparkles size={17} /></span><strong>You’re all caught up</strong><p>That’s everything for now. Go make something wonderful.</p></div>
        </section>

        <aside className="right-column">
          <section className="profile-card"><div className="profile-card-top"><span className="eyebrow">YOUR PROFILE</span><button className="text-action" onClick={() => navTo("Profile")}>View <ArrowUpRight size={14} /></button></div><div className="profile-main"><div className="avatar avatar-you avatar-profile">DE</div><div><strong>Daniel Ekong</strong><span>@daniel.creates</span></div><CheckCircle2 size={16} className="profile-check" /></div><p className="profile-bio">Designer, dreamer &amp; curious builder. Turning ideas into things people can feel. ✨</p><div className="profile-stats"><div><strong>24</strong><span>Posts</span></div><div><strong>486</strong><span>Followers</span></div><div><strong>312</strong><span>Following</span></div></div><button className="edit-profile-button" onClick={() => navTo("Profile")}>View profile</button></section>
          <section className="suggestions-card"><div className="section-heading compact"><div><h2>People to know</h2><p>Good connections start here</p></div><button className="text-action" onClick={() => navTo("Explore")}>See all</button></div><div className="suggestion-list">{suggestions.map(person => <div className="suggestion" key={person.name}><div className={`avatar ${person.tone}`}>{person.initials}</div><div className="suggestion-copy"><strong>{person.name}</strong><span>{person.handle}</span><small>{person.note}</small></div><button className={`follow-button ${following.includes(person.name) ? "following" : ""}`} onClick={() => setFollowing(prev => prev.includes(person.name) ? prev.filter(n => n !== person.name) : [...prev, person.name])}>{following.includes(person.name) ? "Following" : "Follow"}</button></div>)}</div></section>
          <section className="business-card"><div className="business-icon"><Users size={20} /></div><div><span className="eyebrow">MADE FOR EVERYONE</span><h3>Your business belongs here.</h3><p>Find new customers, build trust, and grow your community.</p><button onClick={() => setNotice("Business profiles and creator tools are planned for a future Lumen release.")}>Explore business profiles <ArrowUpRight size={15} /></button></div></section>
          <div className="right-footer"><p>About · Help · Community · Privacy · Terms</p><p>© 2026 Lumen Social</p><span>Made for connection <Heart size={11} fill="currentColor" /></span></div>
        </aside>
      </div>
      <nav className="mobile-bottom-nav" aria-label="Mobile navigation"><button className={activeNav === "Home" ? "mobile-active" : ""} onClick={() => navTo("Home")} aria-label="Home"><Home size={21} /></button><button className={activeNav === "Explore" ? "mobile-active" : ""} onClick={() => navTo("Explore")} aria-label="Explore"><Compass size={21} /></button><button className="mobile-create" onClick={() => navTo("Create")} aria-label="Create post"><ImagePlus size={21} /></button><button className={activeNav === "Reels" ? "mobile-active" : ""} onClick={() => navTo("Reels")} aria-label="Reels"><Video size={21} /></button><button className={activeNav === "Profile" ? "mobile-active" : ""} onClick={() => navTo("Profile")} aria-label="Profile"><span className="avatar avatar-you avatar-nav">DE</span></button></nav>
    </main>
  );
}