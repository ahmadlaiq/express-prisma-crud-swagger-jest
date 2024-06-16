//import express
const express = require("express");

//import prisma client
const prisma = require("../prisma/client");

// Import validationResult from express-validator
const {
    validationResult
} = require("express-validator");

//import bcrypt
const bcrypt = require("bcryptjs");

//function getUsers
const getUsers = async (req, res) => {
    // Ambil data dari query string
    const search = req.query.q || ''
    const take = req.query.take || 10
    const skip = req.query.skip || 0
    // Ambil data user dari database
    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
        },
        where: {
            OR: [
                {
                    name: {
                        contains: String(search)
                    }
                },
                {
                    email: {
                        contains: String(search)
                    }
                }
            ]
        },
        take: Number(take),
        skip: Number(skip),
    })
    // Kirim response ke pengguna
    res.status(200).send({
        success: true,
        message: "Get all users successfully",
        data: users,
    });

};

//function storeUser
const storeUser = async (req, res) => {

    // Periksa hasil validasi
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // Jika ada error, kembalikan error ke pengguna
        return res.status(422).json({
            success: false,
            message: "Validation error",
            errors: errors.array(),
        });
    }

    //hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    try {

        //insert data
        const user = await prisma.user.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
            },
        });
        //return response json
        res.status(201).send({
            success: true,
            message: "User created successfully",
            data: user,
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    }
};

//function getUserById
const getUserById = async (req, res) => {

    //get ID from params
    const {
        id
    } = req.params;

    try {

        //get user by ID
        const user = await prisma.user.findUnique({
            where: {
                id: Number(id),
            },
            select: {
                id: true,
                name: true,
                email: true,
            },
        });

        //send response
        res.status(200).send({
            success: true,
            message: `Get user By ID :${id}`,
            data: user,
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    }
};

//function updateUser
const updateUser = async (req, res) => {

    //get ID from params
    const {
        id
    } = req.params;

    // Periksa hasil validasi
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // Jika ada error, kembalikan error ke pengguna
        return res.status(422).json({
            success: false,
            message: "Validation error",
            errors: errors.array(),
        });
    }

    //hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    try {

        //update user
        const user = await prisma.user.update({
            where: {
                id: Number(id),
            },
            data: {
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
            },
        });

        //send response
        res.status(200).send({
            success: true,
            message: 'User updated successfully',
            data: user,
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    }
};

//function deleteUser
const deleteUser = async (req, res) => {

    //get ID from params
    const {
        id
    } = req.params;

    try {

        //delete user
        await prisma.user.delete({
            where: {
                id: Number(id),
            },
        });

        //send response
        res.status(200).send({
            success: true,
            message: 'User deleted successfully',
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    }

};

module.exports = {
    getUsers,
    storeUser,
    getUserById,
    updateUser,
    deleteUser
};