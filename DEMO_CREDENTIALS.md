# 🔐 Demo Login Credentials

## Demo Accounts

Use these credentials to login without setting up Supabase:

### Account 1 (Recommended)
- **Email**: `demo@famousconnect.com`
- **Password**: `demo123`
- **Name**: Demo User

### Account 2
- **Email**: `test@example.com`
- **Password**: `test123`
- **Name**: Test User

### Account 3
- **Email**: `john@example.com`
- **Password**: `john123`
- **Name**: John Doe

---

## Features Available

✅ Full app navigation
✅ Browse services
✅ Search functionality
✅ Add to favorites
✅ View service details
✅ Chat interface (mock)
✅ Profile management
✅ Dark mode

---

## Create New Account

You can also sign up with any email and password. The app will work in demo mode without requiring email verification.

**Steps:**
1. Click "Sign Up" on login screen
2. Enter any name, email, and password
3. Account is created instantly
4. No email verification needed in demo mode

---

## Notes

- Demo mode is automatically activated when Supabase is not configured
- All data is stored locally on your device
- Favorites and preferences persist across sessions
- Real-time chat works with mock responses in demo mode

---

## Switching to Production

To use real Supabase authentication:

1. Create a Supabase account at https://supabase.com
2. Create a new project
3. Update `.env` file with your credentials:
   ```env
   EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```
4. Restart the app: `npm start`

---

**Enjoy exploring Famous Connect!** 🚀
