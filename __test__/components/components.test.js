import React from 'react';
import renderer from 'react-test-renderer';

import ListCoin from '../../components/ListCoin';
import ListNews from '../../components/ListNews';
import ListTrending from '../../components/ListTrending';
import ListTweets from '../../components/ListTweets';

test('it renders correctly', () => {
   renderer.create(<ListCoin curr='Bitcoin' symbol='btc' logo='def.jpg' price={23.33} priceChange={1.4} onPress={() => {}}/>)
});

test('it renders correctly', () => {
    renderer.create(<ListNews title='some string' published_at='11/02/22' onPress={()=>{}}/>)
});

 test('it renders correctly', () => {
    renderer.create(<ListTrending name='bitcoin' logo='def.jpg' symbol='btc'/>)
});

test('it renders correctly', () => {
    renderer.create(<ListTweets username='user' dp='def.jpg' retweets={23} content='some string' created='11/02/22' likes={0} onPress={()=>{}}/>)
});


