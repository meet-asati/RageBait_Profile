// Central asset map — all memes in this folder are MP4 videos.
const memeAssets = {
  sayMyName: "say_my_name.mp4",
  baby: "son_baby.mp4",
  tungTungSahur: "tung_tung.mp4",
  gigachad: "gigachad.mp4",
  gareeb: "yeh_jo_gareeb hove.mp4",
  catLaugh: "cat_laugh.mp4", // not supplied yet; falls back to an animated cat if missing
  rickroll: "rick_roll.mp4",
  ads: ["ad1.jpeg", "ad2.jpeg", "ad3.jpeg"]
};

const ragebaitState = {
  usernameAttempts: 0,
  fontDecreaseAttempts: 0,
  fontSize: 20,
  auraAttempts: 0,
  adCloseAttempts: 0,
  adTimer: null,
  auraCompleted: false,
  premiumCompleted: false,
  premiumOpen: false,
  selectedImage: null,
  imageUrl: null,
  lastFocus: null,
  saving: false
};

const $ = (id) => document.getElementById(id);

function assetUrl(path) {
  return encodeURI(path);
}

function playAnim(el, cls) {
  el.classList.remove("anim-shake", "anim-shake-hard", "anim-fade", "anim-zoom", "anim-reveal");
  void el.offsetWidth; // restart animation
  el.classList.add(cls);
}

function setVideo(video, key, label) {
  video.src = assetUrl(memeAssets[key]);
  video.setAttribute("aria-label", label);
  video.onerror = () => {
    const fallback = document.createElement("p");
    fallback.textContent = `[${label} failed to load]`;
    video.replaceWith(fallback);
  };
  video.play().catch(() => {});
}

function showMessage(el, text, anim = "anim-fade") {
  el.textContent = text;
  playAnim(el, anim);
}

function randomFrom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

// ---------- Username ----------
const usernameExtras = [
  "Bro, I literally told you what to do.",
  "USERNAME NOT FOUND. SKILL ISSUE.",
  "Meet and Soham supremacy.",
  "The problem is clearly on your side.",
  "Have you tried being Meet or Soham?",
  "Error 404: rizz not found."
];

function handleUsernameUpdate() {
  ragebaitState.usernameAttempts++;
  const msg = $("usernameMessage");
  const n = ragebaitState.usernameAttempts;
  msg.classList.toggle("loud", n === 2);

  if (n === 1) {
    showMessage(msg, "What!! i can't see that plz try again", "anim-shake");
  } else if (n === 2) {
    showMessage(msg, "say it louder", "anim-shake-hard");
  } else if (n === 3) {
    showMessage(msg, "Still can't see that I guess you have to say our names", "anim-zoom");
    const box = $("sayMyName");
    box.hidden = false;
    setVideo(box.querySelector("video"), "sayMyName", "Say my name meme");
    playAnim(box, "anim-reveal");
  } else {
    showMessage(msg, randomFrom(usernameExtras), "anim-shake");
  }
}

// ---------- Font size ----------
const FONT_MIN = 2, FONT_MAX = 48;
const plusSteps = [16, 12, 9];
const decreaseLies = ["Font size decreased successfully!", "Your eyesight has been upgraded.", "Trust the process."];

function applyFontSize() {
  $("sampleText").style.fontSize = ragebaitState.fontSize + "px";
}

function handleFontIncrease() {
  const s = ragebaitState.fontSize;
  const next = plusSteps.find((v) => v < s);
  ragebaitState.fontSize = Math.max(FONT_MIN, next ?? s - 2);
  applyFontSize();
  showMessage($("fontMessage"), "Font size increased successfully!");
}

function handleFontDecrease() {
  ragebaitState.fontDecreaseAttempts++;
  if (ragebaitState.fontDecreaseAttempts === 1) {
    showMessage($("fontMessage"), "Wait... the + button will increase size", "anim-shake");
    playAnim($("fontMinusBtn"), "anim-shake");
    return;
  }
  ragebaitState.fontSize = Math.min(FONT_MAX, ragebaitState.fontSize + 4);
  applyFontSize();
  showMessage($("fontMessage"), randomFrom(decreaseLies));
}

