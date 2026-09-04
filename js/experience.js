/* =========================================================
   JUST FOR YOU
   EXPERIENCE ENGINE
   ========================================================= */


/* =========================================================
   DOM ELEMENTS
   ========================================================= */

const introSection =
    document.getElementById("introSection");

const introTitle =
    document.getElementById("introTitle");

const introText =
    document.getElementById("introText");

const vinylPlayer =
    document.getElementById("vinylPlayer");

const vinylDisc =
    document.getElementById("vinylDisc");

const trackTitle =
    document.getElementById("trackTitle");

const trackArtist =
    document.getElementById("trackArtist");

const prevTrack =
    document.getElementById("prevTrack");

const playPause =
    document.getElementById("playPause");

const nextTrack =
    document.getElementById("nextTrack");

const audioPlayer =
    document.getElementById("audioPlayer");


const qaSection =
    document.getElementById("qaSection");

const questionCard =
    document.getElementById("questionCard");

const questionNumber =
    document.getElementById("questionNumber");

const questionText =
    document.getElementById("questionText");

const answerInput =
    document.getElementById("answerInput");

const optionsContainer =
    document.getElementById("optionsContainer");

const submitAnswerButton =
    document.getElementById("submitAnswerButton");

const qaMessage =
    document.getElementById("qaMessage");


const shinCompanion =
    document.getElementById("shinCompanion");

const shinCat =
    document.getElementById("shinCat");

const shinCatSource =
    document.getElementById("shinCatSource");

const shinWriting =
    document.getElementById("shinWriting");

const shinReaction =
    document.getElementById("shinReaction");


const finalSection =
    document.getElementById("finalSection");

const finalTitle =
    document.getElementById("finalTitle");

const finalText =
    document.getElementById("finalText");


/* =========================================================
   EXPERIENCE ANSWERS
   ========================================================= */

const experienceAnswers = {

    name:
        localStorage.getItem("experienceName") || "",

    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
    q6: "",
    q7: "",
    q8: "",
    q9: "",

    relationship_choice: "",
    final_choice: "",
    extra_message: ""
};


/* =========================================================
   INTRO
   ========================================================= */

const introContent = [

    {
        title: "Hi.",
        text:
            "Hi um... kya kar rahi hai? 😭"
    },

    {
        title: "Just so you know...",
        text:
            "I like you."
    },

    {
        title: "Haan.",
        text:
            "Finally bol diya 💀"
    },

    {
        title: "So...",
        text:
            "Instead of doing some normal school wala proposal..."
    },

    {
        title: "I thought...",
        text:
            "website bana deta hoon."
    },

    {
        title: "Obviously.",
        text:
            "Normal tareeke se bolna mere dimaag ko acceptable nahi tha 😭"
    }

];


let currentIntro = 0;


/* =========================================================
   TEXT TRANSITION
   ========================================================= */

function showIntro(index) {

    if (!introTitle || !introText) {
        return;
    }

    const content =
        introContent[index];

    if (!content) {
        return;
    }

    introTitle.style.opacity = "0";
    introText.style.opacity = "0";

    introTitle.style.transform =
        "translateY(15px)";

    introText.style.transform =
        "translateY(15px)";


    setTimeout(() => {

        introTitle.textContent =
            content.title;

        introText.textContent =
            content.text;

        introTitle.style.transition =
            "opacity .7s ease, transform .7s ease";

        introText.style.transition =
            "opacity .7s ease, transform .7s ease";

        introTitle.style.opacity = "1";
        introText.style.opacity = "1";

        introTitle.style.transform =
            "translateY(0)";

        introText.style.transform =
            "translateY(0)";

    }, 300);
}


/* =========================================================
   INTRO AUTO PLAY
   ========================================================= */

function startIntro() {

    currentIntro = 0;

    showIntro(0);

    const introTimer =
        setInterval(() => {

            currentIntro++;

            if (
                currentIntro >=
                introContent.length
            ) {

                clearInterval(introTimer);

                setTimeout(() => {

                    startQuestions();

                }, 900);

                return;
            }

            showIntro(currentIntro);

        }, 3200);
}


/* =========================================================
   MUSIC
   ========================================================= */

const tracks = [

    {
        title: "I Wanna Be Yours",
        artist: "Ishan",
        src:
            "audio/i_wanna_be_yours.mp3"
    },

    {
        title: "Until I Found You",
        artist: "Ishan",
        src:
            "audio/until-i-found-u.mp3"
    },

    {
        title: "blue",
        artist: "Yung Kai",
        src:
            "audio/blue_yungkai.mp3"
    }

];


