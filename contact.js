document.getElementById('premiumContactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('userName').value.trim();
    alert(`Thank you, ${name}! Your feedback has been sent to Royal Kitchen successfully.`);

    this.reset();
    window.location.href = '1.index.html';
});