# Ragebait Profile — The Most Annoying Profile Editor Ever

A profile settings page that looks completely normal until you touch it. Every control lies to you, mocks you, or makes things worse, and clicking **Save Profile** Rickrolls you.

Built with plain HTML, CSS and JavaScript. No backend, no frameworks, no build step.

Made by **MEET AND SOHAM**.

## Running it

Open `index.html` in a browser. That's it.

If a browser blocks local video playback when the file is opened directly, serve the folder instead:

```bash
npx serve .
# or
python -m http.server
```

## What it does

### Username
You type a name and click **Update Username**. It never updates.

| Attempt | Response |
|---|---|
| 1 | "What!! i can't see that plz try again" (shake) |
| 2 | "say it louder" (big, red, harder shake) |
| 3 | "Still can't see that I guess you have to say our names", plus the Say My Name video and **MEET AND SOHAM** |
| 4+ | A random taunt, e.g. "USERNAME NOT FOUND. SKILL ISSUE." |
| 4+ with "Meet and Soham" typed | **Rizz found** in glowing gold, with a burst of 😎🔥✨ |

The "Meet and Soham" check ignores capitalization and extra spaces, and accepts "&" for "and". Changing the text in the box doesn't reset the count. Pressing Enter counts as an attempt too.

### Text size (affects the whole page)
- **+** makes the entire page's text *smaller*: 16 → 13 → 10 → 7, then 2px at a time down to 2px. It says "Font size increased successfully!"
- The first **−** only says "Wait... the + button will increase size" and shakes.
- Every **−** after that makes the page text *bigger* (+4px, up to 48px), with messages like "Your eyesight has been upgraded."
- The Text Size card itself stays a fixed size, so you can always find and click the buttons.

### Profile picture aura detector
Upload a real image. It's previewed locally with `URL.createObjectURL()` and never leaves the browser. Files that aren't images are rejected with a friendly message.

| Analyze Aura click | Result |
|---|---|
| 1 | Baby video: "no aura found try another photo" |
| 2 | Tung Tung Sahur video: "still can't find it" |
| 3 | Gigachad video: **AURA DETECTED**, a growing +999999… score, **BRO HAS UNLIMITED AURA** |

After the third click, **Click when you think you have enough aura** appears. It shows "Aura successfully downloaded." with a burst of floating stars. Uploading a new photo doesn't reset the count.

### Pop-up ads and Premium
- An ad pops up at a random spot on the page 3–7 seconds after load. It uses one of the three ad images and a random scam line.
- Closing it once shows "Ad closed successfully!", then it comes back about a second later somewhere else.
- Closing it twice shows "Almost there! Just one more step." and it comes back again.
- The third close opens the **Premium modal**: "CONGRATULATIONS! YOU HAVE UNLOCKED PREMIUM!" for **$676767676767676**.
  - Escape and clicking outside don't close it. Keyboard focus stays inside it.
  - **No** shows the gareeb video, "yeh jo gareeb hove h", and a **Back** button that returns to the offer.
  - **Yes** plays the cat-laugh video (with sound if the browser allows), "You ain't that rich budd". After about 2 seconds the modal closes and the ads stop for good.

No payment info is ever collected. It's a joke.

### Save Profile → Rickroll
**Save Profile** always works, even if you skipped everything else. It cycles through fake loading messages ("Optimizing your aura...", "Synchronizing with Meet and Soham...") and then goes to `rickroll.html`:

- **You have been rick rolled** in giant text
- The Rickroll video with controls. If the browser blocks autoplay, a **Play the Rickroll** button appears.
- A **Replay** button when the video ends, and a **Return to Profile** link

## Files

```text
index.html       Profile settings page
style.css        Styles for both pages (animations, modal, ads, responsive layout)
script.js        All interactions and state
rickroll.html    The finale page
*.mp4 / *.jpeg   Meme videos and ad images (see below)
```

## Assets

All file paths are in one place, the `memeAssets` object at the top of `script.js`.

| Key | File | Used in |
|---|---|---|
| `sayMyName` | `say_my_name.mp4` | Username, 3rd attempt |
| `baby` | `son_baby.mp4` | Aura, 1st attempt |
| `tungTungSahur` | `tung_tung.mp4` | Aura, 2nd attempt |
| `gigachad` | `gigachad.mp4` | Aura, 3rd attempt |
| `gareeb` | `yeh_jo_gareeb hove.mp4` | Premium "No" |
| `catLaugh` | `cat laugh.mp4` | Premium "Yes" |
| `rickroll` | `rick_roll.mp4` | Finale page (set directly in `rickroll.html`) |
| `ads` | `ad1.jpeg`, `ad2.jpeg`, `ad3.jpeg` | Pop-up ad, rotated each time it reappears |

