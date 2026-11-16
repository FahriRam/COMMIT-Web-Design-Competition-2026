// Aksi yang mengubah data: beri tugas, selesaikan, alihkan, hapus, dll.
import { S, save, uid, task, lightest } from './store.js';
import { $, toast } from './ui.js';
import { render } from './router.js';

let doneId = null;

export function assign(rid, tid) {
  const r = S.residents.find((x) => x.id === rid), t = task(tid);
  if (!r || !t) return;
  S.assigns.push({ id: uid('a'), rid, tid, status: 'pending', note: '', at: '' });
  save(); render(); toast(`"${t.title}" diberikan ke ${r.name}.`);
}

export function unassign(id) {
  S.assigns = S.assigns.filter((a) => a.id !== id);
  save(); render(); toast('Tugas dilepas dari penghuni.');
}

export function openDone(id) {
  const a = S.assigns.find((x) => x.id === id), t = a && task(a.tid);
  if (!t) return;
  doneId = id;
  $('#done-title').textContent = t.title;
  $('#done-note').value = '';
  $('#done-dialog').showModal();
  $('#done-note').focus();
}

export const closeDone = () => $('#done-dialog').close();

export function confirmDone() {
  const a = S.assigns.find((x) => x.id === doneId); if (!a) return;
  const t = task(a.tid), r = S.residents.find((x) => x.id === a.rid);
  const note = $('#done-note').value.trim();
  Object.assign(a, { status: 'done', note: note || 'Selesai dikerjakan', at: new Date().toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' }) });
  if (r) { r.points += t?.pts || 0; r.streak += 1; }
  doneId = null; closeDone(); save(); render();
  toast(`Tugas selesai, +${t?.pts || 0} poin untuk ${r?.name}.`);
}

export function swap(id, toId) {
  const a = S.assigns.find((x) => x.id === id), r = S.residents.find((x) => x.id === toId);
  if (!a || !r) return;
  a.rid = toId; save(); render(); toast(`Tugas dialihkan ke ${r.name} (${r.room}).`);
}

export function removeResident(id) {
  S.residents = S.residents.filter((r) => r.id !== id);
  const target = lightest(id);
  S.assigns = target
    ? S.assigns.map((a) => (a.rid === id ? { ...a, rid: target.id } : a))
    : S.assigns.filter((a) => a.rid !== id);
  save(); render(); toast('Penghuni dihapus, tugasnya dibagikan ke penghuni lain.');
}

export function toggleLeave(id) {
  const r = S.residents.find((x) => x.id === id); if (!r) return;
  r.onLeave = !r.onLeave; save(); render();
  toast(r.onLeave ? `${r.name} ditandai cuti.` : `${r.name} aktif kembali.`);
}

export function removeTask(id) {
  S.tasks = S.tasks.filter((t) => t.id !== id);
  S.assigns = S.assigns.filter((a) => a.tid !== id);
  save(); render(); toast('Tugas dihapus.');
}

export function submitForm(form) {
  const f = new FormData(form);
  if (form.dataset.form === 'resident') {
    const name = f.get('name').trim(), room = f.get('room').trim();
    if (!name || !room) return;
    S.residents.push({ id: uid('r'), name, room, points: 0, streak: 0, onLeave: false });
    toast(`${name} (${room}) ditambahkan.`);
  } else {
    const title = f.get('title').trim(); if (!title) return;
    const w = Number(f.get('w'));
    S.tasks.push({ id: uid('t'), title, cat: f.get('cat'), w, day: f.get('day'), pts: w * 15 });
    toast(`Tugas "${title}" ditambahkan.`);
  }
  save(); render();
}


export const openReset = () => $('#reset-dialog').showModal();
export const closeReset = () => $('#reset-dialog').close();

export function resetAll() {
  S.residents = []; S.tasks = []; S.assigns = [];
  closeReset(); save(); render(); toast('Semua data sudah dihapus.');
}