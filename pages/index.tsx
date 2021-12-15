import React from 'react';
import cn from 'classnames';
import Page from '../components/page';
import Layout from '../components/layout';
import { SITE_NAME, META_DESCRIPTION } from '../common/const';

import Tab from '../components/tab';
import SecondTab from '../components/tab2';

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
  const meta = {
    title: `Home - ${SITE_NAME}`,
    description: META_DESCRIPTION,
  };

  const [tab, setTab] = React.useState(0);
  const [subTab, setSubTab] = React.useState(0);

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
                  active={tab === index}
                  key={item.label}
                  label={item.label}
                  icon={item.icon}
                  onClick={() => {
                    setTab(index);
                  }}
                />
              );
            })}
            <div className={cls} />
          </div>
          <div className={cls} />
        </div>
        <div className="h-96 main-content">
          <div className={cn('flex', style.contentHeader)}>
            {tabs2.map((item, index) => {
              return (
                <SecondTab
                  label={item.label}
                  key={item.label}
                  onClick={() => {
                    setSubTab(index);
                  }}
                  active={subTab === index}
                />
              );
            })}
            <div></div>
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
