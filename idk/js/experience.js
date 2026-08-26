/* =========================================
   EXPERIENCE • 27/8/26
   COMPLETE EXPERIENCE SYSTEM
   5 Q&As + FINAL CHOICE + 3 ENDINGS
   ========================================= */


/* =========================================
   INTRO
   ========================================= */

const introContent = [
    "Hi um... kya kar rahi hai? 😭",
    "Just so you know... I like you.",
    "Haan. Finally bol diya 💀",
    "So instead of doing some normal school wala proposal...",
    "I thought... website bana deta hoon.",
    "Obviously normal tareeke se bolna mere dimaag ko acceptable nahi tha 😭"
];


/* =========================================
   ELEMENTS
   ========================================= */

const vinylRecord =
    document.getElementById("vinylRecord");

const playPauseButton =
    document.getElementById("playPauseButton");

const volumeControl =
    document.getElementById("volumeControl");

const introText =
    document.getElementById("introText");

const introCounter =
    document.getElementById("introCounter");

const continueButton =
    document.getElementById("continueButton");

const introScreen =
    document.getElementById("introScreen");

const qaSection =
    document.getElementById("qaSection");

const qaCounter =
    document.getElementById("qaCounter");

const questionText =
    document.getElementById("questionText");

const questionSubtitle =
    document.getElementById("questionSubtitle");

const answerInput =
    document.getElementById("answerInput");

const submitAnswerButton =
    document.getElementById("submitAnswerButton");

const qaMessage =
    document.getElementById("qaMessage");

/*
   IMPORTANT:
   This container already exists in your HTML.

   <div id="optionsContainer"></div>

   ALL dynamic buttons go here.
*/

const optionsContainer =
    document.getElementById("optionsContainer");


/* =========================================
   STATE
   ========================================= */

let currentStage = 0;
let currentIntro = 0;
let introFinished = false;

let currentTrack = 0;
let isPlaying = false;


/* =========================================
   MUSIC
   3 TRACKS → AUTOMATICALLY LOOP
   ========================================= */

const musicTracks = [
    {
        title: "I Wanna Be Yours",
        file: "audio/i_wanna_be_yours.mp3"
    },
    {
        title: "Until I Found You",
        file: "audio/until_i_found_u.mp3"
    },
    {
        title: "blue — yung kai",
        file: "audio/blue_yungkai.mp3"
    }
];

const audioPlayer = new Audio();

audioPlayer.preload = "auto";
audioPlayer.loop = false;


/* =========================================
   INITIAL VOLUME
   ========================================= */

if (volumeControl) {

    const startingVolume =
        Number(volumeControl.value);

    audioPlayer.volume =
        Number.isFinite(startingVolume)
            ? startingVolume
            : 0.7;

} else {

    audioPlayer.volume = 0.7;

}


/* =========================================
   MUSIC UI
   ========================================= */

function updateMusicUI() {

    if (vinylRecord) {

        vinylRecord.classList.toggle(
            "playing",
            isPlaying
        );

    }


    if (playPauseButton) {

        playPauseButton.textContent =
            isPlaying
                ? "Ⅱ"
                : "▶";

        playPauseButton.setAttribute(
            "aria-label",
            isPlaying
                ? "Pause music"
                : "Play music"
        );

    }

}


/* =========================================
   TRACK DISPLAY
   ========================================= */

function updateTrackDisplay() {

    const trackTitle =
        document.getElementById("trackTitle");

    const trackNumber =
        document.getElementById("trackNumber");


    if (trackTitle) {

        trackTitle.textContent =
            musicTracks[currentTrack].title;

    }


    if (trackNumber) {

        trackNumber.textContent =
            `Track ${currentTrack + 1} of ${musicTracks.length}`;

    }

}


/* =========================================
   LOAD TRACK
   ========================================= */

function loadTrack(index) {

    currentTrack =
        (index + musicTracks.length) %
        musicTracks.length;


    const track =
        musicTracks[currentTrack];


    audioPlayer.pause();


    audioPlayer.src =
        track.file;


    audioPlayer.load();


    updateTrackDisplay();

}


/* =========================================
   PLAY CURRENT TRACK
   ========================================= */

