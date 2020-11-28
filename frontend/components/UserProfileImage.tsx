import React, { useState } from "react";
import { Avatar } from "react-native-elements";
import { getUser } from "../requests/user";

export default function PostAvatar(props: {user: string, size: number}) {
    const [loading, setLoading] = useState(true);
    const [userImage, setUserImage] = useState("");
  
    React.useEffect(() => {
      setLoading(true);
      getUser(props.user).then((userData) => {
        setLoading(false);
        setUserImage(userData.imageURL);
      }).catch(e => console.log('Failed to get user'))
    }, [props.user]);
  
    const defaultAvatar = (<Avatar rounded 
                            title={ props.user[0].toUpperCase() } 
                            overlayContainerStyle={{backgroundColor: '#BDBDBD'}}
                            size={(props.size) ? props.size : "small"}
                          />);
  
    return (
      loading || !userImage ? defaultAvatar : 
      <Avatar 
        rounded
        source={{ uri: `data:image/gif;base64,${userImage}` }}
        size={(props.size) ? props.size : "small"}
      />
    );
  }