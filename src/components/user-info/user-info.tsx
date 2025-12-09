import { useSelector, useDispatch } from "react-redux";
import { changeUser } from "@/src/redux/features/user/user-slice";
import { Text, TouchableOpacity, View } from "react-native";

export function userInfo() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    return (
        <View>
            <Text>Name: {user.name}</Text>
            <Text>Email: {user.email}</Text>
            {/*<Image>user.image</Image>*/}
            <Text>Image: {user.image}</Text>

            <TouchableOpacity 
            onPress={ () =>
                dispatch(
                    changeUser{
                        name: "Chuck Norris",
                        email: "bla@bla.is",
                        image: ""
                    }
                )
            }>
                <Text>Hard coded edit user button</Text>
            </TouchableOpacity>
        </View>

    )

}