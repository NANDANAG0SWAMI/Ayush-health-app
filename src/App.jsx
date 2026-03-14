/**
 * AYUSH Health Tracker — App.jsx
 * Design Direction: "Dark Luxury Wellness"
 * Fonts: Playfair Display (display) + DM Sans (body)
 * Palette: Deep teal, sage, coral, rich dark backgrounds
 * 
 * Dependencies:
 *   npm install antd @ant-design/icons lucide-react
 *   Add to index.html <head>:
 *   <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
 */

import { useState, useRef, useEffect } from "react";
import { ConfigProvider, Modal } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  MessageOutlined,
  MedicineBoxOutlined,
  MenuOutlined,
  CloseOutlined,
  BellOutlined,
  SendOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import {
  Activity,
  Flame,
  Droplets,
  Moon,
  Wind,
  ChevronRight,
  Star,
  Leaf,
  Zap,
  Heart,
  TrendingUp,
  Clock,
  Award,
} from "lucide-react";

/* ─────────────────────────────────────────────
   DESIGN TOKENS
───────────────────────────────────────────── */
const T = {
  teal: "#006D77",
  tealMid: "#0A8A96",
  tealLight: "#2A9D8F",
  coral: "#E29578",
  coralDeep: "#C8714F",
  bgDeep: "#FFFFFF",
  bgCard: "#F8F9FA",
  bgElevated: "#FFFFFF",
  bgGlass: "rgba(255, 255, 255, 0.85)",
  border: "rgba(0, 109, 119, 0.12)",
  borderHov: "rgba(0, 109, 119, 0.28)",
  textPri: "#080F10",
  textSec: "#4E7070",
  textMuted: "#8AACB0",
  fontDisplay: "'Playfair Display', Georgia, serif",
  fontBody: "'DM Sans', system-ui, sans-serif",
  radius: "20px",
  radiusSm: "12px",
  radiusXl: "28px",
};

