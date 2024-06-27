// import userModel from "../models/userModel";
const profileModel = require('../models/profileModel')
const postModel = require('../models/mediaPostModel.js')

const userModel = require('../models/userModel')
const { uploadOnCloundinary } = require('../service/imageUpload.js');


//create profile
const createProfile = async (req, res) => {

    const userId = req.user._id;; // get userID

    console.log("=>", userId);

    try {

        const users = await userModel.findById(userId); // check user in DB
        if (users) {

            // check if user profile is created or not
            const checkProfile = await profileModel.find({ userID: users._id });
            console.log("checkProfile", checkProfile)

            if (checkProfile.length == 0) {

                const file = req.file.path //get temp img file 

                const result = await uploadOnCloundinary(file); // uplod into clodinariy
                console.log("file", result)

                console.log("File uploaded to Cloudinary", result);

                const { name, username, bio } = req.body;

                if (!name) {
                    return res.send({ error: "Name is Required" });
                }
                if (!username) {
                    return res.send({ message: "username is Required" });
                }
                if (!bio) {
                    return res.send({ message: "bio is Required" });
                }
                if (!result) {
                    return res.send({ message: "Profile pic is Required" });
                }

                console.log("Received data", name, username, bio, result)



                // Save profile data to the database
                const newProfile = new profileModel({
                    name,
                    username,
                    bio,
                    userID: userId,
                    profilePicture: result.secure_url,
                });

                // Update user profileCompleted status
                await userModel.findByIdAndUpdate(userId, { profileCompleted: true });

                await newProfile.save();

                return res.status(200).json({
                    message: 'Profile created successfully',
                    newProfile,
                    success: true

                });


            } else {
                return res.send({ error: "Profile Found In DB" });
            }

        } else {
            return res.send({ error: "User not Found In DB" });

        }


    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error in Profile creation",
            error: error.message
        });
    }


}
//edit profile
const editProfile = async (req, res) => {
    var userId = req.query.Id; // get user ID
    console.log("userId", userId)

    try {

        // console.log("userId", userId)
        const users = await userModel.findById(userId); // check user in DB
        console.log("users", users)
        if (users) {
            const getProfile = await profileModel.findOne({ userID: userId });// check if user has profile In DB
            console.log("getProfile", getProfile)


            if (getProfile) {

                console.log("1")

                const file = req.file.path //get temp img file 

                const result = await uploadOnCloundinary(file); // uplod into clodinariy
                console.log("file", result)

                console.log("File uploaded to Cloudinary", result);

                const { name, username, bio } = req.body;

                if (!name) {
                    return res.send({ error: "Name is Required" });
                }
                if (!username) {
                    return res.send({ message: "username is Required" });
                }
                if (!bio) {
                    return res.send({ message: "bio is Required" });
                }
                if (!result) {
                    return res.send({ message: "Profile pic is Required" });
                }

                console.log("Received data", name, username, bio, result)



                const editProf = await profileModel.findByIdAndUpdate(
                    getProfile._id,
                    {
                        name: name,
                        username: username,
                        bio: bio,
                        profilePicture: result.secure_url,
                    },

                    { new: true }
                );

                console.log("editProf", editProf)
                res.status(201).send({
                    success: true,
                    message: "Profile Updated Successfully",
                    editProf,
                });

            } else {
                return res.send({ message: "Profile not found in DB" });

            }
        } else {
            return res.send({ message: "user not found in DB" });

        }


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Errro in editProfile controller",
            error,
        });
    }
}
//followUser
const followUser = async (req, res) => {
    try {
        const { userIdToFollow } = req.params;
        const userId = req.user._id; // Assuming you have user authentication middleware
        //   console.log("userId",userId,userIdToFollow)

        // Check if the user is trying to follow themselves
        if (userId === userIdToFollow) {
            return res.status(400).json({ message: "You can't follow yourself" });
        }

        const userToFollow = await userModel.findById(userIdToFollow);
        const currentUser = await userModel.findById(userId);

        //   console.log("==>",currentUser,userToFollow)

        // Check if the userToFollow and currentUser exist
        if (!userToFollow || !currentUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the currentUser is already following the userToFollow
        if (!currentUser.following.includes(userIdToFollow)) {
            currentUser.following.push(userIdToFollow);
            userToFollow.followers.push(userId);
            await currentUser.save();
            await userToFollow.save();

            return res.status(200).json({ message: 'User followed successfully' });
        } else {
            return res.status(400).json({ message: 'User is already followed' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

//unfollowUser
const unfollowUser = async (req, res) => {
    try {
        const { userIdToUnfollow } = req.params;
        const userId = req.user._id; // Assuming you have user authentication middleware
        console.log(userId);

        const userToUnfollow = await userModel.findById(userIdToUnfollow);
        const currentUser = await userModel.findById(userId);

        console.log("unfollow", userToUnfollow, currentUser)

        // Check if the userToUnfollow and currentUser exist
        if (!userToUnfollow || !currentUser) {
            return res.status(404).json({ message: 'User not found' });
        }


        // Check if the currentUser is following the userToUnfollow
        if (currentUser.following.includes(userIdToUnfollow)) {
            console.log(currentUser.following, userIdToUnfollow);
            currentUser.following = currentUser.following.filter(followingId => followingId.toString() !== userIdToUnfollow.toString());
            userToUnfollow.followers = userToUnfollow.followers.filter(followerId => followerId.toString() !== userId.toString());

            await currentUser.save();
            await userToUnfollow.save();


            return res.status(200).json({ message: 'User unfollowed successfully' });
        } else {
            return res.status(400).json({ message: 'User is not followed' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const toggleFollow = async (req, res) => {
    try {
        const userId = req.user._id; // Assuming req.user contains the authenticated user
        const followId = req.params.id;
        console.log("followId", followId)

        const user = await userModel.findById(userId);
        const followUser = await userModel.findById(followId);

        const profile = await profileModel.findOne({ userID: followId });

        if (!user || !followUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isFollowing = user.following.includes(followId);

        if (isFollowing) {
            user.following.pull(followId);
            followUser.followers.pull(userId);
        } else {
            user.following.push(followId);
            followUser.followers.push(userId);
        }


        // Fetch the user's data to get followers and following
        const followuser = await userModel.findById(userId, 'followers following');
        console.log("==<", followuser)

        const followersCount = followuser.followers.length;
        const followingCount = followuser.following.length;

        console.log(followersCount, followingCount)


        console.log(user);

        await user.save();
        await followUser.save();

        res.status(200).json({
            message: isFollowing ? 'Unfollowed successfully' : 'Followed successfully',
            profile: {
                ...followUser.toObject(),
                followersCount,
                followingCount,
                followers: user.followers,
                followings: user.following,
                profilePicture: profile.profilePicture[0],
                username: profile.username
            },
            isFollowing: isFollowing ? false : true
        });
    } catch (error) {
        console.error('Error toggling follow status:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

//get user Profile
const getUserProfile = async (req, res) => {
    try {
        const userId = req.query.userId;
        console.log("userID", userId);

        if (!userId) {
            return res.status(400).json({ success: false, message: 'User ID is required' });
        }

        // Fetch the user's profile
        const profile = await profileModel.findOne({ userID: userId });
        if (!profile) {
            return res.status(404).json({ success: false, message: 'Profile not found' });
        }

        // Fetch the user's posts
        const posts = await postModel.find({ user: userId }).sort({ createdAt: -1 });

        // Fetch the user's data to get followers and following
        const user = await userModel.findById(userId, 'followers following');
        console.log("==<", user)

        const followersCount = user.followers.length;
        const followingCount = user.following.length;

        console.log(followersCount, followingCount)


        console.log(profile);

        return res.status(200).json({
            success: true,
            profile: {
                ...profile.toObject(),
                postsCount: posts.length,
                followersCount,
                followingCount,
                posts,
                followers: user.followers,
                followings: user.following,

            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Error fetching profile',
            error: error.message
        });
    }
};



module.exports = { editProfile, followUser, unfollowUser, createProfile, getUserProfile, toggleFollow };