let currentTrack = 0;
let isPlaying = false;


function loadTrack(index) {

    currentTrack =
        (index + tracks.length) %
        tracks.length;

    const track =
        tracks[currentTrack];

    if (!track) {
        return;
    }

    audioPlayer.src =
        track.src;

    if (trackTitle) {
        trackTitle.textContent =
            track.title;
    }

    if (trackArtist) {
        trackArtist.textContent =
            track.artist;
    }
}


async function playCurrentTrack() {

    try {

        await audioPlayer.play();

        isPlaying = true;

        if (playPause) {
            playPause.textContent =
                "Ⅱ";
        }

        if (vinylDisc) {
            vinylDisc.classList.add(
                "playing"
            );
        }

    } catch (error) {

        console.error(
            "❌ Audio playback failed:",
            error
        );

        isPlaying = false;

        if (playPause) {
            playPause.textContent =
                "▶";
        }

    }
}


function pauseCurrentTrack() {

    audioPlayer.pause();

    isPlaying = false;

    if (playPause) {
        playPause.textContent =
            "▶";
    }

    if (vinylDisc) {
        vinylDisc.classList.remove(
            "playing"
        );
    }

}


function toggleMusic() {

    if (isPlaying) {
        pauseCurrentTrack();
    } else {
        playCurrentTrack();
    }

}


function nextMusicTrack() {

    loadTrack(
        currentTrack + 1
    );

    playCurrentTrack();

}


function previousMusicTrack() {

    loadTrack(
        currentTrack - 1
    );

    playCurrentTrack();

}


if (playPause) {

    playPause.addEventListener(
        "click",
        toggleMusic
    );

}


if (nextTrack) {

    nextTrack.addEventListener(
        "click",
        nextMusicTrack
    );

}


if (prevTrack) {

    prevTrack.addEventListener(
        "click",
        previousMusicTrack
    );

}


if (audioPlayer) {

    audioPlayer.addEventListener(
        "ended",
        () => {

            loadTrack(
                currentTrack + 1
            );

            playCurrentTrack();

        }
    );

}


/* =========================================================
   QUESTIONS
   ========================================================= */

const questions = [

    {
        number: 1,
        type: "text",

        text:
            "Maine bhot months se notice kiya hai tera behavior towards me...",

        placeholder:
            "Do you like me? Ya... crush hai mujhpe?"
    },


    {
        number: 2,
        type: "choice",

        text:
            "Mere saath baat karna tujhe actually pasand hai? 👀",

        options: [

            "Haan, kaafi 😭",

            "Yeah, it's fun",

            "Kabhi kabhi 💀",

            "Depends on the day"

        ]
    },


    {
        number: 3,
        type: "text",

        text:
            "First impression kya tha mera? Be honest 💀",

        placeholder:
            "Don't sugarcoat it..."
    },


    {
        number: 4,
        type: "text",

        text:
            "Mere baare mein ek cheez jo tujhe genuinely achhi lagti hai?",

        placeholder:
            "I'm listening 👀"
    },


    {
        number: 5,
        type: "text",

        text:
            "Meri ek annoying habit? 😭",

        placeholder:
            "You can expose me..."
    },


    {
        number: 6,
        type: "text",

        text:
            "Aisa koi moment yaad hai jab tujhe laga ki hum actually close ho gaye?",

        placeholder:
            "Take your time..."
    },


    {
        number: 7,
        type: "choice",

        text:
            "Kabhi tujhe laga ki shayad mujhe bhi tu pasand hai? 👀",

        options: [

            "Haan 👀",

            "Maybe... 😭",

            "I had a feeling",

            "Nope 💀"

        ]
    },


    {
        number: 8,
        type: "text",

        text:
            "Agar hum dono ko ek poora day school ke bahar spend karna ho... what would we do?",

        placeholder:
            "Okay now imagine it..."
    },


    {
        number: 9,
        type: "text",

        text:
            "Aur kuch aur bolna haiii? 👀",

        placeholder:
            "Anything. Literally anything."
    }

];


let currentQuestion = 0;


/* =========================================================
   SHIN SYSTEM 🐱
   ========================================================= */

const catVideos = {

    looking:
        "cat.memes/cat-looking-at-camera.mp4",

    notes:
        "cat.memes/cat-taking-notes.mp4",

    reading:
        "cat.memes/cat-reading-intensely.mp4",

    eating:
        "cat.memes/cat-eating.mp4",

    nodding:
        "cat.memes/cat-nodding.mp4",

    smiling:
        "cat.memes/cat-smiling.mp4",

    shocked:
        "cat.memes/shocked-cat.mp4",

    detective:
        "cat.memes/detective-cat.mp4",

    shushing:
        "cat.memes/shushing-cat.mp4"

};


