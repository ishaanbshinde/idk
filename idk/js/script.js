const entryForm = document.getElementById("entryForm");
const entryMessage = document.getElementById("entryMessage");
const enterButton = document.getElementById("enterButton");

entryForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const password = document.getElementById("password").value;

    if (!name || !password) {
        entryMessage.textContent = "Please fill in both fields.";
        return;
    }

    enterButton.disabled = true;
    enterButton.textContent = "Checking...";

    entryMessage.textContent = "";

    try {
        const response = await fetch("/api/session/start", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                password
            })
        });

        const data = await response.json();

        // Correct credentials
        if (response.ok && data.success) {
            window.location.href = "experience.html";
            return;
        }

        // Intended person + wrong password
        if (data.error === "Incorrect password") {
            entryMessage.textContent = "Incorrect password.";

            enterButton.disabled = false;
            enterButton.textContent = "Enter the Experience →";

            return;
        }

        // Everyone else
        if (data.redirect) {
            window.location.href =
                "https://heheishanhasdonethis.netlify.app";

            return;
        }

        // Any other expected error
        entryMessage.textContent =
            data.error || "Something went wrong.";

        enterButton.disabled = false;
        enterButton.textContent = "Enter the Experience →";

    } catch (error) {
        console.error("Connection error:", error);

        entryMessage.textContent =
            "Something went wrong. Try again.";

        enterButton.disabled = false;
        enterButton.textContent = "Enter the Experience →";
    }
});