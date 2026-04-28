export const synonymAntonymItems = [
  {
    id: "sa-1",
    word: "brave",
    type: "synonym",
    question: "Synonym of 'brave' is:",
    options: ["cowardly", "courageous", "weak", "lazy"],
    answer: "courageous",
    explanation: "Brave মানে সাহসী। এর synonym হলো courageous.",
  },
  {
    id: "sa-2",
    word: "ancient",
    type: "antonym",
    question: "Antonym of 'ancient' is:",
    options: ["old", "modern", "past", "historic"],
    answer: "modern",
    explanation: "Ancient মানে প্রাচীন। এর antonym হলো modern.",
  },
  {
    id: "sa-3",
    word: "increase",
    type: "antonym",
    question: "Antonym of 'increase' is:",
    options: ["grow", "rise", "decrease", "improve"],
    answer: "decrease",
    explanation: "Increase মানে বৃদ্ধি পাওয়া। এর বিপরীত decrease.",
  },
  {
    id: "sa-4",
    word: "honest",
    type: "synonym",
    question: "Synonym of 'honest' is:",
    options: ["truthful", "false", "weak", "careless"],
    answer: "truthful",
    explanation: "Honest মানে সৎ। এর synonym হলো truthful.",
  },
  {
    id: "sa-5",
    word: "difficult",
    type: "antonym",
    question: "Antonym of 'difficult' is:",
    options: ["hard", "easy", "complex", "serious"],
    answer: "easy",
    explanation: "Difficult মানে কঠিন। এর antonym হলো easy.",
  },
];

export const punctuationItems = [
  {
    id: "punct-1",
    wrong: "rahim said i am busy now",
    answer: "Rahim said, \"I am busy now.\"",
    explanation: "Name capital হবে, said-এর পরে comma, direct speech quotation mark-এর ভিতরে, I capital হবে।",
  },
  {
    id: "punct-2",
    wrong: "where do you live",
    answer: "Where do you live?",
    explanation: "প্রশ্নবোধক বাক্যের শেষে question mark বসে এবং প্রথম অক্ষর capital হয়।",
  },
  {
    id: "punct-3",
    wrong: "dhaka is the capital of bangladesh",
    answer: "Dhaka is the capital of Bangladesh.",
    explanation: "Proper noun Dhaka এবং Bangladesh capital হবে। বাক্যের শেষে full stop বসবে।",
  },
  {
    id: "punct-4",
    wrong: "he bought rice fish and vegetables",
    answer: "He bought rice, fish and vegetables.",
    explanation: "List-এর item আলাদা করতে comma ব্যবহার হয়। বাক্যের শুরু capital এবং শেষে full stop।",
  },
  {
    id: "punct-5",
    wrong: "alas he is dead",
    answer: "Alas! He is dead.",
    explanation: "Alas-এর পরে exclamation mark বসে। এরপর নতুন বাক্য capital দিয়ে শুরু হয়।",
  },
];

export const completingSentenceItems = [
  {
    id: "cs-1",
    sentence: "If I had enough money, ___.",
    answer: "I would buy a laptop",
    explanation: "Second conditional: If + past form, subject + would + base verb.",
  },
  {
    id: "cs-2",
    sentence: "Though he is poor, ___.",
    answer: "he is honest",
    explanation: "Though দিয়ে contrast বোঝায়। বাক্যের দ্বিতীয় অংশে বিপরীত ভাব আসবে।",
  },
  {
    id: "cs-3",
    sentence: "No sooner had the teacher entered the class than ___.",
    answer: "the students stood up",
    explanation: "No sooner ... than structure-এ than-এর পরে দ্বিতীয় ঘটনা বসে।",
  },
  {
    id: "cs-4",
    sentence: "It is high time ___.",
    answer: "we changed our bad habits",
    explanation: "It is high time-এর পরে past form ব্যবহার করা হয়।",
  },
  {
    id: "cs-5",
    sentence: "He studies hard so that ___.",
    answer: "he can pass the exam",
    explanation: "So that দিয়ে purpose বোঝায়। সাধারণত can/may/could/might ব্যবহার হয়।",
  },
];

export const wordsPhrasesItems = [
  {
    id: "wp-1",
    sentence: "___ of his poverty, he is honest.",
    answer: "in spite",
    explanation: "In spite of = সত্ত্বেও। Structure: In spite of + noun/pronoun.",
  },
  {
    id: "wp-2",
    sentence: "He is ___ to help the poor.",
    answer: "used",
    explanation: "Used to + verb = আগে অভ্যাস ছিল। Be used to + noun/verb-ing = অভ্যস্ত। এখানে সহজ practice হিসেবে used বসবে।",
  },
  {
    id: "wp-3",
    sentence: "___ he is weak, he works hard.",
    answer: "though",
    explanation: "Though = যদিও। দুইটি বিপরীত ভাব যুক্ত করতে ব্যবহৃত হয়।",
  },
  {
    id: "wp-4",
    sentence: "He ran fast ___ he could catch the train.",
    answer: "so that",
    explanation: "So that = যাতে। উদ্দেশ্য বোঝাতে ব্যবহৃত হয়।",
  },
  {
    id: "wp-5",
    sentence: "You had better ___ the truth.",
    answer: "tell",
    explanation: "Had better-এর পরে verb-এর base form বসে। তাই tell হবে।",
  },
];