/* ─────────────────────────────────────────────
   GLOBAL STYLES (injected once)
───────────────────────────────────────────── */
const GLOBAL_CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --teal: ${T.teal};
    --teal-mid: ${T.tealMid};
    --teal-light: ${T.tealLight};
    --coral: ${T.coral};
    --bg-deep: ${T.bgDeep};
    --bg-card: ${T.bgCard};
    --bg-elevated: ${T.bgElevated};
    --border: ${T.border};
    --text-pri: ${T.textPri};
    --text-sec: ${T.textSec};
    --text-muted: ${T.textMuted};
    --font-display: ${T.fontDisplay};
    --font-body: ${T.fontBody};
    --nav-h: 72px;
  }

  body { background: #000000; font-family: var(--font-body); }

  /* Phone shell */
  .phone-shell {
    display: flex; justify-content: center; align-items: flex-start;
    min-height: 100vh; padding: 2.5rem 1rem;
    background: radial-gradient(ellipse 70% 60% at 50% 20%, rgba(0,109,119,0.15) 0%, transparent 70%),
                #000000;
  }

  .phone {
    width: 290px;
    height: 620px;
    border-radius: 30px;
    border: 2px solid #000000;
    background: var(--bg-deep);
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    font-family: var(--font-body);
    box-shadow:
      0 0 0 3px #1c1c1e,
      0 0 0 12px #636366,
      0 0 0 14px #48484a,
      0 30px 60px rgba(0,0,0,0.5),
      0 0 80px rgba(0,109,119,0.05) inset;
  }

  /* Dynamic island */
  .dynamic-island {
    position: absolute; top: 12px; left: 50%; transform: translateX(-50%);
    width: 126px; height: 36px;
    background: #000; border-radius: 20px;
    z-index: 100;
    display: flex; align-items: center; justify-content: center;
    gap: 6px;
  }
  .island-dot { width: 8px; height: 8px; border-radius: 50%; }

  /* Scrollable content */
  .content {
    flex: 1; overflow-y: auto; overflow-x: hidden;
    padding-bottom: var(--nav-h);
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
  }
  .content::-webkit-scrollbar { display: none; }

  /* ── BOTTOM NAV ── */
  :root {
    --nav-h: 60px;
  }
  .bottom-nav {
    position: absolute; bottom: 0; left: 0; right: 0;
    height: var(--nav-h);
    background: rgba(162, 219, 206, 0.95); /* Light Jade */
    backdrop-filter: blur(24px);
    border-top: 1px solid rgba(0, 109, 119, 0.15);
    display: flex; align-items: center; justify-content: space-around;
    padding: 0 4px 6px;
    z-index: 50;
  }
  .nav-item {
    display: flex; flex-direction: column; align-items: center; gap: 2px;
    padding: 6px 12px; border-radius: 12px;
    background: none; border: none; cursor: pointer;
    transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
    position: relative;
  }
  .nav-item.active {
    background: rgba(0, 109, 119, 0.12);
  }
  .nav-item.active .nav-label { color: #004d54; }
  .nav-icon-wrap {
    width: 22px; height: 22px;
    display: flex; align-items: center; justify-content: center;
    color: rgba(0, 109, 119, 0.5);
    transition: color 0.2s, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .nav-item.active .nav-icon-wrap { color: #004d54; transform: translateY(-2px); }
  .nav-label {
    font-size: 8px; font-weight: 700; color: rgba(0, 109, 119, 0.5);
    letter-spacing: 0.2px; font-family: var(--font-body);
  }
  .nav-dot {
    position: absolute; top: 4px; right: 10px;
    width: 4px; height: 4px; border-radius: 50%;
    background: var(--coral);
  }

  /* Pages */
  .page { display: none; animation: pageIn 0.3s ease; }
  .page.active { display: block; }
  @keyframes pageIn {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* ── TOP BAR ── */
  .top-bar {
    display: flex; align-items: center; justify-content: space-between;
    padding: 48px 16px 12px;
    position: sticky; top: 0; z-index: 40;
    background: rgba(162, 219, 206, 0.95); /* Light Jade */
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(0, 109, 119, 0.1);
  }
  .logo-lockup { display: flex; align-items: center; gap: 8px; }
  .logo-gem {
    width: 32px; height: 32px; border-radius: 10px;
    background: linear-gradient(135deg, var(--teal) 0%, var(--teal-mid) 100%);
    display: flex; align-items: center; justify-content: center;
    font-size: 16px;
    box-shadow: 0 4px 16px rgba(0,109,119,0.3);
  }
  .logo-text { font-family: var(--font-display); font-size: 16px; font-weight: 700; color: #004d54; letter-spacing: -0.3px; }
  .logo-sub { font-size: 9px; color: rgba(0, 77, 84, 0.75); font-weight: 600; letter-spacing: 0.8px; text-transform: uppercase; }
  .top-actions { display: flex; gap: 6px; }
  .icon-btn {
    width: 32px; height: 32px; border-radius: 10px;
    background: rgba(0, 109, 119, 0.08); border: 1px solid rgba(0, 109, 119, 0.1);
    display: flex; align-items: center; justify-content: center;
    color: #004d54; cursor: pointer;
    transition: all 0.2s;
  }
  .icon-btn:hover { background: rgba(0, 109, 119, 0.15); border-color: rgba(0, 109, 119, 0.2); }

  /* ── HOME PAGE ── */
  .home-hero {
    margin: 0 12px 16px;
    border-radius: 28px;
    /* Rich animated background with SVG mandala */
    background: linear-gradient(135deg, rgba(8, 25, 26, 0.95), rgba(10, 138, 150, 0.85)),
                url("data:image/svg+xml,%3Csvg width='160' height='160' viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.03' fill-rule='evenodd'%3E%3Cpath d='M80 0c2.44 26.6-1.57 53.05-18.06 72.86-13.65-17.76-18.3-43.1-4.75-60.5C65.52 3.19 72.93 0 80 0zm0 160c-2.43-26.6 1.57-53.05 18.06-72.85 13.64 17.76 18.3 43.1 4.75 60.5-8.33 9.17-15.74 12.35-22.81 12.35zm-80-80c26.6-2.44 53.05 1.57 72.86 18.06-17.76 13.65-43.1 18.3-60.5 4.75C3.19 94.48 0 87.07 0 80zm160 0c-26.6 2.44-53.05-1.57-72.85-18.06 17.76-13.64 43.1-18.3 60.5-4.75 9.17 8.33 12.35 15.74 12.35 22.81zm-98.85-48.85c15.2-22.37 32.55-32.93 54.4-23.71-1.04 22.18-10.45 42.15-28.53 54.4-15.2 22.37-32.54 32.93-54.4 23.71 1.05-22.18 10.46-42.15 28.53-54.4zm17.7 97.7c-15.2 22.37-32.55 32.93-54.4 23.71 1.04-22.18 10.45-42.15 28.53-54.4 15.2-22.37 32.54-32.93 54.4-23.71-1.05 22.18-10.46 42.15-28.53 54.4zM31.15 128.85c-22.37-15.2-32.93-32.55-23.71-54.4 22.18 1.04 42.15 10.45 54.4 28.53 22.37 15.2 32.93 32.54 23.71 54.4-22.18-1.05-42.15-10.46-54.4-28.53zm97.7-17.7c22.37 15.2 32.93 32.55 23.71 54.4-22.18-1.04-42.15-10.45-54.4-28.53-22.37-15.2-32.93-32.54-23.71-54.4 22.18 1.05 42.15 10.46 54.4 28.53z'/%3E%3C/g%3E%3C/svg%3E");
    background-size: 200% 200%, 110px 110px;
    background-position: left center, center 20%;
    animation: gradientShift 10s ease infinite;
    background-blend-mode: overlay;
    border: 1px solid rgba(255,255,255,0.12);
    padding: 24px 20px;
    position: relative; overflow: hidden;
    box-shadow: 0 16px 32px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.1);
  }
  @keyframes gradientShift { 0% { background-position: 0% 50%, center 20%; } 50% { background-position: 100% 50%, center 20%; } 100% { background-position: 0% 50%, center 20%; } }
  .home-hero::before {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(circle at top left, rgba(255,255,255,0.2) 0%, transparent 60%),
                radial-gradient(circle at bottom right, rgba(0,109,119,0.4) 0%, transparent 50%);
    pointer-events: none;
  }
  .hero-greeting { position: relative; font-size: 11px; color: #E6F0E6; font-weight: 600; opacity: 0.9; z-index: 1; letter-spacing: 0.5px; text-transform: uppercase; }
  .hero-name { position: relative; font-family: var(--font-display); font-size: 24px; color: #FFFFFF; font-weight: 700; margin-top: 4px; line-height: 1.1; z-index: 1; text-shadow: 0 2px 8px rgba(0,0,0,0.2); }
  .hero-score-row { 
    position: relative; z-index: 1; 
    display: flex; align-items: center; gap: 8px; 
    margin-top: 10px; 
  }
  .hero-score-pill {
    background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 100%);
    border: 1px solid rgba(255,255,255,0.4);
    backdrop-filter: blur(12px);
    padding: 6px 14px; border-radius: 99px;
    font-size: 16px; font-weight: 700; color: #fff;
    box-shadow: 0 8px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.3);
    display: inline-flex; align-items: center; gap: 4px;
    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  }
  .hero-score-pill span { color: #AEE2D9; font-size: 12px; }
  .hero-sub { font-size: 11px; color: rgba(255,255,255,0.85); line-height: 1.3; font-weight: 500; }
  .feel-input-wrap {
    margin-top: 14px;
    display: flex; align-items: center; gap: 8px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 16px; padding: 10px 14px;
    backdrop-filter: blur(16px);
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
  }
  .feel-input-wrap:focus-within { 
    border-color: rgba(255,255,255,0.6); 
    background: rgba(255, 255, 255, 0.15);
    box-shadow: inset 0 2px 4px rgba(0,0,0,0.05), 0 0 0 3px rgba(255,255,255,0.1);
  }
  .feel-input {
    flex: 1; background: none; border: none; outline: none;
    font-family: var(--font-body); font-size: 12px; color: #FFFFFF;
  }
  .feel-input::placeholder { color: rgba(255,255,255,0.6); }

  /* Section headings */
  .sec-head { 
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 16px; margin-bottom: 14px;
  }
  .sec-title {
    font-family: var(--font-display); font-size: 18px; font-weight: 700;
    color: var(--text-pri); letter-spacing: -0.2px;
  }
  .sec-link { 
    font-size: 11px; color: var(--teal-light); font-weight: 700; 
    cursor: pointer; display: flex; align-items: center; gap: 2px;
    padding: 4px 8px; border-radius: 99px; transition: background 0.2s;
  }
  .sec-link:hover { background: rgba(0,109,119,0.08); }

  /* ── VITALS GRID ── */
  .vitals-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; padding: 0 16px; margin-bottom: 24px; }
  .vital-card {
    background: var(--bg-card);
    border: 1px solid rgba(0, 109, 119, 0.25);
    border-radius: 20px;
    padding: 16px 14px;
    position: relative; overflow: hidden;
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    cursor: default;
    background-size: cover; background-position: center;
    box-shadow: 0 6px 12px rgba(0,0,0,0.03), inset 0 1px 0 rgba(255,255,255,0.8);
  }
  .vital-card::before {
    content: ''; position: absolute; inset: 0;
    /* Reduced opacity and blur to make background images pop */
    background: linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(245,250,250,0.4) 100%);
    backdrop-filter: blur(4px);
    border-radius: inherit;
    z-index: 0;
  }
  .vital-card:hover { 
    transform: translateY(-3px); 
    box-shadow: 0 14px 28px rgba(0, 109, 119, 0.06), 
                0 0 24px rgba(42, 157, 143, 0.4), /* Green glow */
                inset 0 1px 0 rgba(255, 255, 255, 1); 
    border-color: rgba(42, 157, 143, 0.6); 
  }
  .vital-content { position: relative; z-index: 1; display: flex; flex-direction: column; height: 100%; justify-content: space-between; }

  /* Changed steps image to a nature hike/walk instead of plain shoes */
  .vital-card.steps { background-image: url('https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&q=80&w=400'); }
  .vital-card.cals { background-image: url('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=300'); }
  .vital-card.water { background-image: url('https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&q=80&w=300'); }
  /* Changed sleep image to a serene, dark night sky/moon mood */
  .vital-card.sleep { background-image: url('https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=400'); }

  .vital-icon {
    width: 32px; height: 32px; border-radius: 12px;
    display: inline-flex; align-items: center; justify-content: center;
    margin-bottom: 12px;
    background: #fff;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  }
  .vital-label { font-size: 11px; font-weight: 700; color: var(--text-sec); text-transform: uppercase; letter-spacing: 0.8px; }
  .vital-value { font-family: var(--font-display); font-size: 24px; font-weight: 700; color: var(--text-pri); line-height: 1; margin: 6px 0; }
  .vital-unit { font-size: 11px; font-weight: 500; color: var(--text-muted); }
  .vital-bar { height: 6px; background: rgba(0,0,0,0.06); border-radius: 99px; margin-top: 12px; overflow: hidden; box-shadow: inset 0 1px 2px rgba(0,0,0,0.05); }
  .vital-fill { height: 100%; border-radius: 99px; transition: width 1s cubic-bezier(0.25, 0.46, 0.45, 0.94); position: relative; }
  .vital-fill::after { content: ''; position: absolute; top:0; left:0; right:0; height: 2px; background: rgba(255,255,255,0.4); border-radius: 99px 99px 0 0; }

  /* ── STORY CARDS ── */
  .stories-row { display: flex; gap: 12px; overflow-x: auto; padding: 0 16px 6px; margin-bottom: 24px; scroll-snap-type: x mandatory; }
  .stories-row::-webkit-scrollbar { display: none; }
  .story-card {
    min-width: 150px; height: 160px; flex-shrink: 0;
    border-radius: 20px; padding: 14px;
    cursor: pointer; scroll-snap-align: start;
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    position: relative; overflow: hidden;
    display: flex; flex-direction: column; justify-content: flex-end;
    box-shadow: 0 8px 16px rgba(0,0,0,0.06);
  }
  .story-card::after {
    content: ''; position: absolute; inset: 0;
    border: 1px solid rgba(255,255,255,0.4);
    border-radius: 20px; pointer-events: none; z-index: 3;
  }
  .story-card:hover { 
    transform: translateY(-4px); 
    box-shadow: 0 16px 32px rgba(0,109,119,0.15);
  }
  .story-bg {
    position: absolute; inset: 0;
    background-size: cover; background-position: center;
    z-index: 0; transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  .story-card:hover .story-bg { transform: scale(1.08); }
  .story-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,15,20,0.9) 100%);
    z-index: 1;
  }
  .story-content { position: relative; z-index: 2; display: flex; flex-direction: column; height: 100%; justify-content: space-between; }
  .story-tag {
    display: inline-flex; align-items: center; gap: 4px;
    padding: 4px 10px; border-radius: 99px;
    font-size: 9px; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase;
    align-self: flex-start;
    backdrop-filter: blur(8px);
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    border: 1px solid rgba(255,255,255,0.2);
  }
  .story-title {
    font-size: 12px; font-weight: 600; line-height: 1.4;
    color: #fff; margin-bottom: 8px; text-shadow: 0 2px 6px rgba(0,0,0,0.6);
  }
  .story-meta { display: flex; align-items: center; justify-content: space-between; opacity: 0.8; }
  .story-src { font-size: 9px; color: #fff; font-weight: 500; }
  .story-time { font-size: 8px; color: #fff; text-shadow: 0 1px 2px rgba(0,0,0,0.5); }

  /* ── QUOTE CARD ── */
  .quote-card {
    margin: 0 16px 20px;
    border-radius: 20px;
    background: linear-gradient(135deg, #FFFFFF 0%, #F0F5F4 100%);
    border: 1px solid rgba(0, 109, 119, 0.08);
    padding: 24px 20px;
    position: relative; overflow: hidden;
    box-shadow: 0 8px 24px rgba(0,0,0,0.03), inset 0 1px 0 #fff;
  }
  .quote-card::before {
    content: "201C";
    font-family: var(--font-display); font-size: 120px;
    color: rgba(0,109,119,0.04);
    position: absolute; top: -20px; left: 10px; line-height: 1;
    pointer-events: none;
  }
  .quote-leaf {
    position: absolute; bottom: -10px; right: -10px; opacity: 0.05;
    font-size: 80px; transform: rotate(-20deg);
  }
  .quote-text {
    font-family: var(--font-display); font-size: 14px; font-style: italic; font-weight: 600;
    color: var(--text-pri); line-height: 1.6; margin-bottom: 12px;
    position: relative; z-index: 1;
  }
  .quote-author { 
    font-size: 10px; color: var(--teal-light); font-weight: 700; letter-spacing: 0.8px; text-transform: uppercase;
    position: relative; z-index: 1;
  }

  /* ── BODY MAP PAGE ── */
  .bodymap-hero {
    padding: 58px 22px 24px;
    background: linear-gradient(180deg, rgba(0,109,119,0.25) 0%, transparent 100%);
    text-align: center;
  }
  .bodymap-title {
    font-family: var(--font-display); font-size: 28px; font-weight: 700;
    color: var(--text-pri); margin-bottom: 6px;
  }
  .bodymap-sub { font-size: 13px; color: var(--text-sec); }

  .body-wrap {
    display: flex; justify-content: center; padding: 10px 0 20px;
    position: relative;
  }
  .body-fig { position: relative; width: 140px; height: 300px; }

  .region-label {
    position: absolute;
    display: flex; flex-direction: column; align-items: center;
    cursor: pointer;
    transition: transform 0.2s;
    z-index: 10;
  }
  .region-label:hover { transform: scale(1.08); }
  .region-label:hover .region-ring { border-color: var(--teal-light); background: rgba(0,109,119,0.3); }
  .region-ring {
    border: 2px solid rgba(131,197,190,0.4);
    background: rgba(0,109,119,0.15);
    border-radius: 50%;
    transition: all 0.2s;
    display: flex; align-items: center; justify-content: center;
    backdrop-filter: blur(4px);
  }
  .region-name {
    font-size: 9px; font-weight: 700; color: var(--teal-light);
    letter-spacing: 0.8px; text-transform: uppercase;
    margin-top: 4px; white-space: nowrap;
  }

  .body-hint {
    text-align: center; font-size: 12px; color: var(--text-muted);
    padding: 0 30px 20px; line-height: 1.6;
  }

  /* ── SYMPTOM MODAL ── */
  .sym-modal-head { margin-bottom: 12px; }
  .sym-region-badge {
    display: inline-flex; align-items: center; gap: 4px;
    padding: 4px 10px; border-radius: 99px;
    background: rgba(0,109,119,0.15); border: 1px solid rgba(131,197,190,0.25);
    font-size: 10px; font-weight: 700; color: var(--teal-light);
    margin-bottom: 6px;
  }
  .sym-title { font-family: var(--font-display); font-size: 16px; font-weight: 600; color: var(--text-pri); }
  .sym-sub { font-size: 11px; color: var(--text-sec); margin-top: 4px; }
  .chip-row { display: flex; flex-wrap: wrap; gap: 6px; margin: 10px 0; }
  .sym-chip {
    padding: 4px 10px; border-radius: 99px;
    background: rgba(0,109,119,0.12); border: 1px solid rgba(131,197,190,0.2);
    font-size: 11px; font-weight: 600; color: var(--teal-light);
    cursor: pointer; transition: all 0.2s; font-family: var(--font-body);
  }
  .sym-chip:hover { background: rgba(0,109,119,0.28); border-color: var(--teal-light); }
  .sym-chip.selected { background: var(--teal); border-color: var(--teal); color: #fff; }

  /* ── CHAT BUBBLES (shared) ── */
  .chat-feed { padding: 12px; display: flex; flex-direction: column; gap: 8px; }
  .msg-row { display: flex; align-items: flex-end; gap: 6px; }
  .msg-row.user { flex-direction: row-reverse; }
  .bot-ava {
    width: 24px; height: 24px; border-radius: 8px; flex-shrink: 0;
    background: linear-gradient(135deg, var(--teal), var(--teal-mid));
    display: flex; align-items: center; justify-content: center;
    font-size: 12px;
  }
  .bubble {
    max-width: 85%; padding: 8px 12px; border-radius: 14px;
    font-size: 11px; line-height: 1.5; font-family: var(--font-body);
  }
  .bubble.ai {
    background: var(--bg-elevated); border: 1px solid var(--border);
    color: var(--text-pri); border-radius: 4px 14px 14px 14px;
  }
  .bubble.user {
    background: linear-gradient(135deg, var(--teal), var(--teal-mid));
    color: #fff; border-radius: 14px 4px 14px 14px;
  }

  /* ── CHATBOT PAGE ── */
  .chat-page-top {
    padding: 48px 16px 16px;
    background: linear-gradient(180deg, rgba(0,109,119,0.2) 0%, transparent 100%);
  }
  .chat-page-title { font-family: var(--font-display); font-size: 20px; font-weight: 700; color: var(--text-pri); }
  .chat-page-sub { font-size: 11px; color: var(--text-sec); margin-top: 4px; }
  .online-badge {
    display: inline-flex; align-items: center; gap: 5px;
    margin-top: 8px; padding: 4px 10px; border-radius: 99px;
    background: rgba(0,200,100,0.1); border: 1px solid rgba(0,200,100,0.25);
    font-size: 11px; font-weight: 600; color: #4cd97a;
  }
  .online-dot { width: 6px; height: 6px; border-radius: 50%; background: #4cd97a; animation: pulse 1.5s infinite; }
  @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }

  .quick-chips-row { display: flex; gap: 8px; overflow-x: auto; padding: 0 16px 12px; }
  .quick-chips-row::-webkit-scrollbar { display: none; }
  .q-chip {
    white-space: nowrap; flex-shrink: 0;
    padding: 8px 14px; border-radius: 99px;
    background: var(--bg-card); border: 1px solid var(--border);
    font-size: 12px; font-weight: 600; color: var(--text-sec);
    cursor: pointer; transition: all 0.2s; font-family: var(--font-body);
  }
  .q-chip:hover { border-color: var(--teal-light); color: var(--teal-light); }

  /* Chat input bottom bar */
  .chat-input-bar {
    position: sticky; bottom: var(--nav-h);
    background: rgba(224, 247, 244, 0.95); /* Very VERY light teal/mint */
    backdrop-filter: blur(20px);
    border-top: 3px solid #10856d; /* Bolder outline */
    padding: 12px 16px 14px;
    box-shadow: 0 -8px 24px rgba(0,0,0,0.1);
  }
  .chat-input-inner { display: flex; align-items: center; gap: 10px; }
  .chat-text-input {
    flex: 1; background: transparent; border: 2px solid rgba(0, 109, 119, 0.4);
    border-radius: 14px; padding: 12px 16px;
    font-family: var(--font-body); font-size: 14px; color: #004d54; font-weight: 600;
    outline: none; transition: border-color 0.2s;
  }
  .chat-text-input::placeholder { color: rgba(0, 77, 84, 0.6); }
  .chat-text-input:focus { border-color: #10856d; }
  .send-btn {
    width: 46px; height: 46px; border-radius: 14px; flex-shrink: 0;
    background: linear-gradient(135deg, var(--teal), var(--teal-mid));
    border: none; cursor: pointer; color: #fff;
    display: flex; align-items: center; justify-content: center;
    transition: transform 0.15s, box-shadow 0.15s;
    box-shadow: 0 4px 14px rgba(0,109,119,0.4);
  }
  .send-btn:hover { transform: scale(1.05); box-shadow: 0 6px 18px rgba(0,109,119,0.55); }
  .send-btn:active { transform: scale(0.96); }

  /* ── DOCTOR PAGE ── */
  .doctor-page-top {
    padding: 48px 16px 16px;
    background: linear-gradient(180deg, rgba(226,149,120,0.15) 0%, transparent 100%);
  }
  .doctor-page-title { font-family: var(--font-display); font-size: 20px; font-weight: 700; color: var(--text-pri); }
  .doctor-page-sub { font-size: 11px; color: var(--text-sec); margin-top: 4px; }

  .filter-row { display: flex; gap: 6px; overflow-x: auto; padding: 0 16px 16px; scroll-snap-type: x mandatory;}
  .filter-row::-webkit-scrollbar { display: none; }
  .f-chip {
    white-space: nowrap; flex-shrink: 0;
    padding: 6px 12px; border-radius: 99px;
    background: var(--bg-card); border: 1px solid var(--border);
    font-size: 11px; font-weight: 600; color: var(--text-muted);
    cursor: pointer; transition: all 0.2s; font-family: var(--font-body);
  }
  .f-chip.active { background: var(--teal); border-color: var(--teal); color: #fff; }

  .doc-card {
    margin: 0 16px 12px;
    background: var(--bg-card); border: 1px solid var(--border);
    border-radius: 20px; padding: 14px;
    transition: border-color 0.2s, transform 0.2s;
  }
  .doc-card:hover { border-color: var(--borderHov, rgba(131,197,190,0.28)); transform: translateY(-2px); }
  .doc-card-top { display: flex; gap: 10px; align-items: flex-start; margin-bottom: 12px; }
  .doc-avatar {
    width: 48px; height: 48px; border-radius: 14px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center; font-size: 24px;
  }
  .doc-name { font-family: var(--font-display); font-size: 14px; font-weight: 600; color: var(--text-pri); }
  .doc-spec { font-size: 10px; color: var(--teal-light); font-weight: 600; margin-top: 2px; }
  .doc-rating { display: flex; align-items: center; gap: 4px; margin-top: 4px; }
  .doc-rating-num { font-size: 10px; font-weight: 700; color: var(--text-pri); }
  .doc-consults { font-size: 9px; color: var(--text-muted); }
  .avail-badge {
    display: inline-flex; align-items: center; gap: 4px;
    padding: 2px 6px; border-radius: 99px;
    font-size: 8px; font-weight: 700; margin-top: 4px;
  }
  .avail-dot { width: 4px; height: 4px; border-radius: 50%; }
  .doc-actions { display: flex; gap: 8px; }
  .doc-btn {
    flex: 1; padding: 8px; border-radius: 10px; border: none;
    font-family: var(--font-body); font-size: 11px; font-weight: 700;
    cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 4px;
    transition: all 0.2s;
  }
  .doc-btn.chat-btn {
    background: rgba(0,109,119,0.15); color: var(--teal-light);
    border: 1px solid rgba(0,109,119,0.3);
  }
  .doc-btn.chat-btn:hover { background: rgba(0,109,119,0.28); }
  .doc-btn.call-btn {
    background: linear-gradient(135deg, var(--coral), var(--coralDeep));
    color: #fff;
    box-shadow: 0 4px 14px rgba(226,149,120,0.35);
  }
  .doc-btn.call-btn:hover { box-shadow: 0 6px 20px rgba(226,149,120,0.5); transform: translateY(-1px); }

  /* ── DRAWER ── */
  .drawer-overlay {
    position: absolute; inset: 0;
    background: rgba(0,0,0,0.7); backdrop-filter: blur(4px);
    z-index: 300; opacity: 0; pointer-events: none; transition: opacity 0.3s;
  }
  .drawer-overlay.open { opacity: 1; pointer-events: all; }
  .drawer {
    position: absolute; top: 0; left: -100%; bottom: 0;
    width: 80%; z-index: 400;
    background: rgba(255,255,255,0.97);
    backdrop-filter: blur(30px);
    border-right: 1px solid rgba(0,109,119,0.15);
    padding: 56px 0 24px;
    transition: left 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    display: flex; flex-direction: column;
    overflow-y: auto;
  }
  .drawer.open { left: 0; }
  .drawer::-webkit-scrollbar { display: none; }

  .drawer-profile {
    text-align: center; padding: 24px 24px 28px;
    border-bottom: 1px solid rgba(131,197,190,0.1);
  }
  .drawer-avatar-ring {
    width: 72px; height: 72px; border-radius: 50%; margin: 0 auto 14px;
    background: linear-gradient(135deg, var(--teal), var(--teal-mid));
    display: flex; align-items: center; justify-content: center;
    font-size: 32px;
    box-shadow: 0 0 0 3px rgba(131,197,190,0.2), 0 0 0 6px rgba(131,197,190,0.08);
  }
  .drawer-name { font-family: var(--font-display); font-size: 20px; color: var(--text-pri); font-weight: 700; }
  .drawer-meta { font-size: 12px; color: var(--text-muted); margin-top: 4px; }
  .drawer-badges { display: flex; justify-content: center; gap: 8px; margin-top: 12px; }
  .d-badge {
    padding: 4px 10px; border-radius: 99px;
    background: rgba(0,109,119,0.15); border: 1px solid rgba(131,197,190,0.2);
    font-size: 11px; font-weight: 600; color: var(--teal-light);
  }

  .drawer-section { padding: 20px 24px 0; }
  .drawer-sec-title {
    font-size: 10px; font-weight: 700; color: var(--text-muted);
    text-transform: uppercase; letter-spacing: 1.2px; margin-bottom: 12px;
  }
  .drawer-row {
    display: flex; align-items: center; justify-content: space-between;
    padding: 13px 0; border-bottom: 1px solid rgba(131,197,190,0.06);
  }
  .drawer-row-left { display: flex; align-items: center; gap: 10px; font-size: 14px; font-weight: 500; color: var(--text-pri); }
  .drawer-row-icon {
    width: 30px; height: 30px; border-radius: 9px;
    display: flex; align-items: center; justify-content: center;
    font-size: 14px;
  }

  /* Toggle */
  .toggle {
    width: 46px; height: 26px; border-radius: 99px; border: none; cursor: pointer;
    background: rgba(255,255,255,0.1); position: relative; transition: background 0.25s;
    flex-shrink: 0;
  }
  .toggle.on { background: var(--teal); }
  .toggle::after {
    content: ''; position: absolute; top: 3px; left: 3px;
    width: 20px; height: 20px; border-radius: 50%; background: #fff;
    transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1);
    box-shadow: 0 2px 6px rgba(0,0,0,0.25);
  }
  .toggle.on::after { transform: translateX(20px); }

  .remind-btn {
    padding: 6px 12px; border-radius: 9px;
    background: rgba(131,197,190,0.1); border: 1px solid rgba(131,197,190,0.2);
    color: var(--teal-light); font-size: 12px; font-weight: 700;
    cursor: pointer; font-family: var(--font-body); transition: all 0.2s;
  }
  .remind-btn:hover { background: rgba(131,197,190,0.2); }

  /* ── TOAST ── */
  .toast {
    position: absolute; bottom: 90px; left: 50%; transform: translateX(-50%) translateY(10px);
    background: rgba(255,255,255,0.96); border: 1px solid rgba(0,109,119,0.15);
    backdrop-filter: blur(16px);
    color: var(--text-pri); padding: 11px 20px;
    border-radius: 99px; font-size: 13px; font-weight: 600;
    white-space: nowrap; z-index: 600;
    opacity: 0; transition: opacity 0.25s, transform 0.25s; pointer-events: none;
    box-shadow: 0 8px 32px rgba(0,0,0,0.15);
  }
  .toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }

  /* Scroll hint fade */
  .scroll-hint { text-align:center; padding: 6px 0 20px; font-size:12px; color: var(--text-muted); }

  /* Symptom chat modal (dark override for antd) */
  .sym-chat-box {
    max-height: 180px; overflow-y: auto; display: flex; flex-direction: column; gap: 8px; margin-bottom: 12px;
  }
  .sym-chat-box::-webkit-scrollbar { display: none; }
`;

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const STORIES = [
  { tag: "Ayurveda", tagColor: "#fff", tagBg: "rgba(0,109,119,0.8)", title: "Ashwagandha improves deep sleep quality by 40% in new trial", src: "AYUSH Ministry", time: "2h ago", icon: "🌿", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=400" },
  { tag: "Nutrition", tagColor: "#fff", tagBg: "rgba(226,149,120,0.8)", title: "5 Indian superfoods backed by modern clinical research", src: "WHO India", time: "5h ago", icon: "🥗", image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=400" },
  { tag: "Yoga", tagColor: "#fff", tagBg: "rgba(131,197,190,0.8)", title: "20-min daily yoga cuts cortisol by 30%, study confirms", src: "NIMHANS", time: "1d ago", icon: "🧘", image: "https://images.unsplash.com/photo-1593811167562-b13c77eb76ec?auto=format&fit=crop&q=80&w=400" },
  { tag: "Siddha", tagColor: "#fff", tagBg: "rgba(139,108,247,0.8)", title: "Ancient Siddha herbs show promise in metabolic disorders", src: "CCRS Journal", time: "2d ago", icon: "⚗️", image: "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&q=80&w=400" },
];

const DOCTORS = [
  { name: "Dr. Rajan Nair", spec: "Ayurvedic Physician", yrs: 12, rating: 4.9, consults: 320, avail: "now", emoji: "👨‍⚕️", avatarBg: "rgba(0,109,119,0.2)" },
  { name: "Dr. Priya Menon", spec: "Yoga Therapist", yrs: 8, rating: 4.8, consults: 218, avail: "30min", emoji: "👩‍⚕️", avatarBg: "rgba(226,149,120,0.18)" },
  { name: "Dr. Suresh Iyer", spec: "Homeopathic Specialist", yrs: 15, rating: 4.7, consults: 541, avail: "now", emoji: "👨‍⚕️", avatarBg: "rgba(131,197,190,0.15)" },
  { name: "Dr. Anjali Sharma", spec: "Naturopathy & Nutrition", yrs: 6, rating: 4.9, consults: 189, avail: "unavail", emoji: "👩‍⚕️", avatarBg: "rgba(139,108,247,0.12)" },
];

const SYMPTOMS_MAP = {
  Head: ["Headache", "Migraine", "Dizziness", "Eye strain", "Ear pain", "Sinus"],
  Chest: ["Chest tightness", "Breathlessness", "Palpitations", "Cough", "Fatigue"],
  Abdomen: ["Stomach pain", "Bloating", "Acidity", "Nausea", "Cramps", "Constipation"],
  "Left Arm": ["Pain", "Numbness", "Weakness", "Swelling"],
  "Right Arm": ["Pain", "Numbness", "Weakness", "Swelling"],
  "Left Leg": ["Pain", "Cramps", "Swelling", "Numbness"],
  "Right Leg": ["Pain", "Cramps", "Swelling", "Numbness"],
};

const AI_RESPONSES = {
  Head: "Head symptoms in Ayurveda often relate to Vata imbalance. I recommend warm sesame oil scalp massage (Shiroabhyanga), Brahmi tea, and reducing screen time. How severe is the discomfort (1–10)?",
  Chest: "Chest symptoms need attention. Ayurveda suggests Pranayama (Anulom Vilom), Arjuna bark decoction for heart health, and staying warm. If pain is severe, please see a doctor immediately.",
  Abdomen: "Digestive issues often mean compromised Agni (digestive fire). Try ginger–lemon–honey water before meals, Triphala at night, and light sattvic foods. Is the pain constant or after meals?",
  "Left Arm": "Arm discomfort often relates to Vata aggravation. Mahanarayan oil massage with gentle stretches works well. Are you spending long hours at a desk?",
  "Right Arm": "Arm discomfort often relates to Vata aggravation. Mahanarayan oil massage with gentle stretches works well. Are you spending long hours at a desk?",
  "Left Leg": "Leg cramps and pain often respond well to sesame oil warm massage and magnesium-rich foods like bananas and pumpkin seeds. Stay well-hydrated today.",
  "Right Leg": "Leg cramps and pain often respond well to sesame oil warm massage and magnesium-rich foods like bananas and pumpkin seeds. Stay well-hydrated today.",
};

const BOT_RESPONSES = [
  "Based on Ayurvedic principles, Ashwagandha (500mg) with warm milk before bed addresses stress at its root — calming Vata dosha. Pair with Anulom Vilom pranayama for 10 min each morning. 🌿",
  "For digestion, Triphala before bed is the cornerstone. Add jeera water in the morning, eat mindfully without screens, and have your largest meal at noon when Agni is strongest. 🔥",
  "Cat-Cow, Child's Pose, Bhujangasana (Cobra), and Setu Bandhasana are excellent for back pain. Practice for 15 min daily. Mahanarayan oil spine massage 30 min before bath helps greatly. 🧘",
  "A diabetes-friendly AYUSH diet includes bitter gourd juice, fenugreek-soaked water each morning, and replacing white rice with millets. Gurmar (Gymnema sylvestre) herb is well-studied for blood sugar. 🥗",
  "Great question! From a holistic AYUSH perspective, I'd recommend combining dietary adjustments (Ahara), lifestyle rhythms (Vihara), and appropriate herbal support. Shall I connect you with one of our specialists?",
];

const FILTERS = ["All", "Ayurveda", "Yoga", "Naturopathy", "Homeopathy", "Siddha"];

/* ─────────────────────────────────────────────
   BODY MAP SVG
───────────────────────────────────────────── */
function BodyFigureSVG({ onRegionClick }) {
  const regions = [
    { id: "Head", cx: 100, cy: 44, rx: 30, ry: 36, labelY: 88 },
    { id: "Chest", cx: 100, cy: 148, rx: 46, ry: 52, labelY: 208 },
    { id: "Abdomen", cx: 100, cy: 228, rx: 40, ry: 36, labelY: 272 },
    { id: "Left Arm", cx: 38, cy: 168, rx: 20, ry: 58, labelY: 234 },
    { id: "Right Arm", cx: 162, cy: 168, rx: 20, ry: 58, labelY: 234 },
    { id: "Left Leg", cx: 72, cy: 330, rx: 22, ry: 56, labelY: 394 },
    { id: "Right Leg", cx: 128, cy: 330, rx: 22, ry: 56, labelY: 394 },
  ];

  return (
    <svg width="140" height="300" viewBox="0 0 200 420" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Deep luxurious 3D base gradient */}
        <linearGradient id="bodyBaseGrad" x1="20" y1="20" x2="160" y2="400" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#83C5BE" stopOpacity="0.4" />
          <stop offset="40%" stopColor="#006D77" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#0A1E20" stopOpacity="0.95" />
        </linearGradient>

        <linearGradient id="bodyLightGrad" x1="160" y1="10" x2="40" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>

        <filter id="shadow3D" x="-20%" y="-10%" width="140%" height="120%">
          <feDropShadow dx="8" dy="16" stdDeviation="14" floodColor="#0A1E20" floodOpacity="0.6" />
          <feDropShadow dx="-2" dy="-2" stdDeviation="8" floodColor="#ffffff" floodOpacity="0.1" />
        </filter>

        <filter id="innerGlow" x="-20%" y="-20%" width="140%" height="140%">
          {/* Create an inner shadow by combining morphological operators and composites */}
          <feGaussianBlur in="SourceAlpha" stdDeviation="8" result="blur" />
          <feOffset dx="-5" dy="-10" />
          <feComposite in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowDiff" />
          <feFlood floodColor="#E29578" floodOpacity="0.3" />
          <feComposite in2="shadowDiff" operator="in" />
          <feComposite in2="SourceGraphic" operator="over" />
        </filter>

        {/* Defines the outline shape to be reused */}
        <path id="bodyPath" d="
          M 90 73 
          C 70 75, 50 85, 45 95 
          C 35 115, 25 155, 25 185
          C 25 205, 45 205, 45 185
          C 45 145, 55 115, 60 115
          C 60 145, 65 175, 65 200
          C 65 240, 60 280, 60 300
          C 60 340, 65 380, 65 390
          C 65 405, 85 405, 85 390
          C 85 360, 92 310, 96 270
          C 98 250, 102 250, 104 270
          C 108 310, 115 360, 115 390
          C 115 405, 135 405, 135 390
          C 135 380, 140 340, 140 300
          C 140 280, 135 240, 135 200
          C 135 175, 140 145, 140 115
          C 145 115, 155 145, 155 185
          C 155 205, 175 205, 175 185
          C 175 155, 165 115, 155 95
          C 150 85, 130 75, 110 73
          Z
        " />
        <path id="headPath" d="M 100 10 C 120 10, 125 25, 125 42 C 125 60, 115 75, 100 75 C 85 75, 75 60, 75 42 C 75 25, 80 10, 100 10 Z" />
      </defs>

      {/* 3D Rendered Human Silhouette Layers */}
      <g filter="url(#shadow3D)">
        {/* Base dark fill with heavy gradient */}
        <use href="#bodyPath" fill="url(#bodyBaseGrad)" />
        <use href="#headPath" fill="url(#bodyBaseGrad)" />

        {/* Ambient top right lighting */}
        <use href="#bodyPath" fill="url(#bodyLightGrad)" style={{ mixBlendMode: 'overlay' }} />
        <use href="#headPath" fill="url(#bodyLightGrad)" style={{ mixBlendMode: 'overlay' }} />

        {/* Inner glow simulation for rounded volume */}
        <use href="#bodyPath" fill="transparent" stroke="#E29578" strokeWidth="2" strokeOpacity="0.4" filter="url(#innerGlow)" />
        <use href="#headPath" fill="transparent" stroke="#E29578" strokeWidth="2" strokeOpacity="0.4" filter="url(#innerGlow)" />
      </g>

      {/* Decorative center channels */}
      <path d="M 100 86 L 100 250" stroke="rgba(131,197,190,0.15)" strokeWidth="1.5" strokeDasharray="6 6" />
      <circle cx="100" cy="148" r="4" fill="rgba(131,197,190,0.3)" />
      <circle cx="100" cy="228" r="4" fill="rgba(131,197,190,0.3)" />

      {/* Face details */}
      <circle cx="90" cy="38" r="3.5" fill="rgba(131,197,190,0.6)" />
      <circle cx="110" cy="38" r="3.5" fill="rgba(131,197,190,0.6)" />
      <path d="M92 54 Q100 60 108 54" stroke="rgba(131,197,190,0.6)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Clickable regions */}
      {regions.map((r) => (
        <ellipse
          key={r.id}
          cx={r.cx} cy={r.cy} rx={r.rx} ry={r.ry}
          fill="rgba(0,109,119,0.0)"
          stroke="transparent"
          style={{ cursor: "pointer" }}
          onClick={() => onRegionClick(r.id)}
        />
      ))}
      {/* Pulse rings on regions */}
      <circle cx="100" cy="44" r="32" fill="none" stroke="rgba(0,109,119,0.18)" strokeWidth="1" strokeDasharray="4 4">
        <animateTransform attributeName="transform" type="rotate" from="0 100 44" to="360 100 44" dur="20s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

/* ─────────────────────────────────────────────
   APP COMPONENT
───────────────────────────────────────────── */
export default function App() {
  const [page, setPage] = useState("home");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toast, setToast] = useState({ msg: "", show: false });
  const [bodyModal, setBodyModal] = useState(null); // region name or null
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [symMessages, setSymMessages] = useState([]);
  const [symInput, setSymInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { role: "ai", text: "Namaste 🙏 I'm your AYUSH health companion. I can guide you on Ayurvedic remedies, yoga, nutrition, and holistic wellness. What can I help you with today?" }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [chatBotIdx, setChatBotIdx] = useState(0);
  const [filterActive, setFilterActive] = useState("All");
  const [toggles, setToggles] = useState({ largeText: false, darkMode: true, notifs: true });
  const [feelInput, setFeelInput] = useState("");
  const toastTimer = useRef(null);
  const chatFeedRef = useRef(null);
  const symFeedRef = useRef(null);

  // Inject CSS once
  useEffect(() => {
    if (!document.getElementById("ayush-styles")) {
      const style = document.createElement("style");
      style.id = "ayush-styles";
      style.textContent = GLOBAL_CSS;
      document.head.appendChild(style);
    }
  }, []);

  // Auto-scroll chats
  useEffect(() => {
    chatFeedRef.current?.scrollTo(0, chatFeedRef.current.scrollHeight);
  }, [chatMessages]);
  useEffect(() => {
    symFeedRef.current?.scrollTo(0, symFeedRef.current.scrollHeight);
  }, [symMessages]);

  function showToast(msg) {
    setToast({ msg, show: true });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast({ msg: "", show: false }), 2600);
  }

  function openBodyRegion(region) {
    setBodyModal(region);
    setSelectedSymptoms([]);
    setSymInput("");
    setSymMessages([
      { role: "ai", text: `You've selected the ${region} region. Which symptom are you experiencing? Choose from the quick options or type below.` }
    ]);
  }

  function toggleSymptom(sym) {
    setSelectedSymptoms(prev => {
      const next = prev.includes(sym) ? prev.filter(s => s !== sym) : [...prev, sym];
      if (!prev.includes(sym)) {
        setSymMessages(m => [...m, { role: "user", text: sym }]);
        setTimeout(() => {
          setSymMessages(m => [...m, { role: "ai", text: AI_RESPONSES[bodyModal] || "Thank you. Can you describe the intensity and duration?" }]);
        }, 700);
      }
      return next;
    });
  }

  function sendSymptomMsg() {
    if (!symInput.trim()) return;
    const val = symInput.trim();
    setSymMessages(m => [...m, { role: "user", text: val }]);
    setSymInput("");
    setTimeout(() => {
      setSymMessages(m => [...m, { role: "ai", text: "Thank you for that detail. Based on your symptoms, I recommend consulting with one of our AYUSH specialists. Would you like me to connect you with Dr. Rajan Nair or Dr. Priya Menon?" }]);
    }, 800);
  }

  function sendChatMessage() {
    if (!chatInput.trim()) return;
    const val = chatInput.trim();
    setChatMessages(m => [...m, { role: "user", text: val }]);
    setChatInput("");
    setTimeout(() => {
      setChatMessages(m => [...m, { role: "ai", text: BOT_RESPONSES[chatBotIdx % BOT_RESPONSES.length] }]);
      setChatBotIdx(i => i + 1);
    }, 900);
  }

  function sendQuickMessage(msg) {
    setChatMessages(m => [...m, { role: "user", text: msg }]);
    setTimeout(() => {
      setChatMessages(m => [...m, { role: "ai", text: BOT_RESPONSES[chatBotIdx % BOT_RESPONSES.length] }]);
      setChatBotIdx(i => i + 1);
    }, 900);
  }

  function toggleDrawerSwitch(key) {
    setToggles(t => ({ ...t, [key]: !t[key] }));
  }

  const navItems = [
    { id: "home", label: "Home", icon: <HomeOutlined style={{ fontSize: 20 }} /> },
    { id: "body", label: "Body Map", icon: <Activity size={20} /> },
    { id: "chat", label: "Assistant", icon: <MessageOutlined style={{ fontSize: 20 }} />, dot: true },
    { id: "doctor", label: "Doctor", icon: <MedicineBoxOutlined style={{ fontSize: 20 }} /> },
  ];

  return (
    <ConfigProvider theme={{ token: { colorPrimary: T.teal, borderRadius: 14, fontFamily: T.fontBody } }}>
      <div className="phone-shell">
        <div className="phone">

          {/* Dynamic Island */}
          <div className="dynamic-island">
            <div className="island-dot" style={{ background: "#1a7a5e" }} />
            <div className="island-dot" style={{ width: 10, height: 10, background: "#111", border: "2px solid #222", borderRadius: 4 }} />
          </div>

          {/* ── TOP BAR ── */}
          <div className="top-bar">
            <div className="logo-lockup">
              <div className="logo-gem">🌿</div>
              <div>
                <div className="logo-text">AYUSH</div>
                <div className="logo-sub">Wellness Tracker</div>
              </div>
            </div>
            <div className="top-actions">
              <div className="icon-btn"><BellOutlined style={{ fontSize: 16 }} /></div>
              <div className="icon-btn" onClick={() => setDrawerOpen(true)}><MenuOutlined style={{ fontSize: 16 }} /></div>
            </div>
          </div>

          {/* ── CONTENT ── */}
          <div className="content" id="main-content">

            {/* ═══ HOME ═══ */}
            <div className={`page ${page === "home" ? "active" : ""}`} id="page-home">
              {/* Hero */}
              <div className="home-hero">
                <div className="hero-greeting">Good morning,</div>
                <div className="hero-name">Arjun Pillai</div>

                <div className="hero-score-row">
                  <div className="hero-score-pill">
                    78<span style={{ opacity: 0.8 }}>/100</span>
                  </div>
                  <div className="hero-sub">Your wellness score today</div>
                </div>

                <div className="feel-input-wrap">
                  <span style={{ fontSize: 18 }}>💬</span>
                  <input
                    className="feel-input"
                    placeholder="How are you feeling today?"
                    value={feelInput}
                    onChange={e => setFeelInput(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === "Enter" && feelInput.trim()) {
                        showToast(`✨ Logged: "${feelInput.slice(0, 28)}${feelInput.length > 28 ? "…" : ""}"`);
                        setFeelInput("");
                      }
                    }}
                  />
                  <SendOutlined style={{ color: T.teal, fontSize: 16, cursor: "pointer" }}
                    onClick={() => { if (feelInput.trim()) { showToast(`✨ Logged!`); setFeelInput(""); } }} />
                </div>
              </div>

              {/* Vitals */}
              <div style={{ padding: "0 0 6px" }}>
                <div className="sec-head">
                  <div className="sec-title">Today's Vitals</div>
                  <div className="sec-link">Details <ChevronRight size={12} style={{ verticalAlign: "middle" }} /></div>
                </div>
                <div className="vitals-grid">
                  <div className="vital-card steps">
                    <div className="vital-content">
                      <div className="vital-icon">
                        <Activity size={18} color={T.teal} />
                      </div>
                      <div className="vital-label">Steps</div>
                      <div className="vital-value">6,842</div>
                      <div className="vital-unit">of 10,000 goal</div>
                      <div className="vital-bar"><div className="vital-fill" style={{ width: "68%", background: `linear-gradient(90deg, ${T.teal}, ${T.tealLight})` }} /></div>
                    </div>
                  </div>
                  <div className="vital-card cals">
                    <div className="vital-content">
                      <div className="vital-icon">
                        <Flame size={18} color={T.coral} />
                      </div>
                      <div className="vital-label">Calories</div>
                      <div className="vital-value">1,420</div>
                      <div className="vital-unit">of 2,100 goal</div>
                      <div className="vital-bar"><div className="vital-fill" style={{ width: "67%", background: `linear-gradient(90deg, ${T.coral}, #f4b492)` }} /></div>
                    </div>
                  </div>
                  <div className="vital-card water">
                    <div className="vital-content">
                      <div className="vital-icon">
                        <Droplets size={18} color="#3d9be9" />
                      </div>
                      <div className="vital-label">Water</div>
                      <div className="vital-value">1.4<span style={{ fontSize: 14 }}>L</span></div>
                      <div className="vital-unit">of 2.5L goal</div>
                      <div className="vital-bar"><div className="vital-fill" style={{ width: "56%", background: "linear-gradient(90deg, #3d9be9, #6bbfff)" }} /></div>
                    </div>
                  </div>
                  <div className="vital-card sleep">
                    <div className="vital-content">
                      <div className="vital-icon">
                        <Moon size={18} color="#8b6cf7" />
                      </div>
                      <div className="vital-label">Sleep</div>
                      <div className="vital-value">7.2<span style={{ fontSize: 14 }}>h</span></div>
                      <div className="vital-unit">of 8h goal</div>
                      <div className="vital-bar"><div className="vital-fill" style={{ width: "90%", background: "linear-gradient(90deg, #8b6cf7, #b89ef9)" }} /></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stories */}
              <div style={{ marginBottom: 6 }}>
                <div className="sec-head">
                  <div className="sec-title">Health Stories</div>
                  <div className="sec-link">See all</div>
                </div>
                <div className="stories-row">
                  {STORIES.map((s, i) => (
                    <div className="story-card" key={i}>
                      <div className="story-bg" style={{ backgroundImage: `url(${s.image})` }} />
                      <div className="story-overlay" />
                      <div className="story-content">
                        <div className="story-tag" style={{ color: s.tagColor, background: s.tagBg }}>
                          <span>{s.icon}</span> {s.tag}
                        </div>
                        <div>
                          <div className="story-title">{s.title}</div>
                          <div className="story-meta">
                            <div className="story-src">{s.src}</div>
                            <div className="story-time">{s.time}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Daily Quote */}
              <div className="sec-head">
                <div className="sec-title">Daily Wisdom</div>
                <div className="sec-link" onClick={() => showToast("🌿 Saved to favourites!")}>Save</div>
              </div>
              <div className="quote-card">
                <div style={{ position: "absolute", top: 16, right: 20, fontSize: 20, opacity: 0.5 }}>🍃</div>
                <div className="quote-text">
                  "When diet is wrong, medicine is of no use. When diet is correct, medicine is of no need."
                </div>
                <div style={{ height: 1, background: "rgba(131,197,190,0.15)", margin: "14px 0" }} />
                <div className="quote-author">— Ayurvedic Proverb</div>
              </div>
            </div>

            {/* ═══ BODY MAP ═══ */}
            <div className={`page ${page === "body" ? "active" : ""}`} id="page-body">
              <div className="bodymap-hero">
                <div style={{ fontSize: 36, marginBottom: 8 }}></div>
                <div className="bodymap-title">Body Map</div>
                <div className="bodymap-sub">Tap a region to log symptoms instantly</div>
              </div>

              <div className="body-wrap">
                <div
                  style={{ position: "relative", width: 200, height: 420, cursor: "pointer" }}
                  onClick={(e) => {
                    // Map click position to region
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    // Simple hit-test
                    if (y < 86) openBodyRegion("Head");
                    else if (y < 200 && x > 40 && x < 160) openBodyRegion("Chest");
                    else if (y < 265 && x > 46 && x < 154) openBodyRegion("Abdomen");
                    else if (y >= 86 && y < 200 && x < 50) openBodyRegion("Left Arm");
                    else if (y >= 86 && y < 200 && x > 150) openBodyRegion("Right Arm");
                    else if (y >= 265 && x < 100) openBodyRegion("Left Leg");
                    else if (y >= 265 && x >= 100) openBodyRegion("Right Leg");
                  }}
                >
                  <BodyFigureSVG onRegionClick={openBodyRegion} />
                </div>
              </div>
              <div className="body-hint">
                👆 Tap any region on the silhouette to open a symptom checker
              </div>
            </div>

            {/* ═══ CHATBOT ═══ */}
            <div className={`page ${page === "chat" ? "active" : ""}`} id="page-chat">
              <div className="chat-page-top">
                <div style={{ fontSize: 36, marginBottom: 6 }}>🤖</div>
                <div className="chat-page-title">AYUSH Assistant</div>
                <div className="chat-page-sub">Powered by Ayurvedic wisdom & AI</div>
                <div className="online-badge">
                  <div className="online-dot" />
                  Online · Responds instantly
                </div>
              </div>

              <div className="quick-chips-row">
                {["🧘 Stress & anxiety", "🌿 Digestion", "🤸 Yoga for pain", "🥗 Diabetes diet", "💤 Better sleep"].map(c => (
                  <div key={c} className="q-chip" onClick={() => sendQuickMessage(c.replace(/^[\S]+ /, ""))}>{c}</div>
                ))}
              </div>

              <div className="chat-feed" ref={chatFeedRef} style={{ minHeight: 300 }}>
                {chatMessages.map((m, i) => (
                  <div key={i} className={`msg-row ${m.role === "user" ? "user" : ""}`}>
                    {m.role === "ai" && <div className="bot-ava">🌿</div>}
                    <div className={`bubble ${m.role}`}>{m.text}</div>
                  </div>
                ))}
              </div>

              <div className="chat-input-bar">
                <div className="chat-input-inner">
                  <input
                    className="chat-text-input"
                    placeholder="Ask about your health…"
                    value={chatInput}
                    onChange={e => setChatInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && sendChatMessage()}
                  />
                  <button className="send-btn" onClick={sendChatMessage}>
                    <SendOutlined style={{ fontSize: 16 }} />
                  </button>
                </div>
              </div>
            </div>

            {/* ═══ DOCTOR ═══ */}
            <div className={`page ${page === "doctor" ? "active" : ""}`} id="page-doctor">
              <div className="doctor-page-top">
                <div style={{ fontSize: 36, marginBottom: 6 }}>👨‍⚕️</div>
                <div className="doctor-page-title">Consult a Doctor</div>
                <div className="doctor-page-sub">AYUSH-certified practitioners</div>
              </div>

              <div className="filter-row">
                {FILTERS.map(f => (
                  <div key={f} className={`f-chip ${filterActive === f ? "active" : ""}`}
                    onClick={() => setFilterActive(f)}>{f}</div>
                ))}
              </div>

              {DOCTORS.map((doc, i) => (
                <div className="doc-card" key={i}>
                  <div className="doc-card-top">
                    <div className="doc-avatar" style={{ background: doc.avatarBg }}>{doc.emoji}</div>
                    <div style={{ flex: 1 }}>
                      <div className="doc-name">{doc.name}</div>
                      <div className="doc-spec">{doc.spec} · {doc.yrs} yrs</div>
                      <div className="doc-rating">
                        <Star size={11} fill={T.coral} color={T.coral} />
                        <span className="doc-rating-num">{doc.rating}</span>
                        <span className="doc-consults">· {doc.consults} consultations</span>
                      </div>
                      <div
                        className="avail-badge"
                        style={{
                          background: doc.avail === "now" ? "rgba(0,200,100,0.1)" : doc.avail === "30min" ? "rgba(255,200,0,0.1)" : "rgba(255,80,80,0.1)",
                          color: doc.avail === "now" ? "#4cd97a" : doc.avail === "30min" ? "#f0c040" : "#f07070",
                          border: `1px solid ${doc.avail === "now" ? "rgba(0,200,100,0.25)" : doc.avail === "30min" ? "rgba(255,200,0,0.25)" : "rgba(255,80,80,0.2)"}`,
                        }}
                      >
                        <div className="avail-dot"
                          style={{ background: doc.avail === "now" ? "#4cd97a" : doc.avail === "30min" ? "#f0c040" : "#f07070" }}
                        />
                        {doc.avail === "now" ? "Available Now" : doc.avail === "30min" ? "Available in 30 min" : "Unavailable Today"}
                      </div>
                    </div>
                  </div>
                  <div className="doc-actions">
                    <button className="doc-btn chat-btn"
                      onClick={() => showToast(`💬 Opening chat with ${doc.name.split(" ").slice(0, 2).join(" ")}…`)}>
                      <MessageOutlined style={{ fontSize: 14 }} /> Chat
                    </button>
                    <button
                      className="doc-btn call-btn"
                      disabled={doc.avail === "unavail"}
                      style={doc.avail === "unavail" ? { opacity: 1, cursor: "not-allowed", pointerEvents: "none" } : {}}
                      onClick={() => showToast(`📞 Calling ${doc.name.split(" ").slice(0, 2).join(" ")}…`)}>
                      <PhoneOutlined style={{ fontSize: 14 }} />
                      {doc.avail === "unavail" ? "Unavailable" : "Call"}
                    </button>
                  </div>
                </div>
              ))}
              <div style={{ height: 8 }} />
            </div>

          </div>{/* end content */}

          {/* ── BOTTOM NAV ── */}
          <div className="bottom-nav">
            {navItems.map(n => (
              <button key={n.id} className={`nav-item ${page === n.id ? "active" : ""}`}
                onClick={() => { setPage(n.id); document.getElementById("main-content").scrollTop = 0; }}>
                {n.dot && page !== n.id && <div className="nav-dot" />}
                <div className="nav-icon-wrap">{n.icon}</div>
                <span className="nav-label">{n.label}</span>
              </button>
            ))}
          </div>

          {/* ── DRAWER OVERLAY ── */}
          <div className={`drawer-overlay ${drawerOpen ? "open" : ""}`} onClick={() => setDrawerOpen(false)} />

          {/* ── DRAWER ── */}
          <div className={`drawer ${drawerOpen ? "open" : ""}`}>
            <div style={{ position: "absolute", top: 16, right: 16 }}>
              <div className="icon-btn" onClick={() => setDrawerOpen(false)}><CloseOutlined style={{ fontSize: 16 }} /></div>
            </div>

            <div className="drawer-profile">
              <div className="drawer-avatar-ring">🧑</div>
              <div className="drawer-name">Arjun Pillai</div>
              <div className="drawer-meta">Age 28 · Male · Chennai, TN</div>
              <div className="drawer-badges">
                <div className="d-badge">🔥 7-day streak</div>
                <div className="d-badge">⚡ 68 XP</div>
              </div>
            </div>

            <div className="drawer-section">
              <div className="drawer-sec-title">Accessibility</div>
              {[
                { key: "largeText", icon: "🔠", iconBg: "rgba(131,197,190,0.15)", label: "Large Text" },
                { key: "darkMode", icon: "🌙", iconBg: "rgba(139,108,247,0.15)", label: "Dark Mode" },
                { key: "notifs", icon: "🔔", iconBg: "rgba(226,149,120,0.15)", label: "Notifications" },
              ].map(row => (
                <div className="drawer-row" key={row.key}>
                  <div className="drawer-row-left">
                    <div className="drawer-row-icon" style={{ background: row.iconBg }}>{row.icon}</div>
                    {row.label}
                  </div>
                  <button className={`toggle ${toggles[row.key] ? "on" : ""}`}
                    onClick={() => toggleDrawerSwitch(row.key)} />
                </div>
              ))}
            </div>

            <div className="drawer-section" style={{ marginTop: 8 }}>
              <div className="drawer-sec-title">Reminders</div>
              {[
                { icon: "💧", iconBg: "rgba(61,155,233,0.15)", label: "Water", val: "Every 2h" },
                { icon: "🚶", iconBg: "rgba(131,197,190,0.15)", label: "Walks", val: "6:00 PM" },
                { icon: "🧘", iconBg: "rgba(0,109,119,0.15)", label: "Meditation", val: "7:00 AM" },
              ].map(row => (
                <div className="drawer-row" key={row.label}>
                  <div className="drawer-row-left">
                    <div className="drawer-row-icon" style={{ background: row.iconBg }}>{row.icon}</div>
                    {row.label}
                  </div>
                  <button className="remind-btn" onClick={() => showToast(`${row.icon} ${row.label} reminder set!`)}>{row.val}</button>
                </div>
              ))}
            </div>

            <div className="drawer-section" style={{ marginTop: 8 }}>
              <div className="drawer-sec-title">Health Profile</div>
              {[
                { icon: "🩸", iconBg: "rgba(255,80,80,0.1)", label: "Blood Group", val: "B+" },
                { icon: "⚖️", iconBg: "rgba(0,109,119,0.12)", label: "Weight", val: "72 kg" },
                { icon: "📏", iconBg: "rgba(131,197,190,0.12)", label: "Height", val: "175 cm" },
                { icon: "🫀", iconBg: "rgba(226,149,120,0.12)", label: "Dosha Type", val: "Pitta" },
              ].map(row => (
                <div className="drawer-row" key={row.label}>
                  <div className="drawer-row-left">
                    <div className="drawer-row-icon" style={{ background: row.iconBg }}>{row.icon}</div>
                    {row.label}
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: T.tealLight }}>{row.val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── BODY MODAL (Ant Design) ── */}
          <Modal
            open={!!bodyModal}
            onCancel={() => setBodyModal(null)}
            footer={null}
            centered={false}
            getContainer={() => document.querySelector('.phone')}
            style={{ margin: 0, padding: 0, position: "absolute", bottom: 0, left: 0, right: 0 }}
            styles={{
              content: {
                background: T.bgCard,
                border: `1px solid ${T.border}`,
                borderRadius: "24px 24px 0 0",
                padding: "24px 22px 20px",
                fontFamily: T.fontBody,
                maxHeight: "65vh",
                overflowY: "auto",
              },
              mask: { position: "absolute", background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)", borderRadius: "inherit" },
              wrapper: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, overflow: "hidden", borderRadius: "inherit" },
            }}
            closeIcon={<CloseOutlined style={{ color: T.textSec, fontSize: 16 }} />}
            width="100%"
          >
            {bodyModal && (
              <>
                <div className="sym-modal-head">
                  <div className="sym-region-badge">📍 {bodyModal} Region</div>
                  <div className="sym-title">Symptom Checker</div>
                  <div className="sym-sub">Select or describe what you're experiencing</div>
                </div>

                <div className="chip-row">
                  {(SYMPTOMS_MAP[bodyModal] || []).map(sym => (
                    <button key={sym} className={`sym-chip ${selectedSymptoms.includes(sym) ? "selected" : ""}`}
                      onClick={() => toggleSymptom(sym)}>{sym}</button>
                  ))}
                </div>

                <div className="sym-chat-box" ref={symFeedRef}>
                  {symMessages.map((m, i) => (
                    <div key={i} className={`msg-row ${m.role === "user" ? "user" : ""}`}
                      style={{ display: "flex", gap: 8, alignItems: "flex-end", flexDirection: m.role === "user" ? "row-reverse" : "row" }}>
                      {m.role === "ai" && <div className="bot-ava" style={{ width: 24, height: 24, fontSize: 12 }}>🌿</div>}
                      <div className={`bubble ${m.role}`} style={{ fontSize: 12, padding: "9px 13px" }}>{m.text}</div>
                    </div>
                  ))}
                </div>

                <div className="chat-input-inner" style={{ marginTop: 10 }}>
                  <input
                    className="chat-text-input"
                    placeholder="Describe your symptom…"
                    value={symInput}
                    onChange={e => setSymInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && sendSymptomMsg()}
                    style={{ background: T.bgElevated }}
                  />
                  <button className="send-btn" onClick={sendSymptomMsg}>
                    <SendOutlined style={{ fontSize: 15 }} />
                  </button>
                </div>

                <button
                  style={{
                    display: "block", width: "100%", marginTop: 14,
                    padding: "12px", borderRadius: 14,
                    background: `linear-gradient(135deg, ${T.coral}, ${T.coralDeep})`,
                    border: "none", color: "#fff", fontFamily: T.fontBody,
                    fontSize: 14, fontWeight: 700, cursor: "pointer",
                    boxShadow: `0 4px 16px rgba(226,149,120,0.4)`,
                  }}
                  onClick={() => { setBodyModal(null); setPage("doctor"); showToast("🩺 Connecting to a doctor…"); }}
                >
                  Connect with a Doctor
                </button>
              </>
            )}
          </Modal>

          {/* ── TOAST ── */}
          <div className={`toast ${toast.show ? "show" : ""}`}>{toast.msg}</div>

        </div>{/* end phone */}
      </div>
    </ConfigProvider>
  );
}