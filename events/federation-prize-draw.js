class FederationPrizeDrawEvent {
  static weight = 1;

  constructor() {
    this.title = 'Federation Prize Draw';
    this.description =
      'The Football Federation is hosting its traditional prize draw in the lobby: spin the golden wheel and win prizes for your team. The last federation auditor was fired for calling it "a rigged roulette".';
  }

  options(teamName) {
    const team = TEAMS[teamName];
    if (!team) return [];

    return [
      {
        label: 'Spin the wheel — anything could happen',
        description:
          'You step up and give the golden wheel a mighty spin. Extra cards per turn, a new coach, a penalty, or the legendary jackpot: your pick of any rare card.',
        execute: () => {
          const roll = Math.random();
          if (roll < 0.3) {
            return;
          }
          if (roll < 0.55) {
            if (!wcTeamBuffs) wcTeamBuffs = {};
            wcTeamBuffs[teamName] = { drawBonus: 1, turns: 1 };
            return;
          }
          if (roll < 0.75) {
            const pool = wcUnusedCoaches(teamName);
            if (pool.length > 0) {
              const coach = pool[Math.floor(Math.random() * pool.length)];
              if (!wcPendingCoaches) wcPendingCoaches = {};
              wcPendingCoaches[teamName] = coach;
              if (!wcOwnedCoaches) wcOwnedCoaches = {};
              if (!wcOwnedCoaches[teamName]) wcOwnedCoaches[teamName] = [];
              wcOwnedCoaches[teamName].push(coach);
            }
            return;
          }
          if (roll < 0.9) {
            const allPenaltyCards = CARD_TYPES.filter((Ctor) => {
              if (typeof Ctor !== 'function') return false;
              try {
                return new Ctor().category === 'penalty';
              } catch {
                return false;
              }
            });
            if (allPenaltyCards.length > 0) {
              const penalty =
                new allPenaltyCards[Math.floor(Math.random() * allPenaltyCards.length)]();
              if (!wcPendingPenalties) wcPendingPenalties = {};
              if (!wcPendingPenalties[teamName]) wcPendingPenalties[teamName] = [];
              wcPendingPenalties[teamName].push(penalty);
            }
            return;
          }
          FederationPrizeDrawEvent.showJackpotModal(teamName);
        },
      },
      {
        label: 'Skip the ceremony — +1 tactical thinking next match',
        description:
          'You have seen how the federation counts votes; you want no part in how it counts prizes. You spend the evening studying opponents instead.',
        execute: () => {
          if (!wcTeamBuffs) wcTeamBuffs = {};
          wcTeamBuffs[teamName] = { tacticalThinking: 1, turns: 1 };
        },
      },
    ];
  }

  static showJackpotModal(teamName) {
    const pool = CARD_TYPES.filter((Ctor) => {
      if (typeof Ctor !== 'function') return false;
      try {
        const inst = new Ctor();
        return inst.rarity === 2 && inst.category !== 'penalty';
      } catch {
        return false;
      }
    });
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    const choices = shuffled.slice(0, 3).map((Ctor) => new Ctor());

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    const modal = document.createElement('div');
    modal.className = 'shot-modal halftime-modal event-phase-modal';
    const content = document.createElement('div');
    content.className = 'shot-modal-content halftime-content';

    const title = document.createElement('div');
    title.className = 'halftime-title';
    title.textContent = 'JACKPOT!';
    content.appendChild(title);

    const desc = document.createElement('div');
    desc.className = 'halftime-kickoff';
    desc.textContent = 'The wheel lands on the golden segment! Pick one rare card for your deck:';
    content.appendChild(desc);

    const optionsWrap = document.createElement('div');
    optionsWrap.className = 'event-phase-options';

    for (const card of choices) {
      const btn = document.createElement('button');
      btn.className = 'event-phase-option';
      btn.innerHTML =
        `<div class="event-option-label">${card.name || 'Unknown Card'}</div>` +
        `<div class="event-option-desc">${card.description || ''}</div>`;
      btn.addEventListener('click', () => {
        if (!wcTrainingCards) wcTrainingCards = {};
        if (!wcTrainingCards[teamName]) wcTrainingCards[teamName] = [];
        wcTrainingCards[teamName].push(card);
        overlay.remove();
      });
      optionsWrap.appendChild(btn);
    }

    content.appendChild(optionsWrap);
    modal.appendChild(content);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
  }
}
