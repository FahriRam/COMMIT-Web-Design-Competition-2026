import {
  createIcons, House, Calendar, ClipboardList, Users, CircleCheck, CircleAlert, Clock,
  Trash2, Droplets, Utensils, Wind, Menu, X, Plus, UserPlus, ArrowLeftRight,
  RefreshCw, Sparkles, Plane, Award, Flame, ChevronDown, Search, Check, BookOpen, Shuffle, CircleHelp, Mail, Phone,
} from 'lucide';

const ICONS = { House, Calendar, ClipboardList, Users, CircleCheck, CircleAlert, Clock, Trash2, Droplets, Utensils, Wind, Menu, X, Plus, UserPlus, ArrowLeftRight, RefreshCw, Sparkles, Plane, Award, Flame, ChevronDown, Search, Check, BookOpen, Shuffle, CircleHelp, Mail, Phone };
export const icons = () => createIcons({ icons: ICONS });


export const $ = (s) => document.querySelector(s);
export const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

let toastTimer;
export function toast(msg) {
  const el = $('#toast');
  el.innerHTML = `<i data-lucide="check" class="size-4 text-accent"></i><span>${esc(msg)}</span>`;
  el.classList.remove('hidden'); el.classList.add('flex');
  icons();
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { el.classList.add('hidden'); el.classList.remove('flex'); }, 3500);
}

export const badge = (cls, text, icon = '') => `<span class="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${cls}">${icon ? `<i data-lucide="${icon}" class="size-3.5"></i>` : ''}${text}</span>`;