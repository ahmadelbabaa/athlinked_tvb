try:
    print("Starting debug Flask app...")
    
    print("Importing Flask libraries...")
    from flask import Flask, jsonify
    from flask_cors import CORS
    print("Flask libraries imported successfully!")
    
    print("Creating Flask app...")
    app = Flask(__name__)
    CORS(app)  # Enable CORS for all routes
    print("Flask app created!")
    
    print("Setting up routes...")
    
    @app.route('/', methods=['GET'])
    def root():
        print("Root endpoint called")
        return jsonify({
            'status': 'success',
            'message': 'Debug Flask API is running at root endpoint'
        })
    
    @app.route('/api/test', methods=['GET'])
    def test_api():
        print("Test endpoint called")
        return jsonify({
            'status': 'success',
            'message': 'Debug Flask API is running'
        })
    
    print("All routes set up!")
    
    if __name__ == '__main__':
        print("Starting Flask server on http://localhost:5000")
        print("Press Ctrl+C to exit")
        app.run(debug=True, port=5000, host='0.0.0.0')  # Use 0.0.0.0 to allow external connections

except Exception as e:
    print(f"ERROR OCCURRED: {str(e)}")
    import traceback
    print("Traceback:")
    traceback.print_exc()
    print("Debug Flask app failed to start") 