/* =========================================================
   SHIN STATE
   ========================================================= */

let shinMood = "chill";

let catReadingTimer = null;
let catEatingTimer = null;

let shinReactionTimer = null;


/* =========================================================
   SHIN MOODS
   ========================================================= */

const shinMoods = {

    chill: {
        emoji: "😎"
    },

    curious: {
        emoji: "👀"
    },

    teasing: {
        emoji: "😏"
    },

    soft: {
        emoji: "🥹"
    },

    cooked: {
        emoji: "😳"
    },

    romantic: {
        emoji: "💚"
    }

};


/* =========================================================
   CHANGE SHIN MOOD
   ========================================================= */

function setShinMood(mood) {

    shinMood =
        shinMoods[mood]
            ? mood
            : "chill";

}


/* =========================================================
   SHIN NOTEBOOK
   ========================================================= */

function shinWrite(text) {

    if (!shinWriting) {
        return;
    }

    shinWriting.style.opacity =
        "0";

    shinWriting.style.transform =
        "translateY(5px)";


    setTimeout(() => {

        shinWriting.textContent =
            text;

        shinWriting.style.transition =
            "opacity .35s ease, transform .35s ease";

        shinWriting.style.opacity =
            "1";

        shinWriting.style.transform =
            "translateY(0)";

    }, 100);

}


/* =========================================================
   SHIN REACTION TEXT
   ========================================================= */

function shinSay(text) {

    if (!shinReaction) {
        return;
    }

    clearTimeout(
        shinReactionTimer
    );


    shinReaction.style.opacity =
        "0";

    shinReaction.style.transform =
        "translateY(5px)";


    setTimeout(() => {

        shinReaction.textContent =
            text;

        shinReaction.style.transition =
            "opacity .4s ease, transform .4s ease";

        shinReaction.style.opacity =
            "1";

        shinReaction.style.transform =
            "translateY(0)";

    }, 120);

}


/* =========================================================
   SET CAT
   ========================================================= */

function setCat(
    reaction,
    writing = ""
) {

    if (
        !shinCat ||
        !shinCatSource
    ) {
        return;
    }

    const newSource =
        catVideos[reaction];

    if (!newSource) {
        return;
    }

    const currentSource =
        shinCatSource.getAttribute(
            "src"
        );


    if (
        currentSource !==
        newSource
    ) {

        shinCatSource.setAttribute(
            "src",
            newSource
        );

        shinCat.load();

    }


    shinCat.play().catch(
        () => {}
    );


    if (writing) {
        shinWrite(writing);
    }

}


/* =========================================================
   SHIN REACTION ANIMATION
   ========================================================= */

function animateShin() {

    if (!shinCompanion) {
        return;
    }

    shinCompanion.classList.remove(
        "shin-reacting"
    );

    void shinCompanion.offsetWidth;

    shinCompanion.classList.add(
        "shin-reacting"
    );

}


/* =========================================================
   SHOW / HIDE SHIN
   ========================================================= */

function showCat() {

    if (!shinCompanion) {
        return;
    }

    shinCompanion.hidden =
        false;

}


function hideCat() {

    if (!shinCompanion) {
        return;
    }

    shinCompanion.hidden =
        true;

}


/* =========================================================
   QUESTION START REACTIONS
   ========================================================= */

const questionShinStart = {

    1: {
        mood: "curious",
        cat: "detective",
        text: "Okay... ye wala important hai 👀"
    },

    2: {
        mood: "curious",
        cat: "nodding",
        text: "Sach sach bol... 👀"
    },

    3: {
        mood: "teasing",
        cat: "reading",
        text: "Ab asli opinion aayega 💀"
    },

    4: {
        mood: "romantic",
        cat: "smiling",
        text: "Ohhh? 👀"
    },

    5: {
        mood: "teasing",
        cat: "eating",
        text: "YES. Ab asli maza aayega 🍿"
    },

    6: {
        mood: "soft",
        cat: "looking",
        text: "Okay... ye wala actually important hai."
    },

    7: {
        mood: "cooked",
        cat: "shocked",
        text: "WAIT. 😳"
    },

    8: {
        mood: "romantic",
        cat: "smiling",
        text: "Achha... ab imagination chal rahi hai 👀"
    },

    9: {
        mood: "soft",
        cat: "notes",
        text: "Last chance. 👀"
    }

};


