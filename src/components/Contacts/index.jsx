import "./style.css";
import { useAuth0 } from "@auth0/auth0-react";

import { useState } from "react";
import { BsChatDotsFill } from "react-icons/bs";
import { Divider, ListItem, ListItemText } from "@mui/material";

import { useMutation, useSubscription } from "@apollo/client";
import { CREATE_GROUPS } from "../../gql/MessagesGroup";
import { GET_DATA } from "../../gql/ContactList";

import { useRecoilState } from "recoil";
import { selectedGroupState, selectedUserState } from "../../recoil";

import { useSelector } from "react-redux";

import CreateGrupButton from "../CreateGrupButton";
import Swal from 'sweetalert2';


const Contacts = () => {

    const { user } = useAuth0();

    const [selectedUser, setSelectedUser] = useRecoilState(selectedUserState);
    const [selectedGroup, setSelectedGroup] = useRecoilState(selectedGroupState);

    const { data, loading } = useSubscription(GET_DATA, {
        variables: { order_by: { name: "asc" }, _neq: user.sub },
        fetchPolicy: "no-cache"
    });

    const mode = useSelector((state) => state.darkMode.darkMode);
    const { isdarkMode } = mode;

    const AllUsers = [];

    if (data && data.users) {
        AllUsers.push(...data.users);
    }

    // console.log(AllUsers);

    const [showModal, setShowModal] = useState(false);
    const [showModalCreate, setShowModalCreate] = useState(false);

    const [groupName, setGroupName] = useState("");

    const [createGroup] = useMutation(CREATE_GROUPS, {
        variables: {
            _eq: user?.sub,
            creator: user?.sub,
            groupName: groupName,
        }
    })

    const handleSubmitCreate = (e) => {
        e.preventDefault()
        if (groupName === '') {
            Swal.fire({
                position: 'bottom-right',
                text: 'Nama Grup Tidak Boleh Kosong!',
                timer: '2000',
                timerProgressBar: true,
                showConfirmButton: false
            }).then(() => {
                setShowModalCreate(true);
            });
        } else {
            createGroup();
            Swal.fire({
                position: 'bottom-right',
                text: "Grup Berhasil Dibuat!",
                timer: '2000',
                timerProgressBar: true,
                showConfirmButton: false
            }).then(() => {
                setGroupName("");
                // window.location.reload();
            })
        }
    }

    return (
        <>
            <button
                className={`px-6 py-3 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none hover:shadow-lg focus:outline-none ${isdarkMode ? "bg-rose-500 active:bg-rose-600" : "bg-amber-600 active:bg-amber-800"}`}
                type="button"
                onClick={() => setShowModal(true)}
            >
                <BsChatDotsFill></BsChatDotsFill>
            </button>
            {showModal ? (
                <>
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none"
                    >
                        <div className="relative w-auto max-w-3xl mx-auto my-6">
                            {/*content*/}
                            <div className={`border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none ${isdarkMode ? "bg-[#292c35]" : "bg-white"}`}>
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-slate-200">
                                    <h5 className={`text-2xl font-semibold ${isdarkMode ? "text-white" : "text-black"}`}>
                                        Start Conversation
                                    </h5>
                                    <button
                                        className="float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className={`bg-transparent w-8 text-2xl block outline-none focus:outline-none hover:rounded hover:bg-red-600 hover:text-white ${isdarkMode ? "text-white" : "text-black"}`}>
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                {
                                    loading ? (
                                        <div className={`${isdarkMode ? "text-white" : "text-black"}`}>Retrieving All Contacts...</div>
                                    ) : (
                                        <div className="relative flex-auto sm:min-w-[640px] min-w-[260px] max-h-[360px] overflow-y-auto" style={isdarkMode ? { "backgroundColor": "#292c35" } : { "backgroundColor": "#fff" }}>
                                            <CreateGrupButton
                                                onClick={() => { setShowModal(false); setShowModalCreate(true); }}
                                            ></CreateGrupButton>
                                            {
                                                AllUsers.map((user) => (
                                                    <div style={isdarkMode ? { "backgroundColor": "#292c35" } : { "backgroundColor": "#fff" }} key={user.id}>
                                                        <ListItem button
                                                            id={selectedUser.id}
                                                            onClick={() => {
                                                                setSelectedGroup({ id: null, name: "" });
                                                                setSelectedUser(user);
                                                                setShowModal(false);
                                                            }
                                                            }
                                                            className={`${isdarkMode ? "light-hover" : ""}`}
                                                        >
                                                            <img alt="UserImg" src={user.picture} className="object-cover object-top h-10 mr-4 max-w-10" style={{ "borderRadius": "50%" }}></img>
                                                            <ListItemText
                                                                primary={user.name}
                                                                sx={isdarkMode ? {
                                                                    color: 'white'
                                                                } : {
                                                                    color: 'black'
                                                                }}
                                                            />
                                                        </ListItem>
                                                        <Divider className={`${isdarkMode ? "lighter" : ""}`}></Divider>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    )
                                }
                                {/*footer*/}
                                <div className="flex items-center justify-end p-3 border-t border-solid rounded-b border-slate-200">
                                    <button
                                        className="px-4 py-2 mb-1 mr-1 text-sm font-bold text-red-500 uppercase transition-all duration-100 ease-linear outline-none background-transparent hover:bg-red-600 hover:rounded hover:text-white focus:outline-none"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
                </>
            ) : null}
            {
                showModalCreate ? (
                    <>
                        <div
                            className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none"
                        >
                            <div className="relative w-auto max-w-3xl mx-auto my-6">
                                {/*content*/}
                                <div className={`border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none ${isdarkMode ? "bg-[#292c35]" : "bg-white"}`}>
                                    {/*header*/}
                                    <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-slate-200">
                                        <h5 className={`text-2xl font-semibold ${isdarkMode ? "text-white" : "text-black"}`}>
                                            Create Group
                                        </h5>
                                        <button
                                            className="float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none focus:outline-none"
                                            onClick={() => { setGroupName(""); setShowModalCreate(false); }}
                                        >
                                            <span className={`bg-transparent w-8 text-2xl block outline-none focus:outline-none hover:rounded hover:bg-red-600 hover:text-white ${isdarkMode ? "text-white" : "text-black"}`}>
                                                ×
                                            </span>
                                        </button>
                                    </div>
                                    {/*body*/}
                                    <form
                                        onSubmit={(e) => { handleSubmitCreate(e); setShowModalCreate(false) }}
                                    >
                                    <div className="relative flex-auto sm:min-w-[640px] min-w-[260px]" style={isdarkMode ? { "backgroundColor": "#292c35" } : { "backgroundColor": "#fff" }}>
                                        <div
                                            className="p-6"
                                        >
                                            <input
                                                id="input-groupname"
                                                name="input-groupname"
                                                aria-label={selectedGroup.groupName}
                                                type="text"
                                                placeholder="Ketikkan Nama Grup"
                                                value={groupName}
                                                onChange={(e) => setGroupName(e.target.value)}
                                                className="w-full h-10 px-3 mb-2 text-base border rounded-lg focus:outline-offset-4"
                                                style={isdarkMode ? {
                                                    background: "#292c35",
                                                    color: "#fff"
                                                } : {
                                                    background: "#fff",
                                                    color: "#374151"
                                                }}
                                            />
                                        </div>
                                    </div>
                                    {/*footer*/}
                                    <div className="flex items-center justify-end p-3 border-t border-solid rounded-b border-slate-200">
                                        <button
                                            className="px-4 py-2 mb-1 mr-1 text-sm font-bold text-red-500 uppercase transition-all duration-100 ease-linear outline-none background-transparent hover:bg-red-600 hover:rounded hover:text-white focus:outline-none"
                                            type="button"
                                            onClick={() => { setGroupName(""); setShowModalCreate(false); }}
                                        >
                                            Close
                                        </button>
                                        <button
                                            className="px-4 py-2 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-100 ease-linear bg-green-500 rounded outline-none hover:bg-green-600 focus:outline-none"
                                            type="submit"
                                        >
                                            Create Group
                                        </button>
                                    </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
                    </>
                ) : null}
        </>
    );
}

export default Contacts;