#!/usr/bin/env python3
"""
Simple HTTP server to run Chess Openings Trainer locally.
Can be started with:
    python3 server.py
"""

import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def log_message(self, format, *args):
        # Keep console output clean
        sys.stderr.write(f"[{self.log_date_time_string()}] {format % args}\n")

def run():
    os.chdir(DIRECTORY)
    port = PORT
    socketserver.TCPServer.allow_reuse_address = True
    for attempt in range(10):
        try:
            with socketserver.TCPServer(("", port), Handler) as httpd:
                url = f"http://localhost:{port}"
                print("=" * 60)
                print("♟️  ENTRENADOR DE APERTURAS DE AJEDREZ - INICIADO")
                print("=" * 60)
                print(f" Servidor disponible en: {url}")
                print(f" Carpeta del proyecto:   {DIRECTORY}")
                print(" Presiona Ctrl+C para detener el servidor.")
                print("=" * 60)

                # Try opening browser if desktop environment available
                try:
                    webbrowser.open(url)
                except Exception:
                    pass

                httpd.serve_forever()
                break
        except OSError:
            port += 1

if __name__ == '__main__':
    try:
        run()
    except KeyboardInterrupt:
        print("\nServidor detenido.")