/* =========================================================
   QUESTION START
   ========================================================= */

function catQuestionStart() {

    clearTimeout(
        catReadingTimer
    );

    clearTimeout(
        catEatingTimer
    );


    showCat();


    const data =
        questionShinStart[
            currentQuestion + 1
        ];


    if (!data) {

        setShinMood("chill");

        setCat(
            "looking",
            "Hmm... 👀"
        );

        return;

    }


    setShinMood(
        data.mood
    );


    setCat(
        data.cat,
        data.text
    );


    shinSay(
        data.text
    );


    animateShin();

}


/* =========================================================
   TYPING REACTIONS
   ========================================================= */

function startCatTyping() {

    clearTimeout(
        catReadingTimer
    );

    clearTimeout(
        catEatingTimer
    );


    const q =
        currentQuestion + 1;


    if (q === 1) {

        setCat(
            "notes",
            "Okay... likh raha hoon ✍️"
        );

        shinSay(
            "Okay... ye answer important hai 👀"
        );

    }


    else if (q === 2) {

        setCat(
            "nodding",
            "Hmm hmm... 👀"
        );

        shinSay(
            "Bol bol... main sun raha hoon."
        );

    }


    else if (q === 3) {

        setCat(
            "reading",
            "Dhyaan se padh raha hoon 📝"
        );

        shinSay(
            "Ab dekhte hain asli opinion kya tha 💀"
        );

    }


    else if (q === 4) {

        setCat(
            "smiling",
            "Oh? 👀"
        );

        shinSay(
            "Ye answer interesting hone wala hai..."
        );

    }


    else if (q === 5) {

        setCat(
            "eating",
            "Popcorn ready 🍿"
        );

        shinSay(
            "Chal roast kar mujhe 😭"
        );

    }


    else if (q === 6) {

        setCat(
            "looking",
            "Hmm..."
        );

        shinSay(
            "Take your time. 💚"
        );

    }


    else if (q === 7) {

        setCat(
            "shocked",
            "WAIT WHAT 😭"
        );

        shinSay(
            "Tujhe kuch pata tha kya?? 😭"
        );

    }


    else if (q === 8) {

        setCat(
            "smiling",
            "Hmm... 👀"
        );

        shinSay(
            "Achha... ye interesting hai."
        );

    }


    else if (q === 9) {

        setCat(
            "notes",
            "Sab likh raha hoon ✍️"
        );

        shinSay(
            "Last chance... jo bolna hai bol de."
        );

    }


    catReadingTimer =
        setTimeout(() => {

            if (q === 5) {

                setCat(
                    "eating",
                    "Still waiting 😭"
                );

            } else {

                setCat(
                    "reading",
                    "Bro is still writing..."
                );

            }

        }, 8000);


    catEatingTimer =
        setTimeout(() => {

            setCat(
                "eating",
                "Bhai main bhooka ho gaya 😭"
            );

            shinSay(
                "Kitna bada answer hai ye 😭"
            );

        }, 18000);

}


/* =========================================================
   STOP TYPING
   ========================================================= */

function stopCatTyping() {

    clearTimeout(
        catReadingTimer
    );

    clearTimeout(
        catEatingTimer
    );

}


/* =========================================================
   ANSWER ANALYSIS
   ========================================================= */

function analyzeAnswer(answer) {

    const text =
        String(answer || "")
            .toLowerCase()
            .trim();


    if (!text) {

        return "empty";

    }


    const romanticWords = [

        "love",
        "like",
        "pasand",
        "crush",
        "cute",
        "sweet",
        "special",
        "handsome",
        "good",
        "nice",
        "care",
        "close",
        "miss",
        "happy",
        "fun",
        "important"

    ];


    const negativeWords = [

        "hate",
        "annoying",
        "irritating",
        "boring",
        "weird",
        "bad",
        "stupid"

    ];


    const hasRomantic =
        romanticWords.some(
            word =>
                text.includes(word)
        );


    const hasNegative =
        negativeWords.some(
            word =>
                text.includes(word)
        );


    if (
        hasRomantic &&
        text.length > 25
    ) {

        return "very-sweet";

    }


    if (hasRomantic) {

        return "sweet";

    }


    if (hasNegative) {

        return "roast";

    }


    if (text.length > 120) {

        return "long";

    }


    if (text.length < 12) {

        return "short";

    }


    return "normal";

}


/* =========================================================
   ANSWER-SPECIFIC SHIN REACTIONS
   ========================================================= */