async function playCurrentTrack() {

    try {

        await audioPlayer.play();

        isPlaying = true;

        updateMusicUI();

    }

    catch (error) {

        console.error(
            "Music could not start:",
            error
        );

        isPlaying = false;

        updateMusicUI();

    }

}


/* =========================================
   PLAY / PAUSE
   ========================================= */

if (playPauseButton) {

    playPauseButton.addEventListener(
        "click",
        async () => {

            if (audioPlayer.paused) {

                await playCurrentTrack();

            }

            else {

                audioPlayer.pause();

                isPlaying = false;

                updateMusicUI();

            }

        }
    );

}


/* =========================================
   VOLUME
   ========================================= */

if (volumeControl) {

    volumeControl.addEventListener(
        "input",
        () => {

            audioPlayer.volume =
                Number(volumeControl.value);

        }
    );

}


/* =========================================
   TRACK ENDED
   ========================================= */

/*
    TRACK 1
       ↓
    TRACK 2
       ↓
    TRACK 3
       ↓
    TRACK 1
       ↓
    TRACK 2
       ↓
    TRACK 3
       ↓
      ♾️
*/

audioPlayer.addEventListener(
    "ended",
    () => {

        if (!isPlaying) {
            return;
        }


        currentTrack++;


        if (
            currentTrack >=
            musicTracks.length
        ) {

            currentTrack = 0;

        }


        loadTrack(currentTrack);


        const startNextTrack =
            () => {

                if (isPlaying) {

                    playCurrentTrack();

                }

            };


        if (
            audioPlayer.readyState >= 3
        ) {

            startNextTrack();

        }

        else {

            audioPlayer.addEventListener(
                "canplay",
                startNextTrack,
                { once: true }
            );

        }

    }
);


/* =========================================
   AUDIO PLAY EVENT
   ========================================= */

audioPlayer.addEventListener(
    "play",
    () => {

        isPlaying = true;

        updateMusicUI();

    }
);


/* =========================================
   AUDIO PAUSE EVENT
   ========================================= */

audioPlayer.addEventListener(
    "pause",
    () => {

        isPlaying = false;

        updateMusicUI();

    }
);


/* =========================================
   AUDIO ERROR
   ========================================= */

audioPlayer.addEventListener(
    "error",
    () => {

        console.error(
            "AUDIO ERROR:",
            musicTracks[currentTrack]?.file
        );

        isPlaying = false;

        updateMusicUI();

    }
);


/* =========================================
   INITIAL TRACK
   ========================================= */

loadTrack(0);

updateMusicUI();


/* =========================================
   INTRO
   ========================================= */

function updateIntro() {

    introText.textContent =
        introContent[currentIntro];

    introCounter.textContent =
        `${currentIntro + 1} / ${introContent.length}`;

    continueButton.textContent =
        "Continue →";

}


function finishIntro() {

    introFinished = true;

    introCounter.textContent =
        "READY?";

    introText.textContent =
        "Okay... now the actual experience starts 👀";

    continueButton.textContent =
        "Let's go →";

}


/* =========================================
   START EXPERIENCE
   ========================================= */

function startExperience() {

    introScreen.hidden = true;

    qaSection.hidden = false;

    currentStage = 0;

    showQuestionOne();

}


/* =========================================
   Q1
   ========================================= */

function showQuestionOne() {

    currentStage = 0;

    qaCounter.textContent =
        "Question 1";

    questionText.classList.remove(
        "fade-out"
    );

    questionText.textContent =
        "Maine bhot months se notice kiya hai tera behavior towards me...";

    questionSubtitle.textContent =
        "and honestly... I kinda like it.";

    answerInput.value = "";

    answerInput.hidden = true;

    submitAnswerButton.hidden = true;

    removeAllOptions();

    qaMessage.textContent = "";


    setTimeout(() => {

        questionText.classList.add(
            "fade-out"
        );

    }, 1800);


    setTimeout(() => {

        questionText.classList.remove(
            "fade-out"
        );

        questionText.textContent =
            "Okay, ek honest answer dena...";

        questionSubtitle.textContent =
            "Do you like me? Ya... crush hai mujhpe?";

        answerInput.hidden = false;

        submitAnswerButton.hidden = false;

        answerInput.placeholder =
            "Type your answer...";

        answerInput.focus();

    }, 2200);

}


