import {MaterialTopTabBarProps} from '@react-navigation/material-top-tabs';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import TabBarBtns from './TabBarBtns';

const TabBar = ({state, navigation}: MaterialTopTabBarProps) => {
  const [categoryName, setCategoryName] = useState<String>(
    state.routes[0].name,
  );

  return (
    <View style={styles.container}>
      <View style={styles.CategoryTitle}>
        <Text style={styles.CategoryTitleText}>{categoryName}</Text>
      </View>

      <TabBarBtns
        state={state}
        navigation={navigation}
        setCategoryName={setCategoryName}
      />
    </View>
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

export default TabBar;
