import React, {useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

const DATA = [
  {
    id: '1',
    title: 'Item 1',
    description: 'Descricao Item 1......'
  },
  {
    id: '2',
    title: 'Item 2',
    description: 'Descricao Item 2......'
  },
  {
    id: '3',
    title: 'Item 3',
    description: 'Descricao Item 3......'
  },
  {
    id: '4',
    title: 'Item 4',
    description: 'Descricao Item 4......'
  },
];

const Item = ({title, description}) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );

export default function list (){
    return(
        <SafeAreaView style={styles.container}>
            <FlatList
                data={DATA}
                renderItem={({item}) => <Item title={item.title} description={item.description}/>}
                keyExtractor={item=>item.id}
            />
        </SafeAreaView>
    )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  description: {
    fontSize: 16,
  },
});
