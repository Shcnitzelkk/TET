import React,{useState} from 'react';
import{SafeAreaView,StyleSheet,TextInput, Text, TouchableOpacity, View, Button, Image} from 'react-native';

export function LoginUsuario({navigation}){

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const image = {uri: 'https://mfiles.alphacoders.com/987/987568.jpg'};

  const verificarLogin = () => {
  console.log("teste")
    var userObj = { email:email, senha:senha };
    var jsonBody = JSON.stringify(userObj);
    console.log(jsonBody)
    fetch('https://tet-matheusazevedo.glitch.me/login', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    },
    body: jsonBody,
    }).then((response) => response.json()).then((json) => {
    console.log(json);
    setMensagem(json.mensagem);
    if(json.id!=null){
    navigation.navigate('AtualizaUsuario', {idUsuario:json.id});
    }
    
    }).catch((err) => {
    console.log(err);
  });

  }
  
  return(
    <View>
    <View style={styles.tudo}>
    <Image
        style={styles.tinyLogo}
        source={{
          uri: 'https://wallpapersmug.com/large/3b5866/celebrity-ryan-gosling.jpg',
        }}
    />
    </View>
    <TextInput style={styles.input} placeholder="E-mail" onChangeText={(event )=>setEmail(event)}/>
    <TextInput style={styles.input} placeholder="Senha" keyboardType="numeric" onChangeText={(event )=>setSenha(event)}/>
    <SafeAreaView style={styles.container}>
    <View style={styles.fixToText}>
      <Button
        title="Logar"
        onPress={verificarLogin}
      />
      <Button 
        title="Cadastrar agora!"
        onPress={() => {navigation.navigate('CadastroUsuario', {})}}
      />
    </View>
    
    <View>
      <Button
        title="Atualizar"
        onPress={() => {navigation.navigate('AtualizaUsuario', {})}}
      />
    </View>
    <Text>{mensagem}</Text>
  </SafeAreaView>
  </View>
  );

}
const styles = StyleSheet.create({
  input:{
    height:40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    
    
  },
  tudo: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
    
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  tinyLogo: {
    width: 100,
    height: 100,
    justifyContent: 'center',
  },
});

export default LoginUsuario;