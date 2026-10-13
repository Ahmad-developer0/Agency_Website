/* ============================================
   Website chat assistant
   Floating button + panel; answers come from /api/chat,
   which only knows the website's own content.
============================================ */

(function () {
  const CHAT_API = "/api/chat";
  const WHATSAPP_URL =
    "https://wa.me/923157558885?text=" +
    encodeURIComponent("Hello! I came across your website and would like to discuss a project with your team.");
  const GREETING =
    "Hi! I'm the Nexyra Studio assistant. Ask me about our services, process, portfolio or how to book a call.";

  // Visitor + assistant turns sent back to the API on every message
  const history = [];
  let busy = false;

  const root = document.createElement("div");
  root.className = "chatbot";
  root.innerHTML = `
    <div class="chatbot-panel" id="chatbot-panel" role="dialog" aria-label="Chat with Nexyra Studio" aria-hidden="true">
      <div class="chatbot-head">
        <div>
          <div class="chatbot-title">Nexyra Assistant</div>
          <div class="chatbot-sub">Answers about Nexyra Studio only</div>
        </div>
        <button type="button" class="chatbot-close" aria-label="Close chat">&#10005;</button>
      </div>
      <div class="chatbot-log" aria-live="polite"></div>
      <form class="chatbot-form">
        <input type="text" class="chatbot-input" maxlength="1000" placeholder="Type your question..." aria-label="Your message" autocomplete="off" />
        <button type="submit" class="chatbot-send" aria-label="Send">
          <i class="bi bi-send-fill"></i>
        </button>
      </form>
      <a class="chatbot-wa" href="${WHATSAPP_URL}" target="_blank" rel="noopener noreferrer">
        <i class="bi bi-whatsapp"></i> Chat with us on WhatsApp
      </a>
    </div>
    <button type="button" class="chatbot-toggle" aria-label="Open chat" aria-controls="chatbot-panel" aria-expanded="false">
      <img src="/public/images/logo-round-128.webp" alt="" class="chatbot-toggle-logo" width="54" height="54" />
    </button>`;
  document.body.appendChild(root);

  const panel = root.querySelector(".chatbot-panel");
  const toggle = root.querySelector(".chatbot-toggle");
  const log = root.querySelector(".chatbot-log");
  const form = root.querySelector(".chatbot-form");
  const input = root.querySelector(".chatbot-input");
  const send = root.querySelector(".chatbot-send");

  function addBubble(role, text) {
    const el = document.createElement("div");
    el.className = `chatbot-msg chatbot-${role}`;
    el.textContent = text;
    log.appendChild(el);
    log.scrollTop = log.scrollHeight;
    return el;
  }

  function setOpen(open) {
    root.classList.toggle("open", open);
    panel.setAttribute("aria-hidden", String(!open));
    toggle.setAttribute("aria-expanded", String(open));
    if (open) {
      if (!log.children.length) addBubble("bot", GREETING);
      input.focus();
    }
  }

  toggle.addEventListener("click", () => setOpen(!root.classList.contains("open")));
  root.querySelector(".chatbot-close").addEventListener("click", () => setOpen(false));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && root.classList.contains("open")) setOpen(false);
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text || busy) return;

    busy = true;
    send.disabled = true;
    input.value = "";
    addBubble("user", text);
    history.push({ role: "user", content: text });

    const typing = addBubble("bot", "Typing...");
    typing.classList.add("chatbot-typing");

    try {
      const resp = await fetch(CHAT_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      const data = await resp.json().catch(() => ({}));
      if (!resp.ok || !data.success) throw new Error(data.error || "Request failed");

      typing.remove();
      addBubble("bot", data.reply);
      history.push({ role: "assistant", content: data.reply });
    } catch (err) {
      console.error("Chat error:", err);
      typing.remove();
      // Drop the unanswered question so the next request stays well-formed
      history.pop();
      addBubble("bot", "Sorry, I couldn't reply just now. Please try again, or message us on WhatsApp at +92 315 7558885.");
    } finally {
      busy = false;
      send.disabled = false;
      input.focus();
    }
  });
})();