function getShinReaction(
    questionNumber,
    answer
) {

    const mood =
        analyzeAnswer(answer);


    const reactions = {

        1: {

            "very-sweet":
                ["I KNEW kuch toh scene tha 😭💚", "romantic"],

            sweet:
                ["Mujhe pata tha kuch toh hai 👀", "romantic"],

            roast:
                ["...accha. Theek hai 😭", "chill"],

            short:
                ["Bas itna hi? 👀", "curious"],

            normal:
                ["Hmm... noted 👀", "curious"]

        },


        2: {

            "very-sweet":
                ["Achhaaa... mujhe ye sunna tha 💚", "romantic"],

            sweet:
                ["Okayyy, I see you 👀", "teasing"],

            roast:
                ["Kabhi kabhi?? 💀", "teasing"],

            short:
                ["Short answer. Interesting. 👀", "curious"],

            normal:
                ["Noted. 📝", "curious"]

        },


        3: {

            "very-sweet":
                ["Okay... ye actually wholesome tha 🥹", "soft"],

            sweet:
                ["Aww... unexpected 👀", "soft"],

            roast:
                ["DAMN. Itna personal hone ki kya zarurat thi 😭", "teasing"],

            short:
                ["Tu itni jaldi conclusion pe aa gayi? 💀", "teasing"],

            normal:
                ["Interesting first impression 👀", "curious"]

        },


        4: {

            "very-sweet":
                ["Okay... I'm actually smiling now 😭💚", "romantic"],

            sweet:
                ["Okay... ye actually cute tha.", "romantic"],

            roast:
                ["Acha thank you I guess 😭", "teasing"],

            short:
                ["Oh? Bas ek cheez? 👀", "teasing"],

            normal:
                ["Ye answer yaad rahega. 💚", "soft"]

        },


        5: {

            "very-sweet":
                ["Wait... meri annoying habit bhi cute hai? 😭", "romantic"],

            sweet:
                ["At least tune gently bola 😭", "teasing"],

            roast:
                ["I KNEW IT. 😭💀", "teasing"],

            short:
                ["Bas ek? 👀", "teasing"],

            normal:
                ["Fair enough 😭", "chill"]

        },


        6: {

            "very-sweet":
                ["Ye memory main bhi nahi bhoolunga. 💚", "soft"],

            sweet:
                ["Ye actually sweet tha... 🥹", "soft"],

            roast:
                ["Bro that was NOT the answer I expected 😭", "teasing"],

            short:
                ["Hmm... yaad nahi? 👀", "curious"],

            normal:
                ["Ye memory toh important hai. 💚", "soft"]

        },


        7: {

            "very-sweet":
                ["BROOO TUJHE PATA THA 😭", "cooked"],

            sweet:
                ["WAIT... TUJHE PATA THA?? 👀", "cooked"],

            roast:
                ["Okay... apparently main obvious hoon 💀", "cooked"],

            short:
                ["Oh no. 😭", "cooked"],

            normal:
                ["Interesting... very interesting. 👀", "cooked"]

        },


        8: {

            "very-sweet":
                ["...haan, ye actually nice hai. 💚", "romantic"],

            sweet:
                ["I'd actually like that. 👀", "romantic"],

            roast:
                ["Accha plan hai... I guess 😭", "teasing"],

            short:
                ["Itna simple? 😭", "teasing"],

            normal:
                ["Hmm... I'd be down for that. 👀", "romantic"]

        },


        9: {

            "very-sweet":
                ["Okay... ab mujhe kya bolna hai samajh nahi aa raha 😭💚", "soft"],

            sweet:
                ["Okay... that's actually cute. 🥹", "soft"],

            roast:
                ["Last answer mein bhi roast 😭", "teasing"],

            short:
                ["Bas? Last chance tha 😭", "curious"],

            long:
                ["Bro ne final statement likh diya 📝", "soft"],

            normal:
                ["Okay... I think we're ready. 💚", "romantic"]

        }

    };


    const questionData =
        reactions[questionNumber];


    if (!questionData) {

        return [
            "Noted. 👀",
            "curious"
        ];

    }


    return (
        questionData[mood] ||
        questionData.normal
    );

}


/* =========================================================
   AFTER ANSWER REACTION
   ========================================================= */

