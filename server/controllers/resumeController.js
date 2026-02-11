import imagekit from "../configs/imageKit.js";
import Resume from "../models/Resume.js";
import fs from "fs";
import mongoose from "mongoose";


// ============================
// CREATE RESUME
// POST: /api/resumes/create
// ============================
export const createResume = async (req, res) => {
    try {
        const userId = req.userId;
        const { title } = req.body;

        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }

        const newResume = await Resume.create({ userId, title });

        return res.status(201).json({
            message: "Resume created successfully",
            resume: newResume,
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};


// ============================
// DELETE RESUME
// DELETE: /api/resumes/delete/:resumeId
// ============================
export const deleteResume = async (req, res) => {
    try {
        const userId = req.userId;
        const { resumeId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(resumeId)) {
            return res.status(400).json({ message: "Invalid resume ID" });
        }

        const deleted = await Resume.findOneAndDelete({ userId, _id: resumeId });

        if (!deleted) {
            return res.status(404).json({ message: "Resume not found" });
        }

        return res.status(200).json({ message: "Resume deleted successfully" });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};


// ============================
// GET USER RESUME BY ID
// GET: /api/resumes/get/:resumeId
// ============================
export const getResumeById = async (req, res) => {
    try {
        const userId = req.userId;
        const { resumeId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(resumeId)) {
            return res.status(400).json({ message: "Invalid resume ID" });
        }

        const resume = await Resume.findOne({ userId, _id: resumeId }).lean();

        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }

        delete resume.__v;
        delete resume.createdAt;
        delete resume.updatedAt;

        return res.status(200).json({ resume });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};


// ============================
// GET PUBLIC RESUME
// GET: /api/resumes/public/:resumeId
// ============================
export const getPublicResumeById = async (req, res) => {
    try {
        const { resumeId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(resumeId)) {
            return res.status(400).json({ message: "Invalid resume ID" });
        }

        const resume = await Resume.findOne({ public: true, _id: resumeId }).lean();

        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }

        delete resume.__v;
        delete resume.createdAt;
        delete resume.updatedAt;
        delete resume.userId;

        return res.status(200).json({ resume });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};


// ============================
// UPDATE RESUME
// PUT: /api/resumes/update
// ============================
export const updateResume = async (req, res) => {
    try {
        const userId = req.userId;
        const { resumeId, resumeData, removeBackground } = req.body;
        const image = req.file;

        if (!mongoose.Types.ObjectId.isValid(resumeId)) {
            return res.status(400).json({ message: "Invalid resume ID" });
        }

        let resumeDataCopy;

        try {
            resumeDataCopy =
                typeof resumeData === "string"
                    ? JSON.parse(resumeData)
                    : structuredClone(resumeData);
        } catch {
            return res.status(400).json({ message: "Invalid resume data format" });
        }

        // Remove restricted fields
        delete resumeDataCopy._id;
        delete resumeDataCopy.userId;
        delete resumeDataCopy.createdAt;
        delete resumeDataCopy.updatedAt;
        delete resumeDataCopy.__v;

        // ================= IMAGE UPLOAD =================
        if (image) {
            const imageBufferData = fs.createReadStream(image.path);

            const response = await imagekit.files.upload({
                file: imageBufferData,
                fileName: `resume_${Date.now()}.png`,
                folder: "user-resumes",
                transformation: {
                    pre:
                        "w-300,h-300,fo-face,z-0.75" +
                        (removeBackground ? ",e-bgremove" : ""),
                },
            });

            // Ensure personal_info exists
            if (!resumeDataCopy.personal_info) {
                resumeDataCopy.personal_info = {};
            }

            resumeDataCopy.personal_info.image = response.url;

            // Delete local file after upload
            fs.unlinkSync(image.path);
        }
        // =================================================

        const resume = await Resume.findOneAndUpdate(
            { _id: resumeId, userId },
            resumeDataCopy,
            { new: true }
        );

        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }

        return res.status(200).json({
            message: "Saved successfully",
            resume,
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};
