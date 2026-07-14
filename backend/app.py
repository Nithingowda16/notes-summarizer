import os
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from nlp_engine import extract_text_from_pdf, calculate_analytics, generate_summary, extract_keywords, document_qa

app = Flask(__name__)
# Enable CORS for frontend running on other ports (such as Vite on 5173/3000)
CORS(app)

UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# In-memory cache for the currently active uploaded document
CURRENT_DOC = {
    "text": "",
    "filename": "",
    "summary": "",
    "keywords": [],
    "analytics": {}
}

@app.route('/api/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file in request. Please upload a PDF file."}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file. Please select a valid PDF file."}), 400
        
    if not file.filename.lower().endswith('.pdf'):
        return jsonify({"error": "Invalid file type. Only PDF documents are supported."}), 400
        
    try:
        # Save file to upload directory
        file_path = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(file_path)
        
        # Process and extract text
        text = extract_text_from_pdf(file_path)
        if not text.strip():
            # Try to clean up
            if os.path.exists(file_path):
                os.remove(file_path)
            return jsonify({"error": "The PDF document contains no indexable text or is image-only."}), 400
            
        # Run NLP analyses
        analytics = calculate_analytics(text, file_path)
        summary = generate_summary(text, sentences_count=5)
        keywords = extract_keywords(text, top_n=8)
        
        # Cache active document
        CURRENT_DOC["text"] = text
        CURRENT_DOC["filename"] = file.filename
        CURRENT_DOC["summary"] = summary
        CURRENT_DOC["keywords"] = keywords
        CURRENT_DOC["analytics"] = analytics
        
        # Clean up the file to keep storage clean
        if os.path.exists(file_path):
            os.remove(file_path)
            
        return jsonify({
            "filename": file.filename,
            "summary": summary,
            "keywords": keywords,
            "analytics": analytics
        })
        
    except Exception as e:
        # Clean up file in case of error
        try:
            if 'file_path' in locals() and os.path.exists(file_path):
                os.remove(file_path)
        except Exception:
            pass
        return jsonify({"error": f"Failed to process PDF: {str(e)}"}), 500

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json or {}
    query = data.get('query', '')
    
    if not query:
        return jsonify({"error": "Your message cannot be empty."}), 400
        
    if not CURRENT_DOC["text"]:
        return jsonify({"error": "Please upload a PDF document first before asking questions."}), 400
        
    try:
        answer = document_qa(CURRENT_DOC["text"], query)
        return jsonify({"answer": answer})
    except Exception as e:
        return jsonify({"error": f"Error running Q&A engine: {str(e)}"}), 500

@app.route('/api/download', methods=['GET'])
def download_summary():
    if not CURRENT_DOC["text"]:
        return jsonify({"error": "No active document to download a summary for."}), 400
        
    try:
        summary_content = (
            "====================================================\n"
            "   SUMMORA - AI-POWERED SMART NOTES SUMMARIZER REPORT\n"
            "   (Google Gemini Internship Mini Project)\n"
            "====================================================\n\n"
            f"Document: {CURRENT_DOC['filename']}\n"
            f"Pages: {CURRENT_DOC['analytics'].get('pages', 1)}\n"
            f"Words: {CURRENT_DOC['analytics'].get('words', 0)}\n"
            f"Characters: {CURRENT_DOC['analytics'].get('characters', 0)}\n"
            f"Estimated Reading Time: {CURRENT_DOC['analytics'].get('reading_time_minutes', 0)} min\n"
            "----------------------------------------------------\n\n"
            "EXTRACTIVE SUMMARY:\n"
            f"{CURRENT_DOC['summary']}\n\n"
            "----------------------------------------------------\n\n"
            "EXTRACTED KEYWORDS:\n"
            f"{', '.join(CURRENT_DOC['keywords'])}\n\n"
            "====================================================\n"
            "Processed locally. No external APIs were contacted.\n"
            "====================================================\n"
        )
        
        # Save temp file for sending
        temp_file_name = f"summary_{os.path.splitext(CURRENT_DOC['filename'])[0]}.txt"
        temp_file_path = os.path.join(UPLOAD_FOLDER, temp_file_name)
        with open(temp_file_path, 'w', encoding='utf-8') as f:
            f.write(summary_content)
            
        return send_file(
            temp_file_path,
            as_attachment=True,
            download_name=temp_file_name,
            mimetype="text/plain"
        )
    except Exception as e:
        return jsonify({"error": f"Failed to generate download file: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
