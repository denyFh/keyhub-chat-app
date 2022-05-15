import { useMutation, useQuery } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import { ListItemText } from "@mui/material";
import { useState } from "react";
import { BsInfoCircleFill, BsPencilFill } from "react-icons/bs";

import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { GET_USER_INFO } from "../../gql/ContactList";
import { UPDATE_USERNAME } from "../../gql/Users";

const UserProfile = () => {

    const { user } = useAuth0();
    const mode = useSelector((state) => state.darkMode.darkMode);
    const { isdarkMode } = mode;

    const { data: userData, loading, refetch } = useQuery(GET_USER_INFO, {
        variables: { _eq: user.sub },
    });

    const [showModal, setShowModal] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [newUname, setNewUname] = useState("");

    const [updateUsername] = useMutation(UPDATE_USERNAME, {
        variables: {
            _eq: user.sub,
            username: newUname,
        },
        onCompleted: () => {
            refetch();
        },
        onError: (error) => {
            console.log(error);
        }
    });

    const handleSubmitUname = (e) => {
        e.preventDefault();
        if (newUname === '') {
            Swal.fire({
                position: 'bottom-right',
                text: 'Username baru tidak boleh Kosong!',
                timer: '2000',
                timerProgressBar: true,
                showConfirmButton: false,
                width: "fit-content"
            });
        } else {
            updateUsername();
            Swal.fire({
                position: 'bottom-right',
                text: "Username Berhasil Diubah!",
                timer: '2000',
                timerProgressBar: true,
                showConfirmButton: false,
                width: "fit-content"
            }).then(() => {
                setNewUname("");
            });
        }
    }

    console.log(userData);

    return (
        <>
            <div className={`shadow-md absolute bottom-0 w-full ${isdarkMode ? "bg-cyan-700" : "bg-[#ffdc81]"}`}>
                {
                    loading ? (
                        <div className={`px-2 py-4 text-center ${isdarkMode ? "text-white" : "text-amber-700"}`}>Retrieving Info...</div>
                    ) : (
                        userData?.users[0].username === null ? (
                            <div className={`flex items-center justify-between w-full h-16 px-5 hover:cursor-pointer ${isdarkMode ? "hover:bg-cyan-800" : 'hover:bg-amber-400'}`} onClick={() => setShowModal(true)}>
                                <div className="flex items-center gap-2">
                                    <img alt="UserImg" src={userData.users[0].picture} className="object-cover object-top h-10 max-w-10" style={{ "borderRadius": "50%" }}></img>
                                    <ListItemText
                                        primary={userData.users[0].name}
                                        sx={isdarkMode ? {
                                            color: 'white'
                                        } : {
                                            color: '#B45309'
                                        }}
                                    />
                                </div>
                                <BsInfoCircleFill fill={isdarkMode ? "#fff" : "#000"}></BsInfoCircleFill>
                            </div>
                        ) : (
                            <div className={`flex items-center justify-between w-full h-16 px-5 hover:cursor-pointer ${isdarkMode ? "hover:bg-cyan-800" : 'hover:bg-amber-400'}`} onClick={() => setShowModal(true)}>
                                <div className="flex items-center gap-2">
                                    <img alt="UserImg" src={userData.users[0].picture} className="object-cover object-top h-10 max-w-10" style={{ "borderRadius": "50%" }}></img>
                                    <div className="flex flex-col">
                                        <ListItemText
                                            primary={userData.users[0].username}
                                            secondary={userData.users[0].name}
                                            sx={isdarkMode ? {
                                                color: 'white',
                                                marginTop: "0",
                                                marginBottom: "0"
                                            } : {
                                                color: '#B45309',
                                                marginTop: "0",
                                                marginBottom: "0"
                                            }}
                                        />
                                    </div>
                                </div>
                                <BsInfoCircleFill fill={isdarkMode ? "#fff" : "#000"}></BsInfoCircleFill>
                            </div>
                        )
                    )
                }
            </div>
            {
                showModal ? (
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
                                            User Information
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
                                            <div className={`${isdarkMode ? "text-white" : "text-black"}`}>Retrieving User Info...</div>
                                        ) : (
                                            <div className="relative flex w-full justify-center px-6 py-4 flex-auto sm:flex-row flex-col items-center sm:min-w-[480px] min-w-[280px]" style={isdarkMode ? { "backgroundColor": "#292c35" } : { "backgroundColor": "#fff" }}>
                                                <div className="img-container">
                                                    <img alt="ProfileImg" src={userData.users[0].picture} className="object-cover object-top p-3 mr-0 border-2 border-white sm:mr-4 h-36 max-w-36" style={{ "borderRadius": "50%" }}></img>
                                                </div>
                                                <div className="flex flex-col gap-3">
                                                    <h5 className={`flex flex-col gap-1 ${isdarkMode ? "text-white" : "text-black"}`}>
                                                        <div className="flex flex-row items-center gap-3">
                                                            <span className={`px-2 py-1 text-white rounded w-fit ${isdarkMode ? "bg-teal-500" : "bg-amber-600"}`}>Username:</span>
                                                            <BsPencilFill
                                                                fill={isdarkMode ? "#fff" : "#000"}
                                                                style={{ height: "24px", width: "24px" }}
                                                                className={`p-1 hover:cursor-pointer hover:rounded ${isdarkMode ? "hover:bg-[#0e7490]" : "hover:bg-[#ffdc81]"}`}
                                                                onClick={() => { setShowModal(false); setShowModalEdit(true); }}
                                                            >
                                                            </BsPencilFill>
                                                        </div>
                                                        {
                                                            userData?.users[0].username === null ? (
                                                                <p>Create your username</p>
                                                            ): (
                                                                <p>{userData?.users[0].username}</p>
                                                            )
                                                        }
                                                    </h5>
                                                    <h5 className={`flex flex-col gap-1 ${isdarkMode ? "text-white" : "text-black"}`}>
                                                        <span className={`px-2 py-1 text-white rounded w-fit ${isdarkMode ? "bg-teal-500" : "bg-amber-600"}`}>Name:</span>
                                                        {userData.users[0].name}
                                                    </h5>

                                                    <h5 className={`flex flex-col gap-1 ${isdarkMode ? "text-white" : "text-black"}`}>
                                                        <span className={`px-2 py-1 text-white rounded w-fit ${isdarkMode ? "bg-teal-500" : "bg-amber-600"}`}>Email:</span>
                                                        {userData.users[0].email}
                                                    </h5>
                                                </div>
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
                ) : null
            }
            {
                showModalEdit ? (
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
                                            Edit Username
                                        </h5>
                                        <button
                                            className="float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none focus:outline-none"
                                            onClick={() => { setShowModalEdit(false); setShowModal(true); }}
                                        >
                                            <span className={`bg-transparent w-8 text-2xl block outline-none focus:outline-none hover:rounded hover:bg-red-600 hover:text-white ${isdarkMode ? "text-white" : "text-black"}`}>
                                                ×
                                            </span>
                                        </button>
                                    </div>
                                    {/*body*/}
                                    <form
                                        onSubmit={(e) => { handleSubmitUname(e); setShowModalEdit(false); setShowModal(false); }}
                                    >
                                        <div className="relative flex w-full justify-center px-6 py-4 flex-auto sm:flex-row flex-col items-center sm:min-w-[480px] min-w-[280px]" style={isdarkMode ? { "backgroundColor": "#292c35" } : { "backgroundColor": "#fff" }}>
                                            <div className={`w-full p-4 ${isdarkMode ? "text-white" : "text-gray-700"}`}>
                                                <label
                                                    className="block mb-1"
                                                    htmlFor="forms-labelOverInputCode">New Username</label>
                                                <input
                                                    className="w-full h-10 px-3 text-base border rounded-lg focus:shadow-outline"
                                                    type="text"
                                                    placeholder="Masukkan Username Baru..."
                                                    id="forms-labelOverInputCode"
                                                    value={newUname}
                                                    onChange={(e) => setNewUname(e.target.value)}
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
                                                onClick={() => { setShowModalEdit(false); setShowModal(true); }}
                                            >
                                                Close
                                            </button>
                                            <button
                                                className="px-4 py-2 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-100 ease-linear bg-green-500 rounded outline-none hover:bg-green-600 focus:outline-none"
                                                type="submit"
                                            >
                                                Update
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
                    </>
                ) : null
            }
        </>
    );
}

export default UserProfile;