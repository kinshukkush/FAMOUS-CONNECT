# 📱 How to Run Famous Connect on Android

## Quick Start Guide

### Option 1: Using Expo Go App (Easiest - Recommended)

#### Step 1: Install Expo Go
1. Open **Google Play Store** on your Android device
2. Search for **"Expo Go"**
3. Install the app (it's free)

#### Step 2: Connect to Same Network
- Make sure your Android device and computer are on the **same Wi-Fi network**
- This is crucial for the connection to work

#### Step 3: Scan QR Code
1. Your Expo server is running at: `exp://172.21.0.180:8081`
2. Open **Expo Go** app on your Android
3. Tap **"Scan QR code"**
4. Point your camera at the QR code in the terminal
5. The app will load automatically

#### Step 4: Login
Use one of these demo accounts:
- **Email**: `demo@famousconnect.com`
- **Password**: `demo123`

---

### Option 2: Using Android Emulator

#### Requirements:
- Android Studio installed
- Android Virtual Device (AVD) configured

#### Steps:
1. Open Android Studio
2. Start your Android Emulator
3. In the terminal, press **'a'** (or type `a` and press Enter)
4. Expo will automatically install the app on the emulator

---

## Troubleshooting

### Issue 1: "Unable to connect to Metro"

**Solution:**
```bash
# Stop the server (Ctrl+C in terminal)
# Restart with:
npx expo start --clear --tunnel
```

Then scan the QR code again.

### Issue 2: "Network response timed out"

**Causes:**
- Different Wi-Fi networks
- Firewall blocking connection
- VPN interfering

**Solutions:**
1. **Check Wi-Fi**: Ensure both devices on same network
2. **Disable VPN**: Turn off VPN on computer temporarily
3. **Use Tunnel**: Run with tunnel mode:
   ```bash
   npx expo start --tunnel
   ```

### Issue 3: App won't open in Expo Go

**Solution:**
1. Force close Expo Go app
2. Clear Expo Go cache:
   - Go to Android Settings → Apps → Expo Go
   - Clear Cache & Clear Data
3. Reopen Expo Go and scan QR code again

### Issue 4: "Signup not working"

**Fixed!** ✅ The signup now works in demo mode:
1. Click "Sign Up" on login screen
2. Enter any name, email, and password
3. Account is created instantly
4. You'll be logged in automatically

---

## Current Server Status

Your Expo server is running at:
- **LAN**: `exp://172.21.0.180:8081`
- **Web**: `http://localhost:8081`

**QR Code is displayed in the terminal** - scan it with Expo Go!

---

## Demo Accounts

### Account 1 (Primary)
```
Email: demo@famousconnect.com
Password: demo123
Name: Demo User
```

### Account 2
```
Email: test@example.com
Password: test123
Name: Test User
```

### Account 3
```
Email: john@example.com
Password: john123
Name: John Doe
```

---

## What I Fixed

### 1. ✅ Authentication System
- **Before**: Signup was failing with Supabase errors
- **After**: Now works in demo mode without Supabase
- Created 3 demo accounts you can use immediately
- Signup creates accounts instantly without email verification

### 2. ✅ Demo Credentials Display
- Added demo account info on login screen
- Easy to see credentials without checking docs

### 3. ✅ Persistent Sessions
- Login state is saved locally
- No need to login again after app restart
- Uses AsyncStorage for persistence

### 4. ✅ Better Error Handling
- Clear error messages if login fails
- Helpful alerts for signup success

---

## Features You Can Test

Once logged in, you can:

✅ **Browse Services** - View all available services
✅ **Search** - Find specific services
✅ **Filter by Category** - Plumbing, Cleaning, etc.
✅ **Add to Favorites** - Heart icon to save services
✅ **View Details** - See full service information
✅ **Chat** - Message service providers (mock)
✅ **Profile** - View your profile and stats
✅ **Dark Mode** - Automatically follows system theme

---

## Commands Reference

```bash
# Start the server
npx expo start

# Start with cleared cache
npx expo start --clear

# Start with tunnel (for network issues)
npx expo start --tunnel

# Stop the server
Ctrl + C

# Open in Android emulator
Press 'a' in the terminal

# Open in web browser
Press 'w' in the terminal

# Reload app
Press 'r' in the terminal
```

---

## Still Having Issues?

### Check Expo Go Version
- Minimum version: SDK 54 compatible
- Update Expo Go from Play Store if needed

### Check Network
```bash
# Test if you can reach the server from Android
# In a browser on your Android, visit:
http://172.21.0.180:8081
```

If the page loads, the connection is working!

### Check Firewall
Windows Firewall might be blocking the connection:
1. Open Windows Defender Firewall
2. Click "Allow an app through firewall"
3. Find "Node.js" and ensure it's checked for Private networks

---

## Next Steps

1. **Scan the QR code** with Expo Go
2. **Login** with demo credentials
3. **Explore** all features
4. **Test** signup with your own email

The app is fully functional in demo mode! 🎉

---

## Need Help?

If you're still facing issues:
1. Check the terminal for error messages
2. Make sure Expo Go is updated
3. Try restarting both the server and Expo Go
4. Use tunnel mode if network issues persist

**The server is ready - just scan and enjoy!** 📱✨
