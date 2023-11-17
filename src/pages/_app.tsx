import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import ThirdWebProvider from "@/config/ThirdWebProvider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "../config/theme";
import createEmotionCache from "../config/createEmotionCache";
import { StyledEngineProvider } from "@mui/material/styles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Payment from "./payment";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}
export default function App({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: MyAppProps) {
  return (
    <CacheProvider value={emotionCache}>
      <ThirdWebProvider>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <NavBar />
            <CssBaseline />

            <Component {...pageProps} />
            <ToastContainer />

            <Footer />
          </ThemeProvider>
        </StyledEngineProvider>
      </ThirdWebProvider>
    </CacheProvider>
  );
}
