# Famous Connect - Comprehensive Interview Questions & Answers

## Table of Contents
1. [Project Overview](#1-project-overview)
2. [Technical Architecture](#2-technical-architecture)
3. [React Native & Expo](#3-react-native--expo)
4. [Navigation](#4-navigation)
5. [Authentication](#5-authentication)
6. [API Integration](#6-api-integration)
7. [State Management](#7-state-management)
8. [UI/UX & Theming](#8-uiux--theming)
9. [Components](#9-components)
10. [Performance](#10-performance)

---

## 1. Project Overview

### Q: What is Famous Connect?
**Answer:** Famous Connect is a React Native mobile application that connects users with local service providers (plumbing, cleaning, electrical, etc.). It features:
- Service browsing with categories
- Search with real-time filtering
- User authentication (Supabase)
- Favorites management (AsyncStorage)
- Real-time chat capability
- Service details with booking
- Dark mode support

**Technologies Used:**
- React Native 0.81.5 + Expo 54.0.32
- TypeScript for type safety
- React Navigation for routing
- Supabase for auth & real-time
- TanStack Query for API state
- Formik + Yup for forms
- AsyncStorage for local data
- Axios for HTTP requests

---

### Q: Why use this tech stack?
**Answer:**
- **Expo**: Faster development, easier testing, OTA updates, managed workflow
- **TypeScript**: Type safety, better IDE support, fewer runtime errors
- **Supabase**: Open-source Firebase alternative with PostgreSQL, real-time features
- **React Navigation**: Industry standard, type-safe navigation
- **TanStack Query**: Automatic caching, background refetching, optimized performance
- **Formik + Yup**: Clean form handling with schema validation

---

## 2. Technical Architecture

### Q: Explain the project structure
**Answer:**
```
famous-connect/
├── App.tsx                 # Root component with providers
├── index.ts               # App entry point (Expo)
├── src/
│   ├── api/               # API clients (Supabase, Axios)
│   ├── components/        # Reusable UI components
│   │   ├── common/       # Input, Button
│   │   └── services/     # ServiceCard
│   ├── hooks/            # Custom hooks (useAuth)
│   ├── navigation/       # Navigation setup
│   │   ├── RootNavigator.tsx    # Auth/Main switcher
│   │   ├── AuthNavigator.tsx    # Login/Signup stack
│   │   ├── MainNavigator.tsx    # Authenticated screens
│   │   └── TabNavigator.tsx     # Bottom tabs
│   ├── screens/          # Screen components
│   │   ├── auth/         # Login, Signup, ForgotPassword
│   │   └── main/         # Home, Services, Favorites, Profile
│   ├── storage/          # AsyncStorage services
│   ├── theme/            # Colors, typography, spacing
│   ├── types/            # TypeScript interfaces
│   └── utils/            # Helper functions
```

**Key Patterns:**
- Feature-based organization
- Separation of concerns
- Reusable components
- Centralized theme system
- Type-safe navigation

---

## 3. React Native & Expo

### Q: How is the app initialized?
**Answer:**
```typescript
// App.tsx - Provider hierarchy
import 'react-native-get-random-values';  // Crypto polyfill
import 'react-native-url-polyfill/auto';  // URL polyfill

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <RootNavigator />
            <StatusBar style={isDark ? 'light' : 'dark'} />
          </AuthProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
```

**Provider Order:**
1. **GestureHandlerRootView** - Touch gesture support
2. **SafeAreaProvider** - Safe area handling
3. **QueryClientProvider** - API state management  
4. **AuthProvider** - Authentication context
5. **RootNavigator** - Navigation

---

### Q: How does dark mode work?
**Answer:**
```typescript
// theme/index.ts
import { useColorScheme } from 'react-native';

export const useTheme = () => {
  const scheme = useColorScheme();  // Auto-detect system preference
  const colors = scheme === 'dark' ? DarkTheme : LightTheme;
  
  return { ...Palette, colors, isDark: scheme === 'dark' };
};

// Usage in components
const { colors, primary } = useTheme();
<View style={{ backgroundColor: colors.background }}>
```

**Themes include:**
- Background, surface, border colors
- Text colors (primary, secondary, muted)
- Dynamic shadow colors
- Automatic system theme detection

---

## 4. Navigation

### Q: Explain the navigation architecture
**Answer:**
```
RootNavigator (Conditional)
├── If authenticated → MainNavigator (Stack)
│   ├── HomeTabs (Bottom Tabs)
│   │   ├── Home
│   │   ├── Services
│   │   ├── Favorites
│   │   └── Profile
│   ├── ServiceDetails (Modal)
│   ├── Search (Modal)
│   └── Chat (Modal)
│
└── If not authenticated → AuthNavigator (Stack)
    ├── Login
    ├── Signup
    └── ForgotPassword
```

**Type-Safe Navigation:**
```typescript
// types/index.ts
export type MainStackParamList = {
  HomeTabs: undefined;
  ServiceDetails: { serviceId: number; service: Service };
  Search: { query?: string };
  Chat: { serviceId: number; providerName: string };
};

// Usage in component
type Props = NativeStackScreenProps<MainStackParamList, 'ServiceDetails'>;

const ServiceDetailsScreen: React.FC<Props> = ({ route, navigation }) => {
  const { service } = route.params;  // Fully typed!
  
  navigation.navigate('Chat', {
    serviceId: service.id,
    providerName: service.brand
  });
};
```

---

### Q: How do you navigate between nested navigators?
**Answer:**
```typescript
// From Stack to Tab
navigation.navigate('HomeTabs', { screen: 'Services' });

// From Tab to Stack with params
navigation.navigate('ServiceDetails', {
  serviceId: item.id,
  service: item
});

// Back navigation
navigation.goBack();
```

---

## 5. Authentication

### Q: How is authentication implemented?
**Answer:**
```typescript
// api/supabase.ts
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,      // Persist sessions
    autoRefreshToken: true,      // Auto refresh expired tokens
    persistSession: true,        // Save across restarts
    detectSessionInUrl: false,   // Not needed for mobile
  },
});

// hooks/useAuth.tsx
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email!,
            name: session.user.user_metadata?.name,
          });
        } else {
          setUser(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, pass: string) => {
    const { error } = await supabase.auth.signInWithPassword({ 
      email, password: pass 
    });
    if (error) throw error;
  };

  const signup = async (email: string, pass: string, name: string) => {
    const { error } = await supabase.auth.signUp({
      email, password: pass,
      options: { data: { name } }
    });
    if (error) throw error;
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
```

**Features:**
- Persistent sessions
- Auto token refresh
- Real-time auth state
- User metadata support

---

## 6. API Integration

### Q: How are API calls structured?
**Answer:**
```typescript
// api/services.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 10000,
});

export const apiService = {
  getProducts: async (limit = 10, skip = 0, query = '', category = '') => {
    let url = '/products';
    
    if (query) {
      url = `/products/search?q=${query}&limit=${limit}&skip=${skip}`;
    } else if (category && category !== 'All') {
      url = `/products/category/${category}?limit=${limit}&skip=${skip}`;
    } else {
      url = `/products?limit=${limit}&skip=${skip}`;
    }

    const response = await apiClient.get<ApiResponse<Service>>(url);
    return response.data;
  },
};
```

**Features:**
- Centralized API client
- Type-safe responses
- Search with query params
- Category filtering
- Pagination support

---

### Q: How is pagination implemented?
**Answer:**
```typescript
const ServicesScreen = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [skip, setSkip] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const LIMIT = 10;

  const fetchServices = async (isRefresh = false) => {
    const currentSkip = isRefresh ? 0 : skip;
    const data = await apiService.getProducts(LIMIT, currentSkip);

    if (isRefresh) {
      setServices(data.products);
    } else {
      setServices(prev => [...prev, ...data.products]);
    }

    setSkip(currentSkip + LIMIT);
  };

  const handleLoadMore = () => {
    if (!loadingMore && services.length < total) {
      fetchServices();
    }
  };

  return (
    <FlatList
      data={services}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={() => 
        loadingMore ? <ActivityIndicator /> : null
      }
    />
  );
};
```

---

## 7. State Management

### Q: How is form validation handled?
**Answer:**
```typescript
import { Formik } from 'formik';
import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Too short!').required('Required'),
});

<Formik
  initialValues={{ email: '', password: '' }}
  validationSchema={LoginSchema}
  onSubmit={handleLogin}
>
  {({ handleChange, values, errors, touched }) => (
    <Input
      value={values.email}
      onChangeText={handleChange('email')}
      error={errors.email}
      touched={touched.email}
    />
  )}
</Formik>
```

**Benefits:**
- Schema-based validation
- Type-safe form values
- Real-time error display
- Clean separation of logic

---

### Q: How are favorites stored?
**Answer:**
```typescript
// storage/favorites.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

export const favoritesStorage = {
  getFavorites: async (): Promise<Service[]> => {
    const jsonValue = await AsyncStorage.getItem(FAVORITES_KEY);
    return jsonValue ? JSON.parse(jsonValue) : [];
  },

  addFavorite: async (service: Service) => {
    const current = await favoritesStorage.getFavorites();
    if (!current.find(s => s.id === service.id)) {
      await AsyncStorage.setItem(
        FAVORITES_KEY,
        JSON.stringify([...current, service])
      );
    }
  },

  removeFavorite: async (serviceId: number) => {
    const current = await favoritesStorage.getFavorites();
    const updated = current.filter(s => s.id !== serviceId);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  },
};
```

---

## 8. UI/UX & Theming

### Q: Explain the theme system
**Answer:**
```typescript
// theme/index.ts
export const Palette = {
  primary: '#6366f1',    // Indigo
  secondary: '#10b981',  // Green
  accent: '#f59e0b',     // Amber
  error: '#ef4444',      // Red
};

export const LightTheme = {
  background: '#f8fafc',
  surface: '#ffffff',
  border: '#e2e8f0',
  text: {
    primary: '#0f172a',
    secondary: '#475569',
    muted: '#94a3b8',
  },
};

export const Spacing = {
  xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48,
};

export const Typography = {
  h1: { fontSize: 32, fontWeight: '700', lineHeight: 40 },
  h2: { fontSize: 24, fontWeight: '700', lineHeight: 32 },
  body: { fontSize: 16, fontWeight: '400', lineHeight: 24 },
};

export const Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    elevation: 2,
  },
};
```

**Usage:**
```typescript
const styles = StyleSheet.create({
  container: {
    padding: Spacing.md,
    ...Shadows.sm,
  },
  title: {
    ...Typography.h2,
  },
});
```

---

## 9. Components

### Q: How are reusable components structured?
**Answer:**

**Input Component:**
```typescript
interface InputProps {
  label?: string;
  error?: string;
  touched?: boolean;
  secureTextEntry?: boolean;
  value: string;
  onChangeText: (text: string) => void;
  // ... other props
}

const Input: React.FC<InputProps> = ({ label, error, touched, ...props }) => {
  const { colors, primary, error: errorColor } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const borderColor = (touched && error) ? errorColor 
    : isFocused ? primary 
    : colors.border;

  return (
    <View>
      {label && <Text>{label}</Text>}
      <TextInput
        style={[styles.input, { borderColor }]}
        onFocus={() => setIsFocused(true)}
        {...props}
      />
      {touched && error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};
```

**Button Component:**
```typescript
interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  variant?: 'primary' | 'outline' | 'danger';
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title, onPress, loading, variant = 'primary'
}) => {
  const { primary, error } = useTheme();
  
  const backgroundColor = variant === 'danger' ? error : primary;
  
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading}
      style={[styles.button, { backgroundColor }]}
    >
      {loading ? <ActivityIndicator /> : <Text>{title}</Text>}
    </TouchableOpacity>
  );
};
```

---

## 10. Performance

### Q: What performance optimizations are implemented?
**Answer:**

**1. React.memo for components:**
```typescript
export default React.memo(ServiceCard);
```

**2. useMemo for calculations:**
```typescript
const discountedPrice = useMemo(() => {
  return (price * (1 - discount / 100)).toFixed(2);
}, [price, discount]);
```

**3. FlatList optimization:**
```typescript
<FlatList
  data={services}
  keyExtractor={(item) => item.id.toString()}
  initialNumToRender={10}
  maxToRenderPerBatch={10}
  windowSize={10}
  removeClippedSubviews={true}
/>
```

**4. Search debouncing:**
```typescript
useEffect(() => {
  const timer = setTimeout(() => handleSearch(), 500);
  return () => clearTimeout(timer);
}, [query]);
```

**5. Image optimization:**
```typescript
<Image
  source={{ uri: thumbnail }}
  resizeMode="cover"
  defaultSource={require('./placeholder.png')}
/>
```

---

## Real-time Chat Implementation

### Q: How is the chat feature built?
**Answer:**
```typescript
const ChatScreen = ({ route }) => {
  const { serviceId } = route.params;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Fetch initial messages
    fetchMessages();

    // Real-time subscription
    const subscription = supabase
      .channel(`chat_${serviceId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
      }, (payload) => {
        setMessages(prev => [payload.new, ...prev]);
      })
      .subscribe();

    return () => subscription.unsubscribe();
  }, []);

  const handleSend = async () => {
    // Optimistic update
    setMessages(prev => [newMessage, ...prev]);
    
    // Send to server
    await supabase.from('messages').insert([{
      text: inputText,
      sender_id: user?.id,
      service_id: serviceId,
    }]);
  };

  return (
    <FlatList
      data={messages}
      renderItem={({ item }) => <MessageBubble message={item} />}
      inverted
    />
  );
};
```

---

## Key Takeaways

### Project Highlights:
✅ **Modern Stack**: React Native + Expo + TypeScript
✅ **Type Safety**: Full TypeScript coverage
✅ **Clean Architecture**: Feature-based structure
✅ **Reusable Components**: Well-organized UI components
✅ **State Management**: Context API + TanStack Query
✅ **Authentication**: Supabase with persistent sessions
✅ **Real-time**: Chat with Supabase subscriptions
✅ **Local Storage**: AsyncStorage for favorites
✅ **Form Validation**: Formik + Yup schemas
✅ **Dark Mode**: System-aware theming
✅ **Performance**: Memoization, lazy loading, debouncing
✅ **API Integration**: Axios with pagination
✅ **Navigation**: Type-safe React Navigation

### Best Practices Used:
- Separation of concerns
- DRY (Don't Repeat Yourself) principle
- Type safety throughout
- Error handling
- Loading states
- Pull-to-refresh
- Infinite scroll
- Optimistic UI updates
- Clean component API
- Consistent naming conventions
