from flask import Flask, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app) # Permite la conexión desde el navegador

@app.route('/api/products', methods=['GET'])
def get_products():
    # --- MANEJO DE ERRORES ---
    try:
        # Intenta abrir y leer el archivo JSON
        with open('products.json', 'r', encoding='utf-8') as f:
            products = json.load(f)
        # Si todo sale bien, retorno los productos
        return jsonify(products)

    except FileNotFoundError:
        # Error específico si el archivo no se encuentra
        error_message = {"error": "El archivo de productos (products.json) no fue encontrado."}
        # Devuelvo el error en formato JSON con un código de estado 404
        return jsonify(error_message), 404

    except Exception as e:
        # Error genérico para cualquier otro problema (ej. JSON inválido)
        # El str(e) dará más detalles del error en la consola
        print(f"Ha ocurrido un error inesperado: {str(e)}")
        error_message = {"error": "Ha ocurrido un error interno en el servidor."}
        # Devuelvo el error en JSON con un código de estado 500
        return jsonify(error_message), 500

if __name__ == '__main__':
    # El servidor correrá en http://127.0.0.1:5000
    app.run(debug=True, port=5000)