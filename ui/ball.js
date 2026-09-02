class Ball {
  constructor({ x, y, resolveCell }) {
    this.x = x;
    this.y = y;
    this.resolveCell = resolveCell;
    this.el = this.createEl();
  }

  createEl() {
    const el = document.createElement('div');
    el.className = 'ball';
    const inner = document.createElement('div');
    inner.className = 'ball-inner';
    el.appendChild(inner);
    return el;
  }

  placeIn(cell) {
    cell.appendChild(this.el);
    return this;
  }

  moveTo(x, y) {
    const fromRect = this.el.getBoundingClientRect();

    this.x = x;
    this.y = y;
    const cell = this.resolveCell(x, y);
    if (!cell) return;

    this.el.remove();
    cell.appendChild(this.el);
    this.el.classList.add('ball-moving');

    spawnBallTrail(fromRect, this.el.getBoundingClientRect());
    animateFlipEl(this.el, fromRect, () => {
      this.el.classList.remove('ball-moving');
    });
  }

  centerInCell() {
    this.el.style.left = '';
    this.el.style.top = '';
    this.el.style.transform = '';
  }

  anchorTo(tokenEl) {
    const ballWidth = this.el.offsetWidth;
    const ballHeight = this.el.offsetHeight;
    const left = tokenEl.offsetLeft + tokenEl.offsetWidth / 2 - ballWidth / 2;
    const top = tokenEl.offsetTop + tokenEl.offsetHeight - ballHeight / 2;
    this.el.style.left = `${left}px`;
    this.el.style.top = `${top}px`;
    this.el.style.transform = 'none';
  }

  getPosition() {
    return { x: this.x, y: this.y };
  }
}

function spawnBallTrail(fromRect, toRect) {
  const fromVisible = fromRect.width > 0 && fromRect.height > 0;
  const toVisible = toRect.width > 0 && toRect.height > 0;
  if (!fromVisible || !toVisible) return;

  const x1 = fromRect.left + fromRect.width / 2;
  const y1 = fromRect.top + fromRect.height / 2;
  const x2 = toRect.left + toRect.width / 2;
  const y2 = toRect.top + toRect.height / 2;

  for (let i = 1; i <= 5; i++) {
    const t = i / 6;
    const dot = document.createElement('div');
    dot.className = 'ball-trail-dot';
    dot.style.left = `${x1 + (x2 - x1) * t}px`;
    dot.style.top = `${y1 + (y2 - y1) * t}px`;
    dot.style.animationDelay = `${i * 30}ms`;
    document.body.appendChild(dot);
    setTimeout(() => dot.remove(), 700 + i * 30);
  }
}

function animateFlipEl(el, fromRect, onDone) {
  const fromVisible = fromRect.width > 0 && fromRect.height > 0;
  if (!fromVisible) {
    if (onDone) onDone();
    return;
  }

  const token = (el.__flipToken = (el.__flipToken || 0) + 1);
  const pendingTimer = el.__flipTimer;
  if (pendingTimer) clearTimeout(pendingTimer);
  el.style.transition = '';

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (token !== el.__flipToken) return;

      const toRect = el.getBoundingClientRect();
      const dx = fromRect.left - toRect.left;
      const dy = fromRect.top - toRect.top;
      if (dx === 0 && dy === 0) {
        if (onDone) onDone();
        return;
      }

      const finalTransform = el.style.transform || '';
      el.style.transition = 'none';
      el.style.transform = `translate(${dx}px, ${dy}px)`;
      void el.offsetWidth;
      el.style.transition = 'transform 0.35s ease';
      el.style.transform = finalTransform;

      const onEnd = () => {
        if (token !== el.__flipToken) return;
        el.style.transition = '';
        el.removeEventListener('transitionend', onEnd);
        if (onDone) onDone();
      };
      el.addEventListener('transitionend', onEnd);
      el.__flipTimer = setTimeout(onEnd, 450);
    });
  });
}
