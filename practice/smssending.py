import serial
import time

# Configure the serial connection (adjust 'COM3' and baudrate as needed)
ser = serial.Serial('COM3', 9600, timeout=1)

def send_sms(phone_number, message):
    # Wait for the modem to initialize
    time.sleep(1)
    
    # Set SMS mode to text
    ser.write(b'AT+CMGF=1\r')
    time.sleep(0.5)
    
    # Specify the recipient's number
    ser.write(f'AT+CMGS="{phone_number}"\r'.encode())
    time.sleep(0.5)
    
    # Send the message content
    ser.write(f'{message}\x1A'.encode())  # \x1A is Ctrl+Z to send the message
    time.sleep(0.5)
    
    # Read response from the modem
    response = ser.read(ser.inWaiting()).decode()
    print(response)

# Example usage
send_sms('+1234567890', 'Hello from Python!')