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

Changing the text in the box doesn't reset the count. Pressing Enter counts as an attempt too.

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
