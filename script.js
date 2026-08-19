async function generatePrompt() {
    const userInput = document.getElementById('idea').value; // kiritilgan matn
    const promptType = document.getElementById('promptType').value;
    const style = document.getElementById('style').value;
    const resultBox = document.getElementById('resultText'); // javob chiqadigan joy

    if (!userInput) {
        alert("Iltimos, g'oya matnini kiriting!");
        return;
    }

    resultBox.innerText = "Prompt tayyorlanmoqda, kuting...";

    try {
        const response = await fetch('http://localhost:3000/api/generate-prompt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: userInput,
                type: promptType,
                style: style
            })
        });

        const data = await response.json();

        if (data.result) {
            resultBox.innerText = data.result; // AI bergan asl javobni chiqaradi
        } else {
            resultBox.innerText = "Xatolik: AI javob qaytarmadi.";
        }
    } catch (error) {
        console.error(error);
        resultBox.innerText = "Server bilan bog'lanishda xatolik yuz berdi!";
    }
}

function copyPrompt() {

    const result = document.getElementById("result");

    const text = result.innerText;

    if (
        !text ||
        text.includes("Your prompt will appear here") ||
        text.includes("Please describe your idea")
    ) {
        alert("⚠️ Generate a prompt first!");
        return;
    }

    navigator.clipboard.writeText(text);

    alert("✅ Prompt copied successfully!");
}


function clearPrompt() {

    document.getElementById("idea").value = "";

    document.getElementById("result").innerHTML = `
        <div class="empty-state">
            <div class="empty-icon">✦</div>

            <h4>Your prompt will appear here</h4>

            <p>
                Describe your idea and click
                <strong>Generate Prompt</strong>.
            </p>
        </div>
    `;
}