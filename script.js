const options = [
    "Italy", "Iceland", "Argentina", "Spain", "France",
    "New York", "Singapore", "Australia", "South Korea", "Turkey",
    "Brazil", "United Kingdom", "Canada", "Egypt", "Mexico",
    "Chile", "Cuba", "Japan", "Jordan", "Switzerland"
];

const canvas = document.getElementById('wheel');
const ctx = canvas.getContext('2d');
const spinButton = document.getElementById('spin-button');
const resultPopup = document.getElementById('result-popup');
const resultText = document.getElementById('result-text');
const closePopup = document.getElementById('close-popup');

let angle = 0;

// Fixed colors for the wheel
const colors = [
    '#FF6B6B', // Red
    '#9B59B6', // Purple
    '#3498DB', // Blue
    '#2ECC71', // Green
    '#E74C3C', // Dark Red
    '#8E44AD', // Dark Purple
    '#2980B9', // Dark Blue
    '#27AE60', // Dark Green
    '#C0392B', // Darker Red
    '#FF5733', // Bright Red-Orange
    '#33FF57', // Bright Green
    '#3357FF', // Bright Blue
    '#FF33A1', // Bright Pink
    '#A133FF', // Bright Purple
    '#FF33D4', // Bright Magenta
    '#33FFD4', // Bright Cyan
    '#D4FF33', // Light Green
    '#FF8C33', // Orange
    '#33FF8C', // Light Green
    '#8C33FF', // Light Purple
    '#FF3333', // Bright Red
    '#FF33B2', // Bright Pink
    '#FF6F61', // Coral
    '#6B5B95', // Dark Lavender
    '#88B04B', // Olive Green
    '#F7CAC9', // Light Pink
    '#92A8D1', // Light Blue
    '#FF9F00', // Bright Orange
    '#C70039', // Dark Pink
    '#581845', // Dark Purple
    '#900C3F'  // Dark Red
];

function drawWheel() {
    const arc = (2 * Math.PI) / options.length;

    for (let i = 0; i < options.length; i++) {
        const startAngle = arc * i + angle;
        ctx.beginPath();
        ctx.moveTo(200, 200);
        ctx.arc(200, 200, 200, startAngle, startAngle + arc);
        ctx.fillStyle = colors[i % colors.length]; // Use fixed colors
        ctx.fill();
        ctx.stroke();

        // Draw option text in black color
        ctx.save();
        ctx.translate(200, 200);
        ctx.rotate(startAngle + arc / 2);
        ctx.fillStyle = 'black'; // Set text color to black
        ctx.font = 'bold 16px Montserrat';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        ctx.fillText(options[i], 180, 0);
        ctx.restore();
    }
}

function spinWheel() {
    const randomIndex = Math.floor(Math.random() * options.length);
    const spinDuration = 3000; // 3 seconds
    const spinAngle = 10 * (Math.random() * 360 + 720); // 720 degrees + random
    const startTime = performance.now();

    function
