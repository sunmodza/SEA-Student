import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';


import Home from '../scene/home';
import SstLong from '../components/school_quest/sst_long';
import SstShort from '../components/school_quest/sst_short';

const screens = {
    SchoolQuestlong:{
        screen: SstLong,
    },
    Home: {
        screen: Home,
    },
};

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);