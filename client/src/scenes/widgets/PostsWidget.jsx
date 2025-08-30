import { useEffect, useState, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts, addPosts } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
	const dispatch = useDispatch();
	const posts = useSelector((state) => state.posts) || [];
	const token = useSelector((state) => state.token);

	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const [initialLoad, setInitialLoad] = useState(true);
	const observer = useRef();
	const lastPostRef = useRef();

	// Add debug logging
	console.log(" PostsWidget render:", {
		postsLength: posts.length,
		page,
		hasMore,
		loading,
		isProfile,
		initialLoad,
		token: token ? "Present" : "Missing",
	});

	const getPosts = async (pageNum = 1, append = false) => {
		try {
			console.log("📡 Fetching posts:", {
				pageNum,
				append,
				token: token ? "Present" : "Missing",
			});
			setLoading(true);
			const response = await fetch(
				`${
					process.env.REACT_APP_API_URL
				}/posts?page=${pageNum}&limit=5&t=${Date.now()}`,
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${token}`,
						"Cache-Control": "no-cache",
						Pragma: "no-cache",
					},
				}
			);
			console.log(" Response status:", response.status);
			const data = await response.json();
			console.log("📥 Posts response:", data);

			if (append) {
				dispatch(addPosts({ posts: data.posts }));
			} else {
				dispatch(setPosts({ posts: data.posts }));
			}

			setHasMore(data.hasMore);
			setPage(pageNum);
		} catch (error) {
			console.error("❌ Error fetching posts:", error);
		} finally {
			setLoading(false);
			setInitialLoad(false);
		}
	};

	const getUserPosts = async (pageNum = 1, append = false) => {
		try {
			console.log("📡 Fetching user posts:", {
				pageNum,
				append,
				userId,
				token: token ? "Present" : "Missing",
			});
			setLoading(true);
			const response = await fetch(
				`${
					process.env.REACT_APP_API_URL
				}/posts/${userId}/posts?page=${pageNum}&limit=5&t=${Date.now()}`,
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${token}`,
						"Cache-Control": "no-cache",
						Pragma: "no-cache",
					},
				}
			);
			console.log("📡 User posts response status:", response.status);
			const data = await response.json();
			console.log("📥 User posts response:", data);

			if (append) {
				dispatch(addPosts({ posts: data.posts }));
			} else {
				dispatch(setPosts({ posts: data.posts }));
			}

			setHasMore(data.hasMore);
			setPage(pageNum);
		} catch (error) {
			console.error("❌ Error fetching user posts:", error);
		} finally {
			setLoading(false);
			setInitialLoad(false);
		}
	};

	const loadMore = useCallback(() => {
		console.log("⚙️ loadMore called:", { page, hasMore, loading, isProfile });
		if (loading || !hasMore) {
			console.log("🚫 loadMore blocked:", { loading, hasMore });
			return;
		}

		const nextPage = page + 1;
		console.log("📄 Loading next page:", nextPage);
		if (isProfile) {
			getUserPosts(nextPage, true);
		} else {
			getPosts(nextPage, true);
		}
	}, [page, loading, hasMore, isProfile]);

	// Intersection Observer for infinite scroll
	const lastPostElementRef = useCallback(
		(node) => {
			console.log(" lastPostElementRef called with node:", node);
			if (loading) {
				console.log("🚫 Observer blocked due to loading");
				return;
			}
			if (observer.current) {
				console.log("🔄 Disconnecting previous observer");
				observer.current.disconnect();
			}

			observer.current = new IntersectionObserver((entries) => {
				console.log("👁️ Intersection Observer triggered:", entries);
				if (entries[0].isIntersecting && hasMore) {
					console.log("️ Last post visible, triggering loadMore");
					loadMore();
				}
			});

			if (node) {
				console.log(" Observing new node");
				observer.current.observe(node);
			}
		},
		[loading, hasMore, loadMore]
	);

	// Force initial load when component mounts or dependencies change
	useEffect(() => {
		console.log("🚀 Initial load effect:", {
			initialLoad,
			isProfile,
			userId,
			token: token ? "Present" : "Missing",
		});

		// Always fetch posts when component mounts or dependencies change
		if (isProfile) {
			getUserPosts();
		} else {
			getPosts();
		}
	}, [isProfile, userId, token]); // Remove initialLoad dependency

	// Reset pagination when switching between profile and feed
	useEffect(() => {
		console.log("🔄 Resetting pagination");
		setPage(1);
		setHasMore(true);
		setInitialLoad(true);
	}, [isProfile, userId]);

	// Add safety check for posts array
	if (!posts || posts.length === 0) {
		console.log(" No posts available, showing loading or empty state");
		return (
			<div style={{ textAlign: "center", padding: "20px" }}>
				{loading ? "Loading posts..." : "No posts available"}
			</div>
		);
	}

	console.log(" Rendering posts:", posts.length);

	return (
		<>
			{posts
				.slice(0)
				.reverse()
				.map((post, index) => {
					const isLastPost = index === posts.length - 1;
					console.log(`📝 Rendering post ${index + 1}/${posts.length}`, {
						isLastPost,
						postId: post._id,
					});

					return (
						<div key={post._id} ref={isLastPost ? lastPostElementRef : null}>
							<PostWidget
								postId={post._id}
								postUserId={post.userId}
								name={`${post.firstName} ${post.lastName}`}
								description={post.description}
								location={post.location}
								picturePath={post.picturePath}
								userPicturePath={post.userPicturePath}
								likes={post.likes}
								comments={post.comments}
							/>
						</div>
					);
				})}

			{loading && (
				<div style={{ textAlign: "center", padding: "20px" }}>
					Loading more posts...
				</div>
			)}

			{!hasMore && posts.length > 0 && (
				<div style={{ textAlign: "center", padding: "20px", color: "#666" }}>
					No more posts to load
				</div>
			)}
		</>
	);
};

export default PostsWidget;
