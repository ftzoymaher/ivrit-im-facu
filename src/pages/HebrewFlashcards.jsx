import { useState, useEffect, useCallback } from "react";

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
  // Nuevo (cap. 23-28)
  // Chapter 23
  { hebrew: "אוֹת / אוֹתִיּוֹת", translit: "ot/otiyot", english: "letter (of alphabet)", spanish: "letra (del alfabeto)", category: "Nouns" },
  { hebrew: "בֵּן / בָּנִים", translit: "ben/banim", english: "son / boy", spanish: "hijo / chico", category: "Nouns" },
  { hebrew: "בַּת / בָּנוֹת", translit: "bat/banot", english: "daughter / girl", spanish: "hija / chica", category: "Nouns" },
  { hebrew: "בְּרָכָה", translit: "bracha", english: "blessing", spanish: "bendición", category: "Nouns" },
  { hebrew: "זוּג / זוּגוֹת", translit: "zug/zugot", english: "couple / pair", spanish: "pareja", category: "Nouns" },
  { hebrew: "חוֹפֶשׁ", translit: "hofesh", english: "freedom / vacation", spanish: "libertad / vacaciones", category: "Nouns" },
  { hebrew: "טַבַּעַת", translit: "taba'at", english: "ring", spanish: "anillo", category: "Nouns" },
  { hebrew: "טֶקֶס / טְקָסִים", translit: "tekes/tekasim", english: "ceremony", spanish: "ceremonia", category: "Nouns" },
  { hebrew: "כְּתוּבָּה", translit: "ketuba", english: "marriage contract", spanish: "contrato matrimonial", category: "Nouns" },
  { hebrew: "מַזָּל / מַזָּלוֹת", translit: "mazal/mazalot", english: "luck / sign of the zodiac", spanish: "suerte / signo del zodíaco", category: "Nouns" },
  { hebrew: "מְכוֹנִית", translit: "mechonit", english: "car", spanish: "auto / coche", category: "Nouns" },
  { hebrew: "מִנְהָג", translit: "minhag", english: "custom", spanish: "costumbre", category: "Nouns" },
  { hebrew: "מִשְׂחָק", translit: "mis'hak", english: "game", spanish: "juego", category: "Nouns" },
  { hebrew: "נַעַל / נַעֲלַיִם", translit: "na'al/na'alayim", english: "shoe", spanish: "zapato", category: "Nouns" },
  { hebrew: "חִינָּה", translit: "hina", english: "henna (henna party)", spanish: "henna", category: "Nouns" },
  { hebrew: "קוֹקְטֵיל", translit: "kokteil", english: "cocktail", spanish: "cóctel", category: "Nouns" },
  { hebrew: "שַׁמְפָּנְיָה", translit: "shampanya", english: "champagne", spanish: "champán", category: "Nouns" },
  { hebrew: "תֵּאוֹרְיָה", translit: "te'oriya", english: "theory", spanish: "teoría", category: "Nouns" },
  // Chapter 24
  { hebrew: "אֹזֶן / אוֹזְנַיִם", translit: "ozen/oznayim", english: "ear", spanish: "oreja", category: "Nouns" },
  { hebrew: "אַף", translit: "af", english: "nose", spanish: "nariz", category: "Nouns" },
  { hebrew: "בֶּטֶן", translit: "beten", english: "stomach / tummy", spanish: "panza / estómago", category: "Nouns" },
  { hebrew: "גַּב", translit: "gav", english: "back", spanish: "espalda", category: "Nouns" },
  { hebrew: "גּוּף", translit: "guf", english: "body", spanish: "cuerpo", category: "Nouns" },
  { hebrew: "לֵב / לְבָבוֹת", translit: "lev/levavot", english: "heart", spanish: "corazón", category: "Nouns" },
  { hebrew: "עַיִן / עֵינַיִם", translit: "ayin/einayim", english: "eye", spanish: "ojo", category: "Nouns" },
  { hebrew: "פֶּה / פִּיּוֹת", translit: "pe/piyot", english: "mouth", spanish: "boca", category: "Nouns" },
  { hebrew: "צַוָּאר", translit: "tsavar", english: "neck", spanish: "cuello", category: "Nouns" },
  { hebrew: "רֹאשׁ", translit: "rosh", english: "head", spanish: "cabeza", category: "Nouns" },
  { hebrew: "רֶגֶל / רַגְלַיִם", translit: "regel/raglaym", english: "leg / foot", spanish: "pierna / pie", category: "Nouns" },
  { hebrew: "שֵׁן / שִׁינַּיִם", translit: "shen/shinayim", english: "tooth", spanish: "diente", category: "Nouns" },
  { hebrew: "שֵׂעָר / שְׂעָרוֹת", translit: "se'ar/se'arot", english: "hair", spanish: "cabello / pelo", category: "Nouns" },
  { hebrew: "שַׁרְשֶׁרֶת", translit: "sharsheret", english: "chain / necklace", spanish: "cadena / collar", category: "Nouns" },
  { hebrew: "יוֹמָן", translit: "yoman", english: "diary / log book", spanish: "diario", category: "Nouns" },
  { hebrew: "זְאֵב / זְאֵבָה", translit: "ze'ev/ze'eva", english: "wolf", spanish: "lobo", category: "Nouns" },
  { hebrew: "סֵמֶל", translit: "semel", english: "symbol", spanish: "símbolo", category: "Nouns" },
  { hebrew: "עִיגּוּל", translit: "igul", english: "circle", spanish: "círculo", category: "Nouns" },
  { hebrew: "צָרָה", translit: "tsara", english: "trouble / misfortune", spanish: "problema / desgracia", category: "Nouns" },
  { hebrew: "קַו / קַוִּים", translit: "kav/kavim", english: "line", spanish: "línea", category: "Nouns" },
  { hebrew: "סִימֶטְרִיָּה", translit: "simetriya", english: "symmetry", spanish: "simetría", category: "Nouns" },
  // Chapter 25
  { hebrew: "אָבִיב", translit: "aviv", english: "spring", spanish: "primavera", category: "Nouns" },
  { hebrew: "אֲדָמָה", translit: "adama", english: "earth / ground / land", spanish: "tierra", category: "Nouns" },
  { hebrew: "אֵשׁ", translit: "esh", english: "fire", spanish: "fuego", category: "Nouns" },
  { hebrew: "נֵר / נֵרוֹת", translit: "ner/nerot", english: "candle", spanish: "vela", category: "Nouns" },
  { hebrew: "סוֹף", translit: "sof", english: "end", spanish: "fin", category: "Nouns" },
  { hebrew: "עוֹנָה", translit: "ona", english: "season", spanish: "estación (del año)", category: "Nouns" },
  { hebrew: "צֶבַע / צְבָעִים", translit: "tseva/tsva'im", english: "color", spanish: "color", category: "Nouns" },
  { hebrew: "סְתָיו", translit: "stav", english: "autumn", spanish: "otoño", category: "Nouns" },
  { hebrew: "רַוָּק / רַוָּקָה", translit: "ravak/ravaka", english: "single man / woman", spanish: "soltero/a", category: "Nouns" },
  { hebrew: "רוֹפֵא / רוֹפְאָה", translit: "rofe/rofe'a", english: "doctor (physician)", spanish: "médico/a", category: "Nouns" },
  { hebrew: "דִּילֶמָּה", translit: "dilema", english: "dilemma", spanish: "dilema", category: "Nouns" },
  { hebrew: "טֶמְפֶּרָטוּרָה", translit: "temperatura", english: "temperature", spanish: "temperatura", category: "Nouns" },
  { hebrew: "טַקְסִי", translit: "taksi", english: "taxi", spanish: "taxi", category: "Nouns" },
  // Chapter 26
  { hebrew: "אוֹצָר / אוֹצָרוֹת", translit: "otsar/otsarot", english: "treasure", spanish: "tesoro", category: "Nouns" },
  { hebrew: "אוֹר / אוֹרוֹת", translit: "or/orot", english: "light", spanish: "luz", category: "Nouns" },
  { hebrew: "בֵּית הַמִּקְדָּשׁ", translit: "beit hamikdash", english: "The Temple", spanish: "El Templo", category: "Nouns" },
  { hebrew: "זָהָב", translit: "zahav", english: "gold", spanish: "oro", category: "Nouns" },
  { hebrew: "חוֹף", translit: "khof", english: "beach / shore", spanish: "playa / orilla", category: "Nouns" },
  { hebrew: "מְגִילָּה", translit: "megila", english: "scroll", spanish: "rollo / pergamino", category: "Nouns" },
  { hebrew: "מְעָרָה", translit: "me'ara", english: "cave", spanish: "cueva", category: "Nouns" },
  { hebrew: "חֹשֶׁךְ", translit: "khoshekh", english: "darkness", spanish: "oscuridad", category: "Nouns" },
  { hebrew: "נְחֹשֶׁת", translit: "nekhoshet", english: "copper", spanish: "cobre", category: "Nouns" },
  { hebrew: "פְּגִישָׁה / פְּגִישׁוֹת", translit: "pgisha/pgishut", english: "meeting", spanish: "reunión", category: "Nouns" },
  { hebrew: "פַּנְטַזְיָה", translit: "fantazya", english: "fantasy", spanish: "fantasía", category: "Nouns" },
  { hebrew: "קוֹמוּנָה", translit: "komuna", english: "commune", spanish: "comuna", category: "Nouns" },
  { hebrew: "הִיסְטוֹרְיוֹן / הִיסְטוֹרְיוֹנִית", translit: "historyon/historyonit", english: "historian", spanish: "historiador/a", category: "Nouns" },
  { hebrew: "נוֹצְרִי / נוֹצְרִיָּה", translit: "notsri/notsriya", english: "Christian", spanish: "cristiano/a", category: "Nouns" },
  { hebrew: "אִינְפוֹרְמַצְיָה", translit: "informatsiya", english: "information", spanish: "información", category: "Nouns" },
  // Chapter 27
  { hebrew: "אוֹרֵחַ / אוֹרַחַת", translit: "ore'akh/orakhat", english: "guest", spanish: "invitado/a", category: "Nouns" },
  { hebrew: "אָח / אָחוֹת", translit: "akh/akhot", english: "brother / sister", spanish: "hermano / hermana", category: "Nouns" },
  { hebrew: "חוֹלְצָה", translit: "khultsa", english: "shirt", spanish: "camisa / remera", category: "Nouns" },
  { hebrew: "יָדִיד / יְדִידָה", translit: "yadid/ydida", english: "friend", spanish: "amigo/a", category: "Nouns" },
  { hebrew: "כְּלִי / כֵּלִים", translit: "kli/kelim", english: "dish / instrument", spanish: "plato / instrumento", category: "Nouns" },
  { hebrew: "לִימּוּדִים", translit: "limudim", english: "studies", spanish: "estudios", category: "Nouns" },
  { hebrew: "מְלָפְפוֹן", translit: "melafefon", english: "cucumber", spanish: "pepino", category: "Nouns" },
  { hebrew: "מָרָק", translit: "marak", english: "soup", spanish: "sopa", category: "Nouns" },
  { hebrew: "סָבָא / סָבְתָא", translit: "saba/savta", english: "grandfather / grandmother", spanish: "abuelo / abuela", category: "Nouns" },
  { hebrew: "צַלַּחַת", translit: "tsalakhat", english: "plate", spanish: "plato", category: "Nouns" },
  { hebrew: "תַּפּוּחַ אֲדָמָה / תַּפּוּחֵי אֲדָמָה", translit: "tapuach adama", english: "potato", spanish: "papa / patata", category: "Nouns" },
  { hebrew: "בַּמַּאי / בַּמַּאִית", translit: "bamai/bamait", english: "director", spanish: "director/a", category: "Nouns" },
  { hebrew: "בָּשָׂר", translit: "basar", english: "meat", spanish: "carne", category: "Nouns" },
  { hebrew: "יוֹגוּרְט", translit: "yogurt", english: "yogurt", spanish: "yogur", category: "Nouns" },
  { hebrew: "פּוּרִים", translit: "purim", english: "Purim (holiday)", spanish: "Purim (festividad)", category: "Nouns" },
  { hebrew: "שָׁעָתַיִם", translit: "sha'atayim", english: "two hours", spanish: "dos horas", category: "Nouns" },
  // Chapter 28
  { hebrew: "אַרְיֵה / אֲרָיוֹת", translit: "arye/arayot", english: "lion", spanish: "león", category: "Nouns" },
  { hebrew: "בָּצָל / בְּצָלִים", translit: "batsak/btsalim", english: "onion", spanish: "cebolla", category: "Nouns" },
  { hebrew: "גֶּזֶר / גְּזָרִים", translit: "gezer/gzarim", english: "carrot", spanish: "zanahoria", category: "Nouns" },
  { hebrew: "גַּן חַיּוֹת", translit: "gan khayot", english: "zoo", spanish: "zoológico", category: "Nouns" },
  { hebrew: "חַיָּה", translit: "khaya", english: "animal", spanish: "animal", category: "Nouns" },
  { hebrew: "סַבְלָנוּת", translit: "savlanut", english: "patience", spanish: "paciencia", category: "Nouns" },
  { hebrew: "פִּלְפֵּל", translit: "pilpel", english: "pepper", spanish: "pimiento", category: "Nouns" },
  { hebrew: "צֶמַח / צְמָחִים", translit: "tsemakh/tsemakhim", english: "plant", spanish: "planta", category: "Nouns" },
  { hebrew: "קְבוּצָה", translit: "kvutsa", english: "group", spanish: "grupo", category: "Nouns" },
  { hebrew: "קוֹף", translit: "kof", english: "monkey", spanish: "mono", category: "Nouns" },
  { hebrew: "קֶמַח", translit: "kemakh", english: "flour", spanish: "harina", category: "Nouns" },
  { hebrew: "קֶשֶׁר / קְשָׁרִים", translit: "kesher/ksharim", english: "connection / tie", spanish: "conexión / vínculo", category: "Nouns" },
  { hebrew: "שָׁכֵן / שְׁכֵנָה", translit: "shakhen/shkhena", english: "neighbor", spanish: "vecino/a", category: "Nouns" },
  { hebrew: "שֶׁמֶן / שְׁמָנִים", translit: "shemen/shmanim", english: "oil", spanish: "aceite", category: "Nouns" },
  { hebrew: "שַׁעַר / שְׁעָרִים", translit: "sha'ar/she'arim", english: "gate", spanish: "puerta / portón", category: "Nouns" },
  { hebrew: "שִׁימְפַּנְזֶה", translit: "shimpanze", english: "chimpanzee", spanish: "chimpancé", category: "Nouns" },
  { hebrew: "תּוֹכְנִית / תָּכְנִיּוֹת", translit: "tokhnit/takhniyot", english: "program / plan", spanish: "programa / plan", category: "Nouns" },
  { hebrew: "גִּ'יְרָפָה", translit: "jirafa", english: "giraffe", spanish: "jirafa", category: "Nouns" },
  { hebrew: "הִיפּוֹפּוֹטָם", translit: "hipopotam", english: "hippopotamus", spanish: "hipopótamo", category: "Nouns" },
  { hebrew: "זֶבְּרָה", translit: "zebra", english: "zebra", spanish: "cebra", category: "Nouns" },
  { hebrew: "חוֹקֵר / חוֹקֶרֶת", translit: "khoker/khokeret", english: "researcher", spanish: "investigador/a", category: "Nouns" },
  { hebrew: "גִּיטָרָה", translit: "gitara", english: "guitar", spanish: "guitarra", category: "Nouns" },
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
  // Nuevo (cap. 23-28)
  // Chapter 23
  { hebrew: "מְבָרֵך / לְבָרֵך", translit: "mevarech/levarech", english: "bless", spanish: "bendecir", category: "Verbs" },
  { hebrew: "מְקַדֵּשׁ / לְקַדֵּשׁ", translit: "mekadesh/lekadesh", english: "bless / sanctify", spanish: "santificar", category: "Verbs" },
  { hebrew: "נוֹעֵל / לִנְעֹל", translit: "no'el/lin'ol", english: "wear shoes", spanish: "calzarse", category: "Verbs" },
  { hebrew: "נוֹפֵל / לִיפֹּל", translit: "nofel/lipol", english: "fall", spanish: "caer", category: "Verbs" },
  { hebrew: "נוֹתֵן / לָתֵת", translit: "noten/latet", english: "give", spanish: "dar", category: "Verbs" },
  { hebrew: "עוֹמֵד / לַעֲמֹד", translit: "omed/la'amod", english: "stand", spanish: "pararse", category: "Verbs" },
  { hebrew: "קוֹרֵא / לִקְרֹא", translit: "kore/likro", english: "call", spanish: "llamar", category: "Verbs" },
  // Chapter 24
  { hebrew: "לוֹקֵחַ / לָקַחַת", translit: "lokeiach/lakachat", english: "take", spanish: "tomar", category: "Verbs" },
  { hebrew: "מְצַיֵּר / לְצַיֵּר", translit: "metsayer/letsayer", english: "draw", spanish: "dibujar", category: "Verbs" },
  { hebrew: "עוֹנֶה / לַעֲנוֹת", translit: "one/la'anot", english: "answer", spanish: "responder", category: "Verbs" },
  { hebrew: "פּוֹחֵד / לִפְחֹד", translit: "poched/lifkhod", english: "be afraid / fear", spanish: "tener miedo", category: "Verbs" },
  // Chapter 25
  { hebrew: "בּוֹחֵר / לִבְחֹר", translit: "bokher/livkhor", english: "choose", spanish: "elegir", category: "Verbs" },
  { hebrew: "מִתְאַיֵּם / לְהִתְאַיֵּם", translit: "mita'em/lehita'em", english: "fit / be appropriate", spanish: "ser apropiado", category: "Verbs" },
  // Chapter 26
  { hebrew: "חוֹקֵר / לַחֲקֹר", translit: "khoker/lakhkor", english: "research", spanish: "investigar", category: "Verbs" },
  { hebrew: "כּוֹעֵס / לִכְעֹס", translit: "ko'es/likhes", english: "be angry", spanish: "enojarse", category: "Verbs" },
  { hebrew: "מוֹצֵא / לִמְצֹא", translit: "motse/limtso", english: "find / discover", spanish: "encontrar", category: "Verbs" },
  { hebrew: "מְסַדֵּר / לְסַדֵּר", translit: "mesader/lesader", english: "arrange", spanish: "ordenar", category: "Verbs" },
  { hebrew: "נוֹלַד / לְהִיוָּלֵד", translit: "nolad/lehivaled", english: "be born", spanish: "nacer", category: "Verbs" },
  { hebrew: "עוֹזֵר / לַעֲזֹר", translit: "ozer/la'azor", english: "help", spanish: "ayudar", category: "Verbs" },
  // Chapter 27
  { hebrew: "גּוֹמֵר / לִגְמֹר", translit: "gomer/ligmor", english: "finish", spanish: "terminar", category: "Verbs" },
  { hebrew: "חַי / לִחְיוֹת", translit: "khai/likhyot", english: "live", spanish: "vivir", category: "Verbs" },
  { hebrew: "יָשֵׁן / לִישֹׁן", translit: "yashen/lishon", english: "sleep", spanish: "dormir", category: "Verbs" },
  { hebrew: "מְנַקֶּה / לְנַקּוֹת", translit: "menake/lenakot", english: "clean", spanish: "limpiar", category: "Verbs" },
  { hebrew: "מְרַכֵּל / לְרַכֵּל", translit: "merakkel/lerakkel", english: "gossip", spanish: "chismear", category: "Verbs" },
  { hebrew: "צוֹחֵק / לִצְחֹק", translit: "tsokek/litskhok", english: "laugh", spanish: "reír", category: "Verbs" },
  // Chapter 28
  { hebrew: "בּוֹדֵק / לִבְדֹּק", translit: "bodek/livdok", english: "check", spanish: "revisar", category: "Verbs" },
  { hebrew: "יוֹצֵא / לָצֵאת", translit: "yotse/latset", english: "go out / exit", spanish: "salir", category: "Verbs" },
  { hebrew: "פּוֹתֵחַ / לִפְתֹּחַ", translit: "poteakh/liftokh", english: "open", spanish: "abrir", category: "Verbs" },
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
  // Nuevo (cap. 23-28)
  // Chapter 23
  { hebrew: "אָדֹם / אֲדֻמָּה", translit: "adom/aduma", english: "red", spanish: "rojo/a", category: "Adjectives" },
  { hebrew: "מַצְחִיק / מַצְחִיקָה", translit: "matskhik/matskhika", english: "funny", spanish: "gracioso/a", category: "Adjectives" },
  { hebrew: "אֶגוֹאִיסְטִי / אֶגוֹאִיסְטִית", translit: "ego'isti/ego'istit", english: "egoist", spanish: "egoísta", category: "Adjectives" },
  { hebrew: "קוֹנְסֶרְבָטִיבִי / קוֹנְסֶרְבָטִיבִית", translit: "konservativ/konservativit", english: "conservative (Jewish)", spanish: "conservador/a (judío)", category: "Adjectives" },
  // Chapter 24
  { hebrew: "אָרֹךְ / אֲרֻכָּה", translit: "arokh/aruka", english: "long", spanish: "largo/a", category: "Adjectives" },
  { hebrew: "סִימֶטְרִי / סִימֶטְרִית", translit: "simetri/simetrit", english: "symmetrical", spanish: "simétrico/a", category: "Adjectives" },
  { hebrew: "אוּנִיבֶרְסָלִי / אוּנִיבֶרְסָלִית", translit: "universali/universalit", english: "universal", spanish: "universal", category: "Adjectives" },
  // Chapter 25
  { hebrew: "גָּבוֹהַּ / גְּבוֹהָה", translit: "gavoah/gvoha", english: "tall / high", spanish: "alto/a", category: "Adjectives" },
  { hebrew: "נָמוּךְ / נְמוּכָה", translit: "namukh/nemukha", english: "short / low", spanish: "bajo/a", category: "Adjectives" },
  { hebrew: "קָרִיר / קְרִירָה", translit: "karir/kerira", english: "cool", spanish: "fresco/a", category: "Adjectives" },
  { hebrew: "רָזֶה / רָזָה", translit: "raze/raza", english: "thin / skinny", spanish: "flaco/a", category: "Adjectives" },
  { hebrew: "שָׁמֵן / שְׁמֵנָה", translit: "shamen/shmena", english: "fat", spanish: "gordo/a", category: "Adjectives" },
  { hebrew: "חוּם / חוּמָה", translit: "hum/huma", english: "brown", spanish: "marrón", category: "Adjectives" },
  { hebrew: "יָרֹק / יְרֻקָּה", translit: "yarok/yeruka", english: "green", spanish: "verde", category: "Adjectives" },
  { hebrew: "לָבָן / לְבָנָה", translit: "lavan/levana", english: "white", spanish: "blanco/a", category: "Adjectives" },
  { hebrew: "סָגֹל / סְגֻלָּה", translit: "sagol/sgula", english: "purple", spanish: "violeta / morado", category: "Adjectives" },
  { hebrew: "צָהֹב / צְהֻבָּה", translit: "tsahov/tsehuba", english: "yellow", spanish: "amarillo/a", category: "Adjectives" },
  { hebrew: "בְּלוֹנְדִּינִי / בְּלוֹנְדִּינִית", translit: "blondini/blondinit", english: "blond", spanish: "rubio/a", category: "Adjectives" },
  { hebrew: "חָתִיךְ / חֲתִיכָה", translit: "khatikh/khatikha", english: "good looking (slang)", spanish: "lindo/a (slang)", category: "Adjectives" },
  // Chapter 26
  { hebrew: "עָיֵף / עֲיֵפָה", translit: "ayef/ayefa", english: "tired", spanish: "cansado/a", category: "Adjectives" },
  { hebrew: "רַע / רָעָה", translit: "ra/ra'a", english: "bad / mean", spanish: "malo/a", category: "Adjectives" },
  // Chapter 27
  { hebrew: "בָּטוּחַ / בְּטוּחָה", translit: "batuakh/betukha", english: "sure / safe", spanish: "seguro/a", category: "Adjectives" },
  { hebrew: "מְפֻרְסָם / מְפֻרְסֶמֶת", translit: "mefursam/mefursemet", english: "famous", spanish: "famoso/a", category: "Adjectives" },
  { hebrew: "נָשׂוּי / נְשׂוּאָה", translit: "nasui/nsu'a", english: "married", spanish: "casado/a", category: "Adjectives" },
  { hebrew: "רָגִיל / רְגִילָה", translit: "ragil/regila", english: "regular / usual", spanish: "habitual / común", category: "Adjectives" },
  // Chapter 28
  { hebrew: "טְרוֹפִּי / טְרוֹפִּית", translit: "tropi/tropit", english: "tropical", spanish: "tropical", category: "Adjectives" },
  { hebrew: "בּוֹטָנִי / בּוֹטָנִית", translit: "botani/botanit", english: "botanical", spanish: "botánico/a", category: "Adjectives" },
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
  // MISC (cap. 23-28)
  // Chapter 23
  { hebrew: "אִם יִרְצֶה הַשֵּׁם", translit: "im yirtse hashem", english: "God willing", spanish: "si Dios quiere", category: "Misc" },
  { hebrew: "בְּדֶרֶךְ כְּלָל", translit: "bederech klal", english: "usually", spanish: "generalmente", category: "Misc" },
  { hebrew: "בְּעֶזְרַת הַשֵּׁם", translit: "be'ezrat hashem", english: "with God's help", spanish: "con la ayuda de Dios", category: "Misc" },
  { hebrew: "הָרֵי אַתְּ מְקֻדֶּשֶׁת לִי", translit: "harei at mekudeshet li", english: "Thou art betrothed unto me", spanish: "Con este anillo quedas consagrada a mí", category: "Misc" },
  // Chapter 24
  { hebrew: "בְּעֶרֶך", translit: "be'erekh", english: "about / around", spanish: "aproximadamente", category: "Misc" },
  { hebrew: "בְּתוֹךְ", translit: "betokh", english: "inside / in", spanish: "dentro de", category: "Misc" },
  { hebrew: "שָׂם לֵב / לָשִׂים לֵב", translit: "sam lev/lasim lev", english: "notice / pay attention", spanish: "prestar atención", category: "Misc" },
  { hebrew: "שְׁנָתַיִם", translit: "shnatayim", english: "two years", spanish: "dos años", category: "Misc" },
  // Chapter 25
  { hebrew: "הַשָּׁנָה", translit: "hashana", english: "this year", spanish: "este año", category: "Misc" },
  { hebrew: "זֶה לָזֶה", translit: "ze laze", english: "to each other", spanish: "el uno al otro", category: "Misc" },
  { hebrew: "כִּמְעַט", translit: "kim'at", english: "almost", spanish: "casi", category: "Misc" },
  { hebrew: "אֲפִילּוּ", translit: "afilu", english: "even", spanish: "incluso / hasta", category: "Misc" },
  // Chapter 26
  { hebrew: "בְּרֶגֶל", translit: "beragel", english: "by foot / on foot", spanish: "a pie", category: "Misc" },
  { hebrew: "לִסְפִירָה", translit: "lispira", english: "A.D.", spanish: "d.C.", category: "Misc" },
  // Chapter 27
  { hebrew: "כָּאן", translit: "kan", english: "here", spanish: "acá / aquí", category: "Misc" },
  // Chapter 28
  { hebrew: "אַחַר כָּך", translit: "akhar kakh", english: "later", spanish: "después", category: "Misc" },
  { hebrew: "אֵין בְּעַד מָה", translit: "ein be'ad ma", english: "you're welcome", spanish: "de nada", category: "Misc" },
  { hebrew: "הַמּוֹן", translit: "hamon", english: "a lot / many", spanish: "muchísimo", category: "Misc" },
  { hebrew: "עוֹד מְעַט", translit: "od me'at", english: "soon / in a little while", spanish: "en un momento", category: "Misc" },
  { hebrew: "צָרִיךְ", translit: "tsarikh", english: "need / have to", spanish: "necesitar / hay que", category: "Misc" },
  { hebrew: "קוֹדֶם", translit: "kodem", english: "first / before", spanish: "primero / antes", category: "Misc" },
];

