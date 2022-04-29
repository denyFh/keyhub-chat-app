import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

import { useRecoilState } from 'recoil';
import { selectedUserState } from '../../recoil';

const MessageHeader = () => {
    const [selectedUser] = useRecoilState(selectedUserState);
    
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
            >
                {selectedUser?.name}
            </Typography>
        </>
    );
}
 
export default MessageHeader;