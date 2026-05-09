const publicAsset = (path: string) => `/${path.replace(/^\//, "")}`;

export const aixcoAssets = {
  logoWide: publicAsset("aixco-energy/images/AIXCOGlobalWlong.png"),
  logoSquare: publicAsset("aixco-energy/images/AIXCOGlobalWSq.png"),
  markWhite: publicAsset("aixco-energy/images/AIXW.png"),
  markBlack: publicAsset("aixco-energy/images/AIXB.png"),
  heroVideo: publicAsset("aixco-energy/video/1.mp4"),
  solarProject: publicAsset("aixco-energy/images/misc/p1.webp"),
  windGridProject: publicAsset("aixco-energy/images/misc/p2.webp"),
  footerShape: publicAsset("aixco-energy/images/misc/c1.webp"),
  footerShapeFlip: publicAsset("aixco-energy/images/misc/c1-flip.webp"),
};

export const contact = {
  address: "Grüngasse 16/6, 1050 Vienna, Austria",
  support: "Investor Relations via AIXCO Global",
  supportDetail: "Via AIXCO Global and BlueRock onboarding channels",
  email: "info@aixco.global",
  hours: "Monday - Friday 09.00 - 17.00 CET",
};

export const socialLinks = {
  aixcoGlobal: "https://aixco.global",
  linkedin: "https://www.linkedin.com/company/aixco/",
};

export const navItems = [
  { label: "Home", to: "/" },
  { label: "About", to: "/#about" },
  { label: "Projects", to: "/projects" },
  { label: "News", to: "/news" },
  { label: "FAQs", to: "/#faqs" },
  { label: "Contact", to: "/#contact" },
];

export const heroCopy = {
  title: "Powering Real Asset Growth",
  subtitle: "starting with as little as € 1,000",
  body: "AIXCO Energy focuses on scalable renewable infrastructure including solar, wind, hydrogen, battery storage and intelligent grid-connected projects. As part of the AIXCO platform, we allocate a portion of capital raised through the 6% bond into carefully selected energy opportunities designed for long-term resilience, asset backing and future value creation.",
};

export const heroVerticals = [
  {
    title: "Solar",
    body: "Utility-scale photovoltaic and hybrid solar-plus-storage developments.",
  },
  {
    title: "Wind",
    body: "Onshore and select distributed wind projects with strong grid relevance.",
  },
  {
    title: "Storage",
    body: "Battery energy storage systems supporting flexibility and reliability.",
  },
  {
    title: "Hydrogen",
    body: "Green hydrogen, electrolysis and long-duration energy infrastructure.",
  },
  {
    title: "Smart Grid",
    body: "Digital monitoring, energy optimization and modern control systems.",
  },
];

export const platformMetrics = [
  {
    value: "5",
    label: "Core Technology Verticals Including Hydrogen",
  },
  {
    value: "1",
    label: "Integrated Energy Strategy",
  },
  {
    value: "24/7",
    label: "Focus on Reliability and Utilization",
  },
  {
    value: "EU+",
    label: "Infrastructure-Led Opportunity Set",
  },
];

export const whyCopy = {
  label: "Why AIXCO Energy",
  body: "We are building an energy strategy around assets the world increasingly needs: generation, hydrogen, storage and smarter infrastructure. That means focusing on projects with durable demand, real-world utility, and the potential to strengthen the overall quality of the AIXCO platform.",
};

export const strategyCopy = {
  label: "Disciplined capital deployment",
  title: "A diversified energy platform built for future demand and infrastructure value",
  body: "AIXCO Energy does not rely on a single technology theme. We look for balanced exposure across renewable generation, hydrogen, storage and supporting systems. This approach is intended to reduce concentration risk, increase optionality and create exposure to sectors where adoption, grid modernization and electrification continue to expand.",
  bullets: [
    "Only part of the bond capital is allocated to energy projects.",
    "Priority is placed on asset quality, scalability and practical deployment value.",
    "Projects are selected for long-term relevance, not short-term market hype.",
    "Generation, hydrogen and storage are assessed together to improve resilience and flexibility.",
  ],
};

