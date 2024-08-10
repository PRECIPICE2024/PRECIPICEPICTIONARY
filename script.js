const options = [
    "Italy", "Iceland", "Argentina", "Spain", "France",
    "New York", "Singapore", "Australia", "South Korea", "Turkey",
    "Brazil", "United Kingdom", "Canada", "Egypt", "Mexico",
    "Option 16", "Option 17", "Option 18", "Option 19", "Option 20"
];

const canvas = document.getElementById('wheel');
const ctx = canvas.getContext('2d');
const spinButton = document.getElementById('spin-button');
const resultPopup = document.getElementById('result-popup');
const resultText = document.getElementById('result-text');
const closePopup = document.getElementById('close-popup');

let angle = 0;

function drawWheel() {
    const arc = (2 * Math.PI) / options.length;
    for (let i = 0; i < options.length; i++) {
        const startAngle = arc * i + angle;
        ctx.beginPath();
        ctx.moveTo(200, 200);
        ctx.arc(200, 200, 200, startAngle, startAngle + arc);
        ctx.fillStyle = `hsl(${i * 360 / options.length}, 100%, 50%)`;
        ctx.fill();
        ctx.stroke();

        // Draw option text
        ctx.save();
        ctx.translate(200, 200);
        ctx.rotate(startAngle + arc / 2);
        
        // Set text properties
        ctx.fillStyle = 'black'; // Set text color to black
        ctx.font = 'bold 16px Montserrat';
        ctx.textAlign = 'right'; // Align text to the right
        ctx.textBaseline = 'middle'; // Align text vertically to the middle
        
        // Position the text closer to the edge of the circle
        ctx.fillText(options[i], 180, 0); // Adjusted distance from center to 180
        ctx.restore();
    }
}

function spinWheel() {
    const randomIndex = Math.floor(Math.random() * options.length);
    const spinDuration = 3000; // 3 seconds
    const spinAngle = 10 * (Math.random() * 360 + 720); // 720 degrees + random
    const startTime = performance.now();

    function animate(time) {
        const elapsed = time - startTime;
        if (elapsed < spinDuration) {
            angle += spinAngle / (spinDuration / 16);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawWheel();
            requestAnimationFrame(animate);
        } else {
            const winningIndex = (randomIndex + Math.floor(angle / (2 * Math.PI / options.length))) % options.length;
            showResult(options[winningIndex]);
        }
    }
    requestAnimationFrame(animate);
}

function showResult(option) {
    resultText.textContent = `YOUR TOPIC IS: ${option}`;
    resultPopup.classList.remove('hidden');
}

spinButton.addEventListener('click', spinWheel);
closePopup.addEventListener('click', () => {
    resultPopup.classList.add('hidden');
});

drawWheel();
