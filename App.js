import { View, Text, Button, TextInput, StyleSheet, Image,TouchableOpacity } from 'react-native';
import React from 'react';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();


const App = () => {
  const logado = false;
  return (
    <NavigationContainer>
      {logado ? <Auth /> : <Home />}
    </NavigationContainer>
  );
};

// Navegação de Autenticação
function Auth() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}

function ConversorMoeda({ navigation }) {
  const [valor, setValor] = useState('');
  const [moedaOrigem, setMoedaOrigem] = useState('USD');
  const [moedaDestino, setMoedaDestino] = useState('BRL');
  const [valorConvertido, setValorConvertido] = useState(null);


const converterMoeda = () => {
  const taxaCambio = {
    USD: { BRL: 5.0, EUR: 0.85 },
    BRL: { USD: 0.2, EUR: 0.17 },
    EUR: { USD: 1.18, BRL: 6.0 },
  };

  const taxa = taxaCambio[moedaOrigem][moedaDestino];
  if (taxa) {
    setValorConvertido((parseFloat(valor) * taxa).toFixed(2));
  } else {
    setValorConvertido('Conversão não disponível.');
  }
};

React.useLayoutEffect(() => {
  navigation.setOptions({
    headerLeft: () => (
      <Ionicons
        name="arrow-back"
        size={24}
        color="black"
        onPress={() => navigation.goBack()}
        style={{ marginLeft: 10 }}
      />
    ),
  });
}, [navigation]);

return (
  <View style={styles.container}>
    <Text style={styles.title}>Conversor de Moeda</Text>
    <Text style={styles.label}>Valor:</Text>
    <TextInput
      style={styles.input}
      keyboardType="numeric"
      value={valor}
      onChangeText={setValor}
      placeholder="Digite o valor"
    />
    <Text style={styles.label}>De:</Text>
    <Picker
      selectedValue={moedaOrigem}
      onValueChange={(itemValue) => setMoedaOrigem(itemValue)}
      style={styles.picker}
    >
      <Picker.Item label="Dólar (USD)" value="USD" />
      <Picker.Item label="Real (BRL)" value="BRL" />
      <Picker.Item label="Euro (EUR)" value="EUR" />
    </Picker>
    <Text style={styles.label}>Para:</Text>
    <Picker
      selectedValue={moedaDestino}
      onValueChange={(itemValue) => setMoedaDestino(itemValue)}
      style={styles.picker}
    >
      <Picker.Item label="Dólar (USD)" value="USD" />
      <Picker.Item label="Real (BRL)" value="BRL" />
      <Picker.Item label="Euro (EUR)" value="EUR" />
    </Picker>
    <Button title="Converter" onPress={converterMoeda} />
    {valorConvertido && (
      <Text style={styles.result}>
        Valor Convertido: {valorConvertido} {moedaDestino}
      </Text>
    )}
  </View>
);
}

// Navegação Principal
function Home() {
  const MainStack = createNativeStackNavigator();

  function MainStackScreen() {
    return (
      <MainStack.Navigator>
        <MainStack.Screen name="Main" component={Main} />
        <MainStack.Screen name="RegistroViagens" component={RegistroViagens} />
        <MainStack.Screen name="HistoricoViagens" component={HistoricoViagens} />
        <MainStack.Screen name="ConversorMoeda" component={ConversorMoeda} />
        <MainStack.Screen name="ArmazenamentoDocumentos" component={ArmazenamentoDocumentos} />
      </MainStack.Navigator>
    );
  }
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false, 
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tabs.Screen
        name="MainStack"
        component={MainStackScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
          tabBarLabel: 'Principal',
        }}
      />
      <Tabs.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications" size={size} color={color} />
          ),
          tabBarLabel: 'Notificações',
        }}
      />
      <Tabs.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
          tabBarLabel: 'Configurações',
        }}
      />
    </Tabs.Navigator>
  );
}

