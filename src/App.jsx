import { useState, useEffect, useCallback } from "react";
import { Analytics } from "@vercel/analytics/react";

const ALL_WORDS = [
  // NOUNS
  { hebrew: "אִמָּא", translit: "ima", english: "mother", spanish: "mamá / madre", category: "Nouns" },
  { hebrew: "יַיִן", translit: "yayin", english: "wine", spanish: "vino", category: "Nouns" },
  { hebrew: "יָם", translit: "yam", english: "sea", spanish: "mar", category: "Nouns" },
  { hebrew: "מַיִם", translit: "mayim", english: "water", spanish: "agua", category: "Nouns" },
  { hebrew: "מַתָּנָה", translit: "matana", english: "gift / present", spanish: "regalo", category: "Nouns" },
  { hebrew: "אִישׁ", translit: "ish", english: "man", spanish: "hombre", category: "Nouns" },
  { hebrew: "אִשָּׁה", translit: "isha", english: "woman / wife", spanish: "mujer / esposa", category: "Nouns" },
  { hebrew: "גְּלִידָה", translit: "glida", english: "ice-cream", spanish: "helado", category: "Nouns" },
  { hebrew: "דֶּגֶל", translit: "degel", english: "flag", spanish: "bandera", category: "Nouns" },
  { hebrew: "הָר", translit: "har", english: "mountain", spanish: "montaña", category: "Nouns" },
  { hebrew: "יֶלֶד", translit: "yeled", english: "boy", spanish: "niño / chico", category: "Nouns" },
  { hebrew: "יַלְדָּה", translit: "yalda", english: "girl", spanish: "niña / chica", category: "Nouns" },
  { hebrew: "תַּלְמִיד", translit: "talmid", english: "student (m.)", spanish: "alumno (m.)", category: "Nouns" },
  { hebrew: "תַּלְמִידָה", translit: "talmida", english: "student (f.)", spanish: "alumna (f.)", category: "Nouns" },
  { hebrew: "שִׁיר", translit: "shir", english: "song / poem", spanish: "canción / poema", category: "Nouns" },
  { hebrew: "שֶׁמֶשׁ", translit: "shemesh", english: "sun", spanish: "sol", category: "Nouns" },
  { hebrew: "תֵּה", translit: "te", english: "tea", spanish: "té", category: "Nouns" },
  { hebrew: "לֶחֶם", translit: "lechem", english: "bread", spanish: "pan", category: "Nouns" },
  { hebrew: "לִימוֹן", translit: "limon", english: "lemon", spanish: "limón", category: "Nouns" },
  { hebrew: "מוֹרֶה", translit: "more", english: "teacher (m.)", spanish: "maestro / profesor (m.)", category: "Nouns" },
  { hebrew: "מֶלַח", translit: "melach", english: "salt", spanish: "sal", category: "Nouns" },
  { hebrew: "סָלָט", translit: "salat", english: "salad", spanish: "ensalada", category: "Nouns" },
  { hebrew: "עוּגָה", translit: "uga", english: "cake", spanish: "torta / pastel", category: "Nouns" },
  { hebrew: "עִיר", translit: "ir", english: "city / town", spanish: "ciudad", category: "Nouns" },
  { hebrew: "מִיץ", translit: "mits", english: "juice", spanish: "jugo", category: "Nouns" },
  { hebrew: "מִסְעָדָה", translit: "mis'ada", english: "restaurant", spanish: "restaurante", category: "Nouns" },
  { hebrew: "רֶגַע", translit: "rega", english: "moment", spanish: "momento", category: "Nouns" },
  { hebrew: "אַבָּא", translit: "aba", english: "father", spanish: "papá / padre", category: "Nouns" },
  { hebrew: "בַּיִת", translit: "bayit", english: "house", spanish: "casa", category: "Nouns" },
  { hebrew: "מִשְׁפָּחָה", translit: "mishpaha", english: "family", spanish: "familia", category: "Nouns" },
  { hebrew: "עוֹלָם", translit: "olam", english: "world", spanish: "mundo", category: "Nouns" },
  { hebrew: "סוּכָּר", translit: "sukar", english: "sugar", spanish: "azúcar", category: "Nouns" },
  { hebrew: "תַּפּוּז", translit: "tapuz", english: "orange", spanish: "naranja", category: "Nouns" },
  { hebrew: "חָלָב", translit: "halav", english: "milk", spanish: "leche", category: "Nouns" },
  { hebrew: "מַחְשֵׁב", translit: "mahshev", english: "computer", spanish: "computadora", category: "Nouns" },
  { hebrew: "מִכְתָּב", translit: "miktav", english: "letter", spanish: "carta", category: "Nouns" },
  { hebrew: "סֵפֶר", translit: "sefer", english: "book", spanish: "libro", category: "Nouns" },
  { hebrew: "שִׁיעוּר", translit: "shi'ur", english: "lesson / class", spanish: "clase / lección", category: "Nouns" },
  { hebrew: "בַּנְק", translit: "bank", english: "bank", spanish: "banco", category: "Nouns" },
  { hebrew: "מוּזִיקָה", translit: "muzika", english: "music", spanish: "música", category: "Nouns" },
  { hebrew: "קָפֶה", translit: "kafe", english: "coffee", spanish: "café", category: "Nouns" },
  { hebrew: "חֲדָשׁוֹת", translit: "hadashot", english: "news", spanish: "noticias", category: "Nouns" },
  { hebrew: "שָׁעָה", translit: "sha'a", english: "hour", spanish: "hora", category: "Nouns" },
  { hebrew: "שָׁעוֹן", translit: "sha'on", english: "clock / watch", spanish: "reloj", category: "Nouns" },
  { hebrew: "שַׁבָּת", translit: "shabbat", english: "Sabbath / Saturday", spanish: "Shabat / sábado", category: "Nouns" },
  { hebrew: "תַּנַ\"ך", translit: "tanakh", english: "the Bible", spanish: "la Biblia", category: "Nouns" },
  { hebrew: "בֹּקֶר", translit: "boker", english: "morning", spanish: "mañana", category: "Nouns" },
  { hebrew: "לַיְלָה", translit: "layla", english: "night", spanish: "noche", category: "Nouns" },
  { hebrew: "עֶרֶב", translit: "erev", english: "evening", spanish: "tarde / noche", category: "Nouns" },
  { hebrew: "צָהֳרַיִם", translit: "tsahorayim", english: "afternoon", spanish: "mediodía / tarde", category: "Nouns" },
  { hebrew: "רְחוֹב", translit: "rehov", english: "street", spanish: "calle", category: "Nouns" },
  { hebrew: "אוֹטוֹבּוּס", translit: "otobus", english: "bus", spanish: "colectivo / autobús", category: "Nouns" },
  { hebrew: "אַרְמוֹן", translit: "armon", english: "castle", spanish: "castillo / palacio", category: "Nouns" },
  { hebrew: "דִּירָה", translit: "dira", english: "apartment", spanish: "departamento / piso", category: "Nouns" },
  { hebrew: "חֶדֶר", translit: "heder", english: "room", spanish: "habitación / cuarto", category: "Nouns" },
  { hebrew: "מַטְבֵּחַ", translit: "matbeah", english: "kitchen", spanish: "cocina", category: "Nouns" },
  { hebrew: "שׁוּלְחָן", translit: "shulhan", english: "table", spanish: "mesa", category: "Nouns" },
  { hebrew: "מִיטָּה", translit: "mita", english: "bed", spanish: "cama", category: "Nouns" },
  { hebrew: "כִּיסֵּא", translit: "kise", english: "chair", spanish: "silla", category: "Nouns" },
  { hebrew: "שֶׁקֶל", translit: "sheqel", english: "shekel", spanish: "séquel", category: "Nouns" },
  { hebrew: "יוֹם", translit: "yom", english: "day", spanish: "día", category: "Nouns" },
  { hebrew: "שָׁבוּעַ", translit: "shavu'a", english: "week", spanish: "semana", category: "Nouns" },
  { hebrew: "חוֹדֶשׁ", translit: "hodesh", english: "month", spanish: "mes", category: "Nouns" },
  { hebrew: "שָׁנָה", translit: "shana", english: "year", spanish: "año", category: "Nouns" },
  { hebrew: "כֶּסֶף", translit: "kesef", english: "money", spanish: "dinero", category: "Nouns" },
  { hebrew: "עִיתּוֹן", translit: "iton", english: "newspaper", spanish: "diario / periódico", category: "Nouns" },
  { hebrew: "אָדָם", translit: "adam", english: "human being / man", spanish: "ser humano / persona", category: "Nouns" },
  { hebrew: "אֲרוּחָה", translit: "arucha", english: "meal", spanish: "comida", category: "Nouns" },
  { hebrew: "טֶבַע", translit: "teva", english: "nature", spanish: "naturaleza", category: "Nouns" },
  { hebrew: "שְׁאֵלָה", translit: "she'ela", english: "question", spanish: "pregunta", category: "Nouns" },
  { hebrew: "בְּחִינָה", translit: "behina", english: "exam", spanish: "examen", category: "Nouns" },
  { hebrew: "מִלְחָמָה", translit: "milchama", english: "war", spanish: "guerra", category: "Nouns" },
  { hebrew: "שָׁמַיִם", translit: "shamayim", english: "sky", spanish: "cielo", category: "Nouns" },
  { hebrew: "חוֹרֶף", translit: "horef", english: "winter", spanish: "invierno", category: "Nouns" },
  { hebrew: "מִדְבָּר", translit: "midbar", english: "desert", spanish: "desierto", category: "Nouns" },
  { hebrew: "שָׂפָה", translit: "safa", english: "language", spanish: "idioma / lengua", category: "Nouns" },
  { hebrew: "גְּבִינָה", translit: "gevina", english: "cheese", spanish: "queso", category: "Nouns" },
  { hebrew: "יֶרֶק", translit: "yerek", english: "vegetable", spanish: "verdura", category: "Nouns" },
  { hebrew: "פְּרִי", translit: "pri", english: "fruit", spanish: "fruta", category: "Nouns" },
  { hebrew: "שׁוּק", translit: "shuk", english: "market", spanish: "mercado", category: "Nouns" },
  { hebrew: "תַּפּוּחַ עֵץ", translit: "tapuach ets", english: "apple", spanish: "manzana", category: "Nouns" },
  { hebrew: "כֶּלֶב", translit: "kelev", english: "dog", spanish: "perro", category: "Nouns" },
  { hebrew: "דָּג", translit: "dag", english: "fish", spanish: "pez / pescado", category: "Nouns" },
  { hebrew: "חֲלוֹם", translit: "halom", english: "dream", spanish: "sueño", category: "Nouns" },
  { hebrew: "מָטוֹס", translit: "matos", english: "airplane", spanish: "avión", category: "Nouns" },
  { hebrew: "יָד", translit: "yad", english: "hand", spanish: "mano", category: "Nouns" },
  { hebrew: "חַג", translit: "hag", english: "holiday / feast", spanish: "fiesta / festividad", category: "Nouns" },
  { hebrew: "חֲתֻנָּה", translit: "hatuna", english: "wedding", spanish: "boda / casamiento", category: "Nouns" },
  { hebrew: "תְּפִילָּה", translit: "tefila", english: "prayer", spanish: "rezo / oración", category: "Nouns" },
  { hebrew: "מֶרְכָּז", translit: "merkaz", english: "center", spanish: "centro", category: "Nouns" },
  { hebrew: "שְׁכוּנָה", translit: "shkhuna", english: "neighborhood", spanish: "barrio", category: "Nouns" },
  // VERBS
  { hebrew: "גָּר", translit: "gar", english: "live (reside)", spanish: "vivir / residir", category: "Verbs" },
  { hebrew: "לוֹמֵד", translit: "lomed", english: "learn / study", spanish: "aprender / estudiar", category: "Verbs" },
  { hebrew: "שָׁר", translit: "shar", english: "sing", spanish: "cantar", category: "Verbs" },
  { hebrew: "עוֹשֶׂה", translit: "ose", english: "do / make", spanish: "hacer", category: "Verbs" },
  { hebrew: "רוֹצֶה", translit: "rotse", english: "want", spanish: "querer", category: "Verbs" },
  { hebrew: "שׁוֹתֶה", translit: "shote", english: "drink", spanish: "tomar / beber", category: "Verbs" },
  { hebrew: "מְדַבֵּר", translit: "medaber", english: "talk / speak", spanish: "hablar", category: "Verbs" },
  { hebrew: "אוֹהֵב", translit: "ohev", english: "love / like", spanish: "amar / querer / gustar", category: "Verbs" },
  { hebrew: "בָּא", translit: "ba", english: "come", spanish: "venir", category: "Verbs" },
  { hebrew: "הוֹלֵך", translit: "holek", english: "walk / go", spanish: "caminar / ir", category: "Verbs" },
  { hebrew: "כּוֹתֵב", translit: "kotev", english: "write", spanish: "escribir", category: "Verbs" },
  { hebrew: "קוֹרֵא", translit: "kore", english: "read", spanish: "leer", category: "Verbs" },
  { hebrew: "יוֹדֵעַ", translit: "yode'a", english: "know", spanish: "saber", category: "Verbs" },
  { hebrew: "אוֹמֵר", translit: "omer", english: "say", spanish: "decir", category: "Verbs" },
  { hebrew: "מֵבִין", translit: "mevin", english: "understand", spanish: "entender", category: "Verbs" },
  { hebrew: "נוֹסֵעַ", translit: "nose'a", english: "travel / ride", spanish: "viajar / ir en transporte", category: "Verbs" },
  { hebrew: "עוֹבֵד", translit: "oved", english: "work", spanish: "trabajar", category: "Verbs" },
  { hebrew: "קוֹנֶה", translit: "kone", english: "buy", spanish: "comprar", category: "Verbs" },
  { hebrew: "שׁוֹמֵעַ", translit: "shome'a", english: "hear", spanish: "escuchar / oír", category: "Verbs" },
  { hebrew: "מְחַפֵּשׂ", translit: "mehapes", english: "search / look for", spanish: "buscar", category: "Verbs" },
  { hebrew: "רוֹאֶה", translit: "ro'e", english: "see", spanish: "ver", category: "Verbs" },
  { hebrew: "חוֹשֵׁב", translit: "hosher", english: "think", spanish: "pensar", category: "Verbs" },
  { hebrew: "רָץ", translit: "rats", english: "run", spanish: "correr", category: "Verbs" },
  { hebrew: "שׁוֹאֵל", translit: "sho'el", english: "ask", spanish: "preguntar", category: "Verbs" },
  { hebrew: "חוֹזֵר", translit: "hozer", english: "go back / return", spanish: "volver / regresar", category: "Verbs" },
  { hebrew: "קָם", translit: "kam", english: "get up / rise", spanish: "levantarse", category: "Verbs" },
  { hebrew: "רוֹקֵד", translit: "roked", english: "dance", spanish: "bailar", category: "Verbs" },
  { hebrew: "מְשַׁחֵק", translit: "mesaheq", english: "play", spanish: "jugar", category: "Verbs" },
  { hebrew: "מְקַבֵּל", translit: "mekabel", english: "receive", spanish: "recibir", category: "Verbs" },
  { hebrew: "מְשַׁלֵּם", translit: "meshalem", english: "pay", spanish: "pagar", category: "Verbs" },
  { hebrew: "מַזְמִין", translit: "mazmin", english: "invite", spanish: "invitar", category: "Verbs" },
  { hebrew: "מְסַבִּיר", translit: "mesabir", english: "explain", spanish: "explicar", category: "Verbs" },
  { hebrew: "מְסַפֵּר", translit: "mesaper", english: "tell / narrate", spanish: "contar / narrar", category: "Verbs" },
  { hebrew: "מַפְסִיק", translit: "mafsik", english: "stop", spanish: "parar / dejar de", category: "Verbs" },
  { hebrew: "מַצְלִיחַ", translit: "matsliah", english: "succeed", spanish: "tener éxito / lograr", category: "Verbs" },
  { hebrew: "מַרְגִּישׁ", translit: "margish", english: "feel", spanish: "sentir", category: "Verbs" },
  { hebrew: "מַתְחִיל", translit: "mathill", english: "start / begin", spanish: "empezar / comenzar", category: "Verbs" },
  { hebrew: "שׁוֹלֵחַ", translit: "sholaich", english: "send", spanish: "enviar / mandar", category: "Verbs" },
  { hebrew: "מִתְחַתֵּן", translit: "mitchaten", english: "marry", spanish: "casarse", category: "Verbs" },
  { hebrew: "מִתְפַּלֵּל", translit: "mitpalel", english: "pray", spanish: "rezar / orar", category: "Verbs" },
  { hebrew: "טָס", translit: "tas", english: "fly", spanish: "volar", category: "Verbs" },
  { hebrew: "נָח", translit: "nah", english: "rest", spanish: "descansar", category: "Verbs" },
  { hebrew: "צָם", translit: "tsam", english: "fast (abstain from food)", spanish: "ayunar", category: "Verbs" },
  { hebrew: "שׁוֹמֵר", translit: "shomer", english: "observe / keep", spanish: "guardar / observar", category: "Verbs" },
  { hebrew: "אוֹכֵל", translit: "okhel", english: "eat", spanish: "comer", category: "Verbs" },
  { hebrew: "יוֹשֵׁב", translit: "yoshev", english: "sit", spanish: "sentarse", category: "Verbs" },
  { hebrew: "עוֹלֶה", translit: "ole", english: "go up / cost", spanish: "subir / costar", category: "Verbs" },
  { hebrew: "בּוֹנֶה", translit: "bone", english: "build", spanish: "construir", category: "Verbs" },
  // ADJECTIVES
  { hebrew: "גָּדוֹל", translit: "gadol", english: "big / large (m.)", spanish: "grande (m.)", category: "Adjectives" },
  { hebrew: "קָטָן", translit: "katan", english: "small (m.)", spanish: "pequeño / chico (m.)", category: "Adjectives" },
  { hebrew: "חָדָשׁ", translit: "hadash", english: "new (m.)", spanish: "nuevo (m.)", category: "Adjectives" },
  { hebrew: "יָשָׁן", translit: "yashan", english: "old (m.)", spanish: "viejo / antiguo (m.)", category: "Adjectives" },
  { hebrew: "טוֹב", translit: "tov", english: "good (m.)", spanish: "bueno (m.)", category: "Adjectives" },
  { hebrew: "יָפֶה", translit: "yafe", english: "beautiful / pretty", spanish: "lindo / hermoso", category: "Adjectives" },
  { hebrew: "מְיֻחָד", translit: "meyukhad", english: "special (m.)", spanish: "especial (m.)", category: "Adjectives" },
  { hebrew: "מְצוּיָּן", translit: "metsuyan", english: "excellent (m.)", spanish: "excelente (m.)", category: "Adjectives" },
  { hebrew: "נֶחְמָד", translit: "nehmar", english: "nice (m.)", spanish: "simpático / agradable (m.)", category: "Adjectives" },
  { hebrew: "עַתִּיק", translit: "atik", english: "ancient (m.)", spanish: "antiguo (m.)", category: "Adjectives" },
  { hebrew: "זוֹל", translit: "zol", english: "cheap (m.)", spanish: "barato (m.)", category: "Adjectives" },
  { hebrew: "נָכוֹן", translit: "nakhon", english: "correct / right (m.)", spanish: "correcto (m.)", category: "Adjectives" },
  { hebrew: "מְעַנְיֵן", translit: "me'anyen", english: "interesting (m.)", spanish: "interesante (m.)", category: "Adjectives" },
  { hebrew: "נָעִים", translit: "na'im", english: "pleasant (m.)", spanish: "agradable (m.)", category: "Adjectives" },
  { hebrew: "קַל", translit: "kal", english: "easy / light (m.)", spanish: "fácil / liviano (m.)", category: "Adjectives" },
  { hebrew: "חַם", translit: "ham", english: "hot (m.)", spanish: "caliente (m.)", category: "Adjectives" },
  { hebrew: "קַר", translit: "kar", english: "cold (m.)", spanish: "frío (m.)", category: "Adjectives" },
  { hebrew: "קָשֶׁה", translit: "kashe", english: "hard / difficult", spanish: "difícil / duro", category: "Adjectives" },
  { hebrew: "שָׁקֵט", translit: "shaket", english: "quiet (m.)", spanish: "tranquilo / silencioso (m.)", category: "Adjectives" },
  { hebrew: "כָּחוֹל", translit: "kahol", english: "blue (m.)", spanish: "azul (m.)", category: "Adjectives" },
  { hebrew: "כָּשֵׁר", translit: "kasher", english: "kosher (m.)", spanish: "kosher (m.)", category: "Adjectives" },
  { hebrew: "בָּרִיא", translit: "bari", english: "healthy (m.)", spanish: "sano / saludable (m.)", category: "Adjectives" },
  { hebrew: "מָתוֹק", translit: "matok", english: "sweet (m.)", spanish: "dulce (m.)", category: "Adjectives" },
  { hebrew: "חָשׁוּב", translit: "hashuv", english: "important (m.)", spanish: "importante (m.)", category: "Adjectives" },
  { hebrew: "נֶהְדָּר", translit: "nehdar", english: "wonderful (m.)", spanish: "maravilloso (m.)", category: "Adjectives" },
  { hebrew: "יָקָר", translit: "yakar", english: "dear / expensive (m.)", spanish: "caro / querido (m.)", category: "Adjectives" },
  { hebrew: "עָצוּב", translit: "atsub", english: "sad (m.)", spanish: "triste (m.)", category: "Adjectives" },
  { hebrew: "שָׂמֵחַ", translit: "sameah", english: "happy (m.)", spanish: "feliz / contento (m.)", category: "Adjectives" },
  { hebrew: "קָצָר", translit: "katsar", english: "short (m.)", spanish: "corto (m.)", category: "Adjectives" },
  { hebrew: "דָּתִי", translit: "dati", english: "religious (m.)", spanish: "religioso (m.)", category: "Adjectives" },
  { hebrew: "צָעִיר", translit: "tsa'ir", english: "young (m.)", spanish: "joven (m.)", category: "Adjectives" },
  { hebrew: "שָׁחוֹר", translit: "shakhor", english: "black (m.)", spanish: "negro (m.)", category: "Adjectives" },
  { hebrew: "טָעִים", translit: "ta'im", english: "tasty / delicious (m.)", spanish: "rico / delicioso (m.)", category: "Adjectives" },
  { hebrew: "קָרוֹב", translit: "karov", english: "close / near (m.)", spanish: "cercano (m.)", category: "Adjectives" },
  // PRONOUNS
  { hebrew: "אֲנִי", translit: "ani", english: "I", spanish: "yo", category: "Pronouns" },
  { hebrew: "אַתָּה", translit: "ata", english: "you (m.s.)", spanish: "vos / tú (m.s.)", category: "Pronouns" },
  { hebrew: "אַתְּ", translit: "at", english: "you (f.s.)", spanish: "vos / tú (f.s.)", category: "Pronouns" },
  { hebrew: "הוּא", translit: "hu", english: "he", spanish: "él", category: "Pronouns" },
  { hebrew: "הִיא", translit: "hi", english: "she", spanish: "ella", category: "Pronouns" },
  { hebrew: "אֲנַחְנוּ", translit: "anahnu", english: "we", spanish: "nosotros", category: "Pronouns" },
  { hebrew: "אַתֶּם", translit: "atem", english: "you (m.pl.)", spanish: "ustedes (m.pl.)", category: "Pronouns" },
  { hebrew: "אַתֶּן", translit: "aten", english: "you (f.pl.)", spanish: "ustedes (f.pl.)", category: "Pronouns" },
  { hebrew: "הֵם", translit: "hem", english: "they (m.)", spanish: "ellos", category: "Pronouns" },
  { hebrew: "הֵן", translit: "hen", english: "they (f.)", spanish: "ellas", category: "Pronouns" },
  // QUESTION WORDS
  { hebrew: "מָה?", translit: "ma?", english: "what?", spanish: "¿qué?", category: "Questions" },
  { hebrew: "מִי?", translit: "mi?", english: "who?", spanish: "¿quién?", category: "Questions" },
  { hebrew: "אֵיפֹה?", translit: "eifo?", english: "where?", spanish: "¿dónde?", category: "Questions" },
  { hebrew: "מֵאַיִן?", translit: "me'ayin?", english: "where from?", spanish: "¿de dónde?", category: "Questions" },
  { hebrew: "לְאָן?", translit: "le'an?", english: "where to?", spanish: "¿adónde?", category: "Questions" },
  { hebrew: "אֵיךְ?", translit: "ekh?", english: "how?", spanish: "¿cómo?", category: "Questions" },
  { hebrew: "כַּמָּה?", translit: "kama?", english: "how many? / how much?", spanish: "¿cuánto? / ¿cuántos?", category: "Questions" },
  { hebrew: "מָתַי?", translit: "matay?", english: "when?", spanish: "¿cuándo?", category: "Questions" },
  { hebrew: "לָמָה?", translit: "lama?", english: "why?", spanish: "¿por qué?", category: "Questions" },
  // EXPRESSIONS
  { hebrew: "שָׁלוֹם", translit: "shalom", english: "hello / goodbye / peace", spanish: "hola / chau / paz", category: "Expressions" },
  { hebrew: "תּוֹדָה", translit: "toda", english: "thank you", spanish: "gracias", category: "Expressions" },
  { hebrew: "בְּבַקָּשָׁה", translit: "bevakasha", english: "please / you're welcome", spanish: "por favor / de nada", category: "Expressions" },
  { hebrew: "סְלִיחָה", translit: "sliha", english: "excuse me / sorry", spanish: "disculpe / perdón", category: "Expressions" },
  { hebrew: "בְּסֵדֶר", translit: "beseder", english: "OK / alright", spanish: "bien / de acuerdo", category: "Expressions" },
  { hebrew: "לְהִתְרָאוֹת", translit: "lehitraot", english: "see you / goodbye", spanish: "hasta luego / chau", category: "Expressions" },
  { hebrew: "מַה נִשְׁמָע?", translit: "ma nishma?", english: "what's up?", spanish: "¿qué hay? / ¿cómo andás?", category: "Expressions" },
  { hebrew: "נָעִים מְאֹד", translit: "na'im me'od", english: "nice to meet you", spanish: "mucho gusto", category: "Expressions" },
  { hebrew: "בְּהַצְלָחָה", translit: "behatslacha", english: "good luck!", spanish: "¡buena suerte!", category: "Expressions" },
  { hebrew: "מַזָּל טוֹב", translit: "mazal tov", english: "congratulations!", spanish: "¡felicitaciones!", category: "Expressions" },
  { hebrew: "אֵין דָּבָר", translit: "ein davar", english: "never mind / no problem", spanish: "no importa / no hay problema", category: "Expressions" },
  { hebrew: "יֵשׁ", translit: "yesh", english: "there is / there are", spanish: "hay", category: "Expressions" },
  { hebrew: "אֵין", translit: "ein", english: "there isn't / there aren't", spanish: "no hay", category: "Expressions" },
  { hebrew: "כֵּן", translit: "ken", english: "yes", spanish: "sí", category: "Expressions" },
  { hebrew: "לֹא", translit: "lo", english: "no / not", spanish: "no", category: "Expressions" },
  { hebrew: "בּוֹקֶר טוֹב", translit: "boker tov", english: "good morning", spanish: "buenos días", category: "Expressions" },
  { hebrew: "עֶרֶב טוֹב", translit: "erev tov", english: "good evening", spanish: "buenas tardes / noches", category: "Expressions" },
];

