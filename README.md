# 💚 Experience • 27/8/26

> A small, highly overengineered way of saying something I could've just said normally.

An interactive, personalized web experience built for someone special.

Instead of sending a normal message, I decided to turn the whole thing into a tiny website with an intro sequence, music player, interactive questions, animations, and a few deliberately stupid cat moments.

Because apparently saying **"I like you"** normally wasn't enough. 💀

---

## ✨ What is this?

**Experience • 27/8/26** is a custom interactive web experience designed around a personal confession.

The experience takes the visitor through several stages:

```text
Entry
  ↓
Identity / clue check
  ↓
Animated introduction
  ↓
Music player
  ↓
Interactive questions
  ↓
Cat reactions + responses
  ↓
Final section
```

The goal wasn't to build another generic "love website."

The goal was to make something that felt **personal, interactive, and unmistakably mine.**

---

## 🎬 Experience

### 1. Entry Screen

The visitor starts with a small gated screen asking for their name and a personal clue.

It's intentionally simple, mysterious, and slightly suspicious. 👀

### 2. Intro Sequence

The experience gradually reveals why the website exists through short animated messages.

Instead of dumping everything on the screen at once, the story unfolds one step at a time.

### 3. Vinyl Music Player 🎵

A custom vinyl-style player lets the visitor:

* ▶️ Play / pause
* ⏮️ Switch tracks
* ⏭️ Switch tracks
* Automatically move to the next song
* See the currently playing track

### 4. Interactive Questions

The visitor gets a sequence of personalized questions.

Some use free-text responses while others use selectable choices.

The answers are handled dynamically rather than through a collection of static pages.

### 5. Shin Companion 🐱

Because every serious emotional experience obviously needs a cat.

Different cat videos and reactions are used throughout the questioning system to react to the interaction.

Possible moods include:

* 😎 Chill
* 👀 Curious
* 😏 Teasing
* 🥹 Soft
* 😳 Cooked
* 💚 Romantic

### 6. Final Section

After the questions, the experience transitions into its final stage.

The exact content is intentionally personal rather than being presented as a generic template.

---

## 🛠️ Tech Stack

| Technology        | Purpose                                  |
| ----------------- | ---------------------------------------- |
| **HTML**          | Page structure                           |
| **CSS**           | Visual design + animations               |
| **JavaScript**    | Experience logic + interaction           |
| **Netlify**       | Deployment / local development           |
| **Supabase**      | Backend integration                      |
| **LocalStorage**  | Passing the visitor's name between pages |
| **Audio / Video** | Music and interactive reactions          |

The project is intentionally lightweight and mostly browser-native.

No giant framework was necessary.

---

## 📁 Project Structure

```text
.
├── index.html
├── experience.html
│
├── css/
│   └── style.css
│
├── js/
│   └── experience.js
│
├── audio/
│   └── ...
│
├── cat.memes/
│   └── ...
│
├── netlify/
│   └── ...
│
├── netlify.toml
├── package.json
└── README.md
```

---

## 🧠 Why I Built It

This project started from a very simple problem:

> **How do I say something important without making it feel like a boring text message?**

There was someone at school I liked.

And from the way things felt between us, I believed she liked me too.

So instead of just walking up and saying it normally, my brain decided that apparently the logical solution was to build an entire website.

I worked on the idea, wrote the interactions, added the music, the questions, the animations, the little jokes, the cat reactions, and all the details that would make it feel personal.

Then I gave it to her.

And waited.

---

# 📖 The Story Behind 27/8/26

This is the part that makes the project more than just code.

I made this website for someone who mattered to me.

At the time, I genuinely thought the feelings were mutual.

There were months of small moments, conversations, behavior, and signals that made me think:

> *Yeah. There might actually be something here.*

So I built this.

Not because I thought a website would magically make someone like me.

I built it because if I was going to finally say what I felt, I wanted to say it in the most **me** way possible.

