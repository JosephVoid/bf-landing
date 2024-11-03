function redirector(to) {
    window.location.href = to;
}

let elementIdHandlerMap = {
    'amharic_button_mob': () => redirector('/?lang=am'),
    'english_button_mob': () => redirector('/?lang=en'),
    'amharic_button': () => redirector('/?lang=am'),
    'english_button': () => redirector('/?lang=en'),
    'ham_nav_button': () => {
        const content = document.getElementById("collapse_div");
        content.classList.toggle("show");
    }
}

function addDynamicEventListeners() {
    const elements = document.querySelectorAll('*');
    elements.forEach((element) => {
        const elementId = element.id;
        if (elementId && elementId.includes("_button")) {
            element.addEventListener('click', (event) => {
                elementIdHandlerMap[elementId]();
            });
        }
    });
}

function setLang() {
    const lang = new URLSearchParams(window.location.search).get('lang');
    if (lang === 'am') {
        const en_elems = document.getElementsByClassName('en_only');
        for (const element of en_elems) {
            element.style.display = 'none';
        }
        document.getElementById('amharic_button_mob').style.opacity = 1;
        document.getElementById('amharic_button').style.opacity = 1;
        document.getElementById('english_button_mob').style.opacity = 0.5;
        document.getElementById('english_button').style.opacity = 0.5;
    } else {
        const am_elems = document.getElementsByClassName('am_only');
        for (const element of am_elems) {
            element.style.display = 'none';
        }
        document.getElementById('amharic_button_mob').style.opacity = 0.5;
        document.getElementById('amharic_button').style.opacity = 0.5;
        document.getElementById('english_button_mob').style.opacity = 1;
        document.getElementById('english_button').style.opacity = 1;
    }
}

window.onload = (e) => { addDynamicEventListeners(); setLang(); }