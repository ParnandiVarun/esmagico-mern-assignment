const Project = require("../models/Project");
const generateInviteToken = require("../utils/generateInviteToken");

// Create Project
const createProject = async (req, res, next) => {
  try {
    const { title } = req.body;

    const project = await Project.create({
      title,
      owner: req.user._id,
      members: [req.user._id],
      inviteToken: generateInviteToken(),
    });

    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
};

// Get All Projects
const getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({
      members: req.user._id,
    });

    res.json(projects);
  } catch (error) {
    next(error);
  }
};

// Join Project via Invite Token
const joinProject = async (req, res, next) => {
  try {
    const { token } = req.body;

    const project = await Project.findOne({ inviteToken: token });

    if (!project) {
      return res.status(404).json({ message: "Invalid token" });
    }

    if (!project.members.includes(req.user._id)) {
      project.members.push(req.user._id);
      await project.save();
    }

    res.json(project);
  } catch (error) {
    next(error);
  }
};

module.exports = { createProject, getProjects, joinProject };
