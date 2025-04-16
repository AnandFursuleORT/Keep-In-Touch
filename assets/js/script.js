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


// Steps wizard js code in automation modal

const steps = document.querySelectorAll('.step');
const contents = document.querySelectorAll('.step-content');

function setActiveStep(stepNum) {
    steps.forEach((step, index) => {
        const circle = step.querySelector('.step-circle');
        const text = step.querySelector('.step-subtext');
        if (index < stepNum - 1) {
            step.classList.add('completed');
            step.classList.remove('active');
            text.textContent = 'Completed';
            circle.textContent = index + 1;
        } else if (index === stepNum - 1) {
            step.classList.add('active');
            step.classList.remove('completed');
            text.textContent = 'In Progress';
            circle.textContent = index + 1;
        } else {
            step.classList.remove('active', 'completed');
            text.textContent = 'Pending';
            circle.textContent = index + 1;
        }
    });
    contents.forEach((content, idx) => {
        content.classList.toggle('hidden', idx !== stepNum - 1);
    });
}

document.getElementById('nextBtn').addEventListener('click', () => {
    setActiveStep(2);
});

document.getElementById('to-preview').addEventListener('click', () => {
    setActiveStep(3);
});

document.getElementById('create-own').addEventListener('click', () => {
    setActiveStep(3);
});

// Filter Dropdown code

function setupSearchAndCheckboxBehavior(searchInputId, listId) {
    const searchInput = document.getElementById(searchInputId);
    const checkboxes = document.querySelectorAll(`#${listId} .form-check-input`);

    // Filter the checkbox list based on the search input
    searchInput.addEventListener('input', function () {
        const searchValue = this.value.toLowerCase().trim();
        checkboxes.forEach(checkbox => {
            const label = checkbox.nextElementSibling.textContent.toLowerCase();
            checkbox.parentElement.style.display = label.includes(searchValue) ? '' : 'none';
        });
    });

    // Clear the search input when any checkbox is selected
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            searchInput.value = '';
        });
    });
}

// Setup for all the search and checkbox combinations

setupSearchAndCheckboxBehavior('tagSearch', 'tagList');
setupSearchAndCheckboxBehavior('citySearch', 'cityList');
setupSearchAndCheckboxBehavior('referenceSearch', 'referenceList');
setupSearchAndCheckboxBehavior('EngineSearch', 'EngineList');
