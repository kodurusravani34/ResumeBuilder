import Resume from "../models/Resume.js";
import ai from "../configs/ai.js";


// =====================================================
// ENHANCE PROFESSIONAL SUMMARY
// POST: /api/ai/enhance-pro-sum
// =====================================================
export const enhanceProfessionalSummary = async (req, res) => {
    try {
        const { userContent } = req.body;

        if (!userContent) {
            return res.status(400).json({ message: "Content is required" });
        }

        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                {
                    role: "system",
                    content:
                        "You are an expert in resume writing. Enhance the professional summary in 1-2 sentences, highlighting key skills, experience, and career objectives. Make it ATS-friendly. Return only text.",
                },
                {
                    role: "user",
                    content: userContent,
                },
            ],
        });

        const enhancedContent = response.choices[0].message.content.trim();

        return res.status(200).json({ enhancedContent });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: error.message });
    }
};


// =====================================================
// ENHANCE JOB DESCRIPTION
// POST: /api/ai/enhance-job-desc
// =====================================================
export const enhanceJobDescription = async (req, res) => {
    try {
        const { userContent } = req.body;

        if (!userContent) {
            return res.status(400).json({ message: "Content is required" });
        }

        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                {
                    role: "system",
                    content:
                        "You are an expert in resume writing. Improve the job description in 1-2 sentences, highlighting achievements and responsibilities using action verbs and metrics. ATS-friendly. Return only text.",
                },
                {
                    role: "user",
                    content: userContent,
                },
            ],
        });

        const enhancedContent = response.choices[0].message.content.trim();

        return res.status(200).json({ enhancedContent });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: error.message });
    }
};


// =====================================================
// UPLOAD RESUME & EXTRACT DATA USING AI
// POST: /api/ai/upload-resume
// =====================================================
export const uploadResume = async (req, res) => {
    try {
        const { resumeText, title } = req.body;
        const userId = req.userId;

        if (!resumeText || resumeText.length < 50) {
            return res.status(400).json({ message: "Invalid resume text" });
        }

        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }

        const systemPrompt = "You are an expert AI agent that extracts structured data from resumes.";

        const userPrompt = `
Extract structured data from the following resume text:

${resumeText}

Return ONLY valid JSON in this format:

{
  "professional_summary": "",
  "skills": [],
  "personal_info": {
    "image": "",
    "full_name": "",
    "profession": "",
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "website": ""
  },
  "experience": [
    {
      "company": "",
      "position": "",
      "start_date": "",
      "end_date": "",
      "description": "",
      "is_current": false
    }
  ],
  "project": [
    {
      "name": "",
      "type": "",
      "description": ""
    }
  ],
  "education": [
    {
      "institution": "",
      "degree": "",
      "field": "",
      "graduation_date": "",
      "gpa": ""
    }
  ]
}
`;

        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            response_format: { type: "json_object" },
        });

        const extractedData = response.choices[0].message.content;

        let parsedData;
        try {
            parsedData = JSON.parse(extractedData);
        } catch {
            return res.status(400).json({ message: "AI returned invalid JSON" });
        }

        const newResume = await Resume.create({
            userId,
            title,
            ...parsedData,
        });

        return res.status(200).json({ resumeId: newResume._id });

    } catch (error) {
        console.error("AI Upload Error:", error);
        return res.status(400).json({ message: error.message });
    }
};