export const wordsPhrasesBox = [
  "in spite",
  "used",
  "though",
  "so that",
  "tell",
  "because",
  "as if",
];

export const modifierItems = [
  {
    id: "mod-1",
    sentence: "___ students should be attentive in class.",
    answer: "all",
    explanation: "All students = সব শিক্ষার্থী। এখানে noun students-কে modify করছে।",
  },
  {
    id: "mod-2",
    sentence: "He is a ___ respected teacher.",
    answer: "highly",
    explanation: "Highly respected = অত্যন্ত সম্মানিত। Highly এখানে respected শব্দটিকে modify করছে।",
  },
  {
    id: "mod-3",
    sentence: "The man ___ in the field is a farmer.",
    answer: "working",
    explanation: "Working in the field = মাঠে কাজ করছে এমন ব্যক্তি। এটি man-কে describe করছে।",
  },
  {
    id: "mod-4",
    sentence: "___ by honesty, he became successful.",
    answer: "guided",
    explanation: "Guided by honesty = সততার দ্বারা পরিচালিত হয়ে। Past participle phrase modifier হিসেবে ব্যবহৃত হয়েছে।",
  },
  {
    id: "mod-5",
    sentence: "The girl ___ a red dress is my sister.",
    answer: "wearing",
    explanation: "Wearing a red dress = লাল পোশাক পরা। এটি girl-কে describe করছে।",
  },
];

export const narrationItems = [
  {
    id: "nar-1",
    direct: 'He said, "I am busy."',
    answer: "He said that he was busy.",
    explanation: "Present am → past was. Direct speech থেকে indirect speech করলে reporting verb past হলে tense backshift হয়.",
  },
  {
    id: "nar-2",
    direct: 'She said, "I have finished my work."',
    answer: "She said that she had finished her work.",
    explanation: "Present Perfect have finished → Past Perfect had finished.",
  },
  {
    id: "nar-3",
    direct: 'Rahim said to me, "Are you ready?"',
    answer: "Rahim asked me if I was ready.",
    explanation: "Yes/no question হলে said to → asked, এবং if/whether ব্যবহার হয়.",
  },
  {
    id: "nar-4",
    direct: 'The teacher said, "Do not make noise."',
    answer: "The teacher told us not to make noise.",
    explanation: "Imperative negative sentence হলে told + object + not to + verb ব্যবহার হয়.",
  },
  {
    id: "nar-5",
    direct: 'He said to me, "Where do you live?"',
    answer: "He asked me where I lived.",
    explanation: "WH question indirect speech-এ question order বদলে statement order হয়: where I lived.",
  },
];

export const applicationTasks = [
  {
    id: "app-1",
    title: "Application for setting up a computer club",
    question:
      "Write an application to the Principal of your college for setting up a computer club.",
    marks: 10,
    modelAnswer:
      "To\nThe Principal\nABC College, Dhaka\n\nSubject: Prayer for setting up a computer club.\n\nSir,\nWith due respect, we, the students of your college, beg to state that our college does not have a computer club. In this age of information and communication technology, a computer club is very important for students. It will help us learn computer skills, programming, internet use and digital communication.\n\nWe, therefore, pray and hope that you would be kind enough to take necessary steps to set up a computer club in our college.\n\nYours obediently,\nThe students of ABC College",
    keyPoints: [
      "Correct format",
      "Clear subject line",
      "Reason for application",
      "Polite request",
      "Proper closing",
    ],
  },
  {
    id: "app-2",
    title: "Application for increasing library facilities",
    question:
      "Write an application to the Principal of your college for increasing library facilities.",
    marks: 10,
    modelAnswer:
      "To\nThe Principal\nABC College, Dhaka\n\nSubject: Prayer for increasing library facilities.\n\nSir,\nWith due respect, we, the students of your college, beg to state that our college library does not have enough books and reading space. Many students cannot get necessary textbooks, reference books and newspapers. A better library will help us improve our knowledge and academic results.\n\nWe, therefore, pray and hope that you would be kind enough to take necessary steps to increase the library facilities of our college.\n\nYours obediently,\nThe students of ABC College",
    keyPoints: [
      "Mention the problem",
      "Explain why library facilities are needed",
      "Use formal tone",
      "Request politely",
      "Keep paragraphs clear",
    ],
  },
];

