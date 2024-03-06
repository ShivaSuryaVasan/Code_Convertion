document.getElementById('fileForm').addEventListener('submit', async function (event) {
  event.preventDefault(); // Prevents the form from submitting and reloading the page

  // Get the selected file input element
  var fileInput = document.getElementById('fileInput');

  // Get the selected conversion target
  var conversionTarget = document.getElementById('conversionTarget').value;

  // Check if a file is selected
  if (fileInput.files.length > 0) {
    // Get the first selected file
    var file = fileInput.files[0];

    // Check if the selected file has a .sql extension
    if (file.name.endsWith('.sql')) {
      // Use FileReader to read the content of the file
      var reader = new FileReader();

      reader.onload = async function (e) {
        // Access the content of the file here
        var fileContent = e.target.result;

        // Add prefix and suffix
        var prefixedContent = 'Convert the below Stored Procedure to ' + conversionTarget + '\n\n' + fileContent;

        // Call the GPT model with the modified content
        try {
          const gptResponse = await generateResponse(prefixedContent);

          // Display the GPT response on the frontend
          displayGPTResponse(gptResponse);
        } catch (error) {
          console.error('Error in GPT model:', error);
        }
      };

      // Read the file as text
      reader.readAsText(file);
    } else {
      alert('Please select a valid SQL file.');
    }
  } else {
    alert('Please select a file.');
  }
});

const API_KEY = "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";

const getRequestOptionsForOpenAI = (userMessage) => {
  // Define the properties and message for the API request
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo-16k",
      messages: [
        { role: "user", content: userMessage }
      ],
    })
  };
};

const generateResponse = async (userMessage) => {
  const API_URL = "https://api.openai.com/v1/chat/completions";

  try {
    const response = await fetch(API_URL, getRequestOptionsForOpenAI(userMessage));
    const data = await response.json();

    if (data.choices && data.choices.length > 0) {
      const responseText = data.choices[0].message.content.trim();
      return responseText;
    } else {
      throw new Error('Empty response from Model');
    }
  } catch (error) {
    console.error('Error:', error);
    return ""; // Return empty string for no result or error
  }
};

// Function to store formatted GPT response in a text file and display the download link
function storeResponseAndDisplayLink(formattedResponse) {
  try {
        // Create a Blob containing the formatted response
        const blob = new Blob([formattedResponse], { type: 'text/plain' });

        // Create a download link
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);

        // Set the filename for the download
        downloadLink.download = 'gpt_response.txt';

        // Append the download link to the document
        document.body.appendChild(downloadLink);

        // Make the download button visible
        const downloadButton = document.getElementById('downloadButton');
        downloadButton.style.display = 'inline-block';

        // Add an event listener to initiate the download when the user clicks the button
        downloadButton.addEventListener('click', function () {
          // Append the download link to the document
          document.body.appendChild(downloadLink);

          // Initiate the download
          downloadLink.click();

          // Remove the download link from the document
          document.body.removeChild(downloadLink);
        });
  } catch (error) {
    console.error('Error creating download link:', error);
  }
}


// Function to display GPT response on the frontend
function displayGPTResponse(response) {

  // Replace newline characters with <br> tags for line breaks
  // var formattedResponse = response.replace(/\n/g, '<br>');

  // Call this function with the formatted GPT response
  storeResponseAndDisplayLink(response);

  // responseContainer.innerHTML = '<p><strong>MIC2 Response:</strong> ' + formattedResponse + '</p>';
}
