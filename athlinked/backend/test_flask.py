try:
    print("Starting Flask test...")
    from flask import Flask
    print("Flask imported successfully!")
    
    app = Flask(__name__)
    print("Flask app created!")
    
    @app.route('/test')
    def hello():
        return "Flask is working!"
    
    if __name__ == '__main__':
        print("Starting Flask server on http://localhost:5001")
        print("Press Ctrl+C to exit")
        app.run(host='127.0.0.1', port=5001, debug=True)
except Exception as e:
    print(f"Error: {e}")
    import traceback
    traceback.print_exc()
    print("\nPlease check the error above.") 