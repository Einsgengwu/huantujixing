/* 宦途疾行 · 版本日志 */
const VersionLog = (() => {
  const WEEKS = [
    {
      version: '1.0.3',
      start: '2026-06-29',
      end: '2026-07-12',
      focus: [
        { title: '瞬杀', text: '伪帝敛弹凝杀，玩家身上闪现凶记，0.25秒后近身袭击并回位。' },
        { title: '神罚天雷', text: '三道弯曲雷痕预警0.4秒后落雷；护体神光期间命中只扣1点血，否则扣3点血。' },
        { title: '炎诏火弹', text: 'Boss战小兵偶尔掉落火焰强化，拾取后短时间火焰弹伤害提高50%。' }
      ],
      days: [
        {
          date: '2026-07-08',
          items: [
            '1.0.3：典故图鉴新增点击图片查看大图功能，可点击关闭按钮或按Esc关闭大图。',
            '1.0.3：新增图鉴卡片，优化多端排版。'
          ]
        },
        {
          date: '2026-07-07',
          items: [
            '1.0.2：8波基础掉光率调至20%，最后一波天降护体神光调至40%，伪帝阶段玩家击杀掉光率调为25%/23%/20%。',
            '1.0.2：地狱伪帝血量提高到160。',
            '1.0.1：地狱模式伪帝前最后一波每7秒尝试一次天降护体神光，单次概率提高到50%，并额外保底掉落一次炎诏火弹；正式与Boss体验同步生效。',
            '1.0.1：新增地狱伪帝挑战，可直接进入地狱伪帝Boss战。',
            '1.0.1：地狱伪帝瞬杀预警调为0.3秒，瞬杀弹幕范围扩大为上一版的1.05倍；神罚天雷预警调为0.4秒，雷击宽度先扩大1.1倍后再扩大1.05倍。',
            '1.0.1：炎诏火弹伤害倍率从1.2倍提高到1.5倍；护体神光期间被神罚天雷命中只扣1点血。',
            '1.0.0：地狱伪帝加入瞬杀、神罚天雷与炎诏火弹机制，并开始按周归档版本日志。'
          ]
        }
      ]
    }
  ];

  let weekIndex = WEEKS.length - 1;

  function esc(s) {
    return String(s ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function el(id) {
    return document.getElementById(id);
  }

  function render() {
    const week = WEEKS[weekIndex];
    const root = el('version-log-body');
    if (!week || !root) return;
    const focus = week.focus.map((x) => `
      <article class="version-focus-card">
        <strong>${esc(x.title)}</strong>
        <p>${esc(x.text)}</p>
      </article>`).join('');
    const days = week.days.map((day) => `
      <section class="version-day">
        <h5>${esc(day.date)}</h5>
        <ul>${day.items.map((item) => `<li>${esc(item)}</li>`).join('')}</ul>
      </section>`).join('');
    root.innerHTML = `
      <section class="version-week-head">
        <h4>本周更新重点</h4>
        <p class="version-number">版本号 ${esc(week.version || '1.0.0')}</p>
        <p>${esc(week.start)} 到 ${esc(week.end)} · 北京时间</p>
        <div class="version-focus-grid">${focus}</div>
      </section>
      <section class="version-week-report">
        <h4>周报日志</h4>
        ${days}
      </section>`;
    const prev = el('btn-version-prev');
    const next = el('btn-version-next');
    if (prev) prev.disabled = weekIndex <= 0;
    if (next) next.disabled = weekIndex >= WEEKS.length - 1;
  }

  function open() {
    render();
    el('modal-version-log')?.classList.remove('hidden');
  }

  function bind() {
    el('btn-version-log')?.addEventListener('click', (e) => {
      e.preventDefault();
      open();
    });
    el('btn-version-prev')?.addEventListener('click', (e) => {
      e.preventDefault();
      weekIndex = Math.max(0, weekIndex - 1);
      render();
    });
    el('btn-version-next')?.addEventListener('click', (e) => {
      e.preventDefault();
      weekIndex = Math.min(WEEKS.length - 1, weekIndex + 1);
      render();
    });
    el('modal-version-log')?.addEventListener('click', (e) => {
      if (e.target.id === 'modal-version-log' || e.target.classList.contains('modal-close')) {
        el('modal-version-log')?.classList.add('hidden');
      }
    });
  }

  return { bind, open };
})();
