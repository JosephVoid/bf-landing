// List of available locales
const availableLocales = ['en', 'am'];

// Default locale.
const defaultLanguage = 'en';

// Manually detect users' language, strip languages such as `en-GB` to just `en`.
let language = (window.navigator.userLanguage || window.navigator.language).substr(0, 2);

// If `?lang=` exists in URL params & is valid, then use that instead.
const urlParams = new URLSearchParams(window.location.search);
const langFromUrl = urlParams.get('lang');
if (langFromUrl && availableLocales.includes(langFromUrl)) {
  language = langFromUrl
}

// Set `pageLanguage` only if its available within our locales, otherwise default.
let pageLanguage = defaultLanguage;
if (availableLocales.includes(language)) {
  pageLanguage = language;
}

// Locale translations.
const locales = {

  // EN
  en: {
    "nav": {
      "buyer": "Buyer",
      "merchant": "Merchant",
      "get_started": "Get Started",
      "login": "Login",
      "signup": "Sign Up"
    },
    "hero": {
      "merchants": "Merchants",
      "buyers": "Buyers",
      "desires_fulf": "Desires fullfiled",
      "main": "Post To Let Merchants Know What You Want!",
      "sub": "We have active buyers. Make offers, spot trends, and introduce new products based on demand.",
      "get_started_for_free": "Get Started",
      "look_at_desires": "See Buyers"
    },
    "sec2": {
      "main": "See how it works"
    },
    "sec3": {
      "main": "Shopping can be frustrating and time-consuming.",
      "item_1": "Buyers are hesitant to commit to purchases.",
      "item_2": "It's hard to know what items are selling well in your market.",
      "item_3": "Not knowing which new items are in demand in the market."
    },
    "sec4": {
      "main": "Stop searching—post your desire, and merchants will come to you."
    },
    "sec5": {
      "top": "Join 200+ merchants that have fulfilled",
      "bottom": "buyer's desires.",
      "button": "Get Started for FREE"
    },
    "footer": {
      "copy": "©2024 Buyers First. All rights Reserved.",
      "contact": "CONTACT US",
      "for": "FOR"
    }
  },

  // AM
  am: {
    "nav": {
      "buyer": "ገዢ",
      "merchant": "ነጋዴ",
      "get_started": "ይመዝገቡ",
      "login": "ይግቡ",
      "signup": "ይመዝገቡ"
    },
    "hero": {
      "merchants": "ነጋዴዎች",
      "buyers": "ገዠዎች",
      "desires_fulf": "ፍላጎቶች ተሟልተዋል",
      "main": "ለነጋዴዎች ፍላጎቶውን ለማሳወቅ ፖስት ያድርጉ!",
      "sub": "የሚፈልጉትን በትክክል የሚናገሩ ንቁ ገዢዎች አሉን። ይጫረቱ እና የገዢ ፍላጎት ላይ ተመስርተው አዳዲስ ሸቀጦችን ያቅርቡ።",
      "get_started_for_free": "በነፃ ይመዝገቡ",
      "look_at_desires": "ገዢዎችን ይመልከቱ"
    },
    "sec2": {
      "main": "እንዴት እንደሚሰራ ይመልከቱ"
    },
    "sec3": {
      "main": "ገበያ መሄድ ጊዜ የሚፈጅ ፣ አድካሚ እና አሰልቺ ሊሆን ይችላል።",
      "item_1": "ገዢዎች ብዙ ጊዜ ያመነታሉ።",
      "item_2": "ገበያ ላይ በየጊዜው ምን ሸቀጦች በደንብ እንደሚሸጡ ለማወቅ ይከብዳል።",
      "item_3": "በገበያ ላይ የሚፈለጉ አዳዲስ ሸቀጦች የትኞቹ እንደሆኑ አለማወቅ።"
    },
    "sec4": {
      "main": "ፍለጋው ይቁም ፤ ፍላጎትዎን ይፖስቱ እና ነጋዴዎች ወደ እርስዎ ይመጣሉ።"
    },
    "sec5": {
      "top": "የ200+ ገዢዎችን ",
      "bottom": "ፍላጎቶችን ያሟሉ 200+ ነጋዴዎችን ይቀላቀሉ!",
      "button": "በነፃ ይመዝገቡ"
    },
    "footer": {
      "copy": "©2024 Buyers First. All rights Reserved.",
      "contact": "CONTACT US",
      "for": "FOR"
    }
  },
};

// Get all page elements to be translated.
const elements = document.querySelectorAll('[data-i18n]');

// Get JSON object of translations.
const json = locales[pageLanguage];

// On each element, found the translation from JSON file & update.
elements.forEach((element, index) => {
  const key = element.getAttribute('data-i18n');
  let text = key.split('.').reduce((obj, i) => (obj ? obj[i] : null), json);

  // Does this text have any variables? (eg {something})
  const variables = text.match(/{(.*?)}/g);
  if (variables) {

    // Iterate each variable in the text.
    variables.forEach((variable) => {

      // Filter all `data-*` attributes for this element to find the matching key.
      Object.entries(element.dataset).filter(([key, value]) => {
        if (`{${key}}` === variable) {
          try {
            // Attempt to run actual JavaScript code.
            text = text.replace(`${variable}`, new Function(`return (${value})`)());
          } catch (error) {
            // Probably just static text replacement.
            text = text.replace(`${variable}`, value);
          }
        }
      })
    });
  }

  // Regular text replacement for given locale.
  element.innerHTML = text;
});
