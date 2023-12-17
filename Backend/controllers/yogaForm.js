const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDMAIL_API_KEY);

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

    // Send email to the user
    const msg = {
      to: email,
      from: 'shaishav.mahaseth@acumensa.co',
      subject: 'Admission Confirmation',
      html: `<p>Dear ${first_name},</p><p>Click the following link to confirm your admission:</p><a href="http://localhost:8000/confirm/${user.user_id}">Confirm Admission</a>`,
    };

    await sgMail.send(msg);

    res.status(201).json({
      user,
      payment,
      message: 'Please Check your email for confirmation for the Program',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

/*
//admission logic
async function confirmAdmission(req, res) {
  try {
    const userId = req.params.userId;

    const userWithDetails = await prisma.user.findUnique({
      where: {
        user_id: Number(userId),
      },
      include: {
        payment: {
          select: {
            payment_id: true, // Include only the payment_id field
          },
        },
        batch: {
          select: {
            batch_id: true, // Include only the batch_id field
          },
        },
      },
    });

    if (!userWithDetails) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Create a new admission record for the user
    const admission = await prisma.admission.create({
      data: {
        user: {
          connect: {
            user_id: userWithDetails.user_id,
          },
        },
        payment: {
          connect: {
            payment_id: userWithDetails.payment?.payment_id,
          },
        },
        batch: {
          connect: {
            batch_id: userWithDetails.batch?.batch_id,
          },
        },
      },
    });

    res
      .status(201)
      .json({ message: 'Admission confirmed successfully', admission });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
*/

module.exports = { createUser };
