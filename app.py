from flask import Flask, request, send_file, jsonify
import qrcode
from qrcode.image.svg import SvgImage
import io

app = Flask(__name__)

@app.route('/')
def index():
    return send_file('index.html')

@app.route('/styles.css')
def styles():
    return send_file('styles.css')

@app.route('/script.js')
def script():
    return send_file('script.js')

@app.route('/generate_qr', methods=['POST'])
def generate_qr():
    data = request.get_json()
    text = data.get('text', '')
    color = data.get('color', '#000000')
    background = data.get('background', '#ffffff')
    size = int(data.get('size', 10))
    file_format = data.get('format', 'png')

    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=size,
        border=4,
    )
    qr.add_data(text)
    qr.make(fit=True)

    if file_format == 'svg':
        img = qr.make_image(image_factory=SvgImage, fill_color=color, back_color=background)
        img_io = io.BytesIO()
        img.save(img_io)
        img_io.seek(0)
        return send_file(img_io, mimetype='image/svg+xml')

    else:
        img = qr.make_image(fill_color=color, back_color=background)
        img_io = io.BytesIO()
        img.save(img_io, 'PNG')
        img_io.seek(0)
        return send_file(img_io, mimetype='image/png')

if __name__ == '__main__':
    app.run(debug=True)
