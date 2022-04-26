import { Service, Container } from 'typedi';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel } from '@/models/user.model';
import httpStatus from '@/config/httpStatus';
import appConfig from '../config/env';
import UserRepository from '../models/user.model';

var AuthService = Service(() => ({
    // Create User
    async register(req, res, next) {
        const userRepository = Container.get(UserRepository);
        try {
            const isExistingUser = await userRepository.findOne({ email: req.body.email });
            if (isExistingUser) {
                return res.status(httpStatus.CONFLICT).json({
                    message: 'Mail Already Exists!',
                });
            } else {
                const user = new UserModel(req.body);
                if (req.body.password) {
                    user.hash = await bcrypt.hashSync(req.body.password, 10);
                }
                user.password = user.hash;
                await user.save();
                return res.status(httpStatus.CREATED).json({ data: { user } });
            }
        } catch (e) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                status: 'ERROR',
                message: e.message,
            });
        }
    },

    // Login user
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await UserModel.findOne({ email: email });
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = jwt.sign({ sub: user.id }, appConfig.jwt_key, {
                    expiresIn: '7d',
                });
                return res.status(httpStatus.OK).json({
                    message: 'Auth successful',
                    token: token,
                });
            } else {
                return res.status(httpStatus.UNAUTHORIZED).json({
                    message: 'Auth failed!',
                });
            }
        } catch (e) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                status: 'ERROR',
                message: e.message,
            });
        }
    },

    // Get All Users
    async findAll(req, res) {
        try {
            let users = await UserModel.find();
            return res.json(users);
        } catch (error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.toString() });
        }
    },

    // Get User By ID
    async findOne(req, res) {
        try {
            let user = await UserModel.findById(req.params.userId);
            if (!user) {
                return res.status(httpStatus.BAD_REQUEST).json({ message: 'User not found' });
            }
            return res.json(user);
        } catch (error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.toString() });
        }
    },

    // Update User By ID
    async update(req, res) {
        try {
            let user = await UserModel.findById(req.params.userId);
            if (!user) {
                return res.status(httpStatus.BAD_REQUEST).json({ message: 'User not found' });
            }
            Object.assign(user, req.body);
            await user.save();
            return res.json(user);
        } catch (error) {
            return res.status(500).json({ error: error.toString() });
        }
    },

    // Delete User By ID
    async delete(req, res) {
        try {
            let user = await UserModel.findByIdAndRemove(req.params.userId);
            if (!user) {
                return res.status(httpStatus.BAD_REQUEST).json({ message: 'User not found' });
            }
            return res.json({ message: 'User deleted successfully!' });
        } catch (error) {
            return res.status(500).json({ error: error.toString() });
        }
    },
}));

Container.set(AuthService);
