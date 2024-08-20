import React, {useState, useEffect}   from 'react';
import{SafeAreaView,StyleSheet,TextInput, Text, TouchableOpacity, View, Image, handleSubmit, Button} from 'react-native';

const AtualizaUsuario = ({navigation, route}) =>{
  /*const [text,onChangeText]= React.useState('E-mail');
  const[number,onChangeNumber] = React.useState('');*/

  const [cpf, setCpf] = useState('');
  const [fk_plano_saude_id_plano_saude, setfk_plano_saude_id_plano_saude] = useState('');
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [endereco, setEndereco] = useState('');

  const {idUsuario}=route.params
  useEffect(() => {
    async function fetchItem() {
      fetch('http://localhost:3000/usuesp/'+idUsuario,{
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(resJson => {
        console.log(resJson);
        setCpf(resJson[0].cpf);
        setfk_plano_saude_id_plano_saude(resJson[0].fk_plano_saude_id_plano_saude);
        setNome(resJson[0].nome);
        setTelefone(resJson[0].telefone);
        setEmail(resJson[0].email);
        setEndereco(resJson[0].endereco);
    })
    .catch(e => console.log(e));
    }
    fetchItem();
    }, []);

  const Atualizar = () =>{
  var userObj = {cpf:cpf, fk_plano_saude_id_plano_saude:fk_plano_saude_id_plano_saude, nome:nome, telefone:telefone, email:email, endereco:endereco};
  var jsonBody = JSON.stringify(userObj);
  console.log(jsonBody);
  fetch('http://localhost:3000/update/'+idUsuario, {
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
    fetch('http://localhost:3000/delete/'+idUsuario, {
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
    <TextInput style={styles.input} value={cpf} placeholder="CPF"
    onChangeText={(event)=> setCpf(event)} />
    <TextInput style={styles.input} value={fk_plano_saude_id_plano_saude} placeholder="Plano de saúde"
    onChangeText={(event)=> setfk_plano_saude_id_plano_saude(event)} />
    <TextInput style={styles.input} value={nome} placeholder="Nome"
    onChangeText={(event)=> setNome(event)} />
    <TextInput style={styles.input} value={telefone} placeholder="Telefone" 
    onChangeText={(event)=> setTelefone(event)} />
    <TextInput style={styles.input} value={email} placeholder="E-mail" 
    onChangeText={(event)=> setEmail(event)} />
    <TextInput style={styles.input} value={endereco} placeholder="Endereco" 
    onChangeText={(event)=> setEndereco(event)}  />
    

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