function catSubmitted(
    answer
) {

    stopCatTyping();


    const q =
        currentQuestion + 1;


    const reaction =
        getShinReaction(
            q,
            answer
        );


    setShinMood(
        reaction[1]
    );


    shinSay(
        reaction[0]
    );


    animateShin();


    let catType =
        "nodding";


    if (
        reaction[1] ===
        "romantic"
    ) {

        catType =
            "smiling";

    }


    else if (
        reaction[1] ===
        "soft"
    ) {

        catType =
            "looking";

    }


    else if (
        reaction[1] ===
        "teasing"
    ) {

        catType =
            q === 5
                ? "eating"
                : "reading";

    }


    else if (
        reaction[1] ===
        "cooked"
    ) {

        catType =
            "shocked";

    }


    else if (
        reaction[1] ===
        "curious"
    ) {

        catType =
            q === 1
                ? "detective"
                : "nodding";

    }


    setCat(
        catType,
        reaction[0]
    );

}


/* =========================================================
   CAT INPUT LISTENER
   ========================================================= */

if (answerInput) {

    answerInput.addEventListener(
        "input",
        () => {

            const value =
                answerInput.value.trim();


            if (value) {

                startCatTyping();

            } else {

                stopCatTyping();

                setCat(
                    "looking",
                    "Hmm..."
                );

                shinSay(
                    "Kuch toh likh 😭"
                );

            }

        }
    );

}


/* =========================================================
   RENDER QUESTION
   ========================================================= */

function renderQuestion() {

    const question =
        questions[currentQuestion];


    if (!question) {
        return;
    }


    questionNumber.textContent =
        `Question ${String(
            question.number
        ).padStart(2, "0")}`;


    questionText.textContent =
        question.text;


    qaMessage.textContent =
        "";


    answerInput.value =
        "";


    catQuestionStart();


    if (question.type === "text") {

        answerInput.hidden =
            false;

        answerInput.placeholder =
            question.placeholder ||
            "Type your answer...";


        optionsContainer.hidden =
            true;

        optionsContainer.innerHTML =
            "";


        submitAnswerButton.hidden =
            false;

        submitAnswerButton.textContent =
            "Continue →";


        setTimeout(() => {

            answerInput.focus();

        }, 150);


        return;

    }


    /* CHOICE QUESTION */

    answerInput.hidden =
        true;


    optionsContainer.hidden =
        false;


    optionsContainer.innerHTML =
        "";


    submitAnswerButton.hidden =
        true;


    question.options.forEach(
        option => {

            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";

            button.className =
                "option-button";

            button.textContent =
                option;


            button.addEventListener(
                "click",
                () => {

                    experienceAnswers[
                        `q${question.number}`
                    ] = option;


                    document
                        .querySelectorAll(
                            ".option-button"
                        )
                        .forEach(
                            button => {

                                button.classList.remove(
                                    "selected"
                                );

                            }
                        );


                    button.classList.add(
                        "selected"
                    );


                    catSubmitted(
                        option
                    );


                    setTimeout(() => {

                        nextQuestion();

                    }, 1200);

                }
            );


            optionsContainer.appendChild(
                button
            );

        }
    );

}


/* =========================================================
   SUBMIT TEXT ANSWER
   ========================================================= */

function submitCurrentAnswer() {

    const question =
        questions[currentQuestion];


    if (!question) {
        return;
    }


    const answer =
        answerInput.value.trim();


    if (!answer) {

        qaMessage.textContent =
            "You gotta answer this one 😭";


        setCat(
            "shocked",
            "HELLO?? 😭"
        );


        shinSay(
            "HELLOOO?? Answer toh de 😭"
        );


        animateShin();


        answerInput.focus();

        return;

    }


    experienceAnswers[
        `q${question.number}`
    ] = answer;


    catSubmitted(
        answer
    );


    setTimeout(() => {

        nextQuestion();

    }, 1400);

}


/* =========================================================
   SUBMIT BUTTON
   ========================================================= */

if (submitAnswerButton) {

    submitAnswerButton.addEventListener(
        "click",
        submitCurrentAnswer
    );

}


/* =========================================================
   ENTER KEY
   ========================================================= */

if (answerInput) {

    answerInput.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter" &&
                !event.shiftKey
            ) {

                event.preventDefault();

                submitCurrentAnswer();

            }

        }
    );

}


/* =========================================================
   NEXT QUESTION
   ========================================================= */

function nextQuestion() {

    currentQuestion++;


    if (
        currentQuestion >=
        questions.length
    ) {

        showRelationshipChoice();

        return;

    }


    questionCard.style.animation =
        "none";


    void questionCard.offsetWidth;


    questionCard.style.animation =
        "questionEnter .65s cubic-bezier(.2,.8,.2,1)";


    renderQuestion();

}


