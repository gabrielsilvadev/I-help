import React from 'react';

import Icon from 'react-native-vector-icons/FontAwesome';

import {Conteiner,Description,Name,Stat,StatCount,Stats,Refresh,RefreshText} from './styles'

export default function Repository({data,onRefresh}){
    return(
        <Conteiner>
            <Name>{data.title}</Name>
    <Description>{data.description}</Description>
      <Stats>
          <Stat>
       <Icon name="star" size={23}  color='#333'/>
    <StatCount>{data.stars}</StatCount>
          </Stat>
          <Stat>
       <Icon name="code-fork" size={23}  color='#333'/>
    <StatCount>{data.forks}</StatCount>
          </Stat>
      </Stats>
      <Refresh onPress={()=>onRefresh}>
          <Icon name="refresh" color='#7159c1' size={16}/>
          <RefreshText>ATUALIZAR</RefreshText>
      </Refresh>
        </Conteiner>
    )
}