document.addEventListener("DOMContentLoaded", function () {
    let currentStep = 0;
    const formSteps = document.querySelectorAll(".form-step");
    const steps = document.querySelectorAll(".step");

    function updateStep() {
        formSteps.forEach((step, index) => {
            step.classList.toggle("active", index === currentStep);
        });

        steps.forEach((step, index) => {
            step.classList.toggle("active", index === currentStep);
        });
    }

    document.querySelectorAll(".next-step").forEach(button => {
        button.addEventListener("click", function () {
            if (currentStep < formSteps.length - 1) {
                currentStep++;
                updateStep();
            }
        });
    });

    document.querySelectorAll(".skip-step").forEach(button => {
        button.addEventListener("click", function () {
            if (currentStep < formSteps.length - 1) {
                currentStep++; // Move to the next step
                updateStep();
            }
        });
    });


    // NEW: Clickable step navigation
    steps.forEach((step, index) => {
        step.addEventListener("click", function () {
            if (index <= currentStep + 1) { // Allow only past & next steps
                currentStep = index;
                updateStep();
            }
        });
    });

    updateStep();
});

