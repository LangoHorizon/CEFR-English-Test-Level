 document.addEventListener('DOMContentLoaded', function() {
            // DOM Elements
            const startTestBtn = document.getElementById('start-test');
            const introScreen = document.getElementById('intro-screen');
            const testScreen = document.getElementById('test-screen');
            const resultsScreen = document.getElementById('results-screen');
            const questionText = document.getElementById('question-text');
            const optionsContainer = document.getElementById('options-container');
            const currentQuestionDisplay = document.getElementById('current-question');
            const currentSectionDisplay = document.getElementById('current-section');
            const progressFill = document.querySelector('.progress-fill');
            const prevQuestionBtn = document.getElementById('prev-question');
            const nextQuestionBtn = document.getElementById('next-question');
            const submitTestBtn = document.getElementById('submit-test');
            const retakeTestBtn = document.getElementById('retake-test');
            const quitTestBtn = document.getElementById('quit-test');
            const confirmQuitBtn = document.getElementById('confirm-quit');
            const cancelQuitBtn = document.getElementById('cancel-quit');
            const reportQuestionBtn = document.getElementById('report-question');
            const submitReportBtn = document.getElementById('submit-report');
            const cancelReportBtn = document.getElementById('cancel-report');
            const quitModal = document.getElementById('quit-modal');
            const reportModal = document.getElementById('report-modal');
            const levelIndicator = document.getElementById('level-indicator');
            const levelDescription = document.getElementById('level-description');
            const totalTestsDisplay = document.getElementById('total-tests');
            
            // Test variables
            let currentQuestion = 0;
            let answers = [];
            let testStarted = false;
            
            // Track test starts
            function incrementTestCounter() {
                let testsTaken = localStorage.getItem('langohorizonTestsTaken') || 0;
                testsTaken = parseInt(testsTaken) + 1;
                localStorage.setItem('langohorizonTestsTaken', testsTaken);
                totalTestsDisplay.textContent = testsTaken.toLocaleString();
                
                // Animate the counter
                animateValue(totalTestsDisplay, 0, testsTaken, 1000);
            }
            
            function animateValue(element, start, end, duration) {
                let startTimestamp = null;
                const step = (timestamp) => {
                    if (!startTimestamp) startTimestamp = timestamp;
                    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                    element.textContent = Math.floor(progress * (end - start) + start).toLocaleString();
                    if (progress < 1) {
                        window.requestAnimationFrame(step);
                    }
                };
                window.requestAnimationFrame(step);
            }
            
            // Initialize test counter
            function initTestCounter() {
                let testsTaken = localStorage.getItem('langohorizonTestsTaken') || 0;
                totalTestsDisplay.textContent = parseInt(testsTaken).toLocaleString();
            }
            
            initTestCounter();
            
            // Sample test questions (50 questions divided into 4 sections)
            const questions = [
                // Section 1: A1 Level (Questions 1-12)
                {
                    id: 1,
                    section: 1,
                    skill: 'grammar',
                    text: "Which sentence is correct?",
                    options: [
                        "She go to school every day.",
                        "She goes to school every day.",
                        "She going to school every day.",
                        "She is go to school every day."
                    ],
                    correct: 1
                },
                {
                    id: 2,
                    section: 1,
                    skill: 'vocabulary',
                    text: "What is the opposite of 'happy'?",
                    options: [
                        "Angry",
                        "Sad",
                        "Excited",
                        "Tired"
                    ],
                    correct: 1
                },
                {
                    id: 3,
                    section: 1,
                    skill: 'reading',
                    text: "Read this sentence: 'The cat is on the mat.' Where is the cat?",
                    options: [
                        "Under the mat",
                        "Next to the mat",
                        "On the mat",
                        "Above the mat"
                    ],
                    correct: 2
                },
                {
                    id: 4,
                    section: 1,
                    skill: 'writing',
                    text: "Which is the correct way to write this sentence?",
                    options: [
                        "my friend lives in paris",
                        "My friend lives in Paris.",
                        "My friend live in Paris",
                        "my Friend lives in paris."
                    ],
                    correct: 1
                },
                {
                    id: 5,
                    section: 1,
                    skill: 'grammar',
                    text: "Which word completes the sentence? I ___ a student.",
                    options: [
                        "is",
                        "are",
                        "am",
                        "be"
                    ],
                    correct: 2
                },
                {
                    id: 6,
                    section: 1,
                    skill: 'vocabulary',
                    text: "What do you call the room where you sleep?",
                    options: [
                        "Kitchen",
                        "Bathroom",
                        "Bedroom",
                        "Living room"
                    ],
                    correct: 2
                },
                {
                    id: 7,
                    section: 1,
                    skill: 'reading',
                    text: "Read this notice: 'NO PARKING'. What does it mean?",
                    options: [
                        "You can park here",
                        "You cannot park here",
                        "Parking is free here",
                        "Parking is expensive here"
                    ],
                    correct: 1
                },
                {
                    id: 8,
                    section: 1,
                    skill: 'writing',
                    text: "Which sentence has correct punctuation?",
                    options: [
                        "What time is it.",
                        "what time is it?",
                        "What time is it?",
                        "What time is it"
                    ],
                    correct: 2
                },
                {
                    id: 9,
                    section: 1,
                    skill: 'grammar',
                    text: "Choose the correct plural form: one book, two ___",
                    options: [
                        "book",
                        "bookes",
                        "books",
                        "bookies"
                    ],
                    correct: 2
                },
                {
                    id: 10,
                    section: 1,
                    skill: 'vocabulary',
                    text: "Which word means 'not expensive'?",
                    options: [
                        "Cheap",
                        "Small",
                        "Heavy",
                        "Fast"
                    ],
                    correct: 0
                },
                {
                    id: 11,
                    section: 1,
                    skill: 'reading',
                    text: "Read this: 'The meeting is at 3:00 PM.' When is the meeting?",
                    options: [
                        "In the morning",
                        "At noon",
                        "In the afternoon",
                        "In the evening"
                    ],
                    correct: 2
                },
                {
                    id: 12,
                    section: 1,
                    skill: 'writing',
                    text: "Which is the correct way to write a date?",
                    options: [
                        "March 10 2023",
                        "march 10, 2023",
                        "March 10, 2023",
                        "March 10th 2023"
                    ],
                    correct: 2
                },
                
                // Section 2: A2 Level (Questions 13-24)
                {
                    id: 13,
                    section: 2,
                    skill: 'grammar',
                    text: "Which sentence uses the past tense correctly?",
                    options: [
                        "I eat dinner at 7 PM yesterday.",
                        "I eaten dinner at 7 PM yesterday.",
                        "I ate dinner at 7 PM yesterday.",
                        "I did ate dinner at 7 PM yesterday."
                    ],
                    correct: 2
                },
                {
                    id: 14,
                    section: 2,
                    skill: 'vocabulary',
                    text: "What is the meaning of 'generous'?",
                    options: [
                        "Willing to give or share",
                        "Very intelligent",
                        "Always on time",
                        "Physically strong"
                    ],
                    correct: 0
                },
                {
                    id: 15,
                    section: 2,
                    skill: 'reading',
                    text: "Read this: 'Despite the rain, we decided to go for a walk.' What does this mean?",
                    options: [
                        "We went for a walk because it was raining",
                        "We didn't go for a walk because of the rain",
                        "We went for a walk even though it was raining",
                        "We waited for the rain to stop before walking"
                    ],
                    correct: 2
                },
                {
                    id: 16,
                    section: 2,
                    skill: 'writing',
                    text: "Which sentence is correctly structured?",
                    options: [
                        "Although it was late, but we decided to go out.",
                        "Although it was late, we decided to go out.",
                        "It was late, although we decided to go out.",
                        "We decided to go out, although it was late but."
                    ],
                    correct: 1
                },
                {
                    id: 17,
                    section: 2,
                    skill: 'grammar',
                    text: "Choose the correct comparative form: 'This book is ___ than that one.'",
                    options: [
                        "interesting",
                        "more interesting",
                        "interestinger",
                        "most interesting"
                    ],
                    correct: 1
                },
                {
                    id: 18,
                    section: 2,
                    skill: 'vocabulary',
                    text: "What does 'furious' mean?",
                    options: [
                        "Very happy",
                        "Very angry",
                        "Very tired",
                        "Very surprised"
                    ],
                    correct: 1
                },
                {
                    id: 19,
                    section: 2,
                    skill: 'reading',
                    text: "Read this notice: 'All passengers must present their boarding passes before proceeding to security.' What must passengers do?",
                    options: [
                        "Go directly to security",
                        "Show their boarding passes first",
                        "Buy their boarding passes",
                        "Wait for an announcement"
                    ],
                    correct: 1
                },
                {
                    id: 20,
                    section: 2,
                    skill: 'writing',
                    text: "Which is the correct way to write an informal email greeting?",
                    options: [
                        "Dear Mr. Smith,",
                        "To whom it may concern,",
                        "Hi John,",
                        "Respected Sir,"
                    ],
                    correct: 2
                },
                {
                    id: 21,
                    section: 2,
                    skill: 'grammar',
                    text: "Which sentence uses the present perfect correctly?",
                    options: [
                        "I have seen that movie yesterday.",
                        "I have see that movie.",
                        "I have seen that movie.",
                        "I seen that movie."
                    ],
                    correct: 2
                },
                {
                    id: 22,
                    section: 2,
                    skill: 'vocabulary',
                    text: "What is a synonym for 'begin'?",
                    options: [
                        "Finish",
                        "Start",
                        "Continue",
                        "Pause"
                    ],
                    correct: 1
                },
                {
                    id: 23,
                    section: 2,
                    skill: 'reading',
                    text: "Read this: 'The instructions were ambiguous, so I wasn't sure what to do.' What does 'ambiguous' mean?",
                    options: [
                        "Clear and precise",
                        "Difficult to understand",
                        "Unclear or having multiple meanings",
                        "Written in another language"
                    ],
                    correct: 2
                },
                {
                    id: 24,
                    section: 2,
                    skill: 'writing',
                    text: "Which sentence correctly uses a conjunction?",
                    options: [
                        "I wanted to go out, it was raining.",
                        "I wanted to go out but it was raining.",
                        "I wanted to go out, but it was raining.",
                        "I wanted to go out, however it was raining."
                    ],
                    correct: 2
                },
                
                // Section 3: B1 Level (Questions 25-36)
                {
                    id: 25,
                    section: 3,
                    skill: 'grammar',
                    text: "Which sentence uses the second conditional correctly?",
                    options: [
                        "If I will have time, I will call you.",
                        "If I have time, I would call you.",
                        "If I had time, I would call you.",
                        "If I would have time, I would call you."
                    ],
                    correct: 2
                },
                {
                    id: 26,
                    section: 3,
                    skill: 'vocabulary',
                    text: "What does 'to procrastinate' mean?",
                    options: [
                        "To work efficiently",
                        "To delay or postpone tasks",
                        "To complete tasks ahead of time",
                        "To organize one's schedule"
                    ],
                    correct: 1
                },
                {
                    id: 27,
                    section: 3,
                    skill: 'reading',
                    text: "Read this: 'The politician's rhetoric was eloquent but lacked substance.' What is the author suggesting?",
                    options: [
                        "The politician spoke poorly",
                        "The politician spoke well but didn't say anything meaningful",
                        "The politician was both articulate and insightful",
                        "The politician was boring but informative"
                    ],
                    correct: 1
                },
                {
                    id: 28,
                    section: 3,
                    skill: 'writing',
                    text: "Which sentence demonstrates proper parallel structure?",
                    options: [
                        "She likes cooking, jogging, and to read.",
                        "She likes to cook, jogging, and reading.",
                        "She likes cooking, jogging, and reading.",
                        "She likes to cook, to jog, and reading."
                    ],
                    correct: 2
                },
                {
                    id: 29,
                    section: 3,
                    skill: 'grammar',
                    text: "Choose the correct passive voice construction:",
                    options: [
                        "The letter was written by Sarah.",
                        "Sarah was written the letter.",
                        "The letter written by Sarah.",
                        "Sarah written the letter."
                    ],
                    correct: 0
                },
                {
                    id: 30,
                    section: 3,
                    skill: 'vocabulary',
                    text: "What is an 'ephemeral' phenomenon?",
                    options: [
                        "Something that lasts forever",
                        "Something that lasts a very short time",
                        "Something that occurs annually",
                        "Something that is very rare"
                    ],
                    correct: 1
                },
                {
                    id: 31,
                    section: 3,
                    skill: 'reading',
                    text: "Read this: 'The author's prose was terse, leaving little room for elaboration.' What does 'terse' mean?",
                    options: [
                        "Brief and to the point",
                        "Long and detailed",
                        "Confusing and unclear",
                        "Poetic and flowery"
                    ],
                    correct: 0
                },
                {
                    id: 32,
                    section: 3,
                    skill: 'writing',
                    text: "Which sentence correctly uses a semicolon?",
                    options: [
                        "I love coffee; and I drink it every morning.",
                        "I love coffee; I drink it every morning.",
                        "I love coffee; because it wakes me up.",
                        "I love coffee; especially in the morning."
                    ],
                    correct: 1
                },
                {
                    id: 33,
                    section: 3,
                    skill: 'grammar',
                    text: "Which sentence uses the past perfect correctly?",
                    options: [
                        "After I ate dinner, I had watched TV.",
                        "After I had eaten dinner, I watched TV.",
                        "After I had ate dinner, I watched TV.",
                        "After I eat dinner, I had watched TV."
                    ],
                    correct: 1
                },
                {
                    id: 34,
                    section: 3,
                    skill: 'vocabulary',
                    text: "What does 'ubiquitous' mean?",
                    options: [
                        "Present everywhere",
                        "Extremely rare",
                        "Very large",
                        "Highly valuable"
                    ],
                    correct: 0
                },
                {
                    id: 35,
                    section: 3,
                    skill: 'reading',
                    text: "Read this: 'Her sardonic remarks often left her colleagues feeling uneasy.' What does 'sardonic' imply?",
                    options: [
                        "Kind and encouraging",
                        "Mocking or scornful",
                        "Boring and repetitive",
                        "Highly technical"
                    ],
                    correct: 1
                },
                {
                    id: 36,
                    section: 3,
                    skill: 'writing',
                    text: "Which sentence demonstrates correct use of a transitional phrase?",
                    options: [
                        "I wanted to go. However, I was too tired.",
                        "I wanted to go, however I was too tired.",
                        "I wanted to go however, I was too tired.",
                        "I wanted to go, however, I was too tired."
                    ],
                    correct: 3
                },
                
                // Section 4: B2-C2 Level (Questions 37-50)
                {
                    id: 37,
                    section: 4,
                    skill: 'grammar',
                    text: "Which sentence correctly uses a reduced relative clause?",
                    options: [
                        "The man who is standing over there is my uncle.",
                        "The man standing over there is my uncle.",
                        "The man is standing over there is my uncle.",
                        "The man who standing over there is my uncle."
                    ],
                    correct: 1
                },
                {
                    id: 38,
                    section: 4,
                    skill: 'vocabulary',
                    text: "What does 'obfuscate' mean?",
                    options: [
                        "To clarify",
                        "To confuse or make unclear",
                        "To observe carefully",
                        "To object strongly"
                    ],
                    correct: 1
                },
                {
                    id: 39,
                    section: 4,
                    skill: 'reading',
                    text: "Read this: 'The protagonist's hubris ultimately led to his downfall.' What does 'hubris' mean?",
                    options: [
                        "Excessive pride or self-confidence",
                        "Lack of intelligence",
                        "Physical weakness",
                        "Financial problems"
                    ],
                    correct: 0
                },
                {
                    id: 40,
                    section: 4,
                    skill: 'writing',
                    text: "Which sentence demonstrates the most formal academic style?",
                    options: [
                        "The results show that the theory is wrong.",
                        "The findings indicate that the hypothesis is not supported.",
                        "We found out the idea is incorrect.",
                        "It looks like the theory isn't right."
                    ],
                    correct: 1
                },
                {
                    id: 41,
                    section: 4,
                    skill: 'grammar',
                    text: "Which sentence correctly uses inversion for emphasis?",
                    options: [
                        "Never I have seen such a beautiful sunset.",
                        "Never have I seen such a beautiful sunset.",
                        "Never I seen have such a beautiful sunset.",
                        "Never seen I have such a beautiful sunset."
                    ],
                    correct: 1
                },
                {
                    id: 42,
                    section: 4,
                    skill: 'vocabulary',
                    text: "What is a 'non sequitur'?",
                    options: [
                        "A logical conclusion",
                        "A statement that doesn't follow logically",
                        "A mathematical equation",
                        "A type of legal document"
                    ],
                    correct: 1
                },
                {
                    id: 43,
                    section: 4,
                    skill: 'reading',
                    text: "Read this: 'The author's magnum opus was published posthumously to critical acclaim.' What does 'magnum opus' refer to?",
                    options: [
                        "A small, insignificant work",
                        "A work published anonymously",
                        "A writer's greatest work",
                        "A controversial work"
                    ],
                    correct: 2
                },
                {
                    id: 44,
                    section: 4,
                    skill: 'writing',
                    text: "Which sentence demonstrates the most effective use of conciseness?",
                    options: [
                        "Due to the fact that it was raining, we decided to cancel the event.",
                        "Because it was raining, we decided to cancel the event.",
                        "As a consequence of the fact that precipitation was occurring, we arrived at the decision to cancel the planned event.",
                        "Taking into consideration the meteorological conditions, we opted for cancellation of the planned event."
                    ],
                    correct: 1
                },
                {
                    id: 45,
                    section: 4,
                    skill: 'grammar',
                    text: "Which sentence correctly uses a modal verb to express past possibility?",
                    options: [
                        "She must be at home yesterday.",
                        "She must have been at home yesterday.",
                        "She must had been at home yesterday.",
                        "She must to be at home yesterday."
                    ],
                    correct: 1
                },
                {
                    id: 46,
                    section: 4,
                    skill: 'vocabulary',
                    text: "What does 'quintessential' mean?",
                    options: [
                        "Representing the most perfect or typical example",
                        "Relating to the number five",
                        "Extremely rare or unusual",
                        "Of questionable quality"
                    ],
                    correct: 0
                },
                {
                    id: 47,
                    section: 4,
                    skill: 'reading',
                    text: "Read this: 'The speaker's circumlocution frustrated the audience, who wanted direct answers.' What does 'circumlocution' mean?",
                    options: [
                        "Speaking in circles or evasively",
                        "Speaking very quickly",
                        "Speaking with a foreign accent",
                        "Speaking with technical jargon"
                    ],
                    correct: 0
                },
                {
                    id: 48,
                    section: 4,
                    skill: 'writing',
                    text: "Which sentence demonstrates the most effective use of active voice in academic writing?",
                    options: [
                        "The experiment was conducted by the researchers.",
                        "The researchers conducted the experiment.",
                        "It was the researchers who conducted the experiment.",
                        "There was an experiment conducted by the researchers."
                    ],
                    correct: 1
                },
                {
                    id: 49,
                    section: 4,
                    skill: 'grammar',
                    text: "Which sentence correctly uses a mixed conditional?",
                    options: [
                        "If I had studied harder, I would pass the exam.",
                        "If I studied harder, I would have passed the exam.",
                        "If I had studied harder, I would have passed the exam.",
                        "If I would have studied harder, I would pass the exam."
                    ],
                    correct: 0
                },
                {
                    id: 50,
                    section: 4,
                    skill: 'vocabulary',
                    text: "What does 'perspicacious' mean?",
                    options: [
                        "Having a keen mental perception or understanding",
                        "Physically strong or robust",
                        "Highly talkative or verbose",
                        "Extremely wealthy or affluent"
                    ],
                    correct: 0
                }
            ];
            
            // Initialize the test
            function initTest() {
                // Check for saved progress
                const savedProgress = localStorage.getItem('langohorizonTestProgress');
                if (savedProgress) {
                    const progress = JSON.parse(savedProgress);
                    answers = progress.answers;
                    currentQuestion = progress.currentQuestion;
                    
                    // Show resume option
                    if (confirm('You have an unfinished test. Would you like to resume where you left off?')) {
                        startTest();
                    } else {
                        // Start fresh
                        answers = new Array(questions.length).fill(null);
                        currentQuestion = 0;
                        startTest();
                    }
                } else {
                    answers = new Array(questions.length).fill(null);
                    currentQuestion = 0;
                    startTest();
                }
            }
            
            function startTest() {
                testStarted = true;
                incrementTestCounter();
                updateQuestion();
                introScreen.classList.add('hidden');
                testScreen.classList.remove('hidden');
            }
            
            // Update the current question display
            function updateQuestion() {
                // Update progress
                currentQuestionDisplay.textContent = currentQuestion + 1;
                currentSectionDisplay.textContent = questions[currentQuestion].section;
                progressFill.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
                progressFill.setAttribute('aria-valuenow', currentQuestion + 1);
                
                // Update section indicator
                document.querySelectorAll('.section-dot').forEach(dot => {
                    dot.classList.remove('active');
                });
                document.querySelector(`.section-dot[data-section="${questions[currentQuestion].section}"]`).classList.add('active');
                
                // Show/hide navigation buttons
                prevQuestionBtn.disabled = currentQuestion === 0;
                
                if (currentQuestion === questions.length - 1) {
                    nextQuestionBtn.classList.add('hidden');
                    submitTestBtn.classList.remove('hidden');
                } else {
                    nextQuestionBtn.classList.remove('hidden');
                    submitTestBtn.classList.add('hidden');
                }
                
                // Display the current question
                questionText.textContent = questions[currentQuestion].text;
                optionsContainer.innerHTML = '';
                
                // Create options
                questions[currentQuestion].options.forEach((option, index) => {
                    const optionElement = document.createElement('div');
                    optionElement.classList.add('option');
                    if (answers[currentQuestion] === index) {
                        optionElement.classList.add('selected');
                    }
                    
                    optionElement.innerHTML = `
                        <span class="checkmark"></span>
                        ${option}
                    `;
                    
                    optionElement.addEventListener('click', () => {
                        selectAnswer(index);
                    });
                    
                    optionsContainer.appendChild(optionElement);
                });
                
                // Save progress
                saveProgress();
            }
            
            // Select an answer
            function selectAnswer(answerIndex) {
                answers[currentQuestion] = answerIndex;
                
                // Update UI
                document.querySelectorAll('.option').forEach((option, index) => {
                    if (index === answerIndex) {
                        option.classList.add('selected');
                    } else {
                        option.classList.remove('selected');
                    }
                });
                
                // Save progress
                saveProgress();
            }
            
            // Save progress to localStorage
            function saveProgress() {
                localStorage.setItem('langohorizonTestProgress', JSON.stringify({
                    currentQuestion,
                    answers
                }));
            }
            
            // Clear saved progress
            function clearProgress() {
                localStorage.removeItem('langohorizonTestProgress');
            }
            
            // Calculate results
            function calculateResults() {
                let correctAnswers = 0;
                const skillScores = {
                    grammar: { correct: 0, total: 0 },
                    vocabulary: { correct: 0, total: 0 },
                    reading: { correct: 0, total: 0 },
                    writing: { correct: 0, total: 0 }
                };
                
                questions.forEach((question, index) => {
                    if (answers[index] === question.correct) {
                        correctAnswers++;
                        skillScores[question.skill].correct++;
                    }
                    skillScores[question.skill].total++;
                });
                
                // Determine CEFR level based on correct answers
                let cefrLevel = '';
                let levelPercentage = 0;
                let levelPosition = 0;
                
                if (correctAnswers >= 42) {
                    cefrLevel = 'C2';
                    levelPercentage = (correctAnswers - 42) / 8 * 100;
                    levelPosition = 100;
                } else if (correctAnswers >= 36) {
                    cefrLevel = 'C1';
                    levelPercentage = (correctAnswers - 36) / 6 * 100;
                    levelPosition = 80;
                } else if (correctAnswers >= 28) {
                    cefrLevel = 'B2';
                    levelPercentage = (correctAnswers - 28) / 8 * 100;
                    levelPosition = 60;
                } else if (correctAnswers >= 20) {
                    cefrLevel = 'B1';
                    levelPercentage = (correctAnswers - 20) / 8 * 100;
                    levelPosition = 40;
                } else if (correctAnswers >= 12) {
                    cefrLevel = 'A2';
                    levelPercentage = (correctAnswers - 12) / 8 * 100;
                    levelPosition = 20;
                } else {
                    cefrLevel = 'A1';
                    levelPercentage = correctAnswers / 12 * 100;
                    levelPosition = 0;
                }
                
                // Cap percentage at 100
                levelPercentage = Math.min(100, Math.max(0, levelPercentage));
                
                return {
                    totalCorrect: correctAnswers,
                    totalQuestions: questions.length,
                    percentage: Math.round((correctAnswers / questions.length) * 100),
                    cefrLevel,
                    levelPercentage,
                    levelPosition,
                    skillScores
                };
            }
            
            // Create celebration effects
            function createCelebration() {
                // Confetti
                for (let i = 0; i < 100; i++) {
                    setTimeout(() => {
                        const confetti = document.createElement('div');
                        confetti.classList.add('confetti');
                        confetti.style.left = Math.random() * 100 + 'vw';
                        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
                        confetti.style.width = Math.random() * 10 + 5 + 'px';
                        confetti.style.height = Math.random() * 10 + 5 + 'px';
                        document.body.appendChild(confetti);
                        
                        // Remove after animation
                        setTimeout(() => {
                            confetti.remove();
                        }, 3000);
                    }, Math.random() * 1000);
                }
                
                // Balloons
                for (let i = 0; i < 20; i++) {
                    setTimeout(() => {
                        const balloon = document.createElement('div');
                        balloon.classList.add('balloon');
                        balloon.style.left = Math.random() * 100 + 'vw';
                        balloon.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 70%)`;
                        document.body.appendChild(balloon);
                        
                        // Remove after animation
                        setTimeout(() => {
                            balloon.remove();
                        }, 4000);
                    }, Math.random() * 2000);
                }
                
                // Play sound
                const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-achievement-bell-600.mp3');
                audio.play().catch(e => console.log("Audio play failed:", e));
            }
            
            // Show results
            function showResults() {
                const results = calculateResults();
                
                // Update results screen
                document.getElementById('grammar-score').textContent = `${Math.round((results.skillScores.grammar.correct / results.skillScores.grammar.total) * 100)}%`;
                document.getElementById('vocabulary-score').textContent = `${Math.round((results.skillScores.vocabulary.correct / results.skillScores.vocabulary.total) * 100)}%`;
                document.getElementById('reading-score').textContent = `${Math.round((results.skillScores.reading.correct / results.skillScores.reading.total) * 100)}%`;
                document.getElementById('writing-score').textContent = `${Math.round((results.skillScores.writing.correct / results.skillScores.writing.total) * 100)}%`;
                
                // Update level description
                const levelDescriptions = {
                    'A1': `<h3>Beginner (A1)</h3>
                           <p>You can understand and use familiar everyday expressions and very basic phrases aimed at the satisfaction of needs of a concrete type. You can introduce yourself and others and can ask and answer questions about personal details such as where you live, people you know and things you have. You can interact in a simple way provided the other person talks slowly and clearly and is prepared to help.</p>
                           <p><strong>Recommendation:</strong> Consider starting with our A1 Beginner course to build a strong foundation in English.</p>`,
                    'A2': `<h3>Elementary (A2)</h3>
                           <p>You can understand sentences and frequently used expressions related to areas of most immediate relevance (e.g. very basic personal and family information, shopping, local geography, employment). You can communicate in simple and routine tasks requiring a simple and direct exchange of information on familiar and routine matters. You can describe in simple terms aspects of your background, immediate environment and matters in areas of immediate need.</p>
                           <p><strong>Recommendation:</strong> Our A2 Elementary course will help you expand your vocabulary and improve your grammar for everyday communication.</p>`,
                    'B1': `<h3>Intermediate (B1)</h3>
                           <p>You can understand the main points of clear standard input on familiar matters regularly encountered in work, school, leisure, etc. You can deal with most situations likely to arise while traveling in an area where the language is spoken. You can produce simple connected text on topics that are familiar or of personal interest. You can describe experiences and events, dreams, hopes and ambitions and briefly give reasons and explanations for opinions and plans.</p>
                           <p><strong>Recommendation:</strong> Our B1 Intermediate course will help you develop more complex language skills for work and social situations.</p>`,
                    'B2': `<h3>Upper Intermediate (B2)</h3>
                           <p>You can understand the main ideas of complex text on both concrete and abstract topics, including technical discussions in your field of specialization. You can interact with a degree of fluency and spontaneity that makes regular interaction with native speakers quite possible without strain for either party. You can produce clear, detailed text on a wide range of subjects and explain a viewpoint on a topical issue giving the advantages and disadvantages of various options.</p>
                           <p><strong>Recommendation:</strong> Our B2 Upper Intermediate course will refine your skills for professional and academic contexts.</p>`,
                    'C1': `<h3>Advanced (C1)</h3>
                           <p>You can understand a wide range of demanding, longer texts, and recognize implicit meaning. You can express yourself fluently and spontaneously without much obvious searching for expressions. You can use language flexibly and effectively for social, academic and professional purposes. You can produce clear, well-structured, detailed text on complex subjects, showing controlled use of organizational patterns, connectors and cohesive devices.</p>
                           <p><strong>Recommendation:</strong> Our C1 Advanced course will help you master nuanced language use for professional and academic excellence.</p>`,
                    'C2': `<h3>Proficient (C2)</h3>
                           <p>You can understand with ease virtually everything heard or read. You can summarize information from different spoken and written sources, reconstructing arguments and accounts in a coherent presentation. You can express yourself spontaneously, very fluently and precisely, differentiating finer shades of meaning even in more complex situations.</p>
                           <p><strong>Recommendation:</strong> Consider our specialized C2 courses or conversation classes to maintain and refine your exceptional proficiency.</p>`
                };
                
                levelDescription.innerHTML = levelDescriptions[results.cefrLevel];
                
                // Animate the level indicator
                setTimeout(() => {
                    levelIndicator.style.width = `${results.levelPosition}%`;
                }, 100);
                
                // Show results screen
                testScreen.classList.add('hidden');
                resultsScreen.classList.remove('hidden');
                
                // Clear saved progress
                clearProgress();
                
                // Celebration!
                createCelebration();
            }
            
            // Event listeners
            startTestBtn.addEventListener('click', initTest);
            
            prevQuestionBtn.addEventListener('click', () => {
                if (currentQuestion > 0) {
                    currentQuestion--;
                    updateQuestion();
                }
            });
            
            nextQuestionBtn.addEventListener('click', () => {
                if (currentQuestion < questions.length - 1) {
                    currentQuestion++;
                    updateQuestion();
                }
            });
            
            submitTestBtn.addEventListener('click', showResults);
            
            retakeTestBtn.addEventListener('click', () => {
                resultsScreen.classList.add('hidden');
                introScreen.classList.remove('hidden');
                testStarted = false;
            });
            
            quitTestBtn.addEventListener('click', () => {
                quitModal.classList.remove('hidden');
            });
            
            confirmQuitBtn.addEventListener('click', () => {
                quitModal.classList.add('hidden');
                testScreen.classList.add('hidden');
                introScreen.classList.remove('hidden');
                testStarted = false;
            });
            
            cancelQuitBtn.addEventListener('click', () => {
                quitModal.classList.add('hidden');
            });
            
            reportQuestionBtn.addEventListener('click', () => {
                reportModal.classList.remove('hidden');
            });
            
            submitReportBtn.addEventListener('click', () => {
                const reportText = document.getElementById('report-text').value;
                if (reportText.trim()) {
                    // In a real app, you would send this to your server
                    console.log(`Question ${currentQuestion + 1} reported:`, reportText);
                    alert('Thank you for your feedback! We will review this question.');
                    document.getElementById('report-text').value = '';
                    reportModal.classList.add('hidden');
                } else {
                    alert('Please describe the issue before submitting.');
                }
            });
            
            cancelReportBtn.addEventListener('click', () => {
                reportModal.classList.add('hidden');
            });
            
            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (!testStarted) return;
                
                if (e.key === 'ArrowLeft' && currentQuestion > 0) {
                    currentQuestion--;
                    updateQuestion();
                } else if (e.key === 'ArrowRight' && currentQuestion < questions.length - 1) {
                    currentQuestion++;
                    updateQuestion();
                } else if (e.key >= 1 && e.key <= 4 && currentQuestion < questions.length) {
                    selectAnswer(parseInt(e.key) - 1);
                }
            });
        });