export const marqueeItems = [
  "Utility-Scale Solar",
  "Onshore Wind",
  "Battery Storage",
  "Hydrogen Infrastructure",
  "Smart Grid Systems",
  "Hybrid Energy Platforms",
  "AI Optimisation",
];

export const investmentThemes = [
  {
    title: "Solar Energy",
    body: "Large-scale photovoltaic projects, commercial rooftop systems, and solar-plus-storage assets benefiting from falling hardware costs and better panel efficiency.",
  },
  {
    title: "Wind Energy",
    body: "Onshore wind developments where stronger turbine design, larger rotor diameters and better controls can improve output and asset performance.",
  },
  {
    title: "Battery Storage",
    body: "Grid-connected and co-located storage projects helping smooth intermittency, improve dispatch flexibility and support more resilient energy systems.",
  },
  {
    title: "Hydrogen Infrastructure",
    body: "Green hydrogen, electrolysis, storage and transport infrastructure designed to complement renewable generation and support long-duration energy balancing.",
  },
];

export const futureGrowth = {
  label: "Latest technology direction",
  title: "Where future growth may come from",
  body: "AIXCO Energy is interested not only in today’s deployable technologies, but in the innovation layers that can increase output, reduce losses, improve uptime and make infrastructure more valuable over time.",
  tags: [
    "Perovskite-tandem solar",
    "Bifacial PV",
    "Grid-forming inverters",
    "LFP / next-gen storage",
    "Long-duration storage",
    "Green Hydrogen",
    "Predictive maintenance AI",
  ],
  close: "As these technologies mature, they may improve economics, asset longevity and system flexibility, creating stronger underlying project characteristics.",
};

export const investorReasons = {
  label: "Why this matters for investors",
  title: "Real assets. Essential demand. Multiple technology pathways.",
  bullets: [
    "Energy demand remains foundational across residential, industrial and digital economies.",
    "Renewable infrastructure is increasingly tied to grid modernization and energy security.",
    "Storage, hydrogen and digital controls can enhance the usefulness of generation assets.",
    "A broader technology mix can create more balanced exposure than a single-theme strategy.",
    "AIXCO’s model is designed to complement its wider capital structure rather than depend on one asset class alone.",
  ],
};

export const focusAreas = [
  {
    title: "Solar + Storage Parks",
    body: "Hybrid assets combining daytime generation with storage arbitrage, peak support and stronger utilization profiles.",
  },
  {
    title: "Commercial Energy Platforms",
    body: "Distributed systems for logistics, industrial and commercial sites seeking lower energy costs and improved resilience.",
  },
  {
    title: "Grid Support Infrastructure",
    body: "Battery, inverter and digital control assets designed to improve balancing, monitoring and dispatch quality.",
  },
  {
    title: "Repowering & Upgrades",
    body: "Existing renewable projects where technology upgrades may unlock additional yield, efficiency or operating value.",
  },
  {
    title: "Wind-Dominant Sites",
    body: "Onshore opportunities in locations where modern turbine improvements can enhance productivity and project economics.",
  },
  {
    title: "Hydrogen & Future-Ready Innovation",
    body: "Selective exposure to long-duration storage, advanced solar formats, hydrogen systems and intelligent optimization infrastructure.",
  },
];

export const ctaCopy = {
  label: "AIXCO Energy",
  title: "Built to present a complete investment story, not a single technology headline.",
  body: "Explore our energy strategy, read the latest sector news, review the FAQs and learn how investors can access the 6% AIXCO bond through BlueRock.",
};

