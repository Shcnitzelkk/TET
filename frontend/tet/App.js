import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import CadastroUsuario from './CadastroUsuario'
import LoginUsuario from './LoginUsuario'
import AtualizaUsuario from './AtualizaUsuario'

const Stack = createStackNavigator();

export default function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator>
        
        <Stack.Screen name="LoginUsuario" component={LoginUsuario}/>
        <Stack.Screen name="CadastroUsuario" component={CadastroUsuario}/>
        <Stack.Screen name="AtualizaUsuario" component={AtualizaUsuario}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}