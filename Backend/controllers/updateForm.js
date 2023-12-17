const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateBatch(req, res) {
  try {
    const { email, batchId } = req.body;
    const userWithDetails = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!userWithDetails) {
      return res.status(404).json({ error: 'User not found' });
    }

    const currentDate = new Date();
    const nextMonth = new Date(currentDate);
    nextMonth.setMonth(currentDate.getMonth() + 1);

    // if the update is allowed (i.e. before the start of the next month)
    if (
      currentDate < new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 1)
    ) {
      return res
        .status(400)
        .json({ error: 'Batch update not allowed for the current month.' });
    }

    // Update the batch for the next month
    const updatedUser = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        batch_id: batchId,
      },
    });

    res
      .status(200)
      .json({ message: 'Batch updated successfully', user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = { updateBatch };
