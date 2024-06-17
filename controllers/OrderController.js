//import prisma client
const prisma = require("../prisma/client");

// Import validationResult from express-validator
const {
    validationResult
} = require("express-validator");

//function getOrders
const getOrders = async (req, res) => {
    // Ambil data dari query string
    const search = req.query.q || '';
    const take = parseInt(req.query.take) || 10;
    const skip = parseInt(req.query.skip) || 0;

    //total all orders
    const total = await prisma.order.count({
    })

    // Ambil data order dari database
    const orders = await prisma.order.findMany({
        select: {
            id: true,
            product: true,
            price: true,
            qty: true,
            total: true,
            user: {
                select: {
                    id: true,
                    name: true,
                }
            }
        },
        where: {
            OR: [{
                    product: {
                        contains: String(search)
                    }
                },
                {
                    user: {
                        OR: [{
                            name: {
                                contains: String(search)
                            }
                        }, ]
                    }
                }
            ]
        },
        take: take,
        skip: skip,
    });
    // Kirim response ke pengguna
    res.status(200).send({
        success: true,
        message: "Get all orders successfully",
        total_items: total,
        data: orders,
    });
};

//function storeOrder
const storeOrder = async (req, res) => {
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
    // Ambil data dari body request
    const {
        product,
        price,
        qty,
    } = req.body;
    // Hitung total harga
    const total = price * qty;
    // Ambil id user dari request
    const idUser = req.userId;
    // Simpan order ke database
    const order = await prisma.order.create({
        data: {
            product,
            price,
            qty,
            total,
            user_id: idUser,
        },
    });
    // Kirim response ke pengguna
    res.status(201).send({
        success: true,
        message: "Order created successfully",
        data: order,
    });
};

//function getOrderById
const getOrderById = async (req, res) => {
    // Ambil id order dari parameter
    const {
        id
    } = req.params;
    // Ambil data order dari database
    const order = await prisma.order.findUnique({
        where: {
            id: parseInt(id),
        },
        select: {
            id: true,
            product: true,
            price: true,
            qty: true,
            total: true,
            user: {
                select: {
                    id: true,
                    name: true,
                }
            }
        },
    });
    // Jika order tidak ditemukan
    if (!order) {
        return res.status(404).send({
            success: false,
            message: "Order not found",
        });
    }
    // Kirim response ke pengguna
    res.status(200).send({
        success: true,
        message: "Get order by id successfully",
        data: order,
    });
};

//function updateOrder
const updateOrder = async (req, res) => {
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
    // Ambil id order dari parameter
    const {
        id
    } = req.params;
    // Ambil data dari body request
    const {
        product,
        price,
        qty,
    } = req.body;
    // Hitung total harga
    const total = price * qty;
    // Update order di database
    const order = await prisma.order.update({
        where: {
            id: parseInt(id),
        },
        data: {
            product,
            price,
            qty,
            total,
        },
    });
    // Kirim response ke pengguna
    res.status(200).send({
        success: true,
        message: "Order updated successfully",
        data: order,
    });
};

//function deleteOrder
const deleteOrder = async (req, res) => {
    // Ambil id order dari parameter
    const {
        id
    } = req.params;
    // Hapus order dari database
    await prisma.order.delete({
        where: {
            id: parseInt(id),
        },
    });
    // Kirim response ke pengguna
    res.status(200).send({
        success: true,
        message: "Order deleted successfully",
    });
};

module.exports = {
    getOrders,
    storeOrder,
    getOrderById,
    updateOrder,
    deleteOrder,
};