// Telas de Autenticação
function Login({ navigation }) {
  const user = 'RenÃª';
  return (
    <View style={styles.center}>
      <Text style={styles.title}>Login</Text>
      <Button title="Registrar-se" onPress={() => navigation.navigate('Register', { user })} />
      <Button title="Go Main" onPress={() => navigation.navigate('Main')} />
    </View>
  );
}

function Register({ navigation, route }) {
  return (
    <View style={styles.center}>
      <Text style={styles.title}>Register - {route.params?.user}</Text>
      <Button title="Back" onPress={() => navigation.goBack()} />
    </View>
  );
}

// Telas da Home
function Main({ navigation }) {
  return (
    <View style={styles.center}>
      <TouchableOpacity
        onPress={() => navigation.navigate('RegistroViagens')}
        style={styles.customButton}
      >
        <Text style={styles.buttonText}>Registro de Viagens</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('HistoricoViagens')}
        style={styles.customButton}
      >
        <Text style={styles.buttonText}>Histórico de Viagens</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('ConversorMoeda')}
        style={styles.customButton}
      >
        <Text style={styles.buttonText}>Conversor de Moeda</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('ArmazenamentoDocumentos')}
        style={styles.customButton}
      >
        <Text style={styles.buttonText}>Armazenamento de Documentos</Text>
      </TouchableOpacity>
    </View>
  );
}

function Details() {
  return (
    <View style={styles.center}>
      <Text style={styles.title}>Details</Text>
    </View>
  );
}

// Telas de Registro e Histórico de Viagens
function RegistroViagens({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Ionicons
          name="arrow-back"
          size={24}
          color="black"
          onPress={() => navigation.goBack()}
          style={{ marginLeft: 10 }}
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro de Viagens</Text>
      <Text style={styles.description}>Adicione notas, fotos e vídeos sobre o que você fez em cada viagem.</Text>
    </View>
  );
}

function HistoricoViagens({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Ionicons
          name="arrow-back"
          size={24}
          color="black"
          onPress={() => navigation.goBack()}
          style={{ marginLeft: 10 }}
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
    <Text style={styles.title}>Registro de Viagens</Text>
    <Text style={styles.description}>Adicione notas, fotos e vídeos sobre o que você fez em cada viagem.</Text>
    
    {/* Botões com lixeira */}
    {[1, 2, 3, 4, 5].map((buttonId) => {
      const [isButtonVisible, setIsButtonVisible] = useState(true);
      
      const handleTrashPress = () => {
        setIsButtonVisible(false); // Ocultar o botão ao clicar na lixeira
      };
      
      return (
        <View key={buttonId} style={styles.buttonContainer}>
          {isButtonVisible && (
            <Button title={`Botão ${buttonId}`} onPress={() => alert(`Botão ${buttonId} pressionado`)} />
          )}
          {isButtonVisible && (
            <TouchableOpacity onPress={handleTrashPress} style={styles.trashIcon}>
              <Ionicons name="trash-bin" size={30} color="red" /> {/* Ícone de lixeira */}
            </TouchableOpacity>
          )}
        </View>
      );
    })}
  </View>
  );
}


