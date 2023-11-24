from flask import Flask, request
import text_extraction 
app = Flask(__name__)

@app.route('/extract', methods=['POST'])
def call_function_from_other_module():
    image_path = request.form.get('image_path')
    output_path = request.form.get('output_path')

    texts = text_extraction.text_line_extraction(image_path, output_path)
    return texts

if __name__ == '__main__':
    app.run(port=4000)

