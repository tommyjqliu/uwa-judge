export default function singleUpload() {
    return new Promise<File | undefined>((resolve) => {
        // Create a file input element
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.csv';
        fileInput.style.display = 'none';
        document.body.appendChild(fileInput);

        // Set up the change event listener
        fileInput.addEventListener('change', () => {
            const file = fileInput.files?.[0];
            resolve(file);
            // Clean up: remove the input element            
            document.body.removeChild(fileInput);
        });

        // Handle the case where the user cancels the file selection
        fileInput.addEventListener('cancel', () => {
            resolve(undefined);
            document.body.removeChild(fileInput);
        });

        // Trigger the file selection window
        fileInput.click();
    });
}