document.addEventListener("DOMContentLoaded", () => {
    // Change this password anytime.
    const PASSWORD = "phool";

    const gate = document.getElementById("gate");
    const reveal = document.getElementById("reveal");
    const input = document.getElementById("card-pass");
    const error = document.getElementById("gate-error");

    if (gate && reveal && input && error) {
        gate.addEventListener("submit", (event) => {
            event.preventDefault();

            const guess = input.value.trim().toLowerCase();
            if (guess === PASSWORD) {
                gate.hidden = true;
                reveal.hidden = false;
                error.hidden = true;
            } else {
                error.hidden = false;
                input.select();
            }
        });
    }

    const field = document.getElementById("petals");
    if (!field || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
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
});
