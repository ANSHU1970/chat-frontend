const apiBaseUrl = 'https://chat-api-doba.onrender.com';  // Change this if your FastAPI server is hosted elsewhere

async function uploadPDFs() {
    const pdfUpload = document.getElementById('pdfUpload');
    const files = pdfUpload.files;
    
    if (files.length === 0) {
        alert("Please select at least one PDF file.");
        return;
    }

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
        formData.append('pdf_docs', files[i]);
    }

    try {
        const response = await fetch(`${apiBaseUrl}/upload-pdfs/`, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Failed to upload PDFs');
        }

        const result = await response.json();
        alert(result.message);
    } catch (error) {
        console.error('Error:', error);
        alert('Error uploading PDFs. Please check the console for more details.');
    }
}

async function askQuestion() {
    const userQuestion = document.getElementById('userQuestion').value;

    if (!userQuestion) {
        alert("Please enter a question.");
        return;
    }

    try {
        const response = await fetch(`${apiBaseUrl}/ask-question/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_question: userQuestion })
        });

        if (!response.ok) {
            throw new Error('Failed to retrieve answer');
        }

        const result = await response.json();
        document.getElementById('response').innerText = result.answer;
    } catch (error) {
        console.error('Error:', error);
        alert('Error getting response. Please check the console for more details.');
    }
}
