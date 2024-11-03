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
      "sub": "Post what you want to buy, and merchants compete with offers. This way, you can save time, get better deals, and easily find hard-to-get items!",
      "get_started_for_free": "Get Started for FREE"
    },
    "sec2": {
      "main": "See how it works"
    },
    "sec3": {
      "main": "Shopping can be frustrating and time-consuming.",
      "item_1": "Finding niche items that aren't available in most shops is nearly impossible.",
      "item_2": "Shops might charge you more based on how you look or talk.",
      "item_3": "Searching for a fair price on an item among thousands of merchants is exhausting in-person or online."
    },
    "sec4": {
      "main": "Stop searching—post your desire, and merchants will come to you."
    },
    "sec5": {
      "top": "Join 100+ buyers that have",
      "bottom": "desires fullfiled.",
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
      "sub": "ለመግዛት የሚፈልጉትን ያሳውቁ እና ነጋዴዎች ዋጋቸውን ያቀርባሉ። ጊዜ ይቆጥቡ፣ የተሻለ ዋጋ ያግኙ እና በቀላሉ የማይገኙ ሸቀጦችን ያግኙ!",
      "get_started_for_free": "በነፃ ይመዝገቡ"
    },
    "sec2": {
      "main": "እንዴት እንደሚሰራ ይመልከቱ"
    },
    "sec3": {
      "main": "ገበያ መሄድ ጊዜ የሚፈጅ ፣ አድካሚ እና አሰልቺ ሊሆን ይችላል።",
      "item_1": "አብዛኛው ሱቅ ላይ የማይገኙ ሸቀጦችን ፈልጎ ማግኘት ፈፅሞ የማይታሰብ ነገር ነው።",
      "item_2": "ሱቆች በአለባበስዎ ወይም በአነጋገርዎ ላይ ተመስርተው ዋጋ ሊጨምሩ ይችላሉ።",
      "item_3": "ለአንድ ሸቀጥ በሺዎች ከሚቆጠሩ ነጋዴዎች መካከል ተመጣጣኝ ዋጋ መፈለግ በአካልም ሆነ ኦንላይን አድካሚ ነው።"
    },
    "sec4": {
      "main": "ፍለጋው ይቁም ፤ ፍላጎትዎን ይፖስቱ እና ነጋዴዎች ወደ እርስዎ ይመጣሉ።"
    },
    "sec5": {
      "top": "ፍላጎት የተሟላላቸውን",
      "bottom": "ገዢዎችን ይቀላቀሉ!",
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
