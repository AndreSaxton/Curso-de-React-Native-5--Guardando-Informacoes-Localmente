import { FlatList, SafeAreaView, StatusBar, StyleSheet, View } from "react-native"
// import AsyncStorage from "@react-native-async-storage/async-storage"
import NotaEditor from "./src/componentes/NotaEditor"
import { Nota } from "./src/componentes/Nota"
import { useEffect, useState } from "react"
import { buscaNotas, criaTabela, filtraNotasPorCategoria } from "./src/servicos/Notas"
import { Picker } from "react-native-web"


export default function App() {

  useEffect(() => {
    criaTabela()
    mostraNotas()
  }, [])

  const [notaSelecionada, setNotaSelecionada] = useState({})
  const [notas, setNotas] = useState([])
  const [filtroCategoria, setFiltroCategoria] = useState("Todos")

  async function mostraNotas(){
    const todasNotas = await buscaNotas()
    // const todasChaves = await AsyncStorage.getAllKeys()
    // const todasNotas = await AsyncStorage.multiGet(todasChaves)
    setNotas(todasNotas)
    // console.log(todasNotas);
  }

  async function filtrarCategoria(filtroCategoriaSelecionada){
    setFiltroCategoria(filtroCategoriaSelecionada)
    if(filtroCategoriaSelecionada == "Todos"){
      mostraNotas()
    } else {
      setNotas(await filtraNotasPorCategoria(filtroCategoriaSelecionada))
    }
  }

  return (
    <SafeAreaView style={estilos.container}>
      <FlatList
       data={notas}
       renderItem={(nota)=> <Nota {...nota} setNotaSelecionada={setNotaSelecionada}/>} 
       keyExtractor={nota => nota.id}
       ListHeaderComponent={() => {return (
      <View style={estilos.modalPicker}>
        <Picker
          selectedValue={filtroCategoria}
          onValueChange={(filtroCategoriaSelecionada) => filtrarCategoria(filtroCategoriaSelecionada)}>
            <Picker.Item label="Todos" value="Todos"/>
            <Picker.Item label="Pessoal" value="Pessoal"/>
            <Picker.Item label="Trabalho" value="Trabalho"/>
            <Picker.Item label="Outros" value="Outros"/>
          </Picker>
      </View>
       )}}
      />


      <NotaEditor mostraNotas={mostraNotas} notaSelecionada={notaSelecionada} setNotaSelecionada={setNotaSelecionada}/>
      <StatusBar/>
    </SafeAreaView>
  )
}

const estilos = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "stretch",
		justifyContent: "flex-start",
	},
  picker: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#EEEEEE",
    margin: 16,
  }
})

