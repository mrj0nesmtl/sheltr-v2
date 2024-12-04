import { createDonation, updateDonationStatus } from '../api/donations';
import { updateParticipantBalances } from '../api/participants';
import { createTransaction } from '../api/transactions';

export async function processDonation(
  participantId: string,
  amount: number,
  email?: string
): Promise<void> {
  const transactionId = crypto.randomUUID();

  try {
    // Create initial donation record
    await createDonation(participantId, amount, email, transactionId);

    // Update participant balances
    await updateParticipantBalances(participantId, amount);

    // Record transaction
    await createTransaction(participantId, amount, 'donation', {
      donor_email: email,
      transaction_id: transactionId
    });

    // Mark donation as completed
    await updateDonationStatus(transactionId, 'completed');
  } catch (error) {
    // If any step fails, mark the donation as failed
    await updateDonationStatus(transactionId, 'failed').catch(console.error);
    throw error;
  }
}