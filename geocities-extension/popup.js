const DEFAULT_STATE = {
  enabled: false,
  theme: 'neon',
  marquee: true,
  counter: true,
  sparkle: true,
  blink: true
};

function loadState(cb) {
  browser.storage.local.get(DEFAULT_STATE, cb);
}

function saveAndApply(state) {
  browser.storage.local.set(state);
  browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) {
      browser.tabs.sendMessage(tabs[0].id, { type: 'UPDATE_STATE', state });
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('toggleBtn');
  const themeBtns = document.querySelectorAll('.theme-btn');
  const chkMarquee = document.getElementById('chkMarquee');
  const chkCounter = document.getElementById('chkCounter');
  const chkSparkle = document.getElementById('chkSparkle');
  const chkBlink = document.getElementById('chkBlink');

  let state = { ...DEFAULT_STATE };

  function applyUIState() {
    toggleBtn.textContent = state.enabled ? 'ON' : 'OFF';
    toggleBtn.className = 'toggle-btn ' + (state.enabled ? 'on' : 'off');
    themeBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.theme === state.theme);
    });
    chkMarquee.checked = state.marquee;
    chkCounter.checked = state.counter;
    chkSparkle.checked = state.sparkle;
    chkBlink.checked = state.blink;
  }

  loadState((stored) => {
    state = stored;
    applyUIState();
  });

  toggleBtn.addEventListener('click', () => {
    state.enabled = !state.enabled;
    applyUIState();
    saveAndApply(state);
  });

  themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      state.theme = btn.dataset.theme;
      if (!state.enabled) {
        state.enabled = true;
      }
      applyUIState();
      saveAndApply(state);
    });
  });

  [chkMarquee, chkCounter, chkSparkle, chkBlink].forEach(chk => {
    chk.addEventListener('change', () => {
      state.marquee = chkMarquee.checked;
      state.counter = chkCounter.checked;
      state.sparkle = chkSparkle.checked;
      state.blink = chkBlink.checked;
      saveAndApply(state);
    });
  });
});
