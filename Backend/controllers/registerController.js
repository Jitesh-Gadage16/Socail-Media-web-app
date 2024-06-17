// import userModel from "../models/userModel";
const userModel = require('../models/userModel')
const profileModel = require('../models/profileModel.js')
const { comparePassword, hashPassword } = require('../helpers/authHelpers.js')
const JWT = require('jsonwebtoken')


const siginupController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        //validations
        if (!name) {
            return res.send({ error: "Name is Required" });
        }
        if (!email) {
            return res.send({ message: "Email is Required" });
        }
        if (!password) {
            return res.send({ message: "Password is Required" });
        }

        //check user
        const exisitingUser = await userModel.findOne({ email });
        //exisiting user
        if (exisitingUser) {
            return res.status(200).send({
                success: false,
                message: "Already Register please login",
            });
        }
        //register user
        const hashedPassword = await hashPassword(password);
        //save
        const user = await new userModel({
            name,
            email,
            password: hashedPassword
        }).save();

        res.status(201).send({
            success: true,
            message: "User Register Successfully",
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Errro in Registeration",
            error,
        });
    }
};

const signInController = async (req, res) => {
    try {
        const { email, password } = req.body;
        //validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid email or password",
            });
        }

        //check user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registerd",
            });
        }




        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid Password",
            });
        }

        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "30m",
        });

        // Set the token in a cookie with the name 'token' and expiration time of 30 minutes
        res.cookie('token', token, { httpOnly: true, maxAge: 30 * 60 * 1000 });

        // Fetch user profile if it exists
        const profile = await profileModel.findOne({ userID: user._id });
        console.log("profile", profile)




        res.status(200).send({
            success: true,
            message: "login successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                profilePic: profile ? profile.profilePicture[0] : null,
                profileCompleted: profile ? true : false

            },
            token,
        });

        console.log("login successfully", user)
    } catch (error) {

    }
}


module.exports = { siginupController, signInController };
