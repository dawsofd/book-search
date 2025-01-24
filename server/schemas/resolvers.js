const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (!context.user) {
                throw new Error('Error: You must be logged in');
            }
            return context.user;
        },
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });

            const token = signToken(user);

            return { token, user };
        },

        login: async (parent, {email, password }) => {

                const user = await User.findOne({ $or: [{ username }, { email }] });

                if (!user) {
                    throw new Error("User not found");
                }

                const correctPw = await user.isCorrectPassword(password);

                if (!correctPw) {
                    throw new Error('Wrong password!');
                }

                const token = signToken(user);
                return { token, user };
        },

        saveBook: async (parent, { bookInput }, context) => {
            if (!context.user) {
                throw new Error('You must be logged in!');
            }

            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { savedBooks: bookInput } },
                { new: true, runValidators: true }
            );

            return updatedUser;
        },

        removeBook: async (parent, { bookId }, context) => {
            if (!context.user) {
                throw new Error('You must be logged in!');
            }

            const updatedUser = await User.findOneAndUpdate(
                {_id: context.user._id},
                { $pull: { savedBooks: { bookId } } },
                { new: true }
            );

            if (!updatedUser) {
                throw new Error('Could not find user with this id!')
            }

            return updatedUser;
        },
    },
};

module.exports = resolvers;