export const pressArticles = [
  {
    slug: "solar-energy-new-thinking",
    category: "Energiewende",
    title: "Solar-Energie neu gedacht",
    publication: "PV Asset",
    date: "2025",
    summary:
      "A feature on how Photovoltaik-Contracting helps companies, institutions and private households access green electricity while reducing upfront investment and operational effort.",
    image: publicAsset("aixco-energy/images/news/pv-asset.png"),
    href: publicAsset("aixco-energy/news/pv-asset.pdf"),
    tags: ["PV-Contracting", "Green PV Gruppe", "Solar"],
  },
  {
    slug: "2morrow-solar-real-assets",
    category: "Special Issue",
    title: "Zukunftsanker Fotovoltaik",
    publication: "2morrow Spezial",
    date: "2025",
    summary:
      "The 2morrow special issue brings together the solar contracting story with sustainable Bauherrenmodell coverage focused on real assets, climate-efficient buildings and long-term value.",
    image: publicAsset("aixco-energy/images/news/2morrow-2025.png"),
    href: publicAsset("aixco-energy/news/2morrow-2025-ansicht-immo.pdf"),
    tags: ["Fotovoltaik", "Bauherrenmodell", "Sustainable Assets"],
  },
  {
    slug: "investment-mit-gesellschaftlichem-mehrwert",
    category: "Real Assets",
    title: "Investment mit gesellschaftlichem Mehrwert",
    publication: "assets 1/2025",
    date: "2025",
    summary:
      "Coverage of Valuita and BSP Immobilien Invest highlighting Bauherrenmodelle as a model for investor returns, affordable housing and ecological standards in Austrian residential development.",
    image: publicAsset("aixco-energy/images/news/assets-01-2025.png"),
    href: publicAsset("aixco-energy/news/assets-01-2025-ansicht-immo.pdf"),
    tags: ["Valuita", "BSP Immobilien", "Affordable Housing"],
  },
  {
    slug: "solide-veranlagung",
    category: "Round Table",
    title: "Solide Veranlagung",
    publication: "assets 2/2025",
    date: "2025",
    summary:
      "An assets real-estate round table on market stabilization, residential investments and Bauherrenmodelle, featuring Mario Bruckner-Simon and other Austrian property leaders.",
    image: publicAsset("aixco-energy/images/news/assets-02-2025.png"),
    href: publicAsset("aixco-energy/news/assets-02-2025-ansicht-immo.pdf"),
    tags: ["Round Table", "Residential Investment", "Market Outlook"],
  },
  {
    slug: "kapitalanlage-mit-mehrwert",
    category: "Advertorial",
    title: "Kapitalanlage mit Mehrwert",
    publication: "Das Stanglwirt-Magazin",
    date: "2025",
    summary:
      "A Valuita and BSP Immobilien Invest article on Bauherrenmodelle as a way to combine investment opportunity, tax structure and creation of affordable rental housing.",
    image: publicAsset("aixco-energy/images/news/stanglwirt-2025.png"),
    href: publicAsset("aixco-energy/news/stanglwirt-m-2025-ansicht-immo.pdf"),
    tags: ["Valuita", "Bauherrenmodell", "Residential"],
  },
  {
    slug: "bruckner-simon-pressespiegel",
    category: "Press Coverage",
    title: "Mario Bruckner-Simon Pressespiegel",
    publication: "NEWS, Trend.Premium, TV-MEDIA",
    date: "2024-2025",
    summary:
      "A compiled press overview with magazine, online, social and newsletter placements connected to Mario Bruckner-Simon, Bauherren investor topics and contracting coverage.",
    image: publicAsset("aixco-energy/images/news/bruckner-simon-pressespiegel.png"),
    href: publicAsset("aixco-energy/news/bruckner-simon-pressespiegel.pdf"),
    tags: ["Pressespiegel", "Media", "Bruckner-Simon"],
  },
];

export const footerIntro =
  "AIXCO Energy focuses on renewable and intelligent energy infrastructure opportunities including solar, wind, hydrogen, battery storage and supporting technologies that can contribute to long-term platform strength.";

