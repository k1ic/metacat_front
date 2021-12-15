import React from 'react';
import cn from 'classnames';
import Page from '../components/page';
import Layout from '../components/layout';
import { SITE_NAME, META_DESCRIPTION } from '../common/const';

import Tab from '../components/tab';
import SecondTab from '../components/tab2';
import EventCard from '../components/EventCard';
import Card from '../components/card';

import style from './index.module.less';

const tabs = [
  {
    label: 'Crypto Voxel',
    icon: '/images/Crypto Voxel.jpg',
    type: 'voxel',
  },
  {
    label: 'Decentraland',
    icon: '/images/Decentraland.jpg',
    type: 'decentraland',
  },
];

const tabs2 = [
  {
    label: 'Parcel',
    type: 'parcel',
  },
  {
    label: 'Event',
    type: 'event',
  },
];

export default function Index() {
  const [chooseTab, setChooseTab] = React.useState(0);
  const [secTab, setSecTab] = React.useState(0);

  const chooseOne = React.useCallback(
    (index) => {
      setChooseTab(index);
    },
    [tabs],
  );

  const chooseSecond = React.useCallback(
    (index) => {
      setSecTab(index);
    },
    [tabs2],
  );

  const meta = {
    title: `Home - ${SITE_NAME}`,
    description: META_DESCRIPTION,
  };
  const cls = cn('flex-1', style.bottomLine);
  return (
    <Page meta={meta}>
      <Layout>
        <div className="tab-list h-28 flex pt-6">
          <div className={cls}></div>
          <div className="main-content flex px-0">
            {tabs.map((item, index) => {
              return (
                <Tab
                  isChoose={chooseTab === index}
                  key={item.label}
                  label={item.label}
                  icon={item.icon}
                  choose={() => {
                    chooseOne(index);
                  }}
                ></Tab>
              );
            })}
            <div className={cls}></div>
          </div>
          <div className={cls}></div>
        </div>
        <div className="h-96 main-content">
          <div className={cn('flex', style.contentHeader)}>
            {tabs2.map((item, index) => {
              return (
                <SecondTab
                  label={item.label}
                  key={item.label}
                  choose={() => {
                    chooseSecond(index);
                  }}
                  isChoose={secTab === index}
                ></SecondTab>
              );
            })}
          </div>
          <div className="mt-8">
            <EventCard title="SuperDelicious"></EventCard>
            <Card
              coverImgUrl="https://media-crvox.sfo2.digitaloceanspaces.com/0x195acaf2ccb5d388f4f5a03030ad765d74d94f3f/womps/1639464964429-5727956d-03dd-4363-936f-5a4763206df9.jpg"
              name="SuperDelicious"
              description="Gallery of Kerb and DaisyCoco. Random nuggets of digital madness from our little studio in the middle of nowhere.Gallery of Kerb and DaisyCoco"
              parcelPageUrl="https://www.cryptovoxels.com/parcels/4375"
              openseaUrl="https://opensea.io/assets/0x79986aF15539de2db9A5086382daEdA917A9CF0C/4375"
            ></Card>
          </div>
        </div>
      </Layout>
    </Page>
  );
}

export async function getServerSideProps({ locale = 'en-US' }) {
  return {
    props: {
      messages: {
        ...require(`../messages/common/${locale}.json`),
        ...require(`../messages/index/${locale}.json`),
      },
      now: new Date().getTime(),
      locale,
    },
  };
}
