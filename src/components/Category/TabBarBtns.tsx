import {MaterialTopTabNavigationEventMap} from '@react-navigation/material-top-tabs';
import {
  TabNavigationState,
  ParamListBase,
  NavigationHelpers,
} from '@react-navigation/native';
import React from 'react';
import {Pressable, StyleSheet, Text, ScrollView} from 'react-native';

interface Props {
  state: TabNavigationState<ParamListBase>;
  navigation: NavigationHelpers<
    ParamListBase,
    MaterialTopTabNavigationEventMap
  >;
  setCategoryName: React.Dispatch<React.SetStateAction<String>>;
}
const TabBarBtns = ({state, navigation, setCategoryName}: Props) => {
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={styles.btnContainer}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        return (
          <Pressable
            style={isFocused ? styles.focusBtn : styles.btn}
            onPress={() => {
              if (!isFocused) {
                navigation.navigate(route.name);
                setCategoryName(route.name);
              }
            }}>
            <Text style={isFocused ? styles.focusBtnText : styles.btnText}>
              {route.name}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#808080',
  },
  CategoryTitle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  CategoryTitleText: {
    fontSize: 18,
    fontWeight: '600',
    paddingTop: 20,
    paddingBottom: 10,
  },

  btnContainer: {
    flexDirection: 'row',
  },
  focusBtn: {
    borderBottomWidth: 4,
  },
  btn: {
    marginHorizontal: 12,
  },
  focusBtnText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  btnText: {
    color: '#808080',
    fontSize: 16,
    marginBottom: 4,
  },
});

export default TabBarBtns;
