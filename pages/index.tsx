import React, { useEffect } from 'react';
import cn from 'classnames';
import Page from '../components/page';
import Layout from '../components/layout';
import { SITE_NAME, META_DESCRIPTION } from '../common/const';

import Tab from '../components/tab';
import SecondTab from '../components/tab2';
import EventCard from '../components/EventCard';
import Card from '../components/card';

import style from './index.module.less';
import { getCVEventList, getCVParcelList, getDCLEventList, getDCLParcelList } from '../service';

const TAB = [
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

const SUBTAB = [
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

  const [loading, setLoading] = React.useState(false);

  const [tabState, setTabState] = React.useState('voxel');
  const [subTabState, setSubTabState] = React.useState('parcel');
  const [pageNum, setPageNum] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(1);
  const [noData, setNoData] = React.useState(false);
  const nextCursor = React.useRef(1);

  const requestData = async ({ tab, subTab, page, query = '', type }) => {
    let data;
    if (tab === 'voxel') {
      if (subTab === 'parcel') {
        const res = await getCVParcelList(page, 10, query, type);
        const { parcel_list, total_page } = res.data;

        setTotalPage(total_page);

        data = parcel_list;
      } else if (subTab === 'event') {
        const res = await getCVEventList(nextCursor.current, 10);
        const { cursor, count, event_list } = res.data;
        nextCursor.current = cursor;

        if (event_list.length === 0) {
          setNoData(true);
        } else {
          setNoData(false);
        }

        data = event_list;
      }
    } else if (tab === 'decentraland') {
      if (subTab === 'parcel') {
        const res = await getDCLParcelList(page, 10, query, type);
        const { parcel_list, total_page } = res.data;

        setTotalPage(total_page);

        data = parcel_list;
      } else if (subTab === 'event') {
        const res = await getDCLEventList(nextCursor.current, 10);
        const { cursor, event_list } = res.data;
        nextCursor.current = cursor;

        if (event_list.length === 0) {
          setNoData(true);
        } else {
          setNoData(false);
        }

        data = event_list;
      }
    }

    return data;
  };

  // useEffect(() => {

  // }, [tab, subTab]);

  const onTabChange = async (tab) => {
    setTabState(tab);
    const data = requestData({ tab, subTab: subTabState, page: 1, query: '', type: '' });
  };

  const onSubTabChange = async (subTab) => {
    setSubTabState(subTab);
    const data = requestData({ tab: tabState, subTab, page: 1, query: '', type: '' });
  };

  const cls = cn('flex-1', style.bottomLine);

  return (
    <Page meta={meta}>
      <Layout>
        <div className="tab-list h-28 flex pt-6">
          <div className={cls}></div>
          <div className="main-content flex px-0">
            {TAB.map((item, index) => {
              return (
                <Tab
                  active={tabState === item.type}
                  key={item.label}
                  label={item.label}
                  icon={item.icon}
                  onClick={() => {
                    onTabChange(item.type);
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
            {SUBTAB.map((item, index) => {
              return (
                <SecondTab
                  label={item.label}
                  key={item.label}
                  onClick={() => {
                    onSubTabChange(item.label);
                  }}
                  active={subTabState === item.label}
                />
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
