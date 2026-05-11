document.addEventListener("DOMContentLoaded", function() {
    const phoneNumber = "+923157558885"; // Your international number
    const message = "Hello! I came across your portfolio and really liked your work. I’m looking for a professional team for my project and would love to discuss further.";
    
    // Create the anchor element
    const waLink = document.createElement('a');
    waLink.href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    waLink.className = "whatsapp-float";
    waLink.target = "_blank";
    waLink.rel = "noopener noreferrer";

    // Add an icon or image inside the link
    waLink.innerHTML = '<img src="./public/images/WhatsAppIcon.png" alt="WhatsApp" />';

    // Attach to the container in the HTML
    document.getElementById('whatsapp-button-container').appendChild(waLink);
});
