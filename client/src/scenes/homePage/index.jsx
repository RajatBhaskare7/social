import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import { useEffect, useState } from "react";

const HomePage = () => {
	const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
	const { _id, picturePath } = useSelector((state) => state.user);

	// Add state for collapsed post creation
	const [isPostFormCollapsed, setIsPostFormCollapsed] = useState(false);

	return (
		<Box>
			{/* fixed on top <Navbar /> */}
			<Navbar />

			<Box
				width="100%"
				padding="1rem 4%" // Reduced from 2rem to 1rem
				display={isNonMobileScreens ? "flex" : "block"}
				gap="0.5rem"
				justifyContent="space-between"
				sx={{
					height: "95vh", // Increased from 89vh to 95vh
				}}
			>
				{/* Left sidebar - UserWidget (sticky) */}
				<Box
					flexBasis={isNonMobileScreens ? "26%" : undefined}
					sx={{
						position: isNonMobileScreens ? "sticky" : "static",
						top: "2rem",
						height: "fit-content",
						alignSelf: "flex-start",
					}}
				>
					<UserWidget userId={_id} picturePath={picturePath} />
				</Box>

				{/* Center content - Posts (scrollable) */}
				<Box
					flexBasis={isNonMobileScreens ? "42%" : undefined}
					mt={isNonMobileScreens ? undefined : "2rem"}
					sx={{
						maxHeight: isNonMobileScreens ? "calc(100vh - 80px)" : "none", // Reduced from 120px to 80px
						overflowY: isNonMobileScreens ? "auto" : "visible",
						"&::-webkit-scrollbar": {
							display: "none",
						},
						"&::-ms-scrollbar": {
							display: "none",
						},
						scrollbarWidth: "none",
						msOverflowStyle: "none",
					}}
				>
					{/* MyPostWidget - Sticky but more compact */}
					<Box
						sx={{
							position: "sticky",
							top: "0",
							zIndex: 1,
							backgroundColor: "background.default",
							pb: 0.5,
							maxHeight: isPostFormCollapsed ? "60px" : "auto", // Collapsible height
							overflow: "hidden",
							transition: "max-height 0.3s ease",
						}}
					>
						<MyPostWidget
							picturePath={picturePath}
							isCollapsed={isPostFormCollapsed}
							onToggleCollapse={() =>
								setIsPostFormCollapsed(!isPostFormCollapsed)
							}
						/>
					</Box>

					{/* PostsWidget - Scrollable with better spacing */}
					<Box sx={{ mt: 1 }}>
						{" "}
						{/* Reduced margin top */}
						<PostsWidget userId={_id} />
					</Box>
				</Box>

				{/* Right sidebar - AdvertWidget and FriendListWidget (sticky) */}
				{isNonMobileScreens && (
					<Box
						flexBasis="26%"
						sx={{
							position: "sticky",
							top: "0",
							height: "fit-content",
							alignSelf: "flex-start",
						}}
					>
						{/* <AdvertWidget /> */}
						<Box m="0 0" />
						<FriendListWidget userId={_id} />
					</Box>
				)}
			</Box>
		</Box>
	);
};

export default HomePage;