export const ictMcqItems = [
  {
    id: "ict-mcq-1",
    topic: "Global Village",
    question: "Who introduced the term 'Global Village'?",
    options: ["Bill Gates", "Marshall McLuhan", "Tim Berners-Lee", "Charles Babbage"],
    correctAnswer: 1,
    explanation:
      "Marshall McLuhan introduced the term Global Village to explain how electronic communication connects the world like one village.",
  },
  {
    id: "ict-mcq-2",
    topic: "Data Communication",
    question: "Which device is used to connect multiple networks together?",
    options: ["Router", "Keyboard", "Monitor", "Scanner"],
    correctAnswer: 0,
    explanation:
      "A router forwards data between different networks and helps devices communicate across network boundaries.",
  },
  {
    id: "ict-mcq-3",
    topic: "Data Communication",
    question: "Which transmission mode allows data to travel in both directions, but not at the same time?",
    options: ["Simplex", "Half-duplex", "Full-duplex", "Broadcast"],
    correctAnswer: 1,
    explanation:
      "In half-duplex mode, both sides can send and receive data, but only one side transmits at a time.",
  },
  {
    id: "ict-mcq-4",
    topic: "Number System",
    question: "What is the binary equivalent of decimal 10?",
    options: ["1000", "1010", "1100", "1110"],
    correctAnswer: 1,
    explanation:
      "Decimal 10 is 8 + 2, so its binary form is 1010.",
  },
  {
    id: "ict-mcq-5",
    topic: "Number System",
    question: "Which number system uses the digits 0 to 9 and A to F?",
    options: ["Binary", "Octal", "Decimal", "Hexadecimal"],
    correctAnswer: 3,
    explanation:
      "Hexadecimal is base 16, so it uses 0-9 and A-F to represent values.",
  },
  {
    id: "ict-mcq-6",
    topic: "HTML",
    question: "Which HTML tag is used to create a hyperlink?",
    options: ["<p>", "<a>", "<img>", "<table>"],
    correctAnswer: 1,
    explanation:
      "The <a> tag creates a hyperlink, usually with an href attribute.",
  },
  {
    id: "ict-mcq-7",
    topic: "Logic Gate",
    question: "Which logic gate gives output 1 only when all inputs are 1?",
    options: ["OR", "NOT", "AND", "XOR"],
    correctAnswer: 2,
    explanation:
      "An AND gate outputs 1 only if every input is 1.",
  },
  {
    id: "ict-mcq-8",
    topic: "Logic Gate",
    question: "Which gate reverses the input signal?",
    options: ["AND", "OR", "NOT", "NAND"],
    correctAnswer: 2,
    explanation:
      "A NOT gate is an inverter. It changes 1 to 0 and 0 to 1.",
  },
  {
    id: "ict-mcq-9",
    topic: "C Programming",
    question: "Which symbol is used to end a statement in C programming?",
    options: [",", ".", ";", ":"],
    correctAnswer: 2,
    explanation:
      "Most C statements end with a semicolon.",
  },
  {
    id: "ict-mcq-10",
    topic: "Database",
    question: "In a database table, what is a row usually called?",
    options: ["Field", "Record", "Column", "Query"],
    correctAnswer: 1,
    explanation:
      "A row in a database table is called a record. A column is called a field.",
  },
];

export const passageMCQTask = {
  title: "Passage MCQ",
  marks: 5,
  passage:
    "Trees are essential for our environment. They provide oxygen, food, and shelter. Without trees, life on earth would be impossible. However, people are cutting trees rapidly, which is causing environmental imbalance. We should plant more trees and protect our forests.",
  mcqs: [
    {
      id: "passage-mcq-1",
      question: "What do trees provide?",
      options: [
        "Oxygen, food, and shelter",
        "Only wood",
        "Only shade",
        "Cars and roads",
      ],
      correctAnswer: 0,
      explanation:
        "The passage says trees provide oxygen, food, and shelter.",
    },
    {
      id: "passage-mcq-2",
      question: "What happens without trees?",
      options: [
        "Life becomes easier",
        "Life on earth would be impossible",
        "There will be more forests",
        "People will need less oxygen",
      ],
      correctAnswer: 1,
      explanation:
        "The passage says that without trees, life on earth would be impossible.",
    },
    {
      id: "passage-mcq-3",
      question: "What is causing environmental imbalance?",
      options: [
        "Planting more trees",
        "Protecting forests",
        "Cutting trees rapidly",
        "Providing shelter",
      ],
      correctAnswer: 2,
      explanation:
        "Rapid cutting of trees is causing environmental imbalance.",
    },
    {
      id: "passage-mcq-4",
      question: "What should we do?",
      options: [
        "Cut more trees",
        "Ignore forests",
        "Use more paper",
        "Plant more trees and protect forests",
      ],
      correctAnswer: 3,
      explanation:
        "The passage tells us to plant more trees and protect our forests.",
    },
    {
      id: "passage-mcq-5",
      question: "What is the main idea of the passage?",
      options: [
        "Trees are important and should be protected",
        "People should cut forests",
        "Food is more important than oxygen",
        "Shelter is not necessary",
      ],
      correctAnswer: 0,
      explanation:
        "The main idea is that trees are essential for life and we should protect them.",
    },
  ],
};

export const passageBroadQuestionTask = {
  title: "Passage Broad Questions",
  marks: 15,
  passage:
    "Trees are essential for our environment. They provide oxygen, food, and shelter. Without trees, life on earth would be impossible. However, people are cutting trees rapidly, which is causing environmental imbalance. We should plant more trees and protect our forests.",
  questions: [
    {
      id: "broad-1",
      question: "Why are trees essential for our environment?",
      marks: 3,
      modelAnswer:
        "Trees are essential because they help keep the environment healthy and support life on earth.",
      keyPoints: ["healthy environment", "support life", "natural balance"],
    },
    {
      id: "broad-2",
      question: "What do trees provide us?",
      marks: 3,
      modelAnswer: "Trees provide us with oxygen, food, and shelter.",
      keyPoints: ["oxygen", "food", "shelter"],
    },
    {
      id: "broad-3",
      question: "What would happen without trees?",
      marks: 3,
      modelAnswer: "Without trees, life on earth would be impossible.",
      keyPoints: ["life impossible", "no proper oxygen", "environment harmed"],
    },
    {
      id: "broad-4",
      question: "What is causing environmental imbalance?",
      marks: 3,
      modelAnswer:
        "People are cutting trees rapidly, and this is causing environmental imbalance.",
      keyPoints: ["rapid tree cutting", "human activity", "imbalance"],
    },
    {
      id: "broad-5",
      question: "What should we do to protect nature?",
      marks: 3,
      modelAnswer:
        "We should plant more trees and protect our forests to protect nature.",
      keyPoints: ["plant trees", "protect forests", "stop cutting trees"],
    },
  ],
};