/* =========================================
   TEXT ANSWERS
   ========================================= */

submitAnswerButton.addEventListener(
    "click",
    handleTextAnswer
);


function handleTextAnswer() {

    const answer =
        answerInput.value.trim();


    if (!answer) {

        qaMessage.textContent =
            "Answer toh de 😭";

        return;

    }


    qaMessage.textContent = "";


    /* =====================================
       Q1
       ===================================== */

    if (currentStage === 0) {

        console.log(
            "Q1:",
            answer
        );

        answerInput.hidden = true;

        submitAnswerButton.hidden = true;


        showTemporaryMessage(
            "And...",
            "",
            900,
            () => {

                showTemporaryMessage(
                    "I kinda like you too.",
                    "💚",
                    1500,
                    showQuestionTwo
                );

            }
        );

        return;

    }


    /* =====================================
       Q3
       ===================================== */

    if (currentStage === 2) {

        console.log(
            "Q3:",
            answer
        );

        answerInput.value = "";


        showTemporaryMessage(
            "Nice answer 👀",
            "",
            1200,
            showQuestionFour
        );

        return;

    }


    /* =====================================
       Q4
       ===================================== */

    if (currentStage === 3) {

        console.log(
            "Q4:",
            answer
        );

        answerInput.value = "";


        showTemporaryMessage(
            "Interesting... 👀",
            "",
            1200,
            showQuestionFive
        );

        return;

    }


    /* =====================================
       Q5
       ===================================== */

    if (currentStage === 4) {

        console.log(
            "Q5:",
            answer
        );

        answerInput.value = "";

        answerInput.hidden = true;

        submitAnswerButton.hidden = true;


        showTemporaryMessage(
            "Okay... noted 👀",
            "",
            1200,
            showFinalChoice
        );

        return;

    }


    /* =====================================
       HOW MANY PEOPLE
       ===================================== */

    if (currentStage === 7) {

        console.log(
            "How many people:",
            answer
        );

        answerInput.value = "";

        showWhoQuestion();

        return;

    }


    /* =====================================
       WHO
       ===================================== */

    if (currentStage === 8) {

        console.log(
            "Who will know:",
            answer
        );

        answerInput.value = "";

        answerInput.hidden = true;

        submitAnswerButton.hidden = true;


        showSomebodyEnding();

        return;

    }

}


/* =========================================
   TEMPORARY MESSAGE
   ========================================= */

function showTemporaryMessage(
    title,
    subtitle,
    duration,
    nextFunction
) {

    questionText.classList.add(
        "fade-out"
    );


    setTimeout(() => {

        questionText.classList.remove(
            "fade-out"
        );

        questionText.textContent =
            title;

        questionSubtitle.textContent =
            subtitle;

    }, 300);


    setTimeout(() => {

        nextFunction();

    }, duration);

}


/* =========================================
   Q2
   ========================================= */

function showQuestionTwo() {

    currentStage = 1;

    qaCounter.textContent =
        "Question 2";

    questionText.textContent =
        "Mere saath baat karna tujhe actually pasand hai? 👀";

    questionSubtitle.textContent =
        "Choose honestly 😭";

    answerInput.hidden = true;

    submitAnswerButton.hidden = true;

    qaMessage.textContent = "";

    createQuestionTwoOptions();

}


/* =========================================
   Q2 OPTIONS
   ========================================= */

