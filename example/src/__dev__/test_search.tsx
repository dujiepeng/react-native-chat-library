import * as React from 'react';
import { TextInput, View } from 'react-native';
import { SearchBar } from 'react-native-chat-uikit';
import { Button } from 'react-native-paper';

export default function TestSearch() {
  const [icon, setIcon] = React.useState(false);
  const enableClear = true;

  React.useEffect(() => {}, []);
  let input = React.useRef<TextInput>(null);

  return (
    <View style={{ marginTop: 100 }}>
      <View>
        <Button
          mode="contained"
          uppercase={false}
          onPress={() => {
            console.log(icon);
            input?.current?.blur();
            setIcon(!icon);
          }}
        >
          change icon
        </Button>
      </View>
      <View style={{ margin: 8 }}>
        <SearchBar
          ref={input}
          enableCancel={false}
          enableClear={enableClear}
          inputContainerStyle={{
            backgroundColor: 'rgba(242, 242, 242, 1)',
            borderRadius: 24,
          }}
          cancel={{ buttonName: 'cancel' }}
        />
      </View>
    </View>
  );
}
