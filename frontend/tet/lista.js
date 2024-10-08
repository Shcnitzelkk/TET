import React, { useState, useEffect } from 'react';
import {StyleSheet,Text,View,FlatList,TouchableOpacity,Alert,TextInput,Button,Modal,} from 'react-native';

const lista = () => {
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);//Modal(tela) para permitir a troca do nome
  const [currentItem, setCurrentItem] = useState(null);
  const [nameInput, setNameInput] = useState('');

  useEffect(() => {
    async function fetchList() {
      try {
        const response = await fetch('http://localhost:3000/ver/paciente', {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const resJson = await response.json();
        setData(resJson);
      } catch (e) {
        console.log(e);
      }
    }
    fetchList();
  }, []);

  const Excluir = (cpf) => {
    const confirm = window.confirm('Deseja Excluir?');
    if (confirm) {
      fetch('http://localhost:3000/delete/paciente/' + cpf, { method: 'DELETE' })
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }
  };

  const Editar = (item) => {
    setCurrentItem(item);
    setNameInput(item.nome);
    setIsModalVisible(true);
  };

  const handleUpdate = () => {
    if (currentItem) {
      fetch('http://localhost:3000/atualizar/paciente/${currentItem.cpf}', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ nome: nameInput, cpf: currentItem.cpf }),
      })
        .then(response => response.json())
        .then(json => {
          console.log("Console log após atualização dos dados: ");
          console.log(json);
          setIsModalVisible(false);
          setCurrentItem(null);
          // Atualizando a flatlist apóa a edição
          setData(prevData => 
            //o método map vai armazenar uma array com o resultado da chamada da prevData
            prevData.map(item =>
              //Verificando condição se o cpf do item é igual ao cpf do item editado
              item.cpf === currentItem.cpf ? { ...item, nome: nameInput } : item
            )
          );
        })
        .catch(err => {
          console.log(err); // Imprime no console caso ocorra algum erro
        });
    }
  };

  const renderItemComponent = ({ item }) => (
    <View style={styles.listItem}>
      <View style={styles.listItemView}>
        <Text style={styles.listItemTitle}>{item.cpf}</Text>
        <Text>{item.nome}</Text>
      </View>
      <TouchableOpacity
        style={styles.listItemButton}
        onPress={() => Editar(item)} //Passando  item completo
      >
        <Text style={{ color: 'green' }}>Editar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.listItemButton}
        onPress={() => Excluir(item.cpf)}
      >
        <Text style={{ color: 'red' }}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );

  const ItemSeparator = () => <View style={styles.listItemSeparator} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItemComponent}
        keyExtractor={(item) => item.cpf.toString()}
        ItemSeparatorComponent={ItemSeparator}
      />

      
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Nome:</Text>
            <TextInput
              style={styles.input}
              onChangeText={setNameInput}
              value={nameInput}
            />
            <Button
              title="Confirmar"
              onPress={handleUpdate}
            />
            <Button
              title="Cancelar"
              onPress={() => setIsModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    marginTop: 60,
  },
  listItemView: { alignItems: 'center', flex: 1 },
  listItemTitle: { fontWeight: 'bold' },
  listItemButton: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listItemSeparator: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    marginLeft: 5,
    marginRight: 5,
  },
  listItem: {
    margin: 10,
    padding: 10,
    backgroundColor: '#FFF',
    width: '80%',
    flex: 1,
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 5,
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default lista;