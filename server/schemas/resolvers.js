const { Book, User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {

        // get single user by their ID
        user: async (parent, { userId }) => {
            return User.findOne({ _id: userId })
        },
    },

    Mutation: {
        // Creates a new user
        createUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
        },
        // Login process; Errors are thrown if email or password are incorrect
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if(!user) {
                throw AuthenticationError;
            }

            const correctPw = await User.isCorrectPassword(password);

            if (!correctPw) {
                throw AuthenticationError;
            }

            const token = signToken(user);
            return { token, user };
        },
        // Adds a book the the user savedBooks array
        saveBook: async (parent, { userId, book }, context) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    { _id: userId },
                    {
                        $addToSet: { savedBooks: book }
                    },
                    {
                        new: true,
                        runValidators: true,
                    }
                );
            }
            // If user isn't logged in, throw an error
            throw AuthenticationError;
        },
        // Delete a book from the user savedBooks array
        deleteBook: async (parent, { book }, context) {
            if (context.user) {
                return User.findOneAndUpdate(
                    { _id: context.userId },
                    { $pull: {savedBooks: book} },
                    { new: true }
                )
            }
            // If user isn't logged in, throw an error
            throw AuthenticationError;
        },
    },
};

module.exports = resolvers;