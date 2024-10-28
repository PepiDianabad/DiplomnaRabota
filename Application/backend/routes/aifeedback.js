require('dotenv').config();
const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Helper function to generate AI feedback for the whole interview
async function generateAIFeedback(feedbackData) {
    // Log the incoming feedbackData
    console.log('Received feedbackData:');

    // Destructure questions and answers from feedbackData
    const { questions, answers } = feedbackData; // Use feedbackData.body directly
    //console.log(questions)
    console.log("geeeei")

    // Check if questions and answers are defined
    if (!questions || !answers) {
        throw new Error('Questions or answers are undefined');
    }
    // Create a prompt based on all questions and answers
    const prompt = `Given the following interview questions and answers, provide general feedback for the entire interview:\n\n` +
        questions.map((question, index) => `Q${index + 1}: ${question}\nA${index + 1}: ${answers[index]}`).join('\n\n') +
        `\n\nPlease provide comprehensive feedback based on the entire interview.`;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 500,
        });

        const feedback = response.choices[0].message.content.trim();
        feeedback = feedback.toString();
        //console.log(feeedback);
        return feeedback;
    } catch (error) {
        console.error("Error generating AI feedback:", error);
        throw new Error('Failed to generate AI feedback');
    }
}

module.exports = generateAIFeedback;