export const energyFocus = [
  "Utility-Scale Solar",
  "Onshore Wind",
  "Battery Storage Systems",
  "Hydrogen Infrastructure",
  "Hybrid Energy Assets",
  "Grid & Digital Controls",
  "Technology News",
];

export const investmentFocus = [
  "Utility-scale solar and hybrid parks",
  "Wind energy assets",
  "Battery energy storage systems",
  "Hydrogen infrastructure and electrolysis",
  "Grid support and smart controls",
  "Energy technology upgrades",
  "Long-term infrastructure themes",
];

export const aboutEnergy =
  "AIXCO Energy presents a focused renewable infrastructure strategy within the wider AIXCO Global ecosystem, with attention to value creation, diversification and future-facing energy technologies.";

export const pvArticle = {
  category: "Energiewende",
  title: "Solar-Energie neu gedacht",
  author: "Text: Rosi Dorudi",
  summary:
    "Wie Photovoltaik-Contracting Betriebe, Einrichtungen und Privathaushalte zu grünem Strom verhilft - und dabei die Energiewende vorantreibt.",
  imageCaption:
    "AT&S Fehring: Beim Leiterplattenhersteller in der Steiermark wurden bereits zwei Dachanlagen in Betrieb genommen.",
  quote:
    "Photovoltaik-Contracting liefert grünen Strom bei gleichzeitiger finanzieller und organisatorischer Entlastung.",
  sections: [
    {
      title: "Grüner Strom",
      paragraphs: [
        "Solaranlagen zählen zu den tragenden Technologien der Energiewende. Doch trotz ausgereifter Technik zögern viele Unternehmen, Einrichtungen und Privathaushalte selbst in Photovoltaik-Anlagen zu investieren.",
        "Obwohl solche Anlagen große Mengen billiger Energie in die Stromnetze bringen, scheuen die meisten die hohen Anfangskosten und langen Amortisationszeiten, erklärt Mario Bruckner-Simon, Geschäftsführer der Green PV Gruppe, die sich auf nachhaltige Veranlagungslösungen spezialisiert hat.",
        "Hinzu kommt der organisatorische Aufwand, der viele zusätzlich abschreckt. Genau hier setzt ein Modell an, das zunehmend an Bedeutung gewinnt: Photovoltaik-Contracting liefert grünen Strom bei gleichzeitiger finanzieller und organisatorischer Entlastung.",
        "Der Contracting-Partner stellt moderne Technik und Betriebs-Know-how bereit und stimmt die Anlage präzise auf den individuellen Verbrauch ab. Das senkt Energiekosten und schafft Unabhängigkeit von Energieversorgern.",
      ],
    },
    {
      title: "Fixpreis statt Marktrisiko",
      paragraphs: [
        "Die Green PV Gruppe setzt dieses Modell bereits erfolgreich um. Gemeinsam mit dem Experten-Team plant, finanziert und errichtet sie Solaranlagen, bindet sie ins bestehende Energiesystem ein und übernimmt Wartung, Versicherung sowie technische Überwachung.",
        "Der Kunde bezieht 25 Jahre lang Strom zu einem vertraglich vereinbarten Fixpreis. Preissprünge am Energiemarkt treffen ihn somit nicht und die Ausgaben bleiben zuverlässig kalkulierbar.",
        "Wenn der Solarstrom direkt am Standort verbraucht wird, entfallen auch Netzentgelte, was die Gesamtkosten nochmals deutlich reduziert. Moderne Solarpaneele leisten nach Ablauf der Vertragsdauer meist noch über 87 Prozent ihrer ursprünglichen Kapazität.",
      ],
    },
    {
      title: "Vom Konzept zur Umsetzung",
      paragraphs: [
        "Gerade in der Industrie, wo der Energiebedarf hoch und die Versorgungssicherheit kritisch sind, zeigt sich, wie wirkungsvoll das Contracting-Modell sein kann.",
        "Am Beginn jedes Projekts steht eine gründliche Analyse. Bevor eine Dach- oder Freiflächenanlage realisiert wird, wird zunächst die komplette Ist-Situation erfasst. Die gewonnenen Daten fließen anschließend in die Planung einer exakt auf den Bedarf zugeschnittenen PV-Anlage ein.",
        "Entscheidend ist die Wirtschaftlichkeit jeder einzelnen Kilowattstunde. Deshalb orientieren sich Größe und Ausrichtung der Anlage am tatsächlichen Stromverbrauch und nicht nur an der verfügbaren Fläche.",
      ],
    },
    {
      title: "Unterbrechungsfrei und zuverlässig",
      paragraphs: [
        "Parallel dazu werden technische Anforderungen, brandschutztechnische Vorgaben und Standortauflagen geklärt. Erst danach wird festgelegt, welche Module, Wechselrichter, Montagesysteme und Speicher geeignet sind.",
        "Entscheidend ist nicht nur die maximale Leistung, sondern die Zuverlässigkeit im laufenden Betrieb. Die Anlage muss Lastspitzen abfedern können, Wartungsfenster gering halten und Störungen frühzeitig melden.",
        "Moderne Monitoring-Systeme erfassen Leistungsdaten in Echtzeit, während Drohneninspektionen und modulechte Reinigungsverfahren mittels Osmosewasser für den reibungslosen Betrieb sorgen.",
      ],
    },
    {
      title: "Batteriespeicher und Lastverschiebung",
      paragraphs: [
        "Ein zentraler Hebel für Effizienz ist das Lastmanagement. In Industriebetrieben treiben vor allem Leistungsspitzen die Netzentgelte in die Höhe.",
        "Batteriespeicher können diese Spitzen abfedern, indem sie genau dann die benötigte Energie bereitstellen. Das reduziert Lastspitzen, senkt Netzzugangskosten und lässt den Anteil des selbst genutzten Solarstroms weiter ansteigen.",
        "Moderne Speicherlösungen machen die Energieversorgung nachhaltiger und schaffen einen spürbaren wirtschaftlichen Mehrwert.",
      ],
    },
    {
      title: "Ökostrom statt Diesel",
      paragraphs: [
        "Ein Projekt in der Steiermark zeigt weiteres Potenzial von PV-Contracting. Altenheime sind gesetzlich verpflichtet, eine funktionierende Notstromversorgung bereitzustellen. Viele Einrichtungen setzen dafür auf Dieselgeneratoren.",
        "Auf dem Dach eines steirischen Altenheims wurde deshalb eine Photovoltaikanlage samt Batteriespeicher installiert, wobei die benötigte Notstromkapazität softwaregesteuert reserviert wird.",
        "Die Einrichtung erfüllt damit alle gesetzlichen Vorgaben - ohne eigene Investition und ohne fossile Technik. Das verbindet Versorgungssicherheit und Klimaschutz.",
      ],
    },
    {
      title: "Regionale Solarstromsysteme",
      paragraphs: [
        "In Niederösterreich entsteht eine Freiflächenanlage mit rund 3,6 Megawatt Leistung, die jährlich bis zu fünf Millionen Kilowattstunden liefern soll.",
        "Nach Fertigstellung können industrielle Großabnehmer über eigene Leitungen direkt angeschlossen werden und grünen Strom beziehen.",
        "Solche Anlagen markieren den Wandel vom einzelnen Dachprojekt hin zu regionalen Solarstromsystemen, die ganze Unternehmensstandorte oder Verbünde versorgen können.",
        "Für die Energiewende bedeutet das vor allem mehr erneuerbare Kapazitäten im System. Fachmännisch umgesetzt stabilisiert PV-Contracting Energiekosten, verbessert die CO2-Bilanz und eröffnet Unternehmen wie Privathaushalten einen verlässlichen und risikoarmen Weg in die Dekarbonisierung.",
      ],
    },
  ],
};