export const flowChartTask = {
  title: "Flow Chart / Information Transfer",
  marks: 5,
  pattern: "Board pattern: 5 blanks x 1 = 5 marks.",
  passage:
    "Trees are essential for our environment. They provide oxygen, food, and shelter. Without trees, life on earth would be impossible. However, people are cutting trees rapidly, which is causing environmental imbalance. We should plant more trees and protect our forests.",
  instruction:
    "Complete the flow chart with information from the passage.",
  start: "Importance of trees",
  items: [
    {
      id: "flow-1",
      number: 1,
      before: "provide",
      answer: "oxygen",
      explanation: "The passage says trees provide oxygen.",
    },
    {
      id: "flow-2",
      number: 2,
      before: "provide",
      answer: "food",
      explanation: "The passage says trees provide food.",
    },
    {
      id: "flow-3",
      number: 3,
      before: "provide",
      answer: "shelter",
      explanation: "The passage says trees provide shelter.",
    },
    {
      id: "flow-4",
      number: 4,
      before: "prevent environmental",
      answer: "imbalance",
      explanation:
        "Protecting trees helps prevent environmental imbalance.",
    },
    {
      id: "flow-5",
      number: 5,
      before: "we should protect",
      answer: "forests",
      explanation: "The passage says we should protect our forests.",
    },
  ],
};

export const clozeWithCluesTask = {
  title: "Cloze Test with Clues",
  marks: 5,
  wordBox: [
    "environment",
    "oxygen",
    "cutting",
    "forests",
    "protect",
    "balance",
    "rapidly",
  ],
  text:
    "Trees are very important for our (1) ___. They give us (2) ___ and help keep nature in (3) ___. But people are (4) ___ trees quickly. We should plant more trees and (5) ___ our forests.",
  blanks: [
    {
      id: "cloze-clues-1",
      number: 1,
      answer: "environment",
      explanation: "Trees are important for our environment.",
    },
    {
      id: "cloze-clues-2",
      number: 2,
      answer: "oxygen",
      explanation: "Trees give us oxygen.",
    },
    {
      id: "cloze-clues-3",
      number: 3,
      answer: "balance",
      explanation: "Trees help keep nature in balance.",
    },
    {
      id: "cloze-clues-4",
      number: 4,
      answer: "cutting",
      explanation: "People are cutting trees quickly.",
    },
    {
      id: "cloze-clues-5",
      number: 5,
      answer: "protect",
      explanation: "We should protect our forests.",
    },
  ],
};

export const clozeWithoutCluesTask = {
  title: "Cloze Test without Clues",
  marks: 10,
  pattern: "Board pattern: 10 gaps x 1 = 10 marks.",
  text:
    "Education is the backbone of a nation. It helps people become (1) ___ and responsible. A good student should be regular, attentive and (2) ___. Without education, no nation can (3) ___. So, every child should get the opportunity to go to (4) ___ and learn properly. Education removes darkness and brings (5) ___.",
  blanks: [
    {
      id: "cloze-no-clues-1",
      number: 1,
      answer: "skilled",
      explanation: "Education helps people become skilled and responsible.",
    },
    {
      id: "cloze-no-clues-2",
      number: 2,
      answer: "disciplined",
      explanation: "A good student should be disciplined.",
    },
    {
      id: "cloze-no-clues-3",
      number: 3,
      answer: "prosper",
      explanation: "No nation can prosper without education.",
    },
    {
      id: "cloze-no-clues-4",
      number: 4,
      answer: "school",
      explanation: "Every child should get the opportunity to go to school.",
    },
    {
      id: "cloze-no-clues-5",
      number: 5,
      answer: "light",
      explanation: "Education removes darkness and brings light.",
    },
  ],
};

export const rearrangingTask = {
  title: "Rearranging Sentences",
  marks: 10,
  instruction:
    "Rearrange the following sentences to make a meaningful story.",
  sentences: [
    { label: "a", text: "He saw a thirsty crow." },
    { label: "b", text: "The crow found a pitcher." },
    { label: "c", text: "Once there was a farmer." },
    { label: "d", text: "There was a little water at the bottom." },
    { label: "e", text: "The crow dropped stones into the pitcher." },
    { label: "f", text: "The water rose up." },
    { label: "g", text: "The crow drank the water." },
    { label: "h", text: "The farmer watched the clever crow." },
    { label: "i", text: "He became very surprised." },
    { label: "j", text: "The crow flew away happily." },
  ],
  answerId: "rearrange-1",
  correctOrder: ["c", "a", "b", "d", "e", "f", "g", "h", "i", "j"],
  explanation:
    "The story starts with the farmer, then the crow finds water, drops stones, drinks the water, and finally flies away.",
};

