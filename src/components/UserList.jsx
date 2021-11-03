import React, { useEffect, useState } from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';
import { InviteIcon } from '../assets';

const ListContainer = ({ children }) => {
    return (
        <div className="user-list__container">
            <div className="user-list__header">
                <p>User</p>
                <p>Invite</p>
            </div>
            {children}
        </div>
    )
}

const UserItem = ({ user, setSelectedUsers }) => {

    const [selected, setSelected] = useState(false);

    const handleSelect = () => {
        if (selected) {
            setSelectedUsers((prev) => prev.filter(prevUser => prevUser !== user.id))
        } else {
            setSelectedUsers((prev) => [...prev, user.id])
        }
        setSelected(prevSelected => !prevSelected);
    }

    return (
        <div className="user-item__wrapper" onClick={handleSelect}>
            <div className="user-item__name-wrapper">
                <Avatar
                    image={user.image}
                    name={user.fullName || user.id}
                    size={32}
                />
                <p className="user-item__name">{user.fullName || user.id}</p>
            </div>
            {!selected ? <div className="user-item__invite-empty"></div> : <InviteIcon />}

        </div>
    )
}

const UserList = ({ setSelectedUsers }) => {
    const { client } = useChatContext();
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [listEmpty, setListEmpty] = useState(true);
    const [error, setError] = useState(false);


    useEffect(() => {
        const getUsers = async () => {
            if (loading) return;
            setLoading(true);
            try {
                const response = await client.queryUsers(
                    { id: { $ne: client.userID } },
                    { id: 1 },
                    { limit: 8 }
                )
                console.log('res', response)
                if (response.users.length) setUsers(response.users);
                // else setListEmpty(true);
            } catch (error) {
                setError(true)
                console.log('error in getting users', error);
            }
            setLoading(false);
        }

        if (client) getUsers();
    }, [])

    if (error) {
        return (
            <ListContainer>
                <div className="user-list__message">
                    Error loading... please reload the page
                </div>
            </ListContainer>
        )
    }
    // if (listEmpty) {
    //     return (
    //         <ListContainer>
    //             <div className="user-list__message">
    //                 No users found... try reloading the page
    //             </div>
    //         </ListContainer>
    //     )
    // }

    return (
        <ListContainer>
            {loading ? <div className="user-list__message">Loading Users....</div>
                : (
                    users.map((user, i) => (
                        <UserItem index={i} key={user.id} user={user} setSelectedUsers={setSelectedUsers} />
                    ))
                )
            }
        </ListContainer>
    )
}

export default UserList
