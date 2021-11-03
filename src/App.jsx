import React, { useState } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import { ChannelContainer, ChannelListContainer, Auth } from './components';

import 'stream-chat-react/dist/css/index.css';

import './App.css';
const cookies = new Cookies();

const API_KEY = 'e565t7wmj9ey';
const authToken = cookies.get('token');

const client = StreamChat.getInstance(API_KEY);

if (authToken) {
  client.connectUser({
    id: cookies.get('userId'),
    name: cookies.get('userName'),
    fullName: cookies.get('fullName'),
    userId: cookies.get('userId'),
    phoneNumber: cookies.get('phoneNumber'),
    image: cookies.get('avatarUrl'),
    hashedPassword: cookies.get('hashedPassword'),
  }, authToken)
}

function App() {
  const [createType, setCreateType] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  if (!authToken) return <Auth />

  return (
    <div className="app__wrapper">
      <Chat client={client} theme="team light">
        <ChannelListContainer 
          isCreating={isCreating}
          setCreateType={setCreateType}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          setIsCreating={setIsCreating}
        />
        <ChannelContainer 
          createType={createType}
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      </Chat>
    </div>
  );
}

export default App;