The memes are MP4 videos, not GIFs, so they play as muted, looping `<video>` elements. If a video fails to load, a text fallback is shown instead.

## State

Each feature keeps its own counter in `ragebaitState` (`usernameAttempts`, `fontDecreaseAttempts`, `auraAttempts`, `adCloseAttempts`, and so on), so nothing resets anything else. Each control has its own handler, e.g. `handleUsernameUpdate`, `handleFontIncrease`, `handleAuraAnalysis`, `handleAdClose`, `handlePremiumYes` and `handleSaveProfile`.

## Accessibility

Despite the trolling, the page stays usable:

- Form controls have labels, and buttons show a visible focus ring.
- Meme videos have descriptive labels.
- The premium modal keeps keyboard focus inside it and gives focus back when it closes.
- If your system asks for reduced motion (`prefers-reduced-motion`), the animations are turned off.
- User input is only ever displayed with `textContent`, never inserted as HTML.
- There are no browser `alert()` popups and no notification-permission requests.

## How it was built: the conversation

The project was built in a chat with Claude Code (Claude Opus 5.5). Each prompt is quoted as typed, followed by a summary of Claude's response.

### 1. The original spec

> *(A long spec, summarized here.)* Build "Ragebait Profile — The Most Annoying Profile Editor Ever": a profile settings page in HTML/CSS/vanilla JS that looks normal at first but trolls the user. Features: a username field that refuses updates (3 scripted attempts, then the Say My Name meme and "MEET AND SOHAM"); reversed font-size buttons; an "aura detector" for an uploaded photo (baby → Tung Tung Sahur → Gigachad with +9999… aura); an ad that opens a fake $676767676767676 premium modal on the third close ("No" shows the gareeb meme, "Yes" shows the cat-laugh meme "You ain't that rich budd"); and a Save Profile button that Rickrolls the user on a separate page. Use the supplied assets, keep state per feature, stay responsive and accessible, and don't use a backend or real payments.
>
> **Build in 5 minuts**

**Response:** Claude checked the folder first. All the memes were MP4 videos, not GIFs, there were three ad JPEGs, and there was no cat-laugh file yet. It then built `index.html`, `style.css`, `script.js` and `rickroll.html`:
- The memes play as muted, looping videos, with all paths in one `memeAssets` object.
- The ad images take turns in the ad.
- "Yes" falls back to a 😹 emoji until a cat-laugh video is added.
- Each feature keeps its own counter, and the modal can't be closed with Escape or an outside click.
- The finale page shows a play button if the browser blocks autoplay.

### 2. Page-wide font and a random pop-up ad

> font of entire page should change instead of seperate widget.
> Don't make sepearte widget for ad the ad should generate randomly on the page

**Response:**
- **Font:** Claude removed the sample-text box. The **+** and **−** buttons now change the font size of the whole page, which starts at 16px. The Text Size card keeps a fixed size, so its buttons stay clickable.
- **Ad:** it's no longer part of the Notification Preferences card. It pops up at a random spot on the page 3–7 seconds after load, with a random image and scam line. Closing it once or twice shows a short message at the bottom of the screen, and it reappears somewhere else. The third close opens the premium modal, and after "Yes" the ads stop.

### 3. Play the real cat-laugh video

> when user press yes for premium the cat laugh.mp4 should played instead of emoji

**Response:** The file had been added as `cat laugh.mp4`, with a space, but the code was looking for `cat_laugh.mp4`. Claude fixed the path. The video now plays with sound, because the "Yes" click lets the browser allow it, and falls back to muted if sound is blocked. It also stops when the modal closes itself.

### 4. This README

> create the readme of conversation

**Response:** Claude wrote this README: how to run the site, what each feature does, the asset table, how state works, and the accessibility notes.

### 5. What to type in the username box

> what i have to type in username

**Response:** Nothing works. It's a troll. Only the number of **Update Username** clicks matters, not the text. Claude offered to add a payoff for typing the names.

### 6. "Rizz found"

> at last after 3 tries when user types "Meet and soham" there shuld be a tag line "Rizz found"

**Response:** From the 4th click onward, typing "Meet and Soham" shows **Rizz found** in glowing gold with a burst of 😎🔥✨. Capitals don't matter, extra spaces are ignored, and "&" works for "and". The profile name still doesn't change.

### 7. Add the conversation to the README

> update the readme according to our conversation
> include my prompt and your response

**Response:** Claude added this section.
