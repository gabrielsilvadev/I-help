import React,{useState,useEffect} from 'react';
import Repository from'../../components/Repository/index'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Keyboard from 'react-native'
import api from '../../services/api'
import getRealm from '../../services/realm'
import {Conteiner,Title,Form,List,Submit,Input} from './style'
export default  function Main(){
  const [input,setinput] = useState('');
  
  const [err,seterro]=useState(false)
  const [respositories,setRepository] = useState([])
  useEffect(()=>{
    async function loadRepository(){
     const realm =await getRealm()
     const data = realm.objects('Repository').sorted('stars',true)
     setRepository(data)
    }
    loadRepository();
  },[])
  async function saveRepository(repository){
    const data = {
      id:repository.id,
      name:repository.name,
      fullName:repository.full_name,
      description:repository.description,
      stars:repository.stargazers_count,
      forks:repository.forks_count,
    };
  const realm = await getRealm();
  realm.write(()=>{
  realm.create('Repository',data,'modified')
  return data
});

  }
  async function handleAddREpository(){
    try {
      const response= await api.get(`/repos/${input}`);
      await saveRepository(response.data)
      console.log(response)
      setinput('');
      seterro(false)
      Keyboard.dismiss();
    }
    catch(err){
     console.log(err)
     seterro(true)
    }
    
  }
  async function handlerefreshRepostory(repository){
    const response = await api.get(`/repos/${repository.fullName}`);
    const data = await saveRepository(response.data)
    setRepository(respositories.map(repo=>(repo.id == data.id ? data :repo)));
  }
  return(
    <Conteiner>
      <Title>Repository</Title>
    
    <Form>
      <Input
      value={input}
      error={err}
      onChangeText={setinput}
      autoCapitalize='none'
      autoCorrect={false}
      placeholder="Procurar repository.."
      />
      <Submit  onPress={()=>handleAddREpository()} >
        <Icon name='add' size={20} color='white'/>
      </Submit>
    </Form>
    <List 
    keyboardShouldPersistTaps="handled"
    data={respositories}
    keyExtractor={item => String(item.id)}
    renderItem={({item})=>(
    <Repository data={item}  onRefresh={()=>handlerefreshRepostory(repository)}/>
    )}
    />
    </Conteiner>
  )
}