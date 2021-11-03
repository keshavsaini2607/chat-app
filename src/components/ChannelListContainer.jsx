import React, {useState} from 'react';
import { ChannelList, useChatContext } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import { ChannelSearch, TeamChannelList, TeamChannelPreview } from '.';
import HospitalIcon from '../assets/hospital.png';
import LogoutIcon from '../assets/logout.png';

const Sidebar = ({ logout }) => (
    <div className="channel-list__sidebar">
        <div className="channel-list__sidebar__icon2">
            <div className="icon1__inner" onClick={logout}>
                <img src={LogoutIcon} alt="Icon file" width="30" />
            </div>
        </div>
    </div>
)

const CompanyHeader = () => (
    <div className="channel-list__header">
        <p className="channel-list__header__text">Chatty Wp</p>
    </div>
)

const CustomChannelTeamFilter = (channels) => {
    return channels.filter((channel) => channel.type === 'team')
}


const CustomChannelMessagingFilter = (channels) => {
    return channels.filter((channel) => channel.type === 'messaging')
}

const ChannelListContent = ({ isCreating, setIsCreating, setCreateType, setIsEditing, isEditing, setToggleContainer }) => {
    const cookies = new Cookies();
    const { client } = useChatContext();
    const logout = () => {
        cookies.remove('token');
        cookies.remove('userId');
        cookies.remove('userName');
        cookies.remove('fullName');
        cookies.remove('userId');
        cookies.remove('phoneNumber');
        cookies.remove('avatarUrl');
        cookies.remove('hashedPassword');

        window.location.reload();
    }

    const filters = { members: {$in: [client.userID]} }

    return (
        <>
            <Sidebar logout={logout} />
            <div className="channel-list__list__wrapper">
                <CompanyHeader />
                <ChannelSearch 
                    setToggleContainer={setToggleContainer}
                />
                <ChannelList
                    filters={filters}
                    channelRenderFilterFn={CustomChannelTeamFilter}
                    List={(listProps) => (
                        <TeamChannelList
                            {...listProps}
                            type="team"
                            isCreating={isCreating}
                            setCreateType={setCreateType}
                            isEditing={isEditing}
                            setIsEditing={setIsEditing}
                            setIsCreating={setIsCreating}
                            setToggleContainer={setToggleContainer}
                        />
                    )}
                    Preview={(previewProps) => (
                        <TeamChannelPreview
                            {...previewProps}
                            type="team"
                            setIsCreating={setIsCreating}
                            setIsEditing={setIsEditing}
                            setToggleContainer={setToggleContainer}
                        />
                    )}
                />
                <ChannelList
                    filters={filters}
                    channelRenderFilterFn={CustomChannelMessagingFilter}
                    List={(listProps) => (
                        <TeamChannelList
                            {...listProps}
                            type="messaging"
                            isCreating={isCreating}
                            setCreateType={setCreateType}
                            setIsCreating={setIsCreating}
                            isEditing={isEditing}
                            setIsEditing={setIsEditing}
                            setToggleContainer={setToggleContainer}
                        />
                    )}
                    Preview={(previewProps) => (
                        <TeamChannelPreview
                            {...previewProps}
                            type="messaging"
                            setIsCreating={setIsCreating}
                            setIsEditing={setIsEditing}
                            setToggleContainer={setToggleContainer}
                        />
                    )}
                />
            </div>
        </>
    )
}



const ChannelListContainer = ({setCreateType, setIsCreating, setIsEditing}) => {
    const [toggleContainer, setToggleContainer] = useState(false);
    return (
        <>
            <div className="channel-list__container">
                <ChannelListContent 
                    setCreateType={setCreateType}
                    setIsCreating={setIsCreating}
                    setIsEditing={setIsEditing}
                />
            </div>
            <div className="channel-list__container-responsive"
                style={{left: toggleContainer ? '0%' : '-89%', backgroundColor: '#005fff'}}
            >
                <div className="channel-list__container-toggle" onClick={() => setToggleContainer(prev => !prev)}>

                </div>
                <ChannelListContent 
                    setCreateType={setCreateType}
                    setIsCreating={setIsCreating}
                    setIsEditing={setIsEditing}
                    setToggleContainer={setToggleContainer} 
                />
            </div>
        </>
    )
}

export default ChannelListContainer