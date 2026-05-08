// ============================================================
//  CHAT.JS  — Simple Fake Live Chat
// ============================================================

(function () {
  'use strict';

  function buildChat() {
    if (document.getElementById('chat-widget')) return;

    const widget = document.createElement('div');
    widget.id = 'chat-widget';
    widget.innerHTML = `
      <button class="chat-fab" id="chatFab" aria-label="Open chat">
        <svg class="chat-fab-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
        <svg class="chat-close-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display:none">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>

      <div class="chat-window" id="chatWindow" aria-hidden="true">
        <div class="chat-header">
          <div class="chat-header-info">
            <div class="chat-avatar">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <div>
              <span class="chat-header-title" data-lang="chat_title">Support Chat</span>
              <span class="chat-online-dot"></span>
            </div>
          </div>
        </div>

        <div class="chat-messages" id="chatMessages"></div>

        <div class="chat-quick-btns" id="chatQuickBtns"></div>

        <div class="chat-input-row">
          <input
            type="text"
            class="chat-input"
            id="chatInput"
            data-lang-placeholder="chat_placeholder"
            placeholder="Type a message..."
            autocomplete="off"
          />
          <button class="chat-send-btn" id="chatSend" aria-label="Send">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(widget);
    initChatLogic();
  }

  function initChatLogic() {
    const fab       = document.getElementById('chatFab');
    const win       = document.getElementById('chatWindow');
    const msgs      = document.getElementById('chatMessages');
    const input     = document.getElementById('chatInput');
    const sendBtn   = document.getElementById('chatSend');
    const quickBtns = document.getElementById('chatQuickBtns');
    let opened = false;

    // Toggle open/close
    fab.addEventListener('click', () => {
      opened = !opened;
      win.classList.toggle('open', opened);
      win.setAttribute('aria-hidden', String(!opened));
      fab.querySelector('.chat-fab-icon').style.display  = opened ? 'none'  : 'block';
      fab.querySelector('.chat-close-icon').style.display = opened ? 'block' : 'none';
      if (opened && msgs.children.length === 0) initWelcome();
      if (opened) input.focus();
    });

    function initWelcome() {
      const lang = (typeof getLang === 'function') ? getLang() : 'en';
      const tr   = (typeof TRANSLATIONS !== 'undefined') ? TRANSLATIONS[lang] : null;

      const welcome = tr ? tr.chat_welcome : "👋 Hi! How can I help you today?";
      const options = tr ? tr.chat_options : ["Hello 👋","Booking help","Contact support","Pricing info"];

      addMessage(welcome, 'bot');

      // Quick option buttons
      quickBtns.innerHTML = '';
      options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'chat-quick-btn';
        btn.textContent = opt;
        btn.addEventListener('click', () => {
          addMessage(opt, 'user');
          quickBtns.innerHTML = '';
          botReply(opt);
        });
        quickBtns.appendChild(btn);
      });
    }

    function addMessage(text, who) {
      const div = document.createElement('div');
      div.className = `chat-msg chat-msg-${who}`;
      div.innerHTML = `<span class="chat-bubble">${escHtml(text)}</span>`;
      msgs.appendChild(div);
      msgs.scrollTop = msgs.scrollHeight;
    }

    function botReply(userText) {
      const lang   = (typeof getLang === 'function') ? getLang() : 'en';
      const tr     = (typeof TRANSLATIONS !== 'undefined') ? TRANSLATIONS[lang] : null;
      const replies = tr ? tr.chat_replies : {};
      const text   = replies[userText] || replies['default'] || "Thanks! We'll get back to you shortly.";

      setTimeout(() => addMessage(text, 'bot'), 600);
    }

    function sendMsg() {
      const val = input.value.trim();
      if (!val) return;
      addMessage(val, 'user');
      input.value = '';
      quickBtns.innerHTML = '';
      botReply(val);
    }

    sendBtn.addEventListener('click', sendMsg);
    input.addEventListener('keydown', e => { if (e.key === 'Enter') sendMsg(); });
  }

  function escHtml(str) {
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  // Build after DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildChat);
  } else {
    buildChat();
  }
})();
