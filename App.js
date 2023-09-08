import { StyleSheet } from 'react-native';
import Navigation from './src/navigation';
import { SafeAreaView } from 'react-native';
import { ContextProvider } from './src/contexts/ContextProvider';

const App = () => {
  return (
    <SafeAreaView style={styles.root}>
      <ContextProvider>
        <Navigation />
      </ContextProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root:{
      flex: 1,
      backgroundColor: '#FFFFFF'
  }
})

export default App;