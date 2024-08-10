const options = [
    "Option 1", "Option 2", "Option 3", "Option 4", "Option 5",
    "Option 6", "Option 7", "Option 8", "Option 9", "Option 10",
    "Option 11", "Option 12", "Option 13", "Option 14", "Option 15",
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
    const colors = ['#FF6B6B', '#FFD93D', '#9B59B6', '#3498DB', '#2ECC71',
                   '#E74C3C', '#F1C40F', '#8E44AD', '#2980B9', '#27AE60',
                   '#C0392B', '#F39C12', '#8E44AD', '#2980B9', '#27AE60',
                   '#C0392B', '#F39C12', '#8E44AD', '#2980B9', '#27AE60'];

    for (let i = 0; i < options.length; i++) {
        const startAngle = arc * i + angle;
        ctx.beginPath();
        ctx.moveTo(200, 200);
        ctx.arc(200, 200, 200, startAngle, startAngle + arc);
        ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
        ctx.fill();
        ctx.stroke();

        // Draw option text
        ctx.save();
        ctx.translate(200, 200);
        ctx.rotate(startAngle + arc / 2);
        ctx.fillStyle = 'black';
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
