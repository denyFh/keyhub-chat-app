import { useRecoilState } from "recoil";
import { selectedUserState } from "../../recoil";

import { GET_MESSAGES } from "../../gql/Messages";
import { useSubscription } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import ChatBubble from "../../components/ChatBubble";

const Message = () => {

    const [selectedUser] = useRecoilState(selectedUserState);
    // console.log('user', selectedUser);

    const { user } = useAuth0();
    let params = {where: {}};
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

    const { data, loading } = useSubscription(GET_MESSAGES, {variables: params})
    // console.log(data);

    setTimeout(() => {
        const cb = document.getElementById("chat-content").parentElement;
        if (cb) {
            cb.scrollTop = cb.scrollHeight;
        }
    }, 200);

    return (
        <div className="" id="chat-content">
            {
                loading ? 
                (
                    <p>Loading..</p>
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
 
export default Message;