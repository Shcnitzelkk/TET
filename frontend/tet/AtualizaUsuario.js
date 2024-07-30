import React, {useState, useEffect}   from 'react';
import{SafeAreaView,StyleSheet,TextInput, Text, TouchableOpacity, View, Image, handleSubmit, Button} from 'react-native';

const AtualizaUsuario = ({navigation, route}) =>{
  /*const [text,onChangeText]= React.useState('E-mail');
  const[number,onChangeNumber] = React.useState('');*/

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const {idUsuario}=route.params
  useEffect(() => {
    async function fetchItem() {
      fetch('https://tet-matheusazevedo.glitch.me/usuesp/'+idUsuario,{
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(resJson => {
        console.log(resJson);
        setNome(resJson[0].usu_nome);
        setEmail(resJson[0].usu_email);
    })
    .catch(e => console.log(e));
    }
    fetchItem();
    }, []);

  const Atualizar = () =>{
  var userObj = {nome:nome, email: email, senha:senha};
  var jsonBody = JSON.stringify(userObj);
  console.log(jsonBody);
  fetch('https://tet-matheusazevedo.glitch.me/update/'+idUsuario, {
  method: 'PUT',
  headers: {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  },
  body: jsonBody,
  })
  .then(response => response.json())
  .then(json => {
  console.log(json);
  navigation.goBack();
  })
  .catch((err) => {
  console.log(err);
  }); 
  }

  const Deletar = () =>{
    fetch('https://tet-matheusazevedo.glitch.me/delete/'+idUsuario, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }
  })
    .then(response => response.json())
    .then(json => {
    console.log(json);
    navigation.goBack();
  })
  .catch((err) => {
  console.log(err);
  }); 
  }
  
  

  return(
    <View>
    <TextInput style={styles.input} value={nome} placeholder="Nome"
    onChangeText={(event)=> setNome(event)} />
    <TextInput style={styles.input} value={email} placeholder="E-mail" 
    onChangeText={(event)=> setEmail(event)} />
    <TextInput style={styles.input} placeholder="Senha" onChangeText={(event)=> setSenha(event)}  />

    <SafeAreaView style={styles.container}>
    <View style={styles.fixToText}>
      <Button
        title="Atualizar"
        onPress={Atualizar} 
      />
      <Button
        title="Deletar"
        color="#FF0000"
        onPress={Deletar} 
      />
    </View>
  </SafeAreaView>
    </View>
  );
};



const styles = StyleSheet.create({
  input:{
    height:40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 10,
  },
});

export default AtualizaUsuario;