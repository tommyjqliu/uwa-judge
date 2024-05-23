from flask import Flask, request, send_file, after_this_request
import os
from subprocess import run
from werkzeug.utils import secure_filename
import shutil

app = Flask(__name__)
UPLOAD_FOLDER = './temp/problems'
OUTPUT_FOLDER = './temp/pdf'

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['OUTPUT_FOLDER'] = OUTPUT_FOLDER
ALLOWED_EXTENSIONS = {'zip'}

def allowed_file(filename):
    """Check the file extension to allow only certain types of files."""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/problem2pdf', methods=['POST'])
def upload_file():
    # Ensure the request has the file part
    if 'file' not in request.files:
        return 'No file part in request', 400
    file = request.files['file']
    
    # Check for filename existence and validation
    if file.filename == '':
        return 'No file selected', 400

    if not allowed_file(file.filename):
        return 'File type not allowed', 400

    # Secure the filename and save the uploaded file
    filename = secure_filename(file.filename)
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    saved_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(saved_path)
    
    # Prepare directory for extracted content
    extract_folder = os.path.splitext(saved_path)[0]
    os.makedirs(extract_folder, exist_ok=True)
    
    # Extract the zip file into the new directory
    run(['unzip', '-o', saved_path, '-d', extract_folder])
    
    # Prepare output PDF path
    os.makedirs(app.config['OUTPUT_FOLDER'], exist_ok=True)
    output_pdf = os.path.join(app.config['OUTPUT_FOLDER'], os.path.basename(extract_folder) + '.pdf')

    # Generate PDF using the extracted folder as input
    run(['problem2pdf', extract_folder, '-o', output_pdf, '-l', 'en'])

    # Clean up function to run after sending the file
    @after_this_request
    def remove_files(response):
        try:
            os.remove(output_pdf)
            os.remove(saved_path)
            shutil.rmtree(extract_folder)
        except Exception as error:
            app.logger.error("Error removing or cleaning up files", error)
        return response

    # Send the generated PDF back to the client
    return send_file(output_pdf, as_attachment=True)


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
