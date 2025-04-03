import { Order } from "@shared/schema";

export const sendOrderEmail = async (order: Order) => {
  // This would normally be handled by the server, but we're including the frontend logic
  // for clarity. The actual email sending is handled in the API route.
  
  try {
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create order');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error sending order email:', error);
    throw error;
  }
};
