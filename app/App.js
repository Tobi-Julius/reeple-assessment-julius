import { useFont } from "./customHooks";
import { MainNavigation } from "./navigation";
import { CurrencyProvider } from "./context/context";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const { isFontReady } = useFont();
  return isFontReady ? (
    <>
      <StatusBar StatusBarStyle={"light-content"} />
      <CurrencyProvider>
        <MainNavigation />
      </CurrencyProvider>
    </>
  ) : null;
}
