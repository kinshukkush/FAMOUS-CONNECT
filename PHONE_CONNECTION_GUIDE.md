# 📱 How to Connect Your Phone to Expo

## Quick Start

### Step 1: Install Expo Go on Your Phone
1. Open **Google Play Store** on your Android phone
2. Search for **"Expo Go"**
3. Install the app (by Expo)
4. Open Expo Go after installation

### Step 2: Connect to Same Wi-Fi
⚠️ **CRITICAL**: Your phone and computer **MUST** be on the same Wi-Fi network

1. On your computer, check your Wi-Fi network name
2. On your phone, go to Settings → Wi-Fi
3. Connect to the **SAME** Wi-Fi network as your computer
4. Verify both devices show the same network name

### Step 3: Scan QR Code
1. Look at your terminal/command prompt on the computer
2. You should see a QR code like this:
   ```
   ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
   █ ▄▄▄▄▄ █▄▀▀▄▄ ▀█▄█ ▄▄▄▄▄ █
   █ █   █ ███▄█  ▀ ▄█ █   █ █
   █ █▄▄▄█ ██▄▀▄▀ ████ █▄▄▄█ █
   ```
3. Open **Expo Go** app on your phone
4. Tap **"Scan QR Code"**
5. Point your camera at the QR code in the terminal
6. The app will start loading

---

## 🔧 Troubleshooting

### Problem 1: "Unable to connect to Expo server"

**Solution 1: Check Network Connection**
- Verify both devices are on the **same Wi-Fi**
- Restart your Wi-Fi router if needed
- Disable mobile data on your phone temporarily

**Solution 2: Restart Expo Server**
```powershell
# Stop server (Ctrl+C in terminal)
# Then restart:
cd "c:\Users\kinsh\Downloads\ALL Projects\Local Connect\famous-connect"
npx expo start --clear
```

**Solution 3: Use Your Computer's IP Address Manually**
1. Find your computer's IP address:
   ```powershell
   ipconfig
   ```
   Look for "IPv4 Address" (e.g., 192.168.1.100)

2. In Expo Go app:
   - Tap "Enter URL manually"
   - Type: `exp://YOUR_IP_ADDRESS:8081`
   - Example: `exp://192.168.1.100:8081`

**Solution 4: Check Windows Firewall**
```powershell
# Allow Node.js through firewall
New-NetFirewallRule -DisplayName "Expo Metro" -Direction Inbound -Program "C:\Program Files\nodejs\node.exe" -Action Allow
```

### Problem 2: QR Code Not Scanning

**Solutions:**
- Increase terminal font size to make QR code bigger
- Take a screenshot and scan from phone gallery
- Use manual IP entry method (see Solution 3 above)
- Try in better lighting

### Problem 3: App Loads but Shows Blank Screen

**Solutions:**
1. Reload the app:
   - Shake your phone
   - Tap "Reload"

2. Clear app cache:
   - In Expo Go, go to Projects tab
   - Long press your project
   - Select "Clear cache"

3. Restart server:
   ```powershell
   npx expo start --clear
   ```

### Problem 4: "Network connection lost"

**Solutions:**
1. Check if computer went to sleep
2. Verify Wi-Fi connection is stable
3. Restart both phone and computer
4. Try using a hotspot from your phone:
   - Enable hotspot on phone
   - Connect computer to phone's hotspot
   - Restart Expo server

---

## 🚀 Login After Connection

Once the app loads on your phone:

1. **Use Demo Credentials:**
   - Email: `demo@famousconnect.com`
   - Password: `demo123`

2. **Or Create New Account:**
   - Tap "Sign Up"
   - Enter any email and password
   - Works instantly without verification

---

## ✅ Connection Checklist

Before asking for help, verify:

- [ ] Expo Go app installed on phone
- [ ] Both devices on **same Wi-Fi** network
- [ ] Expo server running on computer (QR code visible)
- [ ] Firewall allows Node.js connections
- [ ] Phone is not on mobile data
- [ ] VPN is disabled on both devices
- [ ] Router allows device-to-device communication

---

## 📞 Alternative Methods

### Method 1: Use USB Connection (Android)
```powershell
# Enable USB debugging on phone
# Connect phone via USB cable
npx expo start --localhost
adb reverse tcp:8081 tcp:8081
```

### Method 2: Use Tunnel Mode (If nothing else works)
```powershell
# This creates a public URL (slower but works anywhere)
npx expo start --tunnel
```
*Note: Requires ngrok installation (may prompt)*

---

## 🎯 Current Server Details

Your server is running at:
- **URL**: `exp://172.21.0.180:8081`
- **Web**: `http://localhost:8081`

If QR scan doesn't work, manually enter:
```
exp://172.21.0.180:8081
```
in Expo Go app.

---

## 💡 Pro Tips

1. **Keep terminal open** - Closing it stops the server
2. **Shake phone** - Opens developer menu for reload/debug
3. **Press 'r' in terminal** - Reloads app on all connected devices
4. **Press 'm' in terminal** - Opens developer menu
5. **Save your IP** - `172.21.0.180` for quick manual entry

---

**Still having issues?** Make sure:
- Windows Firewall isn't blocking Node.js
- Your router allows local network communication
- Both devices can ping each other
