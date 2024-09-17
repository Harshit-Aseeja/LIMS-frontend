import "../styles/globals.css";
// Import the AuthProvider component
import { AuthContextProvider } from "../store/authContext";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* Wrap the entire app with the AuthProvider component */}
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </>
  );
}