Not a copied confession.

Not a random message.

Something I actually made.

Something that required effort.

Something she could remember.

I sent it.

Then came the worst part.

**Waiting.**

One day.

Two days.

Three days.

For three days I had no idea what the answer would be.

And then the answer finally came.

**No.**

That hurt.

A lot more than I expected.

Because it wasn't just hearing "no."

It was realizing that something I had thought about for months, something I had finally built the courage to express, had reached an ending I wasn't prepared for.

Afterwards, I started trying to understand what happened.

From conversations and things I learned later, I came to believe that other people's influence may have affected how she saw the situation.

Maybe I'm completely right about that.

Maybe I'm partly right.

Maybe there are parts of the story I'll never actually know.

And that's something I eventually have to accept.

Because regardless of what happened behind the scenes, the final answer was still hers.

And it was still **no**.

So I respected it.

---

## 🌧️ What Happened Next

For a little while, this project felt completely different.

The songs hit differently.

The jokes weren't as funny.

Every file in this repository reminded me of why I made it.

It would've been easy to delete everything.

Honestly, part of me wanted to.

But then I realized something:

**The ending doesn't erase the effort that came before it.**

The website still existed.

The code still worked.

I still learned things while building it.

The creativity was real.

The courage it took to actually send it was real.

And even if the relationship never happened, the project still became part of my story.

So I'm keeping it.

Not as a monument to someone rejecting me.

And definitely not as an attempt to change anyone's mind.

I'm keeping it because this repository represents a version of me who was willing to take a risk instead of spending forever wondering:

> *What if I had just told her?*

Now I know.

Sometimes you build something with one ending in your head...

and life ships a completely different one.

---

## 27 / 8 / 26

**One crush.**

**One idea.**

**One website.**

**Three days of waiting.**

**One answer I didn't want.**

And a surprisingly large amount of JavaScript. 💀

The story didn't end the way I hoped.

But I'd rather have a painful answer than an unanswered question.

And somehow, after everything, I don't regret building this.

---

## 🎯 Design Philosophy

The project follows a few simple ideas:

### Personal > Generic

Every major part of the experience was designed around the person receiving it.

### Interactive > Static

Instead of reading a page, the visitor actually interacts with it.

### Slow Reveal > Information Dump

The experience intentionally reveals itself gradually.

### Personality > Perfection

The awkward jokes, emojis, cat videos, and little interactions are part of the experience.

The website isn't trying to look like a corporate product.

It's trying to feel like **something a real person made for one specific person.**

---

## 🔐 Privacy

This project contains personal content and was originally created as a private experience.

Names and identifying details should stay private.

If you fork, deploy, or modify this project, **remove personal names, passwords, messages, media, and identifying information first.**

Also note that client-side credentials or passwords are **not real security**. Anything shipped to the browser can potentially be inspected.

---

## 🚀 Running Locally

Clone the repository:

```bash
git clone https://github.com/ishaanbshinde/idk.git
cd idk
```

Install dependencies:

```bash
npm install
```

Start the Netlify development environment:

```bash
npm run dev
```

---

## 🧪 What I Learned

Building this project taught me more than just HTML, CSS, and JavaScript.

I had to think about:

* state management
* DOM manipulation
* transitions and timing
* audio controls
* user input
* localStorage
* responsive UI
* browser media behavior
* organizing a larger JavaScript file
* designing an experience instead of just a webpage

But the project also taught me something completely unrelated to programming:

You can put a ridiculous amount of effort into something...

and still not control the outcome.

The only part you actually control is what **you** do next.

---

## 👤 Author

**Shin / Ishan**

Student • Builder • Editor • Professional overthinker 💀

I like turning random ideas into websites, experiments, and projects.

---

<p align="center">
  Built with HTML, CSS, JavaScript, questionable decisions,<br>
  too much overthinking, and a story that didn't go according to plan.
</p>