/* =========================================================
   START QUESTIONS
   ========================================================= */

function startQuestions() {

    if (qaSection) {

        qaSection.hidden =
            false;

        qaSection.style.opacity =
            "0";

        qaSection.style.transform =
            "translateY(30px)";

    }


    if (introSection) {

        introSection.style.minHeight =
            "55vh";

    }


    currentQuestion = 0;

    renderQuestion();


    if (qaSection) {

        requestAnimationFrame(() => {

            qaSection.style.transition =
                "opacity .9s ease, transform .9s ease";

            qaSection.style.opacity =
                "1";

            qaSection.style.transform =
                "translateY(0)";

        });


        setTimeout(() => {

            qaSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }, 100);

    }

}


/* =========================================================
   RELATIONSHIP CHOICE
   ========================================================= */

function showRelationshipChoice() {

    questionNumber.textContent =
        "Okay... one last question";


    questionText.textContent =
        "So... what do you think about us? 👀";


    answerInput.hidden =
        true;


    submitAnswerButton.hidden =
        true;


    optionsContainer.hidden =
        false;


    optionsContainer.innerHTML =
        "";


    const choices = [

        "Something more 💚",

        "Let's see where this goes 👀",

        "I don't know yet 😭",

        "I'll tell you in school 💀"

    ];


    setShinMood("curious");


    setCat(
        "looking",
        "This one's important..."
    );


    shinSay(
        "Okay... ab serious question hai 👀"
    );


    choices.forEach(
        choice => {

            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";

            button.className =
                "option-button";

            button.textContent =
                choice;


            button.addEventListener(
                "click",
                () => {

                    experienceAnswers
                        .relationship_choice =
                        choice;


                    document
                        .querySelectorAll(
                            ".option-button"
                        )
                        .forEach(
                            button => {

                                button.classList.remove(
                                    "selected"
                                );

                            }
                        );


                    button.classList.add(
                        "selected"
                    );


                    if (
                        choice ===
                        "Something more 💚"
                    ) {

                        setShinMood(
                            "romantic"
                        );

                        setCat(
                            "smiling",
                            "I KNEW IT 😭💚"
                        );

                        shinSay(
                            "I KNEW IT 😭💚"
                        );

                    }


                    else if (
                        choice ===
                        "I'll tell you in school 💀"
                    ) {

                        setShinMood(
                            "cooked"
                        );

                        setCat(
                            "shocked",
                            "BRO 💀"
                        );

                        shinSay(
                            "BROOO 💀"
                        );

                    }


                    else {

                        setShinMood(
                            "soft"
                        );

                        setCat(
                            "nodding",
                            "Fair enough..."
                        );

                        shinSay(
                            "Fair enough... 💚"
                        );

                    }


                    animateShin();


                    setTimeout(() => {

                        showPrivacyChoice();

                    }, 1400);

                }
            );


            optionsContainer.appendChild(
                button
            );

        }
    );

}


/* =========================================================
   PRIVACY CHOICE
   ========================================================= */

function showPrivacyChoice() {

    questionNumber.textContent =
        "And this matters 👀";


    questionText.textContent =
        "Who gets to know about this?";


    optionsContainer.innerHTML =
        "";


    const choices = [

        "Between us 🤫",

        "Everybody knows 👀",

        "Somebody will know 😭"

    ];


    setShinMood("curious");


    setCat(
        "looking",
        "Confidential information..."
    );


    shinSay(
        "Confidential information... 🤫"
    );


    choices.forEach(
        choice => {

            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";

            button.className =
                "option-button";

            button.textContent =
                choice;


            button.addEventListener(
                "click",
                () => {

                    experienceAnswers.final_choice =
                        choice;


                    document
                        .querySelectorAll(
                            ".option-button"
                        )
                        .forEach(
                            button => {

                                button.classList.remove(
                                    "selected"
                                );

                            }
                        );


                    button.classList.add(
                        "selected"
                    );


                    if (
                        choice ===
                        "Between us 🤫"
                    ) {

                        showPrivateEnding();

                        return;

                    }


                    if (
                        choice ===
                        "Everybody knows 👀"
                    ) {

                        showPublicEnding();

                        return;

                    }


                    showSomebodyEnding();

                }
            );


            optionsContainer.appendChild(
                button
            );

        }
    );

}


/* =========================================================
   EXTRA MESSAGE
   ========================================================= */

