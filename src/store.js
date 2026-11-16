const KEY = 'kosify-v1';
const seed = () => ({ residents: [], tasks: [], assigns: [] });

export let S;
try { S = JSON.parse(localStorage.getItem(KEY)) || seed(); } catch { S = seed(); }
export const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch {} };


export const uid = (p) => p + Math.random().toString(36).slice(2, 8);
export const task = (id) => S.tasks.find((t) => t.id === id);
export const active = () => S.residents.filter((r) => !r.onLeave);
export const load = (rid) => S.assigns.filter((a) => a.rid === rid).reduce((n, a) => n + (task(a.tid)?.w || 1), 0);
export const lightest = (skip) => [...active()].filter((r) => r.id !== skip).sort((a, b) => load(a.id) - load(b.id))[0];

export const CAT = { broom: ['wind', 'Lantai & ruang umum'], trash: ['trash-2', 'Sampah'], kitchen: ['utensils', 'Dapur & air'], bathroom: ['droplets', 'Kamar mandi'] };
export const WEIGHT = { 1: ['Ringan', 'bg-emerald-50 text-emerald-700'], 2: ['Sedang', 'bg-amber-50 text-amber-700'], 3: ['Berat', 'bg-rose-50 text-rose-700'] };
export const STATUS = {
  done: ['Selesai', 'bg-emerald-100 text-emerald-800', 'circle-check'],
  today: ['Hari ini', 'bg-amber-100 text-amber-800', 'clock'],
  overdue: ['Terlewat', 'bg-rose-100 text-rose-800', 'circle-alert'],
  pending: ['Terjadwal', 'bg-blue-50 text-blue-700', 'calendar'],
};
export const DAYS = ['Setiap pagi', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

export const stats = () => {
  const t = S.assigns.length, d = S.assigns.filter((a) => a.status === 'done').length;
  return { t, d, o: S.assigns.filter((a) => a.status === 'overdue').length, p: t ? Math.round((d / t) * 100) : 0 };
};