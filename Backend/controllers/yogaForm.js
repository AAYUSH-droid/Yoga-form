const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new user and associated payment
async function createUser(req, res) {
  try {
    const {
      first_name,
      last_name,
      age,
      email,
      contact_number,
      gender,
      batch_id,
      amount,
      payment_successful,
    } = req.body;

    // Create a new user
    const user = await prisma.user.create({
      data: {
        first_name,
        last_name,
        age,
        email,
        contact_number,
        gender,
        batch: {
          connect: {
            batch_id,
          },
        },
      },
    });

    // Create a new payment associated with the user
    const payment = await prisma.payment.create({
      data: {
        user: {
          connect: {
            user_id: user.user_id,
          },
        },
        amount,
        payment_successful,
      },
    });

    res.status(201).json({ user, payment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = { createUser };