// Tela de Armazenamento de Documentos
const ArmazenamentoDocumentos = () => {
  const [cpfImage, setCpfImage] = useState(null);
  const [rgImage, setRgImage] = useState(null);
  const [passagemImage, setPassagemImage] = useState(null);
  const [vistoImage, setVistoImage] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImagePicker = async (setImage) => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission.granted) {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaType: ImagePicker.MediaTypeOptions.Images,
      });

      if (!result.cancelled) {
        setImage(result.uri); // Obtém o URI da imagem
      }
    } else {
      Alert.alert('Permissão negada', 'Você precisa permitir o acesso à galeria.');
    }
  };

  const handlePreviewImage = (imageUri) => {
    setSelectedImage(imageUri);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Armazenamento de Documentos</Text>

      {/* CPF */}
      <View style={styles.uploadSection}>
        <Text style={styles.uploadLabel}>CPF</Text>
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={() => handleImagePicker(setCpfImage)}
        >
          <Text style={styles.uploadButtonText}>Selecionar Foto do CPF</Text>
        </TouchableOpacity>
        {cpfImage && (
          <>
            <Image source={{ uri: cpfImage }} style={styles.previewImage} />
            <TouchableOpacity onPress={() => handlePreviewImage(cpfImage)}>
              <Text style={styles.previewButton}>Visualizar Foto</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      {/* RG */}
      <View style={styles.uploadSection}>
        <Text style={styles.uploadLabel}>RG</Text>
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={() => handleImagePicker(setRgImage)}
        >
          <Text style={styles.uploadButtonText}>Selecionar Foto do RG</Text>
        </TouchableOpacity>
        {rgImage && (
          <>
            <Image source={{ uri: rgImage }} style={styles.previewImage} />
            <TouchableOpacity onPress={() => handlePreviewImage(rgImage)}>
              <Text style={styles.previewButton}>Visualizar Foto</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      {/* Passagem */}
      <View style={styles.uploadSection}>
        <Text style={styles.uploadLabel}>Passagem</Text>
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={() => handleImagePicker(setPassagemImage)}
        >
          <Text style={styles.uploadButtonText}>Selecionar Foto da Passagem</Text>
        </TouchableOpacity>
        {passagemImage && (
          <>
            <Image source={{ uri: passagemImage }} style={styles.previewImage} />
            <TouchableOpacity onPress={() => handlePreviewImage(passagemImage)}>
              <Text style={styles.previewButton}>Visualizar Foto</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      {/* Visto */}
      <View style={styles.uploadSection}>
        <Text style={styles.uploadLabel}>Visto</Text>
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={() => handleImagePicker(setVistoImage)}
        >
          <Text style={styles.uploadButtonText}>Selecionar Foto do Visto</Text>
        </TouchableOpacity>
        {vistoImage && (
          <>
            <Image source={{ uri: vistoImage }} style={styles.previewImage} />
            <TouchableOpacity onPress={() => handlePreviewImage(vistoImage)}>
              <Text style={styles.previewButton}>Visualizar Foto</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      {/* Modal para visualizar a imagem */}
      {selectedImage && (
        <Modal
          transparent={true}
          animationType="fade"
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCloseText}>Fechar</Text>
            </TouchableOpacity>
            <Image source={{ uri: selectedImage }} style={styles.modalImage} />
          </View>
        </Modal>
      )}
    </View>
  );
};


// Telas de Rodapé
function Notifications() {
  return (
    <View style={styles.center}>
      <Text style={styles.title}>Notificações</Text>
    </View>
  );
}

function Settings() {
  return (
    <View style={styles.center}>
      <Text style={styles.title}>Configurações</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFCBDB', // Cor de fundo leve
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333', // Texto mais legível
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    color: '#666',
    textAlign: 'center',
  },
  customButton: {
    width: '90%',
    padding: 20,
    borderRadius: 100,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00BDCE'
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
  },
  inputContainer: {
    marginBottom: 20,
    width: '100%',
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#333',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  resultContainer: {
    marginTop: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#e7f4e7',
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e7d32',
    textAlign: 'center',
  },
  uploadSection: {
    marginBottom: 20, // Espaçamento entre seções
    width: '100%',
  },
  uploadLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8, // Espaço entre o label e o botão
  },
  uploadButton: {
    backgroundColor: '#4CAF50', // Verde para destaque
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000', // Sombra leve
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Sombra no Android
  },
  uploadButtonText: {
    color: '#fff', // Texto branco
    fontSize: 16,
    fontWeight: 'bold',
  },
  previewImage: {
    marginTop: 10,
    width: '100%',
    height: 200, // Tamanho fixo para a pré-visualização
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    resizeMode: 'cover',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#FF0000',
    padding: 10,
    borderRadius: 5,
  },
  modalCloseText: {
    color: 'white',
    fontSize: 18,
  },
  modalImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
});

export default App;