export const paragraphTasks = [
  {
    id: "para-1",
    title: "The Importance of Moral Values",
    question: "Write a paragraph on the importance of moral values.",
    marks: 15,
    modelAnswer:
      "Moral values are the good qualities that help us become honest, kind and responsible. They teach us to respect others, speak the truth and do our duties properly. A person with moral values can choose right from wrong. These values are first learned from family and later developed in school and society. Without moral values, people become selfish and society becomes unsafe. So, every student should practise moral values in daily life.",
    keyPoints: [
      "Meaning of moral values",
      "Honesty, kindness and responsibility",
      "Role of family and school",
      "Importance for society",
      "Simple concluding sentence",
    ],
  },
  {
    id: "para-2",
    title: "Frequent Road Accidents in Bangladesh",
    question: "Write a paragraph on frequent road accidents in Bangladesh.",
    marks: 15,
    modelAnswer:
      "Road accidents are a serious problem in Bangladesh. Every day many people are injured or killed on roads. The main causes are careless driving, over-speeding, unfit vehicles, weak traffic rules and lack of awareness among drivers and pedestrians. Road accidents bring great suffering to families and damage the country. To reduce accidents, traffic laws must be followed strictly. Drivers should be trained, roads should be improved and everyone should be careful while using roads.",
    keyPoints: [
      "Road accidents as a serious problem",
      "Main causes",
      "Effects on people and families",
      "Traffic law and driver training",
      "Awareness and careful road use",
    ],
  },
];

export const compositionTasks = [
  {
    id: "comp-1",
    title: "The Uses and Abuses of Internet",
    question: "Write a composition on the uses and abuses of internet.",
    marks: 15,
    modelAnswer:
      "Internet is one of the greatest inventions of modern science. It helps us collect information, communicate with others, attend online classes and do many official works. Students can use it to learn new things and prepare their lessons. But internet also has some abuses. Some people waste time on social media, play games too much or visit harmful websites. It can also spread false information. So, we should use internet carefully and only for good purposes.",
    keyPoints: [
      "Meaning and importance of internet",
      "Educational uses",
      "Communication and daily work",
      "Abuses and harmful sides",
      "Careful and positive use",
    ],
  },
  {
    id: "comp-2",
    title: "Student Life",
    question: "Write a composition on student life.",
    marks: 15,
    modelAnswer:
      "Student life is the most important period of human life. It is the time for learning, building character and preparing for the future. A student should study regularly, respect teachers and parents, and follow discipline. Student life is not only for reading books; it is also for learning honesty, punctuality and good manners. Students should take part in games and social activities too. If students use this time properly, they can become good citizens and serve the country.",
    keyPoints: [
      "Importance of student life",
      "Regular study and discipline",
      "Respect for teachers and parents",
      "Good character and manners",
      "Preparation for future life",
    ],
  },
];

export const graphAnalysisTasks = [
  {
    id: "graph-1",
    title: "Graph / Chart Analysis",
    question: "Describe the graph/chart in 150 words.",
    marks: 15,
    table: {
      headers: ["Year", "Internet Users (%)"],
      rows: [
        ["2018", "45"],
        ["2019", "50"],
        ["2020", "58"],
        ["2021", "65"],
        ["2022", "72"],
      ],
    },
    modelAnswer:
      "The chart shows the percentage of internet users from 2018 to 2022. In 2018, internet users were 45%. The number increased to 50% in 2019 and 58% in 2020. The rising trend continued in 2021, when it reached 65%. Finally, in 2022, the percentage became 72%. The chart clearly shows a steady increase every year. The highest percentage was in 2022 and the lowest was in 2018. So, it can be said that internet use increased rapidly during these five years.",
    keyPoints: [
      "introduction",
      "trend description",
      "comparison",
      "conclusion",
    ],
  },
];

export const summaryTasks = [
  {
    id: "summary-1",
    title: "Summary Writing",
    question: "Write a summary of the given text in your own words.",
    passage:
      "Money is useful, but it should be spent wisely. Many students spend money on things they do not really need. They may buy extra snacks, costly clothes or unnecessary mobile data. This habit can create problems later. A wise person makes a plan before spending money. We should first spend on necessary things such as food, books, education and health. We should also save a little money for future needs. Spending wisely teaches us discipline and helps us live a better life.",
    marks: 10,
    modelAnswer:
      "Money should be used carefully. We should avoid spending on unnecessary things and make a plan before buying anything. Necessary needs like food, education, books and health should come first. Saving some money is also important. Wise spending makes us disciplined and helps us in future.",
    keyPoints: [
      "Use your own words",
      "Keep only the main ideas",
      "Avoid examples and extra details",
      "Make it shorter than the passage",
      "Write in clear sentences",
    ],
  },
];

export const storyCompletionTasks = [
  {
    id: "story-1",
    title: "Story Completion",
    question: "Complete the story in about 150 words.",
    storyBeginning:
      "Once there lived a poor farmer in a village. He had a small piece of land. He worked hard every day, but he could not earn enough money for his family. One day, while working in the field, he found a small bag under a tree...",
    marks: 15,
    modelAnswer:
      "He opened the bag and found some gold coins inside it. At first, he became very happy. He thought that the money would solve all his problems. But soon he remembered that the bag might belong to someone else. So, he went to the village headman and gave him the bag. After some time, a rich man came there and said that he had lost his bag. The headman returned it to him. The rich man was pleased with the farmer's honesty and gave him a reward. The farmer returned home happily. From that day, everyone in the village respected him. Honesty is always rewarded.",
    keyPoints: [
      "continue from the given beginning",
      "keep story logical",
      "use simple past tense",
      "give a clear ending",
      "include a moral if possible",
    ],
  },
];

