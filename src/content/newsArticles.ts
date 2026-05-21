import { pressArticles, pvArticle } from "./aixcoEnergy";

export type NewsArticleSection = {
  title: string;
  paragraphs: string[];
};

type ArticleBody = {
  eyebrow: string;
  author?: string;
  sourceLanguage: string;
  lead: string;
  sourceNote: string;
  pullQuote?: string;
  keyPoints: string[];
  sections: NewsArticleSection[];
};

export type NewsArticle = (typeof pressArticles)[number] & ArticleBody;

const articleBodies: Record<string, ArticleBody> = {
  "solar-energy-new-thinking": {
    eyebrow: "Extracted from PV Asset",
    author: pvArticle.author,
    sourceLanguage: "German source material",
    lead: pvArticle.summary,
    sourceNote: "Prepared from the PV Asset PDF and kept as an on-site readable article.",
    pullQuote: pvArticle.quote,
    keyPoints: [
      "PV contracting reduces the need for direct upfront investment.",
      "Customers receive solar power at a contractually agreed fixed price.",
      "Monitoring, maintenance, insurance and technical operation remain with the contracting partner.",
      "Battery storage and load management can reduce peak grid costs.",
    ],
    sections: pvArticle.sections,
  },
  "2morrow-solar-real-assets": {
    eyebrow: "Extracted from 2morrow Spezial",
    author: "Text: Rosi Dorudi",
    sourceLanguage: "German source material",
    lead:
      "The 2morrow special places photovoltaic contracting and sustainable Bauherrenmodelle next to each other as two practical real-asset answers to energy transition, affordable housing and long-term value creation.",
    sourceNote: "Prepared from the 2morrow special issue PDF and summarized into web article sections.",
    pullQuote:
      "Nachhaltige Bauherrenmodelle ermöglichen Vermögensaufbau mit Wirkung: Anleger profitieren von Rendite und treiben gleichzeitig den Bau klimaeffizienter Gebäude voran.",
    keyPoints: [
      "The issue includes the PV contracting article on green power, fixed prices and professional operation.",
      "AT&S Fehring is cited as a practical example where two roof systems are already in operation.",
      "A Niederösterreich ground-mounted system of around 3.6 MW is described as a regional solar supply model.",
      "Valuita's sustainable Bauherrenmodelle are presented as a way to connect investor returns with climate-efficient buildings.",
    ],
    sections: [
      {
        title: "Fotovoltaik als Zukunftsanker",
        paragraphs: [
          "The special issue opens the energy coverage with the question of how photovoltaic contracting can bring green electricity to businesses, institutions and private households. The model responds to a familiar barrier: many potential users want solar power, but hesitate because of high upfront costs, long amortization periods and operational complexity.",
          "In the extracted article, Mario Bruckner-Simon explains the role of a contracting partner: planning, financing, building, integrating and operating solar systems so the customer can use renewable electricity without taking over the full project burden alone.",
        ],
      },
      {
        title: "Fixpreis statt Marktrisiko",
        paragraphs: [
          "The Green PV Gruppe model described in the PDF is built around a long-term fixed electricity price. Customers receive power over a 25-year contract period, while the contracting partner handles maintenance, insurance, technical monitoring and the integration into the existing energy system.",
          "When solar electricity is consumed directly on site, grid fees can also fall. The article points to modern panels that can still deliver more than 87 percent of their original capacity after the contract period, making continued use realistic.",
        ],
      },
      {
        title: "Speicher, Lastmanagement und regionale Systeme",
        paragraphs: [
          "For industrial sites, the issue is not only generation but reliable integration into complex operating systems. The PDF highlights analysis of actual consumption, technical requirements, fire protection, storage design and monitoring before a project is implemented.",
          "Battery storage is presented as a tool for reducing peak-load costs, while the article also describes a Styrian retirement home using PV plus battery storage as a cleaner emergency-power concept. A planned open-space system in Lower Austria, with around 3.6 MW and up to five million kilowatt hours per year, shows the move from individual roofs toward regional solar power systems.",
        ],
      },
      {
        title: "Grün-Anlage mit Rendite",
        paragraphs: [
          "The same 2morrow issue also covers sustainable Bauherrenmodelle. Valuita describes these models as a way for investors to participate in the green transformation of the property sector while targeting stable returns and ecological impact.",
          "Projects are framed around klimaaktiv standards, energy-efficient building systems, resource-conscious materials and higher living quality. The PDF also stresses revitalization over new land sealing where possible, because preserving and upgrading existing substance can reduce additional soil consumption.",
        ],
      },
      {
        title: "Doppelter Mehrwert",
        paragraphs: [
          "For investors, the extracted article emphasizes a combination of rental income, public funding, tax depreciation and the creation of rent-moderated housing. The social argument is central: capital is not only deployed into a property, but into housing that can remain usable and affordable over the long term.",
          "The issue presents current market conditions as favorable because new residential prices had stabilized while financing conditions were improving. The core message is that sustainable real assets can create financial value and practical public value at the same time.",
        ],
      },
    ],
  },
  "investment-mit-gesellschaftlichem-mehrwert": {
    eyebrow: "Extracted from assets 1/2025",
    author: "Text: Rosi Dorudi / assets",
    sourceLanguage: "German source material",
    lead:
      "The assets 1/2025 coverage presents Bauherrenmodelle as a crisis-resilient investment structure that can mobilize private capital for affordable housing while integrating sustainability standards and long-term rental demand.",
    sourceNote: "Prepared from the assets 1/2025 PDF, including the Valuita and BSP Immobilien Invest promotion pages.",
    pullQuote:
      "Bauherrenmodelle tragen konkret zur Schaffung leistbaren Wohnraums bei.",
    keyPoints: [
      "Valuita links Bauherrenmodelle to affordable housing, public funding, rent caps and tax optimization.",
      "BSP Immobilien emphasizes anticyclical acquisition, planning security through fixed-rate financing and varied apartment sizes.",
      "PV systems, heat pumps and gap-site development are presented as ways to improve long-term economics and reduce environmental impact.",
      "The promotion section cites Valuita's 2024 handover of completed Bauherrenmodelle with around EUR 70 million in investment volume.",
    ],
    sections: [
      {
        title: "Bauherrenmodelle trotzen dem Markt",
        paragraphs: [
          "The article describes a difficult real-estate market shaped by higher costs, stricter lending and weaker buyer sentiment. Against that background, Bauherrenmodelle are presented as more resilient than classic investment apartments because the demand for affordable rental housing remains high.",
          "Walter Neumann of Valuita explains that this demand forms the stable foundation of the financing model, supported by public subsidies, rent limits and tax optimization options that continue to attract investors.",
        ],
      },
      {
        title: "Leistbarer Wohnraum als Investmentkern",
        paragraphs: [
          "Valuita's position in the extracted text is that Bauherrenmodelle do more than provide tax advantages. They can combine public funding, capped rents and long-term letting to support affordable housing, while private capital strengthens a socially relevant segment.",
          "The article also points toward the next development step: stronger sustainability and ESG conformity. Falling interest rates and inflation-adjusted lower new-build prices are presented as a better environment for financing and entry timing.",
        ],
      },
      {
        title: "Antizyklisch handeln",
        paragraphs: [
          "BSP Immobilien Invest is described as taking an anticyclical approach. Mario Bruckner-Simon says that while many competitors bought intensively during overheated price phases, BSP acted cautiously and is now increasing acquisition activity where prices again offer attractive opportunities.",
          "The PDF also notes the use of fixed-rate agreements for short- and long-term financing to create planning security and protect projects from unpredictable cost increases.",
        ],
      },
      {
        title: "Ökologie steigert Wirtschaftlichkeit",
        paragraphs: [
          "The article links ecological measures directly with long-term economics. Photovoltaics and heat pumps are cited as ways to reduce the CO2 footprint of projects and improve their economic profile over time.",
          "BSP Immobilien also uses gap sites to minimize land consumption. Bruckner-Simon describes future potential in energy-autonomous, green and well-connected urban districts with good transport links, thoughtful densification, green areas and short distances between living and working.",
        ],
      },
      {
        title: "Promotion: Investment mit gesellschaftlichem Mehrwert",
        paragraphs: [
          "The promotion section explains the Bauherrenmodell as a structure where several investors jointly realize a property project and participate in rental income from the whole property, reducing single-unit vacancy risk compared with a classic buy-to-let apartment.",
          "It also lists risks such as construction cost increases, delays and vacancies, and stresses the importance of tax advice and careful project-partner selection before investing.",
          "Valuita is described as having handed over completed Bauherrenmodelle with an investment volume of around EUR 70 million in 2024. The PDF names the Staatsgebäude, the former Kirchnerkaserne in Graz, and the Esserweg project as current examples, while also describing BSP Immobilien Invest as a local partner focused on the social and ecological side of residential development.",
        ],
      },
    ],
  },
  "solide-veranlagung": {
    eyebrow: "Extracted from assets 2/2025",
    author: "Moderation: Stefan Schatz",
    sourceLanguage: "German source material",
    lead:
      "The assets real-estate round table describes a stabilizing Austrian property market, renewed investor interest in housing and the continued relevance of Bauherrenmodelle as a long-term, value-oriented investment structure.",
    sourceNote: "Prepared from the assets 2/2025 round-table PDF and the attached Valuita/BSP advertorial pages.",
    pullQuote:
      "Die Immobilie ist aus Anlegersicht kein Spekulationsobjekt mehr, sondern eine langfristige, solide Veranlagung.",
    keyPoints: [
      "Round-table participants saw signs of market stabilization after the end of the KIM regulation and lower interest rates.",
      "Mario Bruckner-Simon described Graz as a buyer's market with strong demand for affordable housing.",
      "Walter Neumann called Bauherrenmodelle a market early indicator as private investors return for tax and real-asset reasons.",
      "Sustainability was discussed as both a value-development issue and a requirement in subsidized housing projects.",
    ],
    sections: [
      {
        title: "Der Markt stabilisiert sich",
        paragraphs: [
          "The round table opens with a shared sense that the heavy storm in the property market has passed, even if the recovery remains uneven. Participants point to falling interest rates, the end of the KIM regulation and customers returning to the market.",
          "Mario Bruckner-Simon notes that Graz remains a buyer's market. Through Bauherrenmodelle, BSP creates subsidized housing that must be rented at very low rates for 15 years, which keeps vacancy low because demand for affordable housing is enormous.",
        ],
      },
      {
        title: "Bauherrenmodelle als Frühindikator",
        paragraphs: [
          "Walter Neumann explains that when savings products nearly matched real-estate yields, investors waited. As interest rates fell, demand for Bauherrenmodelle rose strongly, especially among higher earners again focusing on tax optimization.",
          "Later in the discussion he describes Bauherrenmodelle as an early indicator: new investors without prior experience were approaching Valuita again, something that had been rare in the previous years.",
        ],
      },
      {
        title: "Wohnraumbedarf und Genehmigungen",
        paragraphs: [
          "A recurring theme is the gap between demand and the pace of delivery. Participants discuss too few building permits, slow approval processes and project delays. Bruckner-Simon gives a Graz example where a building permit took six years.",
          "The round table also highlights the financing challenge in subsidized projects. In Graz, new funding guidelines require very low gross warm rents for first occupancy, including fitted kitchens, so investors must examine carefully whether the expected returns still work.",
        ],
      },
      {
        title: "Rendite, Größe und Produktmix",
        paragraphs: [
          "The discussion moves beyond market sentiment to the type of housing that is needed. Neumann argues that too many small investor apartments were built for years, while demand for larger units is now better.",
          "Bauherrenmodelle are described as one remaining structure for private investors because they can combine real-estate exposure with tax effects and public funding. The broader conclusion is that property has returned to its role as a long-term, solid investment rather than a speculative object.",
        ],
      },
      {
        title: "Nachhaltigkeit als Wertfaktor",
        paragraphs: [
          "Sustainability is discussed from two angles: private investors may still prioritize yield first, while future-ready buildings can have stronger long-term value and lower lifecycle costs.",
          "Participants mention certification, photovoltaics, heat pumps, operating costs and efficient building operation. Bruckner-Simon adds that subsidized projects in Styria require the silver standard, suitable materials and recycled building materials, making ecology a key element of the funding system.",
        ],
      },
      {
        title: "Attached advertorial: Kapitalanlage mit Mehrwert",
        paragraphs: [
          "The same PDF includes a Valuita and BSP Immobilien Invest advertorial about Bauherrenmodelle as a way to connect return potential, affordable housing and sustainability.",
          "It presents projects in Graz-Liebenau and Vienna-Favoriten, explains the role of rent caps and accelerated depreciation, and frames the structure as a balanced strategy for capital preservation and recurring income during uncertain market phases.",
        ],
      },
    ],
  },
  "kapitalanlage-mit-mehrwert": {
    eyebrow: "Extracted from Das Stanglwirt-Magazin",
    sourceLanguage: "German source material",
    lead:
      "The Stanglwirt advertorial presents Valuita and BSP Immobilien Invest as partners using Bauherrenmodelle to connect investor opportunity, affordable housing and sustainable residential development in Austria.",
    sourceNote: "Prepared from the Stanglwirt-Magazin PDF and rewritten as an on-site article.",
    pullQuote:
      "Das Bauherrenmodell ist eine Win-Win-Win-Situation für Investoren, Wohnungssuchende und die öffentliche Hand.",
    keyPoints: [
      "Valuita sees stabilizing real-estate conditions, lower rates and supply scarcity as a favorable setup for Bauherrenmodelle.",
      "The Graz-Liebenau project combines an income apartment concept with the classic Bauherrenmodell structure.",
      "A Vienna-Favoriten project renovates and adds floors to an existing residential building with modern outdoor areas.",
      "The article presents rent caps, tax depreciation and secured lettability as core elements of the model.",
    ],
    sections: [
      {
        title: "Marktphase mit Einstiegschance",
        paragraphs: [
          "The advertorial begins with a market contrast: private home purchases have slowed because of economic uncertainty, while demand for affordable rental housing remains high. For investors, this opens a route into alternative financing structures such as Bauherrenmodelle.",
          "Walter Neumann of Valuita describes signs of stabilization and recovery. Lower interest rates improve financing possibilities, and because the supply of new residential units is tight while demand keeps growing, the article expects new-build prices to rise again.",
        ],
      },
      {
        title: "Mehr als Renditepotenzial",
        paragraphs: [
          "Mario Bruckner-Simon emphasizes that the model is not only about potential return. It can optimize the personal tax position and contribute to the creation of affordable housing.",
          "The article frames this as a three-sided benefit: investors receive a structured real-estate opportunity, tenants gain access to affordable rental units and the public sector gains additional housing supply through private capital.",
        ],
      },
      {
        title: "Aktuelle Projekte in Graz und Wien",
        paragraphs: [
          "Valuita focuses on carefully selected projects in attractive locations. In Graz-Liebenau, the article describes a unit-based Bauherrenmodell with 13 high-quality apartments, combining an income-apartment approach with the classic structure.",
          "The project is planned with gardens, terraces or balconies and is expected to receive the klimaaktiv silver building standard. In Vienna-Favoriten, an existing residential building is being renovated and extended, creating eleven modern apartments, many with contemporary outdoor areas.",
        ],
      },
      {
        title: "Lernen von einer Erfolgsstory",
        paragraphs: [
          "The PDF describes the Bauherrenmodell as a long-standing instrument of Austrian housing policy. Tax optimization can help enable subsidized, price-capped rental housing, while investors participate in a tangible real-asset structure.",
          "The Styria example is central: rents can be limited for the first 15 years to a maximum of two thirds of the reference rent. The article presents this as the fair counterweight to sustainable public incentives.",
        ],
      },
      {
        title: "Sicherheit in unsicheren Zeiten",
        paragraphs: [
          "In a politically and economically unsettled environment, the advertorial highlights real estate as a structure for long-term capital preservation and recurring income. Neumann also points to legal security with comparatively low capital deployment.",
          "The final message is that the combination of tangible assets, tax optimization and secured lettability through subsidized housing projects can form a balanced investment strategy while supporting the Austrian housing question.",
        ],
      },
    ],
  },
  "bruckner-simon-pressespiegel": {
    eyebrow: "Extracted from Pressespiegel PDF",
    sourceLanguage: "German and English source material",
    lead:
      "The press mirror collects magazine, online, newsletter and social placements connected to Mario Bruckner-Simon, Bauherrenmodelle, affordable housing and contracting coverage.",
    sourceNote:
      "The PDF exposes mostly placement/index text rather than complete OCR article bodies, so this page presents the extracted media overview and the themes visible in the file.",
    pullQuote:
      "NEWS, Trend.Premium, TV-MEDIA and Steiermark-Magazin placements are listed alongside online, social and newsletter distribution.",
    keyPoints: [
      "Print placements include NEWS, Trend.Premium, TV-MEDIA and Steiermark-Magazin entries.",
      "Online entries include NEWS.AT links on stable real assets, affordable housing and contracting.",
      "The PDF also records social media posts and newsletter dates connected to the placements.",
      "A video-production reference to bsi-group.at is included in the extracted text.",
    ],
    sections: [
      {
        title: "Print and magazine placements",
        paragraphs: [
          "The extracted index lists a NEWS placement with publication date 21.11.2024 and a Trend.Premium placement with publication date 22.11.2024, including a reader-link reference.",
          "Additional entries include NEWS on 05.12.2024, TV-MEDIA on 20.11.2024, Steiermark-Magazin on 11.09.2025, NEWS on 28.08.2025 and multiple NEWS entries on 18.12.2025.",
        ],
      },
      {
        title: "Online and newsletter distribution",
        paragraphs: [
          "The PDF includes a NEWS.AT run from 07.11.2024 to 10.12.2024 for an article titled around stable value investment, with social media and newsletter dates listed for November 2024.",
          "It also includes NEWS.AT links around affordable housing and a contracting article titled around more power and less risk for industry, with distribution notes for December 2025.",
        ],
      },
      {
        title: "Visible editorial themes",
        paragraphs: [
          "The themes visible from the extracted PDF text are consistent across the wider archive: stable real assets, Bauherren investors, affordable housing, contracting and energy-risk reduction for industrial users.",
          "Because most of the press mirror appears to consist of embedded clipping pages, the extractable text works best as an archive overview. The original PDF remains linked for direct review of the full mirror layout.",
        ],
      },
    ],
  },
};

export const newsArticles: NewsArticle[] = pressArticles.map((article) => ({
  ...article,
  ...articleBodies[article.slug],
}));

export const getNewsArticleBySlug = (slug?: string) =>
  newsArticles.find((article) => article.slug === slug);
