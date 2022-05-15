import loadingGif from "../../chatLoading.gif";

import { useRecoilState } from "recoil";
import { selectedGroupState, selectedUserState } from "../../recoil";

import { GET_MESSAGES } from "../../gql/Messages";
import { useSubscription } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import ChatBubble from "../../components/ChatBubble";
import { useSelector } from "react-redux";
import { GET_GROUP_MESSAGES } from "../../gql/MessagesGroup";

const Message = () => {

    const [selectedGroup] = useRecoilState(selectedGroupState);
    const [selectedUser] = useRecoilState(selectedUserState);
    const mode = useSelector((state) => state.darkMode.darkMode);
    const { isdarkMode } = mode;
    // console.log('user', selectedUser);

    const { user } = useAuth0();
    let params = { where: {} };
    if (selectedUser && !selectedUser.id) {
        params.where = {
            toUserId: {
                _is_null: true,
            },
        };
    } else if (selectedUser && selectedUser.id) {
        params.where = {
            _or: [
                {
                    fromUserId: {
                        _eq: user.sub,
                    },
                    toUserId: {
                        _eq: selectedUser.id,
                    },
                },
                {
                    fromUserId: {
                        _eq: selectedUser.id,
                    },
                    toUserId: {
                        _eq: user.sub,
                    },
                },
            ],
        };
    }

    const { data, loading } = useSubscription(GET_MESSAGES, { variables: params });

    const { data: dataGroupChat, loading: loadingGroupChat } = useSubscription(GET_GROUP_MESSAGES, {
        variables: { groupId: selectedGroup.id },
    });


    // console.log(data);

    setTimeout(() => {
        const cb = document.getElementById("chat-content").parentElement;
        if (cb) {
            cb.scrollTop = cb.scrollHeight;
            cb.style.transition = "all .5s ease-in-out";
        }
    }, 200);

    // console.log("user", selectedUser);
    // console.log("group", selectedGroup);

    // console.log("groupchat", dataGroupChat)

    if (selectedUser.id === null && selectedGroup.id === null) {
        return (
            <div id="chat-content" className={`flex items-center justify-center h-full ${isdarkMode ? "text-white" : "text-black"}`}>
                <h5>Start a conversation</h5>
            </div>
        )
    } else if (selectedGroup.id !== null) {
        return (
            <div id="chat-content" className="h-full">
                {
                    loadingGroupChat ? (
                        <div className="flex flex-col items-center justify-center h-full">
                            <img
                                src={loadingGif}
                                alt="Loading..."
                                className="w-16"
                            />
                            <p className={`${isdarkMode ? "text-white" : "text-black"}`}>Loading</p>
                        </div>
                    ) : (
                        dataGroupChat?.group_messages.map((groupMessage, groupMsgIdx) => (
                            <ChatBubble
                                key={groupMsgIdx}
                                message={groupMessage}
                                isMe={user.sub === groupMessage.fromMemberId}
                                name={groupMessage.member.name}
                            >
                            </ChatBubble>
                        ))
                    )
                }
            </div>
        )
    } else if (selectedUser.id !== null) {
        return (
            <div id="chat-content" className="h-full">
                {
                    loading ?
                        (
                            <div className="flex flex-col items-center justify-center h-full">
                                <img
                                    src={loadingGif}
                                    alt="Loading..."
                                    className="w-16"
                                />
                                <p className={`${isdarkMode ? "text-white" : "text-black"}`}>Loading</p>
                            </div>
                        ) : (
                            data?.messages.map((message, idx) => (
                                <ChatBubble
                                    key={idx}
                                    message={message}
                                    isMe={user.sub === message.fromUserId}>
                                </ChatBubble>
                            ))
                        )
                }
            </div>
        );
    }
}

export default Message;