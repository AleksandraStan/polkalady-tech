export interface BlogArticle {
  number: string;
  slug: string;
  articleClassName?: string;
  hideIntro?: boolean;
  hideSectionHeadings?: boolean;
  statusLabel?: string;
  subtitle?: string;
  title: string;
  category: string;
  readTime: string;
  published: string;
  intro: string;
  media?: ArticleMedia[];
  sections: { heading: string; paragraphs: string[] }[];
}

export interface ArticleMedia {
  type: "image" | "video";
  src: string;
  alt?: string;
  caption?: string;
  poster?: string;
  sourceLabel?: string;
  sourceUrl?: string;
}

export const articles: BlogArticle[] = [
  {
    number: "01",
    slug: "llm-gps-history",
    articleClassName: "article-page-gps",
    hideIntro: true,
    hideSectionHeadings: true,
    subtitle: "AI as a detective?",
    title: "How much can an LLM read from one's GPS history?",
    category: "AI & Mobility",
    readTime: "7 min",
    published: "July 2026",
    intro: "Some concerns about location privacy",
    media: [{
      type: "image",
      src: "blog/llm-gps-detective.png",
      alt: "Abstract violet detective scene with a magnifying glass over glowing GPS trajectories",
      caption: "",
    }],
    sections: [{
      heading: "",
      paragraphs: [
        "I have been thinking of Large Language Models mostly as text engines with multimodal capabilities, but every day I discover, and I presume many people do, that AI can, or cannot, do more than we expected.",
        "The fact that we now recognize so many of its capabilities makes it more difficult to regulate its use, and mostly its misuse. The EU AI Act and AI impact assessments for business are supposed to ensure that AI systems do not misuse the data they process.",
        "For me, this concern creates another one: what does anonymous data really mean anymore?",
        "We have all seen TV shows where investigators identify someone from a partial fingerprint or a few tiny clues. A good detective can create a story from so little because they can connect the facts and fill in the missing parts. Reading the latest papers on LLMs' potential skills is as fascinating as the first season of Elementary.",
        "One of the recently published papers is by Truong et al. (2025). They used a program called GLOBALTRACE, using 4,000 real-world trajectories, and tested how well LLMs could reconstruct missing segments of GPS trajectories without internet access, maps, or external tools.",
        "Scary? Well, a little.",
        "To perform that task, the LLM did not just predict the missing GPS coordinates to complete a path. It had to understand how someone was traveling, estimate speed and direction, and check whether the trajectory was consistent with constraints such as one-way streets and connected roads.",
        "In other words, the model rebuilt an internal environment. How far is it from finding the actual address?",
        "It sounds fascinating and dangerous at the same time. Before 2020, trajectory reconstruction in academic studies was mostly based on probabilistic models and map-matching algorithms. AI could recover GPS data lost in tunnels, dense urban areas, or mountainous terrain and match it to an existing road map.",
        "More recent approaches, such as TrajBERT, TrajFM, and BigCity, used Transformer-based models trained specifically for trajectory analysis. They became much better at recovering missing trajectory points and predicting future locations, but they were still designed for these particular problems.",
        "The very recent GLOBALTRACE results are based on a general-purpose LLM, without task-specific training, that was able to outperform several specialized trajectory recovery models.",
        "If an LLM can reconstruct where you have been from only fragments of your GPS history, it can potentially infer too much information from our anonymous data.",
        "I think there is an ethical risk behind it. We may need to start evaluating AI not only for accuracy or geographical bias, but also for how much sensitive information it can reconstruct from location data. The real concern is how much it can reveal and uncover to anyone.",

        "Short bibliography:",
        "Truong, T. et al. (2025). Understanding the Geospatial Reasoning Capabilities of Large Language Models (GLOBALTRACE). arXiv.",
        "Shao, Z. et al. (2024). TrajFM: A Foundation Model for Urban Trajectory Analytics. arXiv.",
        "Sun, Y. et al. (2023). TrajBERT: Trajectory BERT for Urban Mobility Representation Learning.",
        "Yuan, Y. et al. (2024). BigCity: A Universal Foundation Model for Urban Spatio-Temporal Intelligence.",
        "Bierlaire, M., Chen, J., & Newman, J. (2013). A Probabilistic Map Matching Method for Smartphone GPS Data. Transportation Research Part C: Emerging Technologies, 26, 78-98. https://doi.org/10.1016/j.trc.2012.08.001",
      ],
    }],
  },
  {
    number: "02",
    slug: "does-space-precede-movement",
    statusLabel: "in progress",
    title: "Does Space Precede Movement, or Does Movement Produce Space?",
    category: "Time Geography",
    readTime: "5 min",
    published: "June 2026",
    intro: "A research note on Hagerstrand's time-geography, individual space-time flows, and the question of whether movement simply crosses space or actively produces it.",
    media: [{
      type: "image",
      src: "blog/szescian_hagerstranda_pauza.gif",
      alt: "Animated Hagerstrand cube showing a traveller trajectory through space and time",
      caption: "Hagerstrand's cube: a moving trajectory with pauses, points, and time as a vertical dimension.",
    }],
    sections: [
      {
        heading: "A question for movement",
        paragraphs: [
          "This article opens a place for my work on time-space flows and the charts developed from individual trajectories. The question is simple but unstable: does space exist as a fixed container before movement begins, or is space continuously produced by movement, constraint, access, rhythm, and delay?",
          "The drawings treat a path as more than a line between coordinates. A trajectory becomes a temporal relation: direction, duration, hesitation, repetition, memory, and the friction of real geography are gathered into one visual gesture.",
        ],
      },
      {
        heading: "Hagerstrand and time-space flows",
        paragraphs: [
          "Hagerstrand's time-geography makes movement visible as a lived structure. Paths, constraints, stations, pauses, and possible routes become a way to draw how people and places meet in time, not only where they sit on a map.",
          "In my charts, this model becomes artistic and analytical at the same time. The diagrams do not only calculate connection; they ask how a journey creates a temporary geography around the person who is moving.",
        ],
      },
      {
        heading: "Reference online",
        paragraphs: [
          "DOI link: https://www.tandfonline.com/doi/abs/10.1080/23729333.2023.2282280",
          "Published with Antoni Moore, University of Otago, Dunedin NZ.",
          "Working fragment for the website: movement is not only an event occurring inside space; it is one of the methods through which space becomes readable, relational, and emotionally charged.",
        ],
      },
    ],
  },
{
  number: "03",
  slug: "3d-reconstruction-digital-universe-archaeology",
  articleClassName: "article-page-archaeology",
  hideSectionHeadings: true,
  statusLabel: "not available yet",
  title: "3D reconstruction & digital universe in archaeology",
  category: "3D Design",
  readTime: "6 min",
  published: "May 2026",
  intro:
    "Digital reconstruction is changing how we revisit the past, opening doors that were previously closed to the wider public.",
  media: [
    {
      type: "image",
      src: "blog/archaeology-reconstruction-source.gif",
      alt: "Animated excerpt showing digital reconstruction material from the source video",
      caption: "",
      sourceLabel: "Source video",
      sourceUrl: "https://www.youtube.com/watch?v=_TO5Ls296uQ&t=8s",
    },
  ],
  sections: [
    {
      heading: "From documentation to experience",
      paragraphs: [
        `## From Ruins to Immersive Worlds

When we think about archaeology, we immediately have an image of ruins, a piece of stone, or a fragment of ceramic that once existed, which we try to interpret and place in its historical context. Each discovery might bring a new interpretation and a change in the established facts. Today’s technologies, such as 3D reconstruction and virtual reality, make these possible worlds even more visible, introducing us to an infinite number of simulations and scenarios that we can actually see.

Why is this actually helping us? Because we can test our hypotheses and run entire simulations to see if all the details fit.

### Examples:

In a recent study of the Parthenon, Juan de Lara (2025) explored how the ancient Greeks might have experienced the temple. Its orientation toward the rising sun, marble ceilings, windows, and reflective surfaces all influenced how light entered the space. Using 3D reconstruction and realistic lighting simulations, it was possible to recreate the temple's almost mysterious atmosphere, where the gold-and-ivory statue of Athena appeared dramatically from the darkness. Similarly, the 3D reconstruction of the House of Caecilius Iucundus in Pompeii allowed researchers to estimate the position and typology of the original architectural elements (www.pompejiprojektet.se/insula.php).

One of the most important techniques leading to the virtual reconstruction of monuments is photogrammetry. By combining hundreds of overlapping photographs, it produces highly accurate 3D models that become digital replicas of archaeological objects and sites. Moreover, the possibility of interacting with objects that visitors would normally never be allowed to touch is one of the most engaging aspects of virtual reality, especially when these virtual replicas are presented at the same scale as the original artefacts. In a study by Cassidy et al. (2019), a virtual reality reconstruction of Pleito Cave in California allowed participants to closely examine fragile rock art without physically visiting or disturbing the site. Some also described the experience of virtually picking up ancestral baskets as "mind-blowing" and admitted having "goose bumps" when holding them.

Today, one of the main challenges of virtual reconstruction lies in the limited accessibility and technical complexity of platforms such as Unreal Engine and Unity. As these tools become more intuitive and widely available, they may open unprecedented doors to the past, allowing us to explore the history of our civilizations in ways that were once unimaginable.

## Short bibliography

Cassidy, B., Sim, G., Robinson, D. W., & Gandy, D. (2019). A Virtual Reality Platform for Analyzing Remote Archaeological Sites. Interacting with Computers, 31(2), 167-176. https://doi.org/10.1093/iwc/iwz011

de Lara, J. (2025). Illuminating the Parthenon. Annual of the British School at Athens, 120, 321-366. https://doi.org/10.1017/S0068245424000145

Dell'Unto, N., Ferdani, D., Leander Touati, A.-M., Dellepiane, M., Callieri, M., & Lindgren, S. (2013). Digital reconstruction and visualization in archaeology: Case-study drawn from the work of the Swedish Pompeii Project. In 2013 Digital Heritage International Congress (pp. 621-628). IEEE. https://doi.org/10.1109/DIGITALHERITAGE.2013.6743804

The Swedish Pompeii Project. V 1,26 Casa di Caecilius Iucundus - South House. https://www.pompejiprojektet.se/insula-v-1/documentation-of-insula-v-1/archive-main-documentation/v-126-casa-di-caecilius-iucundus-south-house/`,
      ],
    },
  ],
},
  {
    number: "04",
    slug: "can-llm-read-as-good-as-humans",
    title: "What Do We Mean When We Say That an LLM Can “Read”?",
    category: "AI & Research",
    readTime: "10 min",
    published: "August 2026",
    intro: "Language models can retrieve, infer, and synthesize information—but is that the same as human reading?",
    sections: [
      {
        heading: "Reading comprehension in humans and machines",
        paragraphs: [
          "Before asking whether a large language model can read a book in Polish, French, or English, we first need to define what reading means.",
          "One way of defining what it means for an LLM to “read” is to compare it with how reading comprehension is tested throughout a person's education. While school examinations in a student’s mother tongue assume linguistic competence and test what the student can do with a text, foreign-language examinations test also both understanding of the language and understanding of what the text communicates.",
          "Evaluating LLMs is, to some extent, similar, although their capabilities are divided more systematically into different levels: retrieving information, retrieving information and making inferences from it, and synthesizing information across a text.",
        ],
      },
      {
        heading: "Three levels of machine “reading”",
        paragraphs: [
          "Using the kinds of tasks found in long-context benchmarks such as RULER, LongBench, and ∞Bench, we can illustrate these three levels as follows.",
          "Retrieval — The model is given a very long text containing the statement “The key is 92841” and is later asked, “What is the key?” It only needs to locate and reproduce information already present in the context. This corresponds to Needle-in-a-Haystack or passkey-retrieval tasks.",
          "Retrieval and inference — The relevant information is distributed across the context. For example: “Daniel gave the blue box to Maria.” “Maria gave it to Paul.” “Paul left it in the library.” When asked, “Where is the blue box?”, the model must retrieve several pieces of information and connect them to infer the answer: the library. RULER includes this kind of multi-hop tracing task, which goes beyond locating a single sentence (Hsieh et al., 2024).",
          "Synthesis — The model is given a long document or an entire book and asked to summarize it. There is no single passage containing “the answer.” The model must retrieve information from different parts of the text, determine what is important, integrate it, and produce a new, compressed representation.",
          "LongBench includes summarization alongside single-document and multi-document question answering, while ∞Bench extends long-context evaluation beyond 100,000 tokens and includes an English long-document summarization task (Bai et al., 2024; Zhang et al., 2024).",
          "These three levels are related, but success at one level does not guarantee success at the others. A model that can retrieve an isolated number from a book-length context may still struggle to reconstruct an argument or produce a faithful summary of the same text.",
        ],
      },
      {
        heading: "What happens when the answer does not exist?",
        paragraphs: [
          "OneRuler introduced an additional task called None-NIAH. This variant tests a model’s ability to recognize when no correct answer exists. The context contains four embedded “needles,” but all of them function as distractors. The model must acknowledge that the requested answer is absent instead of selecting an incorrect one (Kim et al., 2025).",
          "Because tasks such as None-NIAH inherently lack a valid answer, the researchers included the instruction: “If no such numbers exist, please answer ‘none’.”",
          "The researchers also included the same option in Single-NIAH, where the correct answer was always present. This small change made the task substantially more difficult.  Several models answered “none” even when the requested information appeared in the text (Kim et al., 2025).",
          "An LLM may fail not only by inventing an answer that is absent, but also by concluding that no answer exists when it has simply failed to retrieve the information.",
        ],
      },
      {
        heading: "Why performance changes with context length",
        paragraphs: [
          "One reason for poor performance is that models generally perform worse as context length increases. Earlier Transformer language models were often trained with relatively short context windows, commonly between 512 and 2,048 tokens. Improvements in hardware  and algorithms later produced models with larger context windows. However, the ability to accept a long input does not necessarily meant that a model can use every part of it reliably (Liu et al., 2024).",
          "For example, models with extended context windows could process longer inputs, but they still struggled with tasks requiring information to be connected or synthesized across those inputs.",
        ],
      },
      {
        heading: "The “lost in the middle” effect",
        paragraphs: [
          "There is another characteristic of long-context performance that is particularly important. Changing the position of relevant information in the input can substantially affect model performance.",
          "This behavious can be described by a pattern that often resembles a U-shaped performance curve: beginning — better performance; middle — worse performance; end — better performance.",
        ],
      },
      {
        heading: "Why do some languages outperform English?",
        paragraphs: [
          "The final layer of complexity comes from tokenization. OneRuler evaluated long-context performance across 26 languages. Surprisingly, English was not the best-performing language in its long-context retrieval tasks. At context lengths of 64,000 and 128,000 tokens, Polish achieved the highest average performance across the evaluated models, while English ranked sixth (Kim et al., 2025).",
          "LLMs do not process texts directly as words but as tokens, and expressing the same information in English and Polish may require different numbers of tokens. Because Polish is morphologically rich, some tokenizers might divide its words into more subwords units. Under a fixed token budget, a Polish NNeedle-in-a-Haystack task could therefore contain fewer words, and potentially fewer distractors, around the 'needle' than its English equivalent.",
          " This is, of course, my hypothesis rather than a conclusion established by the experiment. Token counts do not translate directly into an exact number of words, facts, or distractors, even thought they influence these quantities.",
        ],
      },
      {
        heading: "Conclusion: Almost like a human?",
        paragraphs: [
          "To sum up, an LLM can perform several operations that we usually associate with reading, but its performance is shaped differently from human reading. Almost like a human reader, it can appear to lose concentration in the middle of a longer text. Sometimes, when it cannot find a piece of information, it may even deny that the information exists at all.",
          "Almost like a human? Almost. :)",
          "Subscribe to my newsletter if you would like to read my next article about how LLMs retrieve information about users’ locations from GPS data.",
        ],
      },
      {
        heading: "References",
        paragraphs: [
          "Ahia, O., Kumar, S., Gonen, H., Kasai, J., Mortensen, D., Smith, N. A., & Tsvetkov, Y. (2023). Do all languages cost the same? Tokenization in the era of commercial language models. Proceedings of the 2023 Conference on Empirical Methods in Natural Language Processing, 9904–9923. Association for Computational Linguistics. https://doi.org/10.18653/v1/2023.emnlp-main.614",
          "Bai, Y., Lv, X., Zhang, J., Lyu, H., Tang, J., Huang, Z., Du, Z., Liu, X., Zeng, A., Hou, L., Dong, Y., Tang, J., & Li, J. (2024). LongBench: A bilingual, multitask benchmark for long context understanding. Proceedings of the 62nd Annual Meeting of the Association for Computational Linguistics (Volume 1: Long Papers), 3119–3137. Association for Computational Linguistics. https://doi.org/10.18653/v1/2024.acl-long.172",
          "Hsieh, C.-P., Sun, S., Kriman, S., Acharya, S., Rekesh, D., Jia, F., Zhang, Y., & Ginsburg, B. (2024). RULER: What’s the real context size of your long-context language models? Proceedings of the First Conference on Language Modeling. https://openreview.net/forum?id=kIoBbc76Sy",
          "Kim, Y., Russell, J., Karpinska, M., & Iyyer, M. (2025). One ruler to measure them all: Benchmarking multilingual long-context language models. Proceedings of the Second Conference on Language Modeling. https://openreview.net/forum?id=92e3dc9717e16c3eef5a257286d5143e9b5083dc",
          "Liu, N. F., Lin, K., Hewitt, J., Paranjape, A., Bevilacqua, M., Petroni, F., & Liang, P. (2024). Lost in the middle: How language models use long contexts. Transactions of the Association for Computational Linguistics, 12, 157–173. https://doi.org/10.1162/tacl_a_00638",
          "Zhang, X., Chen, Y., Hu, S., Xu, Z., Chen, J., Hao, M., Han, X., Thai, Z., Wang, S., Liu, Z., & Sun, M. (2024). ∞Bench: Extending long context evaluation beyond 100K tokens. Proceedings of the 62nd Annual Meeting of the Association for Computational Linguistics (Volume 1: Long Papers), 15262–15277. Association for Computational Linguistics. https://doi.org/10.18653/v1/2024.acl-long.814",
        ],
      },
    ],
  },
];
