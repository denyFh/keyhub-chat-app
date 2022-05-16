import logo from "../../logo.svg";

import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

import { BsFillPersonPlusFill } from "react-icons/bs";

import { useRecoilState } from 'recoil';
import { selectedGroupState, selectedUserState } from '../../recoil';

import { useMutation, useQuery } from "@apollo/client";
import { GET_ALLMEMBER, GET_CREATOR, INSERT_MEMBER_GROUP } from "../../gql/MessagesGroup";
import { useAuth0 } from "@auth0/auth0-react";

import "./style.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const MessageHeader = () => {
    const [selectedUser] = useRecoilState(selectedUserState);
    const [selectedGroup] = useRecoilState(selectedGroupState);

    const [showModalMember, setShowModalMember] = useState(false);

    const mode = useSelector((state) => state.darkMode.darkMode);
    const { isdarkMode } = mode;

    const { user } = useAuth0();

    const { data, refetch: refetchCreator } = useQuery(GET_CREATOR, {
        variables: {
            _eq: user?.sub
        },
        fetchPolicy: "no-cache",
        nextFetchPolicy: "no-cache"
    });

    const { data: dataAllMember, refetch } = useQuery(GET_ALLMEMBER, {
        variables: {
            groupId: selectedGroup.id
        },
        fetchPolicy: "no-cache",
        nextFetchPolicy: "no-cache"
    });

    // console.log("admingrup", data);


    const members = dataAllMember?.group_member.map(i => i.userId);
    const nonMember = dataAllMember?.users.filter(i => !members.includes(i.id))

    // console.log("nonmember", nonMember);

    const [selectedMember, setSelectedMember] = useState("");

    const [insertGrupMember] = useMutation(INSERT_MEMBER_GROUP, {
        variables: {
            selectedUser: selectedMember,
            groupId: selectedGroup.id,
        },
        onCompleted: () => {
            refetch();
            refetchCreator();
        },
        onError: (error) => {
            console.log(error);
        }
    });

    const handleSubmitMember = (e) => {
        e.preventDefault();
        if (selectedMember === "") {
            setShowModalMember(false);
            Swal.fire({
                position: 'bottom-right',
                text: 'Harus memilih anggota baru!',
                timer: '2000',
                timerProgressBar: true,
                showConfirmButton: false,
                width: "fit-content"
            }).then(() => {
                setShowModalMember(true);
            });
        } else {
            insertGrupMember();
            setShowModalMember(false);
            Swal.fire({
                position: 'bottom-right',
                text: "Anggota Berhasil Ditambahkan!",
                timer: '2000',
                timerProgressBar: true,
                showConfirmButton: false,
                width: "fit-content"
            }).then(() => {
                setShowModalMember(true);
            });
        }
    }

    const createdByMeGroups = data?.groups.map(i => i.groupName)

    console.log( createdByMeGroups )

    // console.log("kondisi1", data?.groups[0].creator === user?.sub);
    // console.log(createdByMeGroups);
    // console.log("kondisi2", createdByMeGroups.includes(selectedGroup.groupName), `${data?.groups[0].groupName} | ${selectedGroup.groupName}`)

    if (selectedUser.id === null && selectedGroup.id === null) {
        return (
            <>
                <div className="flex-grow">
                    <h4 className='hidden'>Hide This</h4>
                </div>
            </>
        )
    } else if (selectedUser.id !== null) {
        return (
            <>
                <Avatar
                    alt={selectedUser.name}
                    src={selectedUser.picture}
                    sx={{ marginRight: "12px" }}
                >
                </Avatar>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ flexGrow: 1 }}
                    className={`${isdarkMode ? "text-white" : "text-amber-700"}`}
                >
                    {selectedUser?.name}
                </Typography>
            </>
        );
    } else if (selectedGroup.id !== null) {
        return (
            <>
                <Avatar
                    alt={selectedGroup.groupName}
                    src={logo}
                    sx={{ marginRight: "12px" }}
                    className={`rounded-[50%] p-0.5 ${isdarkMode ? "border-2 border-white" : "border-2 border-amber-700 bg-white"}`}
                >
                </Avatar>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ flexGrow: 1 }}
                    className={`${isdarkMode ? "text-white" : "text-amber-700"}`}
                >
                    {selectedGroup?.groupName}
                </Typography>
                {createdByMeGroups.includes(selectedGroup.groupName) &&
                    <div onClick={() => setShowModalMember(true)} className={`p-1 mr-5 create-button hover:rounded hover:cursor-pointer active:scale-90 ${isdarkMode ? "hover:bg-rose-600" : "hover:bg-white hover:shadow-md"}`}>
                        <BsFillPersonPlusFill fill={`${isdarkMode ? "#fff" : "#B45309"}`}></BsFillPersonPlusFill>
                    </div>
                }
                {
                    showModalMember ? (
                        <>
                            <div
                                className="fixed inset-0 z-[1500] flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none"
                            >
                                <div className="relative w-auto max-w-3xl mx-auto my-6">
                                    {/*content*/}
                                    <div className={`border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none ${isdarkMode ? "bg-[#292c35]" : "bg-white"}`}>
                                        {/*header*/}
                                        <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-slate-200">
                                            <h5 className={`text-2xl font-semibold ${isdarkMode ? "text-white" : "text-black"}`}>
                                                Add Group Member
                                            </h5>
                                            <button
                                                className="float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none focus:outline-none"
                                                onClick={() => setShowModalMember(false)}
                                            >
                                                <span className={`bg-transparent w-6 text-2xl block outline-none focus:outline-none hover:rounded hover:bg-red-600 ${isdarkMode ? "text-white" : "text-black"}`}>
                                                    ×
                                                </span>
                                            </button>
                                        </div>
                                        {/*body*/}
                                        <form
                                            onSubmit={handleSubmitMember}
                                        >
                                            <div className="relative flex-auto sm:min-w-[480px] min-w-[260px]" style={isdarkMode ? { "backgroundColor": "#292c35" } : { "backgroundColor": "#fff" }}>
                                                <div
                                                    className={`relative inline-block w-full p-4 ${isdarkMode ? "text-white" : "text-gray-700"}`}
                                                >
                                                    <select
                                                        className="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:outline-offset-4"
                                                        placeholder="Tambahkan Anggota..."
                                                        style={isdarkMode ? {
                                                            background: "#292c35"
                                                        } : {
                                                            background: "#fff"
                                                        }}
                                                        onChange={(e) => setSelectedMember(e.target.value)}
                                                    >
                                                        <option value="" disabled>Silahkan Pilih Satu</option>
                                                        {
                                                            nonMember?.map((member) => (
                                                                <option value={member.id} key={member.id}>{member.name}</option>
                                                            ))
                                                        }
                                                    </select>
                                                    <div className="absolute inset-y-0 right-0 flex items-center px-6 pointer-events-none">
                                                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                                                    </div>
                                                </div>
                                            </div>
                                            {/*footer*/}
                                            <div className="flex items-center justify-end p-3 border-t border-solid rounded-b border-slate-200">
                                                <button
                                                    className="px-4 py-2 mb-1 mr-1 text-sm font-bold text-red-500 uppercase transition-all duration-100 ease-linear outline-none background-transparent hover:bg-red-600 hover:rounded hover:text-white focus:outline-none"
                                                    type="button"
                                                    onClick={() => setShowModalMember(false)}
                                                >
                                                    Close
                                                </button>
                                                <button
                                                    className="px-4 py-2 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-100 ease-linear bg-green-500 rounded outline-none hover:bg-green-600 focus:outline-none"
                                                    type="submit"
                                                >
                                                    Add Member
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="fixed inset-0 z-[1400] bg-black opacity-25"></div>
                        </>
                    ) : null}
            </>
        );
    }
}

export default MessageHeader;