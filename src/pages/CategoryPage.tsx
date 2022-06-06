import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Category1 from '../components/Category/Category1';
import Category2 from '../components/Category/Category2';
import Category3 from '../components/Category/Category3';
import {SafeAreaView} from 'react-native';
import TabBar from '../components/Category/TabBar';
import Category4 from '../components/Category/Category4';
import Category5 from '../components/Category/Category5';
import Category6 from '../components/Category/Category6';
import Category7 from '../components/Category/Category7';

const Tab = createMaterialTopTabNavigator();

function CategoryPage() {
  return (
    <>
      <SafeAreaView style={{backgroundColor: 'white'}} />

      <Tab.Navigator tabBar={props => <TabBar {...props} />}>
        <Tab.Screen name="Category1" component={Category1} />
        <Tab.Screen name="Category2" component={Category2} />
        <Tab.Screen name="Category3" component={Category3} />
        <Tab.Screen name="Category4" component={Category4} />
        <Tab.Screen name="Category5" component={Category5} />
        <Tab.Screen name="Category6" component={Category6} />
        <Tab.Screen name="Category7" component={Category7} />
      </Tab.Navigator>
    </>
  );
}

export default CategoryPage;
