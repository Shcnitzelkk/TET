import React, {useState}   from 'react';
import{SafeAreaView,StyleSheet,TextInput, Text, TouchableOpacity, View, Image, handleSubmit, Button} from 'react-native';

const CadastroUsuario = ({navigation}) =>{
  /*const [text,onChangeText]= React.useState('E-mail');
  const[number,onChangeNumber] = React.useState('');*/

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');

  const Cadastrar = () =>{
  var userObj = {nome:nome, email: email, senha:senha};
  var jsonBody = JSON.stringify(userObj);
  console.log(jsonBody);
  fetch('https://tet-matheusazevedo.glitch.me/usuario', {
  method: 'POST',
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

  return(
    <View>
    <TextInput style={styles.input} placeholder="Nome" onChangeText={(event)=> setNome(event)} />
    <TextInput style={styles.input} placeholder="E-mail" onChangeText={(event)=> setEmail(event)} />
    <TextInput style={styles.input} placeholder="Senha"  onChangeText={(event)=> setSenha(event)}  />

    <TouchableOpacity  style={styles.fixToText}>
    <Button
        title="Cadastrar"
        onPress={Cadastrar}
      />
    </TouchableOpacity>
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
    padding: 10,
    justifyContent: 'center',
  },
});

export default CadastroUsuario;