function createQuestionTwoOptions() {

    removeAllOptions();


    const container =
        document.createElement("div");

    container.id =
        "mcqOptions";

    container.className =
        "mcq-options";


    const options = [
        "Haan, kaafi 😭",
        "Yeah, it's fun",
        "Kabhi kabhi 💀",
        "Depends on the day"
    ];


    options.forEach(
        optionText => {

            const button =
                document.createElement(
                    "button"
                );

            button.type =
                "button";

            button.className =
                "mcq-option";

            button.textContent =
                optionText;


            button.addEventListener(
                "click",
                () => {

                    if (
                        currentStage !== 1
                    ) {

                        return;

                    }


                    currentStage = 99;


                    console.log(
                        "Q2:",
                        optionText
                    );


                    container
                        .querySelectorAll(
                            ".mcq-option"
                        )
                        .forEach(
                            item => {

                                item.disabled =
                                    true;

                            }
                        );


                    button.classList.add(
                        "selected"
                    );


                    setTimeout(() => {

                        removeAllOptions();

                        showQuestionThree();

                    }, 500);

                }
            );


            container.appendChild(
                button
            );

        }
    );


    /*
       IMPORTANT FIX:

       BEFORE:
       qaSection.appendChild(container);

       NOW:
       optionsContainer.appendChild(container);

       This keeps dynamic buttons inside
       the dedicated options wrapper.
    */

    if (optionsContainer) {

        optionsContainer.appendChild(
            container
        );

    }

}


/* =========================================
   Q3
   ========================================= */

function showQuestionThree() {

    currentStage = 2;

    qaCounter.textContent =
        "Question 3";

    questionText.textContent =
        "Mere baare mein ek cheez jo tujhe genuinely achhi lagti hai?";

    questionSubtitle.textContent =
        "";

    answerInput.value = "";

    answerInput.hidden = false;

    submitAnswerButton.hidden = false;

    answerInput.placeholder =
        "Type your answer...";

    answerInput.focus();

}


/* =========================================
   Q4
   ========================================= */

function showQuestionFour() {

    currentStage = 3;

    qaCounter.textContent =
        "Question 4";

    questionText.textContent =
        "Abhi kitne mahine tak ye chalega? 👀";

    questionSubtitle.textContent =
        "";

    answerInput.value = "";

    answerInput.hidden = false;

    submitAnswerButton.hidden = false;

    answerInput.placeholder =
        "Type your answer...";

    answerInput.focus();

}


/* =========================================
   Q5
   ========================================= */

function showQuestionFive() {

    currentStage = 4;

    qaCounter.textContent =
        "Question 5";

    questionText.textContent =
        "Aur kuch aur bolna haiii? 👀";

    questionSubtitle.textContent =
        "Jo mann mein hai honestly bol dena.";

    answerInput.value = "";

    answerInput.hidden = false;

    submitAnswerButton.hidden = false;

    answerInput.placeholder =
        "Type your answer...";

    answerInput.focus();

}


/* =========================================
   FINAL CHOICE
   ========================================= */

function showFinalChoice() {

    currentStage = 5;

    qaCounter.textContent =
        "FINAL CHOICE";

    questionText.textContent =
        "Okay... one last thing.";

    questionSubtitle.textContent =
        "How should this stay? 🤫";

    answerInput.hidden = true;

    submitAnswerButton.hidden = true;

    removeAllOptions();

    createFinalChoiceOptions();

}


/* =========================================
   FINAL CHOICE OPTIONS
   ========================================= */

function createFinalChoiceOptions() {

    removeAllOptions();


    const container =
        document.createElement("div");

    container.id =
        "finalOptions";

    container.className =
        "mcq-options";


    const options = [
        {
            text: "Between us 🤫",
            type: "private"
        },
        {
            text: "Everybody knows 👀",
            type: "public"
        },
        {
            text: "Somebody will know 😭",
            type: "somebody"
        }
    ];


    options.forEach(
        option => {

            const button =
                document.createElement(
                    "button"
                );

            button.type =
                "button";

            button.className =
                "mcq-option";

            button.textContent =
                option.text;


            button.addEventListener(
                "click",
                () => {

                    if (
                        currentStage !== 5
                    ) {

                        return;

                    }


                    currentStage = 99;


                    console.log(
                        "Final choice:",
                        option.type
                    );


                    container
                        .querySelectorAll(
                            ".mcq-option"
                        )
                        .forEach(
                            item => {

                                item.disabled =
                                    true;

                            }
                        );


                    button.classList.add(
                        "selected"
                    );


                    setTimeout(() => {

                        removeAllOptions();


                        if (
                            option.type ===
                            "private"
                        ) {

                            showPrivateEnding();

                        }

                        else if (
                            option.type ===
                            "public"
                        ) {

                            showPublicEnding();

                        }

                        else {

                            showSomebodyQuestion();

                        }

                    }, 500);

                }
            );


            container.appendChild(
                button
            );

        }
    );


    /*
       IMPORTANT FIX:

       Dynamic final buttons also go
       into #optionsContainer.
    */

    if (optionsContainer) {

        optionsContainer.appendChild(
            container
        );

    }

}