const CATEGORIES = ["All", "Nouns", "Verbs", "Adjectives", "Pronouns", "Questions", "Expressions"];

const CAT_COLORS = {
  Nouns:       { bg: "#1e3a5f", light: "#d0e8ff" },
  Verbs:       { bg: "#1a4731", light: "#c8f0d8" },
  Adjectives:  { bg: "#4a1060", light: "#ecd5fa" },
  Pronouns:    { bg: "#7a2e0a", light: "#fde8d0" },
  Questions:   { bg: "#5c3a00", light: "#fdf0cc" },
  Expressions: { bg: "#1a3a4a", light: "#cceeff" },
  All:         { bg: "#1a1a2e", light: "#e8e8f8" },
};

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const T = {
  en: {
    title: "Hebrew Flashcards",
    categories: { All: "All", Nouns: "Nouns", Verbs: "Verbs", Adjectives: "Adjectives", Pronouns: "Pronouns", Questions: "Questions", Expressions: "Expressions" },
    cardCategory: { Nouns: "Noun", Verbs: "Verb", Adjectives: "Adjective", Pronouns: "Pronoun", Questions: "Question word", Expressions: "Expression" },
    known: "known",
    learning: "learning",
    reset: "reset",
    resetTitle: "Reset all progress",
    showTranslit: "Show transliteration",
    showNiqqud: "Show niqqud",
    studyMarked: (n) => `Study marked only (${n})`,
    tapReveal: "tap to reveal · space/enter",
    translation: "translation",
    revealBtn: "Reveal answer",
    stillLearning: "↺ Still learning",
    keepInDeck: "keep in deck",
    gotIt: "✓ Got it!",
    removeFromDeck: "remove from deck",
    arrowLeft: "← arrow",
    arrowRight: "→ arrow",
    deckComplete: "Deck complete!",
    knownStill: (k, l) => `${k} known · ${l} still learning`,
    shuffleRestart: "Shuffle & restart",
    practiceMarked: (n) => `Practice ${n} marked`,
    legend: "Space/Enter = flip · ← still learning · → got it",
    progress: (i, total) => `${i} / ${total}`,
  },
  es: {
    title: "Flashcards de Hebreo",
    categories: { All: "Todo", Nouns: "Sustantivos", Verbs: "Verbos", Adjectives: "Adjetivos", Pronouns: "Pronombres", Questions: "Preguntas", Expressions: "Expresiones" },
    cardCategory: { Nouns: "Sustantivo", Verbs: "Verbo", Adjectives: "Adjetivo", Pronouns: "Pronombre", Questions: "Pregunta", Expressions: "Expresión" },
    known: "sabidas",
    learning: "por aprender",
    reset: "reiniciar",
    resetTitle: "Reiniciar todo el progreso",
    showTranslit: "Mostrar transliteración",
    showNiqqud: "Mostrar niqqud",
    studyMarked: (n) => `Solo marcadas (${n})`,
    tapReveal: "tocá para revelar · espacio/enter",
    translation: "traducción",
    revealBtn: "Revelar respuesta",
    stillLearning: "↺ Todavía aprendiendo",
    keepInDeck: "quedar en el mazo",
    gotIt: "✓ ¡Ya sé!",
    removeFromDeck: "sacar del mazo",
    arrowLeft: "← flecha",
    arrowRight: "→ flecha",
    deckComplete: "¡Mazo completo!",
    knownStill: (k, l) => `${k} sabidas · ${l} por aprender`,
    shuffleRestart: "Mezclar y reiniciar",
    practiceMarked: (n) => `Practicar ${n} marcadas`,
    legend: "Espacio/Enter = voltear · ← todavía aprendiendo · → ya sé",
    progress: (i, total) => `${i} / ${total}`,
  },
};

