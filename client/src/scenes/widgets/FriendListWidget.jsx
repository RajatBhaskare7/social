import { Box, Typography, useTheme, Button } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";

const FriendListWidget = ({ userId }) => {
	const dispatch = useDispatch();
	const { palette } = useTheme();
	const token = useSelector((state) => state.token);
	const friends = useSelector((state) => state.user.friends);

	// State to control showing all friends or just 3
	const [showAllFriends, setShowAllFriends] = useState(false);

	const getFriends = async () => {
		const response = await fetch(
			`${process.env.REACT_APP_API_URL}/users/${userId}/friends`,
			{
				method: "GET",
				headers: { Authorization: `Bearer ${token}` },
			}
		);
		const data = await response.json();
		dispatch(setFriends({ friends: data }));
	};

	useEffect(() => {
		getFriends();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	// Show only first 3 friends initially
	const displayedFriends = showAllFriends ? friends : friends.slice(0, 3);
	const hasMoreFriends = friends.length > 3;

	return (
		<WidgetWrapper>
			<Typography
				color={palette.neutral.dark}
				variant="h5"
				fontWeight="500"
				sx={{ mb: "1.5rem" }}
			>
				Friend List ({friends.length})
			</Typography>

			<Box
				display="flex"
				flexDirection="column"
				gap="1.5rem"
				sx={{
					maxHeight: showAllFriends ? "350px" : "200px", // Fixed heights for proper scrolling
					overflowY: "auto",
					overflowX: "hidden",
					"&::-webkit-scrollbar": {
						display: "none", // Hide webkit scrollbar
					},
					"&::-ms-scrollbar": {
						display: "none", // Hide IE/Edge scrollbar
					},
					scrollbarWidth: "none", // Hide Firefox scrollbar
					msOverflowStyle: "none", // Hide IE/Edge scrollbar
					// Ensure smooth scrolling
					scrollBehavior: "smooth",
				}}
			>
				{displayedFriends.map((friend) => (
					<Friend
						key={friend._id}
						friendId={friend._id}
						name={`${friend.firstName} ${friend.lastName}`}
						subtitle={friend.occupation}
						userPicturePath={friend.picturePath}
					/>
				))}
			</Box>

			{/* View All/Show Less Button */}
			{hasMoreFriends && (
				<Box sx={{ mt: "1rem", textAlign: "center" }}>
					<Button
						variant="outlined"
						size="small"
						onClick={() => setShowAllFriends(!showAllFriends)}
						sx={{
							color: palette.primary.main,
							borderColor: palette.primary.main,
							"&:hover": {
								borderColor: palette.primary.dark,
								backgroundColor: palette.primary.light + "20",
							},
						}}
					>
						{showAllFriends ? "Show Less" : `View All (${friends.length})`}
					</Button>
				</Box>
			)}
		</WidgetWrapper>
	);
};

export default FriendListWidget;