export const informalLetterTasks = [
  {
    id: "informal-1",
    title: "Email about HSC Exam Preparation",
    question:
      "Write an email to your friend about your preparation for the HSC exam.",
    marks: 10,
    modelAnswer:
      "To: friend@example.com\nSubject: My HSC exam preparation\n\nDear Rafi,\nI hope you are well. My HSC exam preparation is going on well. I have made a daily routine and I am following it carefully. I revise English, ICT and other subjects every day. I also solve board questions to understand the exam pattern. Please pray for me so that I can do well in the exam.\n\nYour friend,\nSadia",
    keyPoints: [
      "Email address and subject",
      "Friendly greeting",
      "Preparation routine",
      "Board question practice",
      "Proper closing",
    ],
  },
  {
    id: "informal-2",
    title: "Informal Letter about Learning ICT",
    question:
      "Write an informal letter to your friend describing the importance of learning ICT.",
    marks: 10,
    modelAnswer:
      "Dear Rafi,\nI hope you are fine. Today I want to tell you about the importance of learning ICT. ICT helps us use computers, internet and digital tools properly. It is useful for study, communication and future jobs. A student who knows ICT can collect information quickly and learn many new things online. So, we should learn ICT with care.\n\nNo more today. Write to me soon.\n\nYour loving friend,\nSadia",
    keyPoints: [
      "Friendly opening",
      "Importance of ICT",
      "Uses in study and communication",
      "Future job benefits",
      "Informal closing",
    ],
  },
];

