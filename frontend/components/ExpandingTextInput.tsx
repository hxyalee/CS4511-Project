import React from "react";
import { TextInput } from "react-native";

interface ExpandingTextInputProps {
  text: string;
}

export const ExpandingTextInput: React.FC<ExpandingTextInputProps> = ({
  text,
}) => {
  const [height, setHeight] = React.useState(0);
  return (
    <TextInput
      multiline
      onContentSizeChange={(event) => {
        setHeight(event.nativeEvent.contentSize.height);
      }}
      style={[
        {
          paddingHorizontal: 10,
          borderColor: "gray",
          borderBottomWidth: 1,
          height: Math.max(35, height),
        },
      ]}
    />
  );
};
