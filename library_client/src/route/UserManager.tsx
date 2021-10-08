import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { axiosExecuteGet } from "../api/axiosUtils";
import { getUserList } from "../api/userService";
import BaseAlert from "../component/BaseAlert";
import UserModal from "../component/user/UserModal";
import UserTable from "../component/user/UserTable";
import UserDeleteModal from "../component/user/UserDeleteModal";
import { useSelector } from "react-redux";
import { User } from "../types/login";

const UserManager = () => {

    const [users, setUsers] = useState<User[]>([]);

    const [loadingUsers, setLoadingUsers] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const [modalUser, setModalUser] = useState<boolean>(false);
    const [modalDelete, setModalDelete] = useState<boolean>(false);

    const [selectedUser, setSelectedUser] = useState<User| undefined>(undefined);

    const user: User = useSelector((state: any) => {
        return state.currentUser;
    }).user;

    const getUsers = () => {
        axiosExecuteGet(
            getUserList(),
            setUsers,
            setLoadingUsers,
            setError);
    }

    useEffect(() => {
        getUsers();
    }, []);

    const updateModalUser = (user: User) => {
        setSelectedUser({...user});
        setModalUser(true);
    }

    const newModalUser = () => {
        setSelectedUser(undefined);
        setModalUser(true);
    }

    const deleteModalUser = (user: User) => {
        setSelectedUser({...user});
        setModalDelete(true);
    }

    const updateUser = (user: User) => {
        users.forEach((b: User) => {
            if(b.userId === user.userId){
                b.userName = user.userName;
                b.role = user.role;
            }
        });
        setUsers([...users]);
    }

    const deleteUser = (userId: number) => {
        let p : User = users.find(p => p.userId === userId) ?? {userId: -1} as User;

        const index = users.indexOf(p);
        if (index > -1) {
            users.splice(index, 1);
        }
        setUsers([...users]);
    }

    const addUser = (user: User) => {
        users.push(user);
        setUsers([...users]);
    }

    return (
        <>
        
            <Container
                className="pt-4"
            >

                <BaseAlert msg={error} close={() => setError('')} />

                <UserTable 
                    data={users}
                    loading={loadingUsers}
                    onEdit={updateModalUser}
                    onNew={newModalUser}
                    onDelete={deleteModalUser}
                    canEdit={user.role >= 3}
                    setData={setUsers}
                />

                <UserModal
                    user={selectedUser}
                    show={modalUser}
                    handleHide={() => setModalUser(false)}
                    update={updateUser}
                    add={addUser}
                />

                {selectedUser &&
                    <UserDeleteModal 
                        user={selectedUser}
                        show={modalDelete}
                        handleHide={() => setModalDelete(false)}
                        removeFromList={deleteUser}
                    />
                }

            </Container>
        </>
    );
}

export default UserManager;