/* =========================================
   SOMEBODY
   ========================================= */

function showSomebodyQuestion() {

    currentStage = 7;

    qaCounter.textContent =
        "FINAL CHOICE";

    questionText.textContent =
        "How many people will know? 👀";

    questionSubtitle.textContent =
        "Be honest... approximately kitne?";

    answerInput.value = "";

    answerInput.hidden = false;

    submitAnswerButton.hidden = false;

    answerInput.placeholder =
        "How many people?";

    answerInput.focus();

}


function showWhoQuestion() {

    currentStage = 8;

    qaCounter.textContent =
        "FINAL CHOICE";

    questionText.textContent =
        "And who are they? 🤨";

    questionSubtitle.textContent =
        "Names / initials / whatever you want.";

    answerInput.value = "";

    answerInput.hidden = false;

    submitAnswerButton.hidden = false;

    answerInput.placeholder =
        "Who will know?";

    answerInput.focus();

}


/* =========================================
   ENDINGS
   ========================================= */

function finishEnding(
    counter,
    title,
    subtitle
) {

    currentStage = 6;

    qaCounter.textContent =
        counter;

    questionText.textContent =
        title;

    questionSubtitle.textContent =
        subtitle;

    answerInput.hidden = true;

    submitAnswerButton.hidden = true;

    qaMessage.textContent = "";


    setTimeout(() => {

        questionText.classList.add(
            "fade-out"
        );

    }, 2200);


    setTimeout(() => {

        questionText.classList.remove(
            "fade-out"
        );

        questionText.textContent =
            "Bas ek kaam karna...";

        questionSubtitle.textContent =
            "Kal class mein mujhe bata dena. 👀";

    }, 2600);


    setTimeout(() => {

        questionText.classList.add(
            "fade-out"
        );

    }, 4800);


    setTimeout(() => {

        questionText.classList.remove(
            "fade-out"
        );

        questionText.textContent =
            "Kal milte hai. Byeee 👋";

        questionSubtitle.textContent =
            "💚";

    }, 5200);

}


/* =========================================
   PRIVATE ENDING
   ========================================= */

function showPrivateEnding() {

    finishEnding(
        "JUST BETWEEN US 🤫",
        "Okay... between us it is. 🤫",
        "Some things are better kept as our little secret."
    );

}


/* =========================================
   PUBLIC ENDING
   ========================================= */

function showPublicEnding() {

    finishEnding(
        "EVERYBODY KNOWS 👀",
        "OH. So everybody knows? 💀",
        "Bro really chose chaos 😭"
    );

}


/* =========================================
   SOMEBODY ENDING
   ========================================= */

function showSomebodyEnding() {

    finishEnding(
        "SECRET INFO 👀",
        "Got it... 👀",
        "Okay, I know who we're dealing with now 💀"
    );

}


/* =========================================
   REMOVE OPTIONS
   ========================================= */

function removeAllOptions() {

    /*
       Since everything dynamic is now inside
       #optionsContainer, clear ONLY that container.

       This is safer than modifying the entire
       Q&A section.
    */

    if (optionsContainer) {

        optionsContainer.innerHTML = "";

    }

}


/* =========================================
   CONTINUE
   ========================================= */

continueButton.addEventListener(
    "click",
    handleContinue
);


function handleContinue() {

    if (introFinished) {

        startExperience();

        return;

    }


    introText.classList.add(
        "fade-out"
    );


    setTimeout(() => {

        if (
            currentIntro <
            introContent.length - 1
        ) {

            currentIntro++;

            updateIntro();

        }

        else {

            finishIntro();

        }


        introText.classList.remove(
            "fade-out"
        );

    }, 250);

}


/* =========================================
   INITIALIZE
   ========================================= */

updateIntro();