const CATEGORIES = ["All", "Nouns", "Verbs", "Adjectives", "Pronouns", "Questions", "Expressions", "Misc"];

const CAT_COLORS = {
  Nouns:       { bg: "#1e3a5f", light: "#d0e8ff" },
  Verbs:       { bg: "#1a4731", light: "#c8f0d8" },
  Adjectives:  { bg: "#4a1060", light: "#ecd5fa" },
  Pronouns:    { bg: "#7a2e0a", light: "#fde8d0" },
  Questions:   { bg: "#5c3a00", light: "#fdf0cc" },
  Expressions: { bg: "#1a3a4a", light: "#cceeff" },
  Misc:        { bg: "#3a3a1a", light: "#f0f0cc" },
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
    categories: { All: "All", Nouns: "Nouns", Verbs: "Verbs", Adjectives: "Adjectives", Pronouns: "Pronouns", Questions: "Questions", Expressions: "Expressions", Misc: "Misc" },
    cardCategory: { Nouns: "Noun", Verbs: "Verb", Adjectives: "Adjective", Pronouns: "Pronoun", Questions: "Question word", Expressions: "Expression", Misc: "Misc" },
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
    categories: { All: "Todo", Nouns: "Sustantivos", Verbs: "Verbos", Adjectives: "Adjetivos", Pronouns: "Pronombres", Questions: "Preguntas", Expressions: "Expresiones", Misc: "Varios" },
    cardCategory: { Nouns: "Sustantivo", Verbs: "Verbo", Adjectives: "Adjetivo", Pronouns: "Pronombre", Questions: "Pregunta", Expressions: "Expresión", Misc: "Varios" },
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
      height: "100%",
      overflowY: "auto",
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
