import os
import asyncio
import websockets
import json
from google.cloud import speech

client = speech.SpeechClient()
config = speech.RecognitionConfig(
    encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
    sample_rate_hertz=44100,
    language_code="ms-MY"
)
streaming_config = speech.StreamingRecognitionConfig(config=config, interim_results=True)

async def transcribe_audio(websocket, path):
    print("Client connected")
    try:
        async for message in websocket:
            data = json.loads(message)
            if data['command'] == 'audio_data':
                audio_data = data['data']
                # Process audio data and send it to Google Speech-to-Text API
                responses = client.streaming_recognize(streaming_config, [speech.StreamingRecognizeRequest(audio_content=bytes(audio_data))])
                
                for response in responses:
                    for result in response.results:
                        await websocket.send(json.dumps({
                            "transcript": result.alternatives[0].transcript,
                            "is_final": result.is_final
                        }))
    except websockets.exceptions.ConnectionClosed:
        print("Client disconnected")

if __name__ == "__main__":
    credentials_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "key", "gcp-admin.json"))
    print(f"Looking for credentials file at: {credentials_path}")
    if os.path.exists(credentials_path):
        print("Credentials file found!")
    else:
        print(f"Credentials file not found at {credentials_path}")
        print(f"Current working directory: {os.getcwd()}")
        print(f"Contents of parent directory:")
        parent_dir = os.path.dirname(os.path.dirname(__file__))
        print(os.listdir(parent_dir))

    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = credentials_path

    print("Starting WebSocket server on ws://localhost:8765")
    start_server = websockets.serve(transcribe_audio, "localhost", 8765)
    asyncio.get_event_loop().run_until_complete(start_server)
    print("WebSocket server is running")
    
    try:
        asyncio.get_event_loop().run_forever()
    except KeyboardInterrupt:
        print("Server stopped.")
    except Exception as e:
        print(f"An error occurred: {e}")
