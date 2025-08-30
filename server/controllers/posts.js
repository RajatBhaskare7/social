import Post from "../models/post.js";
import User from "../models/User.js";

/* CREATE */
export const createPost = async (req, res) => {
	try {
		const { userId, description, picturePath } = req.body;

		const user = await User.findById(userId);
		console.log(req.body);
		const newPost = new Post({
			userId,
			firstName: user.firstName,
			lastName: user.lastName,
			location: user.location,
			description: user.description,
			userPicturePath: user.picturePath,
			picturePath,
			likes: {},
			comments: [],
		});
		await newPost.save();

		const post = await Post.find();
		res.status(201).json(post);
	} catch (err) {
		res.status(409).json({ message: err.message });
	}
};

/* READ */
export const getFeedPosts = async (req, res) => {
	try {
		// Add cache control headers
		res.set({
			"Cache-Control": "no-cache, no-store, must-revalidate",
			Pragma: "no-cache",
			Expires: "0",
		});

		const { page = 1, limit = 10 } = req.query;
		const skip = (page - 1) * limit;

		console.log("🔍 Backend - getFeedPosts called with:", {
			page,
			limit,
			skip,
		});

		const posts = await Post.find()
			.sort({ createdAt: -1 }) // Sort by newest first
			.skip(skip)
			.limit(parseInt(limit));

		const totalPosts = await Post.countDocuments();
		const totalPages = Math.ceil(totalPosts / limit);

		const response = {
			posts,
			currentPage: parseInt(page),
			totalPages,
			totalPosts,
			hasMore: page < totalPages,
		};

		console.log("📤 Backend - Sending response:", {
			postsCount: posts.length,
			totalPosts,
			totalPages,
			hasMore: response.hasMore,
		});

		res.status(200).json(response);
	} catch (err) {
		console.error("❌ Backend - Error in getFeedPosts:", err);
		res.status(404).json({ message: err.message });
	}
};

export const getUserPosts = async (req, res) => {
	try {
		const { userId } = req.params;
		const { page = 1, limit = 10 } = req.query;
		const skip = (page - 1) * limit;

		console.log("🔍 Backend - getUserPosts called with:", {
			userId,
			page,
			limit,
			skip,
		});

		const posts = await Post.find({ userId })
			.sort({ createdAt: -1 })
			.limit(parseInt(limit));

		const totalPosts = await Post.countDocuments({ userId });
		const totalPages = Math.ceil(totalPosts / limit);

		const response = {
			posts,
			currentPage: parseInt(page),
			totalPages,
			totalPosts,
			hasMore: page < totalPages,
		};

		console.log("📤 Backend - Sending user posts response:", {
			postsCount: posts.length,
			totalPosts,
			totalPages,
			hasMore: response.hasMore,
		});

		res.status(200).json(response);
	} catch (err) {
		console.error("❌ Backend - Error in getUserPosts:", err);
		res.status(404).json({ message: err.message });
	}
};

/* UPDATE */
export const likePost = async (req, res) => {
	try {
		const { id } = req.params;
		const { userId } = req.body;
		const post = await Post.findById(id);
		const isLiked = post.likes.get(userId);

		if (isLiked) {
			post.likes.delete(userId);
		} else {
			post.likes.set(userId, true);
		}

		const updatedPost = await Post.findByIdAndUpdate(
			id,
			{ likes: post.likes },
			{ new: true }
		);

		res.status(200).json(updatedPost);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

// Add this test endpoint
export const testPosts = async (req, res) => {
	try {
		const posts = await Post.find().limit(3);
		const response = {
			posts,
			currentPage: 1,
			totalPages: 1,
			totalPosts: posts.length,
			hasMore: false,
		};

		console.log("🧪 Test endpoint response:", response);
		res.status(200).json(response);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};
