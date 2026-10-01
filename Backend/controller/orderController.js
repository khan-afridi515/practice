import order from '../model/order.js';
import User from '../model/user.js';

export const createOrder = async (req, res) => {
    try {
        const { num, product, category, price, quantity, status } = req.body;
        const users = await User.find().limit(3);

        if (!num || !product || !category || !price || !quantity) {
            return res.status(400).json({
                message: 'num, product, category, price, and quantity are required.'
            });
        }

        const user = users[num - 1];

        if (!user) {
            return res.status(404).json({ message: 'User not found for this number.' });
        }

        const Order = await order.create({
            userId: user._id,
            product,
            category,
            price,
            quantity,
            status: status || 'pending'
        });

        return res.status(201).json({
            message: 'Order created successfully.',
            Order
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Something went wrong.'
        });
    }
};

export const getpipeline = async (req, res) => {
    try {

        const filterData = await order.aggregate([
            { $match: { status: "completed" } },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "members"
                }
            },
            { $unwind: "$members" },
            {
                $group: {
                    _id: "$members._id",
                    name: { $first: "$members.name" },
                    email: { $first: "$members.email" },

                    totalspent: {
                        $sum: {
                            $multiply: ["$price", "$quantity"]
                        }
                    }
                }
            },
            {
                $sort: { totalspent: -1 }
            },
            {
                $project: {
                    _id: 0,
                    userId: "$_id",
                    name: 1,
                    email: 1,
                    totalspent: 1
                }
            }

        ])
        return res.status(200).json({
            msg: 'Data fetched successfully!',
            data: filterData
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message || 'something went wrong!'
        });
    }
};


export const getOrder = async (req, res) => {
    try {

        const findOrder = await order.find().populate('userId', 'name email');

        if(!findOrder){
            return res.status(400).json({wrn:"Data can't be fetched!"})
        }

       
        return res.status(200).json({ msg: "Data fetched successfully!", data: findOrder })
    }
    catch (err) {
        return res.status(500).json({ message: err.message || "Something went wrong" })
    }
}


export const getpagination = async(req, res) => {
  try{
            const page = 2;
            const limit = 3;

            const skip = (page -1)*limit;
    const getData = await order.find().skip(skip).limit(limit);

    if(!getData){
        return res.status(400).json({wrn : "Data doesn't fetched!"})
    }

    return res.status(200).json({message : "Data fetched successfully!", data:getData})
  }
  catch(err){
    return res.status(500).json({message: err.message || "Something went wrong!"})
  }
}