export default function HebrewFlashcards() {
  const [category, setCategory] = useState("All");
  const [deck, setDeck] = useState([]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [cardVisible, setCardVisible] = useState(true);
  const [animating, setAnimating] = useState(false);
  const [known, setKnown] = useState(new Set());
  const [learning, setLearning] = useState(new Set());
  const [showTranslit, setShowTranslit] = useState(false);
  const [showNiqqud, setShowNiqqud] = useState(false);
  const [onlyLearning, setOnlyLearning] = useState(false);
  const [finished, setFinished] = useState(false);
  const [lang, setLang] = useState("en");
  const [backVisible, setBackVisible] = useState(false);
  const [showCard, setShowCard] = useState(true);
  const t = T[lang];

  function stripNiqqud(str) {
    return str.replace(/[\u05B0-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7]/g, "");
  }
  function displayHebrew(str) { return showNiqqud ? str : stripNiqqud(str); }

  const buildDeck = useCallback(() => {
    let base = category === "All" ? ALL_WORDS : ALL_WORDS.filter(w => w.category === category);
    if (onlyLearning) base = base.filter(w => learning.has(w.hebrew));
    if (base.length === 0) base = category === "All" ? ALL_WORDS : ALL_WORDS.filter(w => w.category === category);
    setDeck(shuffle(base));
    setIndex(0);
    setFlipped(false);
    setFinished(false);
  }, [category, onlyLearning, learning]);

  useEffect(() => { buildDeck(); }, [category, onlyLearning]);

  const card = deck[index];
  const catColor = card ? CAT_COLORS[card.category] || CAT_COLORS.All : CAT_COLORS.All;
  const progress = deck.length > 0 ? ((index) / deck.length) * 100 : 0;

  function next() {
    setCardVisible(false);
    setBackVisible(false);
    setShowCard(false)
    setTimeout(() => {
      if (index + 1 >= deck.length) { setFinished(true); return; }
      setIndex(i => i + 1);
      setFlipped(false);
      setAnimating(false);
      setCardVisible(true);
      setShowCard(true)
    }, 1);
  }

  function markKnown() {
    setKnown(s => new Set([...s, card.hebrew]));
    setLearning(s => { const n = new Set(s); n.delete(card.hebrew); return n; });
    next();
  }

  function markLearning() {
    setLearning(s => new Set([...s, card.hebrew]));
    setKnown(s => { const n = new Set(s); n.delete(card.hebrew); return n; });
    next();
  }

  function restart() { buildDeck(); setFinished(false); setCardVisible(true); setAnimating(false); }

  useEffect(() => {
    if (flipped) {
      const timer = setTimeout(() => setBackVisible(true), 0);
      return () => clearTimeout(timer);
    } else {
      setBackVisible(false);
    }
  }, [flipped]);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === " " || e.key === "Enter") { e.preventDefault(); setFlipped(f => !f); }
      if (e.key === "ArrowRight" && flipped) markKnown();
      if (e.key === "ArrowLeft" && flipped) markLearning();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [flipped, card]);

  const knownCount = known.size;
  const learningCount = learning.size;

  return (
    <div style={{
      height: "100vh",
      background: "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%)",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      color: "#e8e8f0",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "20px 16px",
    }}>
      {/* Header */}
      <div style={{ width: "100%", maxWidth: 600, marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: 1 }}>
            <span style={{ color: "#7eb8f7" }}>עברית</span>
            <span style={{ color: "#aaa", fontSize: 13, marginLeft: 10, fontWeight: 400 }}>{t.title}</span>
          </h1>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center", fontSize: 13 }}>
            {/* Pill language toggle */}
            <div style={{
              display: "flex", borderRadius: 20, overflow: "hidden",
              border: "1px solid #444", fontSize: 12,
            }}>
              {["es", "en"].map((l) => (
                <button key={l} onClick={() => setLang(l)} style={{
                  padding: "4px 12px", border: "none", cursor: "pointer", fontWeight: 700,
                  background: lang === l ? "#7eb8f7" : "#2a2a4a",
                  color: lang === l ? "#0f0f1a" : "#666",
                  transition: "all 0.2s",
                }}>
                  {l === "es" ? "ESP" : "ENG"}
                </button>
              ))}
            </div>
            <span style={{ color: "#4ade80" }}>✓ {knownCount} <span style={{ color: "#555", fontWeight: 400 }}>{t.known}</span></span>
            <span style={{ color: "#f97316" }}>↺ {learningCount} <span style={{ color: "#555", fontWeight: 400 }}>{t.learning}</span></span>
            {(knownCount > 0 || learningCount > 0) && (
              <button
                onClick={() => { setKnown(new Set()); setLearning(new Set()); setOnlyLearning(false); buildDeck(); }}
                title={t.resetTitle}
                style={{
                  background: "none", border: "1px solid #444", borderRadius: 8,
                  color: "#666", cursor: "pointer", fontSize: 11, padding: "3px 8px",
                }}
              >{t.reset}</button>
            )}
          </div>
        </div>

        {/* Category selector */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setCategory(cat)} style={{
              padding: "5px 12px", borderRadius: 20, border: "none", cursor: "pointer", fontSize: 12,
              background: category === cat ? "#7eb8f7" : "#2a2a4a",
              color: category === cat ? "#0f0f1a" : "#aaa",
              fontWeight: category === cat ? 700 : 400,
              transition: "all 0.2s",
            }}>{t.categories[cat]}</button>
          ))}
        </div>

        {/* Options row */}
        <div style={{ display: "flex", gap: 16, alignItems: "center", fontSize: 13, flexWrap: "wrap" }}>
          <label style={{ display: "flex", gap: 6, alignItems: "center", cursor: "pointer", color: "#aaa" }}>
            <input type="checkbox" checked={showTranslit} onChange={e => setShowTranslit(e.target.checked)}
              style={{ accentColor: "#7eb8f7" }} />
            {t.showTranslit}
          </label>
          <label style={{ display: "flex", gap: 6, alignItems: "center", cursor: "pointer", color: "#aaa" }}>
            <input type="checkbox" checked={showNiqqud} onChange={e => setShowNiqqud(e.target.checked)}
              style={{ accentColor: "#7eb8f7" }} />
            {t.showNiqqud}
          </label>
          {learningCount > 0 && (
            <label style={{ display: "flex", gap: 6, alignItems: "center", cursor: "pointer", color: "#f97316" }}>
              <input type="checkbox" checked={onlyLearning} onChange={e => setOnlyLearning(e.target.checked)}
                style={{ accentColor: "#f97316" }} />
              {t.studyMarked(learningCount)}
            </label>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ width: "100%", maxWidth: 600, marginBottom: 20 }}>
        <div style={{ height: 4, background: "#2a2a4a", borderRadius: 2, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg, #7eb8f7, #a78bfa)", transition: "width 0.4s ease", borderRadius: 2 }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4, fontSize: 12, color: "#666" }}>
          <span>{index} / {deck.length}</span>
          <span>{deck.length > 0 ? Math.round(progress) : 0}%</span>
        </div>
      </div>

      {/* Card */}
      {finished ? (
        <div style={{
          width: "100%", maxWidth: 600, background: "#1a2a1a", border: "1px solid #4ade80",
          borderRadius: 20, padding: 40, textAlign: "center",
        }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
          <h2 style={{ color: "#4ade80", margin: "0 0 8px" }}>{t.deckComplete}</h2>
          <p style={{ color: "#aaa", margin: "0 0 24px" }}>
            {t.knownStill(knownCount, learningCount)}
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <button onClick={restart} style={btnStyle("#7eb8f7", "#0f0f1a")}>{t.shuffleRestart}</button>
            {learningCount > 0 && (
              <button onClick={() => { setOnlyLearning(true); restart(); }} style={btnStyle("#f97316", "#0f0f1a")}>
                {t.practiceMarked(learningCount)}
              </button>
            )}
          </div>
        </div>
      ) : card && showCard ? (
        <div style={{ width: "100%", maxWidth: 600, perspective: 1000 }}>
          <div
            onClick={() => setFlipped(f => !f)}
            style={{
              position: "relative", height: 260, cursor: "pointer",
              transformStyle: "preserve-3d", WebkitTransformStyle: "preserve-3d",
              transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
              transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1)",
              opacity: cardVisible ? 1 : 0,
            }}
          >
            {/* Front */}
            <div style={{
              position: "absolute", inset: 0,
              backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
              background: `linear-gradient(145deg, ${catColor.bg}, #0f0f1a)`,
              border: `1px solid ${catColor.light}30`,
              borderRadius: 20, display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", padding: 32,
              boxShadow: `0 20px 60px ${catColor.bg}80`,
            }}>
              <div style={{ fontSize: 11, letterSpacing: 2, color: catColor.light, opacity: 0.7, marginBottom: 16, textTransform: "uppercase" }}>
                {t.cardCategory[card.category] || card.category}
              </div>
              <div style={{
                fontSize: 64, fontWeight: 700, lineHeight: 1.1, textAlign: "center",
                color: "#ffffff", direction: "rtl", marginBottom: showTranslit ? 12 : 0,
              }}>
                {displayHebrew(card.hebrew)}
              </div>
              {showTranslit && (
                <div style={{ fontSize: 18, color: catColor.light, opacity: 0.8, fontStyle: "italic" }}>
                  {card.translit}
                </div>
              )}
              <div style={{ position: "absolute", bottom: 20, fontSize: 12, color: "#666" }}>
                {t.tapReveal}
              </div>
            </div>

            {/* Back */}
            <div style={{
              position: "absolute", inset: 0,
              backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              background: `linear-gradient(145deg, #0f1a0f, #1a2a1a)`,
              border: "1px solid #4ade8040",
              borderRadius: 20, display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", padding: 32,
              boxShadow: "0 20px 60px #4ade8020",
              opacity: backVisible ? 1 : 0,
              transition: "opacity 0.15s ease",
            }}>
              <div style={{ fontSize: 11, letterSpacing: 2, color: "#4ade80", opacity: 0.7, marginBottom: 12, textTransform: "uppercase" }}>
                {t.cardCategory[card.category] || card.category} · {t.translation}
              </div>
              <div style={{ fontSize: 36, fontWeight: 700, textAlign: "center", color: "#fff", marginBottom: 8 }}>
                {lang === "es" ? card.spanish : card.english}
              </div>
              <div style={{ fontSize: 20, color: "#aaa", direction: "rtl", marginBottom: 4 }}>{displayHebrew(card.hebrew)}</div>
              <div style={{ fontSize: 15, color: "#7eb8f7", fontStyle: "italic" }}>{card.translit}</div>
            </div>
          </div>

          {/* Action buttons */}
          {flipped && (
            <div style={{ display: "flex", gap: 12, marginTop: 20, justifyContent: "center" }}>
              <button onClick={markLearning} style={{
                ...btnStyle("#f97316", "#fff"), flex: 1, maxWidth: 200,
              }}>
                {t.stillLearning}
                <span style={{ display: "block", fontSize: 10, opacity: 0.7, marginTop: 2 }}>{t.keepInDeck}</span>
                <span style={{ display: "block", fontSize: 10, opacity: 0.5, marginTop: 1 }}>{t.arrowLeft}</span>
              </button>
              <button onClick={markKnown} style={{
                ...btnStyle("#4ade80", "#0f0f1a"), flex: 1, maxWidth: 200,
              }}>
                {t.gotIt}
                <span style={{ display: "block", fontSize: 10, opacity: 0.7, marginTop: 2 }}>{t.removeFromDeck}</span>
                <span style={{ display: "block", fontSize: 10, opacity: 0.5, marginTop: 1 }}>{t.arrowRight}</span>
              </button>
            </div>
          )}

          {!flipped && (
            <div style={{ textAlign: "center", marginTop: 16 }}>
              <button onClick={() => setFlipped(true)} style={btnStyle("#7eb8f7", "#0f0f1a")}>
                {t.revealBtn}
              </button>
            </div>
          )}
        </div>
      ) : null}

      {/* Legend */}
      <div style={{ marginTop: 32, fontSize: 12, color: "#444", textAlign: "center" }}>
        <span>{t.legend}</span>
      </div>
      <Analytics />
    </div>
  );
}

function btnStyle(bg, color) {
  return {
    background: bg, color, border: "none", borderRadius: 12,
    padding: "12px 24px", cursor: "pointer", fontWeight: 700,
    fontSize: 14, transition: "opacity 0.2s", lineHeight: 1.2,
  };
}
