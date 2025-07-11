/**
 * Utility function to handle opening WhatsApp links properly on both mobile and desktop
 * 
 * @param {string} phoneNumber - The phone number to send the message to (without country code)
 * @param {string} message - The message to send (already encoded)
 */
export const openWhatsApp = (phoneNumber, message) => {
  // Create the WhatsApp URL
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
  
  // Check if it's a mobile device
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  if (isMobile) {
    // On mobile, use direct link to ensure proper app opening
    window.location.href = whatsappUrl;
  } else {
    // On desktop, open in a new tab
    window.open(whatsappUrl, '_blank');
  }
};
