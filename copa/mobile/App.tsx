import { NativeBaseProvider, StatusBar } from "native-base";
import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { SignIn } from './src/screens/SignIn';
import { Loading } from './src/components/Loading';

import { THEME } from './src/styles/theme'

export default function App() {
  //use fonts retorna um array de fontes que foram carregadas, se nao for busca a fonte
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_500Medium, Roboto_700Bold });
  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {/* analisando o conteudo de uma variavel por um if ternario  */}
      {fontsLoaded ? <SignIn /> : <Loading />}
    </NativeBaseProvider>
  );
}