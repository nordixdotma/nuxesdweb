type Locale = "en" | "fr"

const dictionaries = {
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  fr: () => import("./dictionaries/fr.json").then((module) => module.default),
}

export const getDictionary = async (locale: Locale) => {
  if (!dictionaries[locale]) {
    // Fallback to default language if locale is not found
    return dictionaries["en"]()
  }
  return dictionaries[locale]()
}