export const eng2FullExamData = {
  title: "English 2nd Paper Full Test",
  totalMarks: 100,
  durationSeconds: 5400,
  grammarTotal: 60,
  compositionTotal: 40,
  autoTotal: 53,
  manualTotal: 47,
  q1: {
    title: "Q1 Prepositions",
    marks: 5,
    type: "text",
    instruction: "Fill in the blanks with suitable prepositions.",
    items: [
      {
        id: "eng2full-q1-1",
        sentence: "The farmer is looking ___ his lost cow.",
        answer: "for",
        explanation: "Look for means to search for something.",
      },
      {
        id: "eng2full-q1-2",
        sentence: "I have no interest ___ politics.",
        answer: "in",
        explanation: "Interest is followed by the preposition in.",
      },
      {
        id: "eng2full-q1-3",
        sentence: "She is good ___ mathematics.",
        answer: "at",
        explanation: "Good at is used before a subject or skill.",
      },
      {
        id: "eng2full-q1-4",
        sentence: "He suffered ___ fever.",
        answer: "from",
        explanation: "Suffer from is used for illness or trouble.",
      },
      {
        id: "eng2full-q1-5",
        sentence: "The teacher was pleased ___ my result.",
        answer: "with",
        explanation: "Pleased with means satisfied with something.",
      },
    ],
  },
  q2: {
    title: "Q2 Words/Phrases",
    marks: 5,
    type: "select",
    instruction: "Complete the sentences using suitable words or phrases from the box.",
    wordBox: [
      "in order to",
      "as soon as",
      "had better",
      "let alone",
      "would rather",
      "because of",
      "according to",
    ],
    items: [
      {
        id: "eng2full-q2-1",
        sentence: "He studies hard ___ pass the examination.",
        answer: "in order to",
        explanation: "In order to is used to express purpose.",
      },
      {
        id: "eng2full-q2-2",
        sentence: "___ I reached the station, the train left.",
        answer: "as soon as",
        explanation: "As soon as means immediately after.",
      },
      {
        id: "eng2full-q2-3",
        sentence: "You ___ consult a doctor.",
        answer: "had better",
        explanation: "Had better is used to give strong advice.",
      },
      {
        id: "eng2full-q2-4",
        sentence: "He cannot buy a pen, ___ a book.",
        answer: "let alone",
        explanation: "Let alone is used to mean something is even less possible.",
      },
      {
        id: "eng2full-q2-5",
        sentence: "I ___ stay home than go out today.",
        answer: "would rather",
        explanation: "Would rather is used to express preference.",
      },
    ],
  },
  q3: {
    title: "Q3 Completing Sentences",
    marks: 10,
    type: "text",
    instruction: "Complete the sentences with suitable clauses or phrases.",
    items: [
      {
        id: "eng2full-q3-1",
        sentence: "If I were rich, ___.",
        answer: "I would help the poor",
        explanation: "Second conditional uses would plus base verb.",
      },
      {
        id: "eng2full-q3-2",
        sentence: "Though it was raining, ___.",
        answer: "we went to school",
        explanation: "Though introduces contrast.",
      },
      {
        id: "eng2full-q3-3",
        sentence: "No sooner had he seen the police than ___.",
        answer: "he ran away",
        explanation: "No sooner is followed by than.",
      },
      {
        id: "eng2full-q3-4",
        sentence: "It is high time ___.",
        answer: "we started the work",
        explanation: "It is high time is followed by a past form.",
      },
      {
        id: "eng2full-q3-5",
        sentence: "Unless you work hard, ___.",
        answer: "you will fail",
        explanation: "Unless means if not.",
      },
      {
        id: "eng2full-q3-6",
        sentence: "Read attentively so that ___.",
        answer: "you can answer the questions",
        explanation: "So that expresses purpose.",
      },
      {
        id: "eng2full-q3-7",
        sentence: "The man who came yesterday ___.",
        answer: "is my uncle",
        explanation: "The relative clause describes the subject.",
      },
      {
        id: "eng2full-q3-8",
        sentence: "He talks as if ___.",
        answer: "he knew everything",
        explanation: "As if often takes a past form for unreal meaning.",
      },
      {
        id: "eng2full-q3-9",
        sentence: "I wish ___.",
        answer: "I could fly",
        explanation: "Wish can express an unreal desire.",
      },
      {
        id: "eng2full-q3-10",
        sentence: "Scarcely had we reached home when ___.",
        answer: "it began to rain",
        explanation: "Scarcely is followed by when.",
      },
    ],
  },
  q4: {
    title: "Q4 Right Form of Verbs",
    marks: 7,
    type: "text",
    instruction: "Use the correct form of the verbs in brackets.",
    items: [
      {
        id: "eng2full-q4-1",
        sentence: "He usually ___ (go) to bed early.",
        answer: "goes",
        explanation: "Usually indicates present indefinite; he takes goes.",
      },
      {
        id: "eng2full-q4-2",
        sentence: "The train ___ (leave) before we reached the station.",
        answer: "had left",
        explanation: "The earlier past action takes past perfect.",
      },
      {
        id: "eng2full-q4-3",
        sentence: "If I ___ (be) you, I would not do it.",
        answer: "were",
        explanation: "Were is used in imaginary conditional sentences.",
      },
      {
        id: "eng2full-q4-4",
        sentence: "She ___ (read) when I called her.",
        answer: "was reading",
        explanation: "A continuing past action takes past continuous.",
      },
      {
        id: "eng2full-q4-5",
        sentence: "Let the matter ___ (discuss).",
        answer: "be discussed",
        explanation: "Passive form after let is be plus past participle.",
      },
      {
        id: "eng2full-q4-6",
        sentence: "I saw him ___ (walk) along the road.",
        answer: "walking",
        explanation: "After verbs of perception, an ongoing action may take verb-ing.",
      },
      {
        id: "eng2full-q4-7",
        sentence: "The letter was ___ (write) yesterday.",
        answer: "written",
        explanation: "Passive voice uses past participle.",
      },
    ],
  },
  q5: {
    title: "Q5 Narration",
    marks: 7,
    type: "textarea",
    instruction: "Change the following passage into indirect speech.",
    direct:
      'Rafi said to me, "Where are you going?" I said, "I am going to the library." He said, "May I go with you?"',
    answer:
      "Rafi asked me where I was going. I replied that I was going to the library. He asked if he might go with me.",
    explanation:
      "Check reporting verbs, pronouns, tense changes, and statement word order.",
  },
  q6: {
    title: "Q6 Modifiers",
    marks: 5,
    type: "text",
    instruction: "Fill in the blanks with suitable modifiers.",
    items: [
      {
        id: "eng2full-q6-1",
        sentence: "The ___ boy helped the old man.",
        answer: "kind",
        explanation: "Kind modifies boy.",
      },
      {
        id: "eng2full-q6-2",
        sentence: "He came ___ to school.",
        answer: "early",
        explanation: "Early modifies the verb came.",
      },
      {
        id: "eng2full-q6-3",
        sentence: "___ by hunger, the child cried.",
        answer: "driven",
        explanation: "Driven by hunger is a participle phrase.",
      },
      {
        id: "eng2full-q6-4",
        sentence: "The girl ___ on the stage is my sister.",
        answer: "singing",
        explanation: "Singing on the stage modifies girl.",
      },
      {
        id: "eng2full-q6-5",
        sentence: "I saw a bird ___ in the sky.",
        answer: "flying",
        explanation: "Flying in the sky modifies bird.",
      },
    ],
  },
  q7: {
    title: "Q7 Connectors",
    marks: 7,
    type: "select",
    instruction: "Use suitable connectors to complete the sentences.",
    wordBox: [
      "however",
      "therefore",
      "moreover",
      "otherwise",
      "although",
      "as a result",
      "first",
    ],
    items: [
      {
        id: "eng2full-q7-1",
        sentence: "He was tired. ___, he continued his work.",
        answer: "however",
        explanation: "However shows contrast.",
      },
      {
        id: "eng2full-q7-2",
        sentence: "He worked hard. ___, he succeeded.",
        answer: "therefore",
        explanation: "Therefore shows result.",
      },
      {
        id: "eng2full-q7-3",
        sentence: "Trees give us oxygen. ___, they protect the environment.",
        answer: "moreover",
        explanation: "Moreover adds another point.",
      },
      {
        id: "eng2full-q7-4",
        sentence: "Walk fast. ___, you will miss the bus.",
        answer: "otherwise",
        explanation: "Otherwise means if not.",
      },
      {
        id: "eng2full-q7-5",
        sentence: "___ he is poor, he is honest.",
        answer: "although",
        explanation: "Although introduces contrast.",
      },
      {
        id: "eng2full-q7-6",
        sentence: "It rained heavily. ___, the roads were flooded.",
        answer: "as a result",
        explanation: "As a result introduces the consequence.",
      },
      {
        id: "eng2full-q7-7",
        sentence: "___, read the question carefully.",
        answer: "first",
        explanation: "First marks the beginning of a sequence.",
      },
    ],
  },
  q8: {
    title: "Q8 Synonym/Antonym",
    marks: 7,
    type: "option",
    instruction: "Choose the correct synonym or antonym.",
    items: [
      {
        id: "eng2full-q8-1",
        question: "Synonym of 'brave' is:",
        options: ["weak", "courageous", "careless", "lazy"],
        answer: "courageous",
        explanation: "Brave means courageous.",
      },
      {
        id: "eng2full-q8-2",
        question: "Antonym of 'ancient' is:",
        options: ["old", "historic", "modern", "past"],
        answer: "modern",
        explanation: "Modern is the opposite of ancient.",
      },
      {
        id: "eng2full-q8-3",
        question: "Antonym of 'expand' is:",
        options: ["increase", "spread", "shrink", "extend"],
        answer: "shrink",
        explanation: "Shrink is the opposite of expand.",
      },
      {
        id: "eng2full-q8-4",
        question: "Synonym of 'liberty' is:",
        options: ["freedom", "bondage", "duty", "fear"],
        answer: "freedom",
        explanation: "Liberty means freedom.",
      },
      {
        id: "eng2full-q8-5",
        question: "Antonym of 'honest' is:",
        options: ["truthful", "sincere", "dishonest", "fair"],
        answer: "dishonest",
        explanation: "Dishonest is the opposite of honest.",
      },
      {
        id: "eng2full-q8-6",
        question: "Synonym of 'tiny' is:",
        options: ["large", "small", "wide", "heavy"],
        answer: "small",
        explanation: "Tiny means very small.",
      },
      {
        id: "eng2full-q8-7",
        question: "Antonym of 'temporary' is:",
        options: ["short", "brief", "permanent", "quick"],
        answer: "permanent",
        explanation: "Permanent is the opposite of temporary.",
      },
    ],
  },
  q9: {
    title: "Q9 Punctuation",
    marks: 7,
    type: "text",
    instruction: "Rewrite the sentences using correct punctuation and capitalization.",
    items: [
      {
        id: "eng2full-q9-1",
        sentence: "rahim said i am ill",
        answer: 'Rahim said, "I am ill."',
        explanation: "Use a capital letter, comma, quotation marks, and full stop.",
      },
      {
        id: "eng2full-q9-2",
        sentence: "where are you going",
        answer: "Where are you going?",
        explanation: "A question begins with a capital letter and ends with a question mark.",
      },
      {
        id: "eng2full-q9-3",
        sentence: "dhaka is a big city",
        answer: "Dhaka is a big city.",
        explanation: "A proper noun begins with a capital letter and the sentence ends with a full stop.",
      },
      {
        id: "eng2full-q9-4",
        sentence: "alas the man is dead",
        answer: "Alas! The man is dead.",
        explanation: "Alas is followed by an exclamation mark.",
      },
      {
        id: "eng2full-q9-5",
        sentence: "he bought rice fish and oil",
        answer: "He bought rice, fish and oil.",
        explanation: "Use commas to separate items in a list.",
      },
      {
        id: "eng2full-q9-6",
        sentence: "mother said to me obey your teachers",
        answer: 'Mother said to me, "Obey your teachers."',
        explanation: "Direct speech needs a comma and quotation marks.",
      },
      {
        id: "eng2full-q9-7",
        sentence: "the padma the meghna and the jamuna are rivers",
        answer: "The Padma, the Meghna and the Jamuna are rivers.",
        explanation: "Proper nouns need capital letters, and list items need commas.",
      },
    ],
  },
  q10: {
    id: "eng2full-q10",
    title: "Q10 Application",
    marks: 10,
    question:
      "Write an application to the Principal of your college for setting up a computer club.",
    modelAnswer:
      "To\nThe Principal\nABC College, Dhaka\n\nSubject: Prayer for setting up a computer club.\n\nSir,\nWith due respect, we, the students of your college, beg to state that our college does not have a computer club. A computer club will help students learn ICT, programming, internet use and digital communication. It will also make our study more practical and useful.\n\nWe, therefore, pray and hope that you would be kind enough to take necessary steps to set up a computer club in our college.\n\nYours obediently,\nThe students of ABC College",
    keyPoints: ["formal format", "subject line", "clear reason", "polite request", "proper closing"],
  },
  q11: {
    id: "eng2full-q11",
    title: "Q11 Paragraph",
    marks: 15,
    question: "Write a paragraph on Duties of a Student.",
    modelAnswer:
      "A student has many duties. The main duty of a student is to study regularly and prepare lessons properly. A student should attend classes, respect teachers, obey parents and follow discipline. Students should also be honest, punctual and helpful to others. They should keep their school clean and take part in games and social work. A good student uses time properly and avoids bad company. By performing these duties, students can build a bright future and serve the country.",
    keyPoints: ["regular study", "respect and discipline", "good character", "proper use of time", "service to society"],
  },
  q12: {
    id: "eng2full-q12",
    title: "Q12 Paragraph",
    marks: 15,
    question: "Write a paragraph on Tree Plantation.",
    modelAnswer:
      "Tree plantation means planting trees in a planned way. Trees are very important for our life and environment. They give us oxygen, food, fruits, wood and shade. They also protect us from floods, droughts and soil erosion. But many people cut trees carelessly, and this harms nature. So, we should plant more trees around our houses, roads, schools and open places. The government and people should work together to make tree plantation successful.",
    keyPoints: ["meaning", "importance of trees", "environmental benefits", "problem of cutting trees", "need to plant more trees"],
  },
};
