const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
    ProductController: {
        create: async (req, res) => {
            try {
                const qty = req.body.qty;

                if (qty > 1000) {
                    res.status(400).json({ error: "qty must be less than 1000" });
                    return;
                }

                for (let i = 0; i < qty; i++) {
                    await prisma.product.create({
                        data: {
                            release: req.body.release,
                            name: req.body.name,
                            color: req.body.color,
                            price: req.body.price,
                            customerName: req.body.customerName,
                            customerPhone: req.body.customerPhone,
                            customerAddress: req.body.customerAddress,
                            remark: req.body.remark ?? '',
                            serial: req.body.serial ?? '', // เพิ่มคอลัมน์ serial
                        }
                    });
                }
                res.json({ message: "success" });
            } catch (err) {
                res.status(500).json({ error: err.message });
            }
        },
        list: async (req, res) => {
            try {
                const page = req.params.page ?? 1;
                const limit = 5;
                const skip = (page - 1) * limit;
                const totalRows = await prisma.product.count({
                    where: {
                        status: {
                            not: 'delete'
                        }
                    }
                });
                const totalPages = Math.ceil(totalRows / limit);

                const products = await prisma.product.findMany({
                    orderBy: {
                        id: "desc",
                    },
                    where: {
                        status: {
                            not: 'delete'
                        }
                    },
                    skip: skip,
                    take: limit
                });

                res.json({ products, totalPages, page, totalRows });
            } catch (err) {
                res.status(500).json({ error: err.message });
            }
        },
        update: async (req, res) => {
            try {
                await prisma.product.update({
                    where: { id: req.params.id },
                    data: {
                        release: req.body.release,
                        name: req.body.name,
                        color: req.body.color,
                        price: req.body.price,
                        customerName: req.body.customerName,
                        customerPhone: req.body.customerPhone,
                        customerAddress: req.body.customerAddress,
                        remark: req.body.remark ?? '',
                        serial: req.body.serial ?? '',
                    },
                });
                res.json({ message: "success" });
            } catch (err) {
                res.status(500).json({ error: err.message });
            }
        },
        remove: async (req, res) => {
            try {
                await prisma.product.update({
                    where: { id: req.params.id },
                    data: { status: "delete" }
                });
                res.json({ message: "success" });
            } catch (err) {
                res.status(500).json({ error: err.message });
            }
        }
    }
}