function showExtraMessage() {

    questionNumber.textContent =
        "One final thing...";


    questionText.textContent =
        "Anything you still wanna tell me? 👀";


    answerInput.hidden =
        false;


    answerInput.value =
        "";


    answerInput.placeholder =
        "Anything you didn't say yet...";


    optionsContainer.hidden =
        true;


    submitAnswerButton.hidden =
        false;


    submitAnswerButton.textContent =
        "Finish →";


    setShinMood("soft");


    setCat(
        "notes",
        "Last entry... ✍️"
    );


    shinSay(
        "Last chance... jo bolna hai bol de. 💚"
    );


    submitAnswerButton.onclick =
        () => {

            experienceAnswers.extra_message =
                answerInput.value.trim();


            showFinalEnding();

        };

}


/* =========================================================
   ENDING HELPERS
   ========================================================= */

function finishEnding(
    title,
    lineOne,
    lineTwo
) {

    if (qaSection) {

        qaSection.style.transition =
            "opacity 1s ease, transform 1s ease";

        qaSection.style.opacity =
            "0";

        qaSection.style.transform =
            "translateY(-25px)";

    }


    setTimeout(() => {

        if (qaSection) {

            qaSection.hidden =
                true;

        }


        if (finalSection) {

            finalSection.hidden =
                false;

            finalSection.style.opacity =
                "0";

            finalSection.style.transform =
                "translateY(30px)";


            requestAnimationFrame(
                () => {

                    finalSection.style.transition =
                        "opacity 1.2s ease, transform 1.2s ease";

                    finalSection.style.opacity =
                        "1";

                    finalSection.style.transform =
                        "translateY(0)";

                }
            );

        }


        if (finalTitle) {

            finalTitle.textContent =
                title;

        }


        if (finalText) {

            finalText.innerHTML =
                `${lineOne}<br><br>${lineTwo}`;

        }


        hideCat();


        saveExperienceAnswers();

    }, 1000);

}


/* =========================================================
   PRIVATE
   ========================================================= */

function showPrivateEnding() {

    setCat(
        "shushing",
        "Our secret 🤫"
    );


    shinSay(
        "Okay... ye sirf hum dono ke beech. 🤫"
    );


    finishEnding(

        "JUST BETWEEN US 🤫",

        "Okay... between us it is. 🤫",

        "Some things are better kept as our little secret.<br><br>Kal milte hai. Byeee 👋<br><br>💚"

    );

}


/* =========================================================
   PUBLIC
   ========================================================= */

function showPublicEnding() {

    setCat(
        "shocked",
        "BRO WHAT 💀"
    );


    shinSay(
        "BRO WHAT 💀"
    );


    finishEnding(

        "EVERYBODY KNOWS 👀",

        "OH. So everybody knows? 💀",

        "Bro really chose chaos 😭<br><br>Kal milte hai. Byeee 👋<br><br>💚"

    );

}


/* =========================================================
   SOMEBODY
   ========================================================= */

function showSomebodyEnding() {

    setCat(
        "detective",
        "Investigating... 🕵️"
    );


    shinSay(
        "Hmm... investigation shuru 👀"
    );


    finishEnding(

        "SECRET INFO 👀",

        "Got it... 👀",

        "Okay, I know who we're dealing with now 💀<br><br>Kal milte hai. Byeee 👋<br><br>💚"

    );

}


/* =========================================================
   COMMON FINAL ENDING
   ========================================================= */

function showFinalEnding() {

    finishEnding(

        "Bas ek kaam karna...",

        "Kal class mein mujhe bata dena. 👀",

        "Kal milte hai. Byeee 👋<br><br>💚"

    );

}


/* =========================================================
   SAVE TO NETLIFY FUNCTION
   ========================================================= */

async function saveExperienceAnswers() {

    try {

        const response =
            await fetch(
                "/.netlify/functions/save-experience",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(
                            experienceAnswers
                        )
                }
            );


        const result =
            await response.json();


        if (!response.ok) {

            console.error(
                "❌ Save failed:",
                result
            );

            return;

        }


        console.log(
            "✅ Experience response saved:",
            result
        );

    } catch (error) {

        console.error(
            "❌ Could not save experience:",
            error
        );

    }

}


/* =========================================================
   INITIALIZATION
   ========================================================= */

function initializeExperience() {

    if (qaSection) {

        qaSection.hidden =
            true;

    }


    if (shinCompanion) {

        shinCompanion.hidden =
            true;

    }


    if (finalSection) {

        finalSection.hidden =
            true;

    }


    loadTrack(0);


    startIntro();

}


/* =========================================================
   GO
   ========================================================= */

initializeExperience();