/*
 * Riley — Motive Care's chat assistant
 * Self-contained, dependency-free chat widget.
 *
 * Drop-in usage on any site:
 *   <script defer src="/chatbot.js"></script>
 *
 * Everything (markup, styles, and the rule-based answer engine) lives in this
 * one file and renders inside a Shadow DOM so it never collides with the host
 * page's styles. Text chat only. No backend, no API keys, no tracking.
 */
(function () {
  'use strict';

  // Guard against double-injection.
  if (window.__motiveCareChatbotLoaded) return;
  window.__motiveCareChatbotLoaded = true;

  // --- Shop facts (single source of truth) --------------------------------
  var PHONE_DISPLAY = '(905) 201-0087';
  var PHONE_TEL = '+19052010087';
  var ADDRESS = '20 Heritage Rd, Markham, ON L3P 3P3';
  var MAPS_URL = 'https://www.google.com/maps/place/Motive+Care/';

  // Reusable snippets -------------------------------------------------------
  function phoneLink() {
    return '<a href="tel:' + PHONE_TEL + '">' + PHONE_DISPLAY + '</a>';
  }
  function mapsLink(text) {
    return '<a href="' + MAPS_URL + '" target="_blank" rel="noopener noreferrer">' + (text || 'View on Google Maps') + '</a>';
  }

  // Every price answer flows through this helper so it is IMPOSSIBLE to give a
  // firm price — the estimate + call-to-confirm line is always attached.
  function priceReply(label, range) {
    var article = /^[aeiou]/i.test(label) ? 'An ' : 'A ';
    return article + label + ' is usually around ' + range +
      ", but that's just an estimate — the final price depends on your vehicle. Call " +
      phoneLink() + ' to confirm for your car.';
  }

  var HOURS_REPLY =
    'Hours can vary, so it’s best to call ahead at ' + phoneLink() +
    ' to confirm. Appointments are recommended.';

  var BOOKING_REPLY =
    'Happy to help! We don’t have online booking, but appointments are recommended ' +
    'so Pinder can plan the right inspection and check parts. Give the shop a call at ' +
    phoneLink() + ' to book a time that works for you. We’re at ' + ADDRESS + '.';

  var GENERIC_PRICE_REPLY =
    'Here are some ballpark estimates — all depend on your vehicle, so please call ' +
    phoneLink() + ' to confirm:<br>' +
    '• Oil change: around $70 to $110<br>' +
    '• Brake pads: around $180 to $300<br>' +
    '• Tire rotation: around $40 to $60<br>' +
    '• Seasonal tire swap: around $60 to $100<br>' +
    '• Diagnostics scan: around $100 to $150<br>' +
    '• Battery replacement: around $150 to $300<br>' +
    'These are estimates only — never a final price until Pinder sees the car.';

  // --- Rule-based answer engine -------------------------------------------
  // Matched in order; first hit wins. `test` gets the lowercased message.
  var KNOWLEDGE = [
    // Greetings
    {
      test: function (m) { return /\b(hi|hey|hello|yo|good (morning|afternoon|evening))\b/.test(m); },
      reply: function () {
        return 'Hey there! 👋 I’m Riley from Motive Care. Ask me about our services, hours, pricing, or booking a visit.';
      }
    },
    // Thanks
    {
      test: function (m) { return /\b(thanks|thank you|thx|appreciate|cheers)\b/.test(m); },
      reply: function () {
        return 'Anytime! If anything else comes up, just ask — or give us a call at ' + phoneLink() + '.';
      }
    },
    // Goodbye
    {
      test: function (m) { return /\b(bye|goodbye|see ya|see you|later|that’s all|thats all)\b/.test(m); },
      reply: function () {
        return 'Take care! We’re here at ' + phoneLink() + ' whenever you need us. 🚗';
      }
    },

    // --- Pricing (specific services BEFORE the service descriptions) ------
    {
      test: function (m) { return isPrice(m) && /\boil\b/.test(m); },
      reply: function () { return priceReply('oil change', '$70 to $110 depending on the oil type'); }
    },
    {
      test: function (m) { return isPrice(m) && /\b(brake|brakes|brake pad|pads)\b/.test(m); },
      reply: function () { return priceReply('brake pad replacement (front or rear)', '$180 to $300'); }
    },
    {
      test: function (m) { return isPrice(m) && /\brotat/.test(m); },
      reply: function () { return priceReply('tire rotation', '$40 to $60'); }
    },
    {
      test: function (m) { return isPrice(m) && /\b(seasonal|swap|winter tire|summer tire|change over|changeover|tire change)\b/.test(m); },
      reply: function () { return priceReply('seasonal tire swap', '$60 to $100'); }
    },
    {
      test: function (m) { return isPrice(m) && /\b(diagnostic|diagnose|scan|check engine|check-engine|engine light)\b/.test(m); },
      reply: function () { return priceReply('diagnostics scan', '$100 to $150'); }
    },
    {
      test: function (m) { return isPrice(m) && /\b(battery|batteries)\b/.test(m); },
      reply: function () { return priceReply('battery replacement', '$150 to $300 depending on the battery'); }
    },
    {
      test: function (m) { return isPrice(m) && /\btire|tyre|wheel|alignment/.test(m); },
      reply: function () { return priceReply('seasonal tire swap', '$60 to $100'); }
    },
    // Generic price / cost question (no specific service named)
    {
      test: function (m) { return isPrice(m); },
      reply: function () { return GENERIC_PRICE_REPLY; }
    },

    // --- Hours -----------------------------------------------------------
    {
      test: function (m) { return /\b(hour|hours|open|close|closing|opening|what time|when.*(open|close)|are you open)\b/.test(m); },
      reply: function () { return HOURS_REPLY; }
    },

    // --- Booking / appointments ------------------------------------------
    {
      test: function (m) { return /\b(book|booking|appointment|appt|schedule|reserve|come in|bring.*(car|vehicle)|drop off|drop-off|slot|availab)\b/.test(m); },
      reply: function () { return BOOKING_REPLY; }
    },

    // --- Location / directions -------------------------------------------
    {
      test: function (m) { return /\b(where|location|located|address|directions|find you|how do i get|map)\b/.test(m); },
      reply: function () {
        return 'We’re at ' + ADDRESS + '. ' + mapsLink('Get directions') +
          '. Give us a call at ' + phoneLink() + ' if you need a hand finding us.';
      }
    },

    // --- Phone / contact -------------------------------------------------
    {
      test: function (m) { return /\b(phone|call|number|contact|reach|talk to|speak)\b/.test(m); },
      reply: function () {
        return 'You can reach the shop at ' + phoneLink() +
          '. You’ll speak directly with Pinder — no middlemen.';
      }
    },

    // --- Payments --------------------------------------------------------
    {
      test: function (m) { return /\b(pay|payment|card|debit|credit|cash|tap|apple pay|google pay|e-transfer|interac)\b/.test(m); },
      reply: function () {
        return 'We accept credit, debit, and mobile tap. If you’ve got a question about a specific payment method, just call ' + phoneLink() + '.';
      }
    },

    // --- Mechanic / trust / no-upsell ------------------------------------
    {
      test: function (m) { return /\b(pinder|mechanic|owner|who works|honest|trust|upsell|up-sell|unnecessary|fair|middlemen|rip.?off|scam)\b/.test(m); },
      reply: function () {
        return 'Our lead mechanic is Pinder — known in Markham for over 15 years for honesty, fair pricing, and no unnecessary work. ' +
          'You speak with him directly, no middlemen, and we never push service you don’t need.';
      }
    },

    // --- Ratings / reviews -----------------------------------------------
    {
      test: function (m) { return /\b(rating|review|reviews|star|stars|google|reputation|how good)\b/.test(m); },
      reply: function () {
        return 'We’re rated 4.7 stars with 98+ reviews on Google. Folks mostly mention Pinder’s honesty and fair pricing. 😊';
      }
    },

    // --- Individual services ---------------------------------------------
    {
      test: function (m) { return /\b(diagnostic|diagnose|check engine|check-engine|warning|noise|leak|drivability|smell|vibrat.*engine)\b/.test(m); },
      reply: function () {
        return 'We do full diagnostics — check-engine lights, warning messages, odd noises, leaks, and drivability concerns — using modern scanning tools to pin down the real issue. ' +
          'Call ' + phoneLink() + ' and Pinder can take a look.';
      }
    },
    {
      test: function (m) { return /\bbrake|brakes|rotor|caliper|squeak|grind/.test(m); },
      reply: function () {
        return 'Brake service is one of our specialties: pads, rotors, caliper servicing, fluid flushes, vibration diagnostics, and safety inspections. ' +
          'Want an estimate? Just ask, or call ' + phoneLink() + '.';
      }
    },
    {
      test: function (m) { return /\btire|tyre|wheel|alignment|balanc|tpms|rotation|seasonal/.test(m); },
      reply: function () {
        return 'For tires we handle seasonal changes, mounting, balancing, wear inspection, tire-pressure monitoring, and alignment. ' +
          'Ask me for a price estimate or call ' + phoneLink() + ' to set a time.';
      }
    },
    {
      test: function (m) { return /\boil|filter|fluid|maintenance|service interval|health check/.test(m); },
      reply: function () {
        return 'Oil changes include oil and filter replacement, a fluid check-up, interval reset, and a quick vehicle health check. ' +
          'Ask me for a price estimate anytime.';
      }
    },
    {
      test: function (m) { return /\b(electric|electrical|battery|starter|alternator|wiring|ignition|won.?t start|dead battery)\b/.test(m); },
      reply: function () {
        return 'We cover electrical and engine work — battery testing, starter and alternator replacement, wiring, and ignition diagnostics — on both older and newer vehicles. ' +
          'Call ' + phoneLink() + ' to get it looked at.';
      }
    },
    {
      test: function (m) { return /\b(part|parts|oem|aftermarket|source|order.*part)\b/.test(m); },
      reply: function () {
        return 'We source quality aftermarket and OEM parts and help with repair planning — honest guidance, no sales pressure. Call ' + phoneLink() + ' to talk parts with Pinder.';
      }
    },

    // --- Services overview -----------------------------------------------
    {
      test: function (m) { return /\b(service|services|offer|do you do|what can you|help with|fix|repair|work on)\b/.test(m); },
      reply: function () {
        return 'Here’s what we handle at Motive Care:<br>' +
          '• Diagnostics (check-engine lights, noises, leaks)<br>' +
          '• Brake repair<br>' +
          '• Tires &amp; alignment<br>' +
          '• Oil changes<br>' +
          '• Electrical &amp; engine work<br>' +
          '• Motor parts sourcing<br>' +
          'Ask about any of these, or a price estimate!';
      }
    }
  ];

  // Is the message asking about price/cost?
  function isPrice(m) {
    return /\b(price|cost|how much|charge|fee|quote|estimate|\$|expensive|cheap|rate|pricing)\b/.test(m);
  }

  function FALLBACK() {
    return 'I’m not totally sure about that one — best to call the shop at ' + phoneLink() +
      ' and Pinder can help you out. You can also ask me about services, pricing, hours, or booking.';
  }

  function answer(text) {
    var m = ' ' + text.toLowerCase().trim() + ' ';
    for (var i = 0; i < KNOWLEDGE.length; i++) {
      if (KNOWLEDGE[i].test(m)) return KNOWLEDGE[i].reply();
    }
    return FALLBACK();
  }

  var SUGGESTIONS = [
    'What services do you offer?',
    'How much is an oil change?',
    'Where are you located?',
    'How do I book?'
  ];

  var OPENING =
    'Hi! I’m Riley from Motive Care. Ask me about our services, hours, or booking a visit.';

  // --- Styles (scoped inside the shadow root) -----------------------------
  var STYLES =
    ':host{all:initial;}' +
    '*{box-sizing:border-box;margin:0;padding:0;font-family:"Work Sans","Segoe UI",system-ui,-apple-system,sans-serif;}' +
    '.mc-launcher{position:fixed;bottom:20px;right:20px;width:60px;height:60px;border-radius:50%;background:#e07b00;border:none;cursor:pointer;box-shadow:0 6px 20px rgba(0,0,0,.35);display:flex;align-items:center;justify-content:center;z-index:2147483000;transition:transform .18s ease,background .18s ease;}' +
    '.mc-launcher:hover{background:#b86500;transform:translateY(-2px);}' +
    '.mc-launcher:focus-visible{outline:3px solid #fff;outline-offset:2px;}' +
    '.mc-launcher svg{width:28px;height:28px;fill:none;stroke:#fff;stroke-width:2;}' +
    '.mc-badge{position:absolute;top:-3px;right:-3px;width:14px;height:14px;background:#2ecc71;border:2px solid #1a1a1a;border-radius:50%;}' +
    '.mc-panel{position:fixed;bottom:92px;right:20px;width:370px;max-width:calc(100vw - 40px);height:560px;max-height:calc(100vh - 120px);background:#1a1a1a;border-radius:16px;box-shadow:0 12px 40px rgba(0,0,0,.5);display:flex;flex-direction:column;overflow:hidden;z-index:2147483000;opacity:0;transform:translateY(12px) scale(.98);pointer-events:none;transition:opacity .2s ease,transform .2s ease;border:1px solid #2a2a2a;}' +
    '.mc-panel.mc-open{opacity:1;transform:translateY(0) scale(1);pointer-events:auto;}' +
    '.mc-header{background:#111;padding:14px 16px;display:flex;align-items:center;gap:12px;border-bottom:1px solid #262626;}' +
    '.mc-avatar{width:40px;height:40px;border-radius:50%;background:#e07b00;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:16px;flex-shrink:0;}' +
    '.mc-h-text{flex:1;min-width:0;}' +
    '.mc-h-name{color:#fff;font-weight:700;font-size:15px;line-height:1.2;}' +
    '.mc-h-sub{color:#9a9a9a;font-size:12px;display:flex;align-items:center;gap:5px;margin-top:2px;}' +
    '.mc-dot{width:7px;height:7px;border-radius:50%;background:#2ecc71;display:inline-block;}' +
    '.mc-close{background:none;border:none;color:#9a9a9a;cursor:pointer;padding:6px;border-radius:6px;line-height:0;}' +
    '.mc-close:hover{color:#fff;background:#262626;}' +
    '.mc-close svg{width:18px;height:18px;stroke:currentColor;stroke-width:2.2;fill:none;}' +
    '.mc-body{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px;background:#1a1a1a;}' +
    '.mc-body::-webkit-scrollbar{width:6px;}' +
    '.mc-body::-webkit-scrollbar-thumb{background:#3a3a3a;border-radius:3px;}' +
    '.mc-msg{max-width:82%;padding:10px 13px;border-radius:14px;font-size:14px;line-height:1.45;word-wrap:break-word;}' +
    '.mc-bot{align-self:flex-start;background:#2a2a2a;color:#ececec;border-bottom-left-radius:4px;}' +
    '.mc-user{align-self:flex-end;background:#e07b00;color:#fff;border-bottom-right-radius:4px;}' +
    '.mc-msg a{color:inherit;font-weight:700;text-decoration:underline;}' +
    '.mc-bot a{color:#f6a340;}' +
    '.mc-chips{display:flex;flex-wrap:wrap;gap:8px;padding:4px 2px 2px;}' +
    '.mc-chip{background:transparent;border:1px solid #e07b00;color:#f6a340;padding:8px 12px;border-radius:20px;font-size:13px;cursor:pointer;transition:background .15s ease,color .15s ease;min-height:36px;}' +
    '.mc-chip:hover{background:#e07b00;color:#fff;}' +
    '.mc-typing{align-self:flex-start;background:#2a2a2a;padding:12px 14px;border-radius:14px;border-bottom-left-radius:4px;display:flex;gap:4px;}' +
    '.mc-typing span{width:7px;height:7px;background:#8a8a8a;border-radius:50%;animation:mc-blink 1.4s infinite both;}' +
    '.mc-typing span:nth-child(2){animation-delay:.2s;}' +
    '.mc-typing span:nth-child(3){animation-delay:.4s;}' +
    '@keyframes mc-blink{0%,80%,100%{opacity:.3;}40%{opacity:1;}}' +
    '.mc-inputbar{display:flex;gap:8px;padding:12px;background:#111;border-top:1px solid #262626;align-items:center;}' +
    '.mc-input{flex:1;background:#242424;border:1px solid #333;border-radius:22px;padding:11px 15px;color:#fff;font-size:14px;outline:none;min-width:0;}' +
    '.mc-input::placeholder{color:#777;}' +
    '.mc-input:focus{border-color:#e07b00;}' +
    '.mc-send{background:#e07b00;border:none;width:42px;height:42px;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background .15s ease;}' +
    '.mc-send:hover{background:#b86500;}' +
    '.mc-send:disabled{background:#3a3a3a;cursor:default;}' +
    '.mc-send svg{width:19px;height:19px;fill:#fff;}' +
    '.mc-footer{text-align:center;font-size:11px;color:#666;padding:7px 8px;background:#111;letter-spacing:.2px;}' +
    '@media (max-width:480px){' +
      '.mc-panel{width:100vw;max-width:100vw;height:100vh;max-height:100vh;bottom:0;right:0;border-radius:0;border:none;}' +
      '.mc-launcher{bottom:16px;right:16px;}' +
    '}';

  // --- Build the DOM ------------------------------------------------------
  function init() {
    var host = document.createElement('div');
    host.id = 'motive-care-chatbot';
    document.body.appendChild(host);
    var root = host.attachShadow({ mode: 'open' });

    var style = document.createElement('style');
    style.textContent = STYLES;
    root.appendChild(style);

    var chatIcon =
      '<svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>';
    var closeIcon =
      '<svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>';

    var launcher = document.createElement('button');
    launcher.className = 'mc-launcher';
    launcher.setAttribute('aria-label', 'Open chat with Riley from Motive Care');
    launcher.innerHTML = chatIcon + '<span class="mc-badge"></span>';
    root.appendChild(launcher);

    var panel = document.createElement('div');
    panel.className = 'mc-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Chat with Riley from Motive Care');
    panel.innerHTML =
      '<div class="mc-header">' +
        '<div class="mc-avatar">R</div>' +
        '<div class="mc-h-text">' +
          '<div class="mc-h-name">Riley</div>' +
          '<div class="mc-h-sub"><span class="mc-dot"></span>Motive Care’s assistant</div>' +
        '</div>' +
        '<button class="mc-close" aria-label="Close chat">' + closeIcon + '</button>' +
      '</div>' +
      '<div class="mc-body" id="mc-body"></div>' +
      '<div class="mc-inputbar">' +
        '<input class="mc-input" id="mc-input" type="text" placeholder="Type your message…" ' +
          'autocomplete="off" aria-label="Type your message" />' +
        '<button class="mc-send" id="mc-send" aria-label="Send message">' +
          '<svg viewBox="0 0 24 24"><path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/></svg>' +
        '</button>' +
      '</div>' +
      '<div class="mc-footer">Powered by Intelligent Automations</div>';
    root.appendChild(panel);

    var body = panel.querySelector('#mc-body');
    var input = panel.querySelector('#mc-input');
    var sendBtn = panel.querySelector('#mc-send');
    var closeBtn = panel.querySelector('.mc-close');
    var started = false;

    function scrollDown() { body.scrollTop = body.scrollHeight; }

    function addMsg(html, who) {
      var el = document.createElement('div');
      el.className = 'mc-msg ' + (who === 'user' ? 'mc-user' : 'mc-bot');
      el.innerHTML = html;
      body.appendChild(el);
      scrollDown();
      return el;
    }

    function addChips() {
      var wrap = document.createElement('div');
      wrap.className = 'mc-chips';
      SUGGESTIONS.forEach(function (q) {
        var chip = document.createElement('button');
        chip.className = 'mc-chip';
        chip.type = 'button';
        chip.textContent = q;
        chip.addEventListener('click', function () {
          wrap.remove();
          handleUser(q);
        });
        wrap.appendChild(chip);
      });
      body.appendChild(wrap);
      scrollDown();
    }

    function botRespond(text) {
      var typing = document.createElement('div');
      typing.className = 'mc-typing';
      typing.innerHTML = '<span></span><span></span><span></span>';
      body.appendChild(typing);
      scrollDown();
      var delay = 500 + Math.min(text.length * 12, 900);
      setTimeout(function () {
        typing.remove();
        addMsg(answer(text), 'bot');
      }, delay);
    }

    function handleUser(text) {
      var t = (text || '').trim();
      if (!t) return;
      addMsg(escapeHtml(t), 'user');
      botRespond(t);
    }

    function escapeHtml(s) {
      return s.replace(/[&<>"']/g, function (c) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
      });
    }

    function startConversation() {
      if (started) return;
      started = true;
      addMsg(OPENING, 'bot');
      addChips();
    }

    function openPanel() {
      panel.classList.add('mc-open');
      launcher.innerHTML = closeIcon;
      launcher.setAttribute('aria-label', 'Close chat with Riley');
      startConversation();
      setTimeout(function () { input.focus(); }, 250);
    }
    function closePanel() {
      panel.classList.remove('mc-open');
      launcher.innerHTML = chatIcon + '<span class="mc-badge"></span>';
      launcher.setAttribute('aria-label', 'Open chat with Riley from Motive Care');
    }
    function toggle() {
      if (panel.classList.contains('mc-open')) closePanel(); else openPanel();
    }

    launcher.addEventListener('click', toggle);
    closeBtn.addEventListener('click', closePanel);
    sendBtn.addEventListener('click', function () {
      handleUser(input.value);
      input.value = '';
      input.focus();
    });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleUser(input.value);
        input.value = '';
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && panel.classList.contains('mc-open')) closePanel();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
