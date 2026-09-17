document.addEventListener("DOMContentLoaded", () => {
    const PASSWORD = "phool";
    const ACCEPTED = new Set(["phool", "fool", "پھول"]);

    const body = document.body;
    const gate = document.getElementById("gate");
    const reveal = document.getElementById("reveal");
    const input = document.getElementById("card-pass");
    const error = document.getElementById("gate-error");
    const clue = document.getElementById("gate-clue");
    const bloom = document.getElementById("unlock-bloom");
    const field = document.getElementById("petals");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let attempts = 0;
    let unlocking = false;

    function spawnPetals() {
        if (!field || reduceMotion || field.childElementCount > 0) {
            return;
        }

        for (let i = 0; i < 12; i += 1) {
            const petal = document.createElement("span");
            petal.className = "petal";
            petal.style.left = `${Math.random() * 100}%`;
            petal.style.animationDuration = `${8 + Math.random() * 7}s`;
            petal.style.animationDelay = `${i * 0.18}s`;
            petal.style.setProperty("--drift", `${-50 + Math.random() * 100}px`);
            petal.style.scale = `${0.7 + Math.random() * 0.7}`;
            field.appendChild(petal);
        }
    }

    function wait(ms) {
        return new Promise((resolve) => window.setTimeout(resolve, ms));
    }

    async function showCard() {
        if (unlocking) {
            return;
        }
        unlocking = true;

        if (reduceMotion) {
            body.classList.remove("is-locked");
            body.classList.add("is-unlocked");
            gate.hidden = true;
            reveal.hidden = false;
            spawnPetals();
            return;
        }

        gate.classList.add("is-solved");
        if (bloom) {
            bloom.classList.add("is-active");
        }

        await wait(320);

        gate.classList.add("is-leaving");
        body.classList.add("is-unlocking");
        body.classList.remove("is-locked");

        await wait(480);

        gate.hidden = true;
        reveal.hidden = false;
        // Restart entrance animations for the card contents.
        void reveal.offsetWidth;
        reveal.classList.add("is-entering");
        spawnPetals();

        await wait(700);

        body.classList.remove("is-unlocking");
        body.classList.add("is-unlocked");
        if (bloom) {
            bloom.classList.remove("is-active");
        }
    }

    if (gate && reveal && input && error) {
        gate.addEventListener("submit", (event) => {
            event.preventDefault();
            if (unlocking) {
                return;
            }

            const guess = input.value.trim().toLowerCase();
            if (guess === PASSWORD || ACCEPTED.has(guess)) {
                error.hidden = true;
                if (clue) {
                    clue.hidden = true;
                }
                input.blur();
                showCard();
            } else {
                attempts += 1;
                error.hidden = false;
                gate.classList.remove("is-shake");
                void gate.offsetWidth;
                gate.classList.add("is-shake");
                if (clue && attempts >= 2) {
                    clue.hidden = false;
                }
                input.select();
            }
        });
    }
});