// ---------- Aura ----------
function handleImageUpload(event) {
  const file = event.target.files[0];
  const msg = $("uploadMessage");
  if (!file) return;
  if (!file.type.startsWith("image/")) {
    showMessage(msg, "That's not an image, bestie. Try a JPG/PNG.", "anim-shake");
    event.target.value = "";
    return;
  }
  const url = URL.createObjectURL(file);
  const img = $("avatarPreview");
  img.onload = () => {
    if (ragebaitState.imageUrl && ragebaitState.imageUrl !== url) URL.revokeObjectURL(ragebaitState.imageUrl);
    ragebaitState.imageUrl = url;
    ragebaitState.selectedImage = file;
    img.hidden = false;
    $("avatarPlaceholder").hidden = true;
    $("analyzeAuraBtn").disabled = false;
    showMessage(msg, "Looking good! (allegedly)");
  };
  img.onerror = () => {
    URL.revokeObjectURL(url);
    showMessage(msg, "Couldn't load that image. Even your files lack aura.", "anim-shake");
  };
  img.src = url;
}

function handleAuraAnalysis() {
  ragebaitState.auraAttempts++;
  const n = ragebaitState.auraAttempts;
  const result = $("auraResult");
  const text = $("auraText");
  const video = $("auraVideo");
  result.hidden = false;
  result.classList.remove("legendary");
  text.replaceChildren();

  if (n === 1) {
    setVideo(video, "baby", "Funny baby meme");
    text.textContent = "no aura found try another photo";
    playAnim(result, "anim-zoom");
  } else if (n === 2) {
    setVideo(video, "tungTungSahur", "Tung Tung Tung Sahur meme");
    text.textContent = "still can't find it";
    playAnim(result, "anim-shake-hard");
  } else {
    setVideo(video, "gigachad", "Sigma Gigachad meme");
    result.classList.add("legendary");
    const h = document.createElement("div");
    h.textContent = "AURA DETECTED";
    const score = document.createElement("div");
    score.className = "aura-score";
    score.textContent = "+9999999999999999999999999999999999999";
    const tag = document.createElement("div");
    tag.textContent = "BRO HAS UNLIMITED AURA";
    text.append(h, score, tag);
    playAnim(result, "anim-reveal");
    // keep piling on nines
    let extra = 0;
    const grow = setInterval(() => {
      score.textContent += "999";
      if (++extra > 15) { clearInterval(grow); score.textContent += "..."; }
    }, 120);
    $("auraDoneBtn").hidden = false;
  }
}

function handleAuraCompletion() {
  ragebaitState.auraCompleted = true;
  showMessage($("uploadMessage"), "Aura successfully downloaded. ✨", "anim-zoom");
  burstStars(["⭐", "✨", "🌟", "💫"]);
}

function burstStars(chars) {
  const fx = $("fx");
  for (let i = 0; i < 24; i++) {
    const s = document.createElement("span");
    s.className = "star";
    s.textContent = randomFrom(chars);
    s.style.left = Math.random() * 100 + "vw";
    s.style.animationDelay = Math.random() * 0.6 + "s";
    fx.appendChild(s);
    setTimeout(() => s.remove(), 3000);
  }
}

// ---------- Ad + Premium ----------
function rotateAd() {
  const i = ragebaitState.adCloseAttempts % memeAssets.ads.length;
  $("adImage").src = assetUrl(memeAssets.ads[i]);
}

function handleAdClose() {
  if (ragebaitState.adTimer || ragebaitState.premiumOpen) return;
  ragebaitState.adCloseAttempts++;
  const ad = $("adBanner");
  const msg = $("adMessage");
  ad.hidden = true;

  if (ragebaitState.adCloseAttempts === 1) {
    showMessage(msg, "Ad closed successfully!");
  } else if (ragebaitState.adCloseAttempts === 2) {
    showMessage(msg, "Almost there! Just one more step.");
  } else {
    showMessage(msg, "");
    showPremiumModal();
    return;
  }
  ragebaitState.adTimer = setTimeout(() => {
    ragebaitState.adTimer = null;
    rotateAd();
    ad.hidden = false;
    playAnim(ad, "anim-zoom");
  }, 1000);
}

function showPremiumModal() {
  if (ragebaitState.premiumOpen) return;
  ragebaitState.premiumOpen = true;
  ragebaitState.lastFocus = document.activeElement;
  $("premiumOffer").hidden = false;
  $("premiumNoResult").hidden = true;
  $("premiumYesResult").hidden = true;
  $("premiumModal").hidden = false;
  $("premiumYesBtn").focus();
}

function closePremiumModal() {
  ragebaitState.premiumOpen = false;
  $("premiumModal").hidden = true;
  $("premiumNoResult").querySelector("video")?.pause();
  const back = ragebaitState.lastFocus;
  (back && document.contains(back) && !back.closest("[hidden]") ? back : $("saveBtn")).focus();
}

function handlePremiumNo() {
  $("premiumOffer").hidden = true;
  const res = $("premiumNoResult");
  res.hidden = false;
  const v = res.querySelector("video");
  if (!v.src) setVideo(v, "gareeb", "Yeh jo gareeb hove h meme");
  else v.play().catch(() => {});
  $("premiumBackBtn").focus();
}

function handlePremiumBack() {
  $("premiumNoResult").hidden = true;
  $("premiumNoResult").querySelector("video")?.pause();
  $("premiumOffer").hidden = false;
  $("premiumNoBtn").focus();
}

function handlePremiumYes() {
  if (ragebaitState.premiumCompleted) return;
  ragebaitState.premiumCompleted = true;
  $("premiumOffer").hidden = true;
  $("premiumYesResult").hidden = false;
  renderCatLaugh($("catLaughSlot"));
  $("premiumYesResult").setAttribute("tabindex", "-1");
  $("premiumYesResult").focus();
  setTimeout(() => {
    closePremiumModal();
    showMessage($("adMessage"), "Ads removed. Premium status: denied.");
  }, 2200);
}

function renderCatLaugh(slot) {
  slot.replaceChildren();
  const v = document.createElement("video");
  v.muted = true; v.loop = true; v.autoplay = true; v.playsInline = true;
  v.setAttribute("aria-label", "Laughing cat meme");
  v.onerror = () => {
    const cat = document.createElement("div");
    cat.className = "cat-fallback";
    cat.setAttribute("role", "img");
    cat.setAttribute("aria-label", "Laughing cat");
    cat.textContent = "😹";
    v.replaceWith(cat);
  };
  v.src = assetUrl(memeAssets.catLaugh);
  slot.appendChild(v);
  v.play().catch(() => {});
}

// Focus trap; Escape intentionally does nothing.
function handleModalKeys(e) {
  if (!ragebaitState.premiumOpen) return;
  if (e.key === "Escape") { e.preventDefault(); return; }
  if (e.key !== "Tab") return;
  const focusables = [...$("premiumModal").querySelectorAll("button")].filter((b) => !b.closest("[hidden]"));
  if (!focusables.length) { e.preventDefault(); return; }
  const first = focusables[0], last = focusables[focusables.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  else if (!$("premiumModal").contains(document.activeElement)) { e.preventDefault(); first.focus(); }
}

// ---------- Save ----------
const saveSteps = [
  "Saving your profile...",
  "Optimizing your aura...",
  "Synchronizing with Meet and Soham...",
  "Finalizing your premium experience..."
];

function handleSaveProfile(event) {
  event.preventDefault();
  if (ragebaitState.saving) return;
  ragebaitState.saving = true;
  const btn = $("saveBtn");
  btn.classList.add("loading");
  btn.textContent = "Saving...";
  saveSteps.forEach((step, i) => setTimeout(() => showMessage($("saveMessage"), step), i * 450));
  setTimeout(() => { window.location.href = "rickroll.html"; }, saveSteps.length * 450 + 200);
}

// ---------- Wire up ----------
function init() {
  rotateAd();
  applyFontSize();
  $("updateUsernameBtn").addEventListener("click", handleUsernameUpdate);
  $("usernameInput").addEventListener("keydown", (e) => {
    if (e.key === "Enter") { e.preventDefault(); handleUsernameUpdate(); }
  });
  $("fontPlusBtn").addEventListener("click", handleFontIncrease);
  $("fontMinusBtn").addEventListener("click", handleFontDecrease);
  $("imageInput").addEventListener("change", handleImageUpload);
  $("analyzeAuraBtn").addEventListener("click", handleAuraAnalysis);
  $("auraDoneBtn").addEventListener("click", handleAuraCompletion);
  $("adCloseBtn").addEventListener("click", handleAdClose);
  $("premiumYesBtn").addEventListener("click", handlePremiumYes);
  $("premiumNoBtn").addEventListener("click", handlePremiumNo);
  $("premiumBackBtn").addEventListener("click", handlePremiumBack);
  $("profileForm").addEventListener("submit", handleSaveProfile);
  document.addEventListener("keydown", handleModalKeys);
}

init();
