class PlayerToken {
  static shortsFor(team) {
    return (team.wearingAwayKit ? team.awayShortsColor : team.shortsColor) ||
      (team.wearingAwayKit ? team.reserveColor : team.primaryColor);
  }

  constructor({ player, teamColor, shorts }) {
    this.player = player;
    this.teamColor = teamColor;
    this.shorts = shorts || teamColor;
    this.el = this.createEl();
    this.el._token = this;
  }

  initials(name) {
    return name
      .split(/\s+/)
      .map((word) => word[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  }

  roleLetter(position) {
    return {
      GK: 'GK',
      DF: 'D',
      MF: 'M',
      FW: 'F',
    }[position] || position.slice(0, 1);
  }

  createEl() {
    const el = document.createElement('div');
    el.className = 'player-token';
    el.style.backgroundColor = this.teamColor;

    const role = document.createElement('div');
    role.className = 'player-token-role';
    role.textContent = this.roleLetter(this.player.position);

    el.appendChild(role);

    const name = document.createElement('div');
    name.className = 'player-token-name';
    name.textContent = this.player.name;

    el.appendChild(name);

    if (this.player.isStar) {
      const star = document.createElement('div');
      star.className = 'player-token-star';
      star.textContent = '★';
      star.title = 'Star player';
      el.appendChild(star);
    }

    el.appendChild(this.createTooltip());

    return el;
  }

  createTooltip() {
    const tooltip = document.createElement('div');
    tooltip.className = 'player-tooltip';
    this.tooltipEl = tooltip;

    const header = document.createElement('div');
    header.className = 'player-tooltip-header';
    header.style.backgroundColor = this.teamColor;

    const avatar = document.createElement('div');
    avatar.className = 'player-tooltip-avatar';
    avatar.textContent = this.initials(this.player.name);

    const heading = document.createElement('div');
    heading.className = 'player-tooltip-heading';

    const pName = document.createElement('div');
    pName.className = 'player-tooltip-name';
    pName.textContent = this.player.name;
    if (this.player.isStar) {
      const star = document.createElement('span');
      star.className = 'player-tooltip-star';
      star.textContent = ' ★';
      star.title = 'Star player';
      pName.appendChild(star);
    }

    const pPos = document.createElement('div');
    pPos.className = 'player-tooltip-pos';
    pPos.style.backgroundColor = this.player.position === 'GK' ? '#7a1f2b' : '#2a6b52';
    pPos.textContent = this.player.position;

    const pMeta = document.createElement('div');
    pMeta.className = 'player-tooltip-meta';
    pMeta.textContent = `${this.player.age} yo · ${this.player.nationality} · ${this.player.team}`;

    heading.appendChild(pName);
    heading.appendChild(pPos);
    heading.appendChild(pMeta);
    header.appendChild(avatar);
    header.appendChild(heading);
    tooltip.appendChild(header);

    this.renderEffects();

    const stats = document.createElement('div');
    stats.className = 'player-tooltip-stats';
    this.statsEl = stats;
    this.renderStats();

    tooltip.appendChild(stats);
    return tooltip;
  }

  renderStats() {
    if (!this.statsEl) return;
    this.statsEl.innerHTML = '';

    const statLabels = [
      ['Speed', this.player.speed],
      ['Marking', this.player.marking],
      ['Tackling', this.player.tackling],
      ['Shooting', this.player.shooting],
      ['Passing', this.player.passing],
      ['Dribbling', this.player.dribbling],
      ['Tactical thinking', this.player.tacticalThinking],
      ['Heading', this.player.heading],
    ];

    if (this.player.position === 'GK') {
      statLabels.push(['Goalkeeping', this.player.goalkeeping]);
    }

    for (const [label, value] of statLabels) {
      const row = document.createElement('div');
      row.className = 'stat-row';

      const labelEl = document.createElement('span');
      labelEl.className = 'stat-label';
      labelEl.textContent = label;

      const bar = document.createElement('div');
      bar.className = 'stat-bar';
      const fill = document.createElement('div');
      fill.className = 'stat-fill';
      fill.style.width = `${value * 10}%`;
      bar.appendChild(fill);

      const valueEl = document.createElement('span');
      valueEl.className = 'stat-value';
      valueEl.textContent = `+${value}`;

      row.appendChild(labelEl);
      row.appendChild(bar);
      row.appendChild(valueEl);
      this.statsEl.appendChild(row);
    }
  }

  renderEffects() {
    let container = this.tooltipEl.querySelector('.player-tooltip-effects');
    if (this.player.effects.length === 0) {
      if (container) container.remove();
      return;
    }
    if (!container) {
      container = document.createElement('div');
      container.className = 'player-tooltip-effects';
      const stats = this.tooltipEl.querySelector('.player-tooltip-stats');
      this.tooltipEl.insertBefore(container, stats);
    }
    container.innerHTML = '';

    const title = document.createElement('div');
    title.className = 'player-tooltip-effects-title';
    title.textContent = 'Effects';
    container.appendChild(title);

    for (const effect of this.player.effects) {
      const row = document.createElement('div');
      row.className = 'effect-row';

      const icon = document.createElement('span');
      icon.className = 'effect-icon';
      icon.textContent = effect.char;

      const info = document.createElement('div');
      info.className = 'effect-info';

      const nameEl = document.createElement('div');
      nameEl.className = 'effect-name';
      nameEl.textContent = effect.label;

      const descEl = document.createElement('div');
      descEl.className = 'effect-desc';
      descEl.textContent = effect.explanation;

      info.appendChild(nameEl);
      info.appendChild(descEl);

      const turnsEl = document.createElement('span');
      turnsEl.className = 'effect-turns';
      turnsEl.textContent =
        effect.turns === Infinity ? 'whole match' : `${effect.turns} turn${effect.turns === 1 ? '' : 's'}`;

      row.appendChild(icon);
      row.appendChild(info);
      row.appendChild(turnsEl);
      container.appendChild(row);
    }
  }

  placeIn(cell, half = 'left') {
    this.el.classList.add(`half-${half}`);
    cell.appendChild(this.el);
    return this;
  }

  select() {
    this.el.classList.add('selected');
  }

  deselect() {
    this.el.classList.remove('selected');
  }
}
