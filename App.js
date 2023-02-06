import { FlatList, SafeAreaView, StatusBar, StyleSheet } from "react-native"
// import AsyncStorage from "@react-native-async-storage/async-storage"
import NotaEditor from "./src/componentes/NotaEditor"
import { Nota } from "./src/componentes/Nota"
import { useEffect, useState } from "react"
import { buscaNotas, criaTabela } from "./src/servicos/Notas"

export default function App() {

  useEffect(() => {
    criaTabela()
    mostraNotas()
  }, [])

  const [notas, setNotas] = useState([])

  async function mostraNotas(){
    const todasNotas = await buscaNotas()
    // const todasChaves = await AsyncStorage.getAllKeys()
    // const todasNotas = await AsyncStorage.multiGet(todasChaves)
    setNotas(todasNotas)
    // console.log(todasNotas);
  }

  return (
    <SafeAreaView style={estilos.container}>
      <FlatList
       data={notas}
       renderItem={(nota)=> <Nota {...nota}/>} 
       keyExtractor={nota => nota.id}
      />
      <NotaEditor mostraNotas={mostraNotas}/>
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
})

