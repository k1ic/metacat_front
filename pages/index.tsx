import React from 'react';
import cn from 'classnames';
import Page from '../components/page';
import Layout from '../components/layout';
import { SITE_NAME, META_DESCRIPTION } from '../common/const';
import { convert } from '../common/utils';

import Tab from '../components/tab';
import SecondTab from '../components/tab2';
import Card from '../components/card';
import SwiperTag from '../components/swiper-tag';
import PagiNation from '../components/pagination';
import Search from '../components/search';
import PostGrid from '../components/post-grid';

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

// this data just for test
const TAGS = [
  { name: 'all', value: 6554 },
  { name: 'gallery', value: 419 },
  { name: 'MVB', value: 130 },
  { name: 'tower', value: 74 },
  { name: 'HQ', value: 71 },
  { name: 'house', value: 60 },
  { name: 'club', value: 53 },
  { name: 'museum', value: 40 },
  { name: 'garden', value: 35 },
  { name: 'temple', value: 32 },
  { name: 'shop', value: 28 },
  { name: 'other', value: 5612 },
];

const EVENTS = [
  {
    name: 'SuperDelicious',
    coverImg:
      'https://media-crvox.sfo2.digitaloceanspaces.com/0x195acaf2ccb5d388f4f5a03030ad765d74d94f3f/womps/1639464964429-5727956d-03dd-4363-936f-5a4763206df9.jpg',
    description:
      'Gallery of Kerb and DaisyCoco. Random nuggets of digital madness from our little studio in the middle of nowhere.Gallery of Kerb and DaisyCoco',
    activityTime: '2012/08/12 -- 2021/12/30',
  },
  {
    name: 'SuperDelicious',
    coverImg:
      'https://media-crvox.sfo2.digitaloceanspaces.com/0x195acaf2ccb5d388f4f5a03030ad765d74d94f3f/womps/1639464964429-5727956d-03dd-4363-936f-5a4763206df9.jpg',
    description:
      'Gallery of Kerb and DaisyCoco. Random nuggets of digital madness from our little studio in the middle of nowhere.Gallery of Kerb and DaisyCoco',
    activityTime: '2012/08/12 -- 2021/12/30',
  },
  {
    name: 'SuperDelicious',
    coverImg:
      'https://media-crvox.sfo2.digitaloceanspaces.com/0x195acaf2ccb5d388f4f5a03030ad765d74d94f3f/womps/1639464964429-5727956d-03dd-4363-936f-5a4763206df9.jpg',
    description:
      'Gallery of Kerb and DaisyCoco. Random nuggets of digital madness from our little studio in the middle of nowhere.Gallery of Kerb and DaisyCoco',
    activityTime: '2012/08/12 -- 2021/12/30',
  },
  {
    name: 'SuperDelicious',
    coverImg:
      'https://media-crvox.sfo2.digitaloceanspaces.com/0x195acaf2ccb5d388f4f5a03030ad765d74d94f3f/womps/1639464964429-5727956d-03dd-4363-936f-5a4763206df9.jpg',
    description:
      'Gallery of Kerb and DaisyCoco. Random nuggets of digital madness from our little studio in the middle of nowhere.Gallery of Kerb and DaisyCoco',
    activityTime: '2012/08/12 -- 2021/12/30',
  },
  {
    name: 'SuperDelicious',
    coverImg:
      'https://media-crvox.sfo2.digitaloceanspaces.com/0x195acaf2ccb5d388f4f5a03030ad765d74d94f3f/womps/1639464964429-5727956d-03dd-4363-936f-5a4763206df9.jpg',
    description:
      'Gallery of Kerb and DaisyCoco. Random nuggets of digital madness from our little studio in the middle of nowhere.Gallery of Kerb and DaisyCoco',
    activityTime: '2012/08/12 -- 2021/12/30',
  },
];

const CARDS = [
  {
    coverImgUrl:
      'https://media-crvox.sfo2.digitaloceanspaces.com/0x195acaf2ccb5d388f4f5a03030ad765d74d94f3f/womps/1639464964429-5727956d-03dd-4363-936f-5a4763206df9.jpg',
    name: 'SuperDelicious',
    type: 'other',
    description:
      'Gallery of Kerb and DaisyCoco. Random nuggets of digital madness from our little studio in the middle of nowhere.Gallery of Kerb and DaisyCoco',
    parcelPageUrl: 'https://www.cryptovoxels.com/parcels/4375',
    openseaUrl: 'https://opensea.io/assets/0x79986aF15539de2db9A5086382daEdA917A9CF0C/4375',
  },
  {
    coverImgUrl:
      'https://media-crvox.sfo2.digitaloceanspaces.com/0x195acaf2ccb5d388f4f5a03030ad765d74d94f3f/womps/1639464964429-5727956d-03dd-4363-936f-5a4763206df9.jpg',
    name: 'SuperDelicious',
    type: 'other',
    description:
      'Gallery of Kerb and DaisyCoco. Random nuggets of digital madness from our little studio in the middle of nowhere.Gallery of Kerb and DaisyCoco',
    parcelPageUrl: 'https://www.cryptovoxels.com/parcels/4375',
    openseaUrl: 'https://opensea.io/assets/0x79986aF15539de2db9A5086382daEdA917A9CF0C/4375',
  },
  {
    coverImgUrl:
      'https://media-crvox.sfo2.digitaloceanspaces.com/0x195acaf2ccb5d388f4f5a03030ad765d74d94f3f/womps/1639464964429-5727956d-03dd-4363-936f-5a4763206df9.jpg',
    name: 'SuperDelicious',
    type: 'other',
    description:
      'Gallery of Kerb and DaisyCoco. Random nuggets of digital madness from our little studio in the middle of nowhere.Gallery of Kerb and DaisyCoco',
    parcelPageUrl: 'https://www.cryptovoxels.com/parcels/4375',
    openseaUrl: 'https://opensea.io/assets/0x79986aF15539de2db9A5086382daEdA917A9CF0C/4375',
  },
];
// test data end

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
  const [searchText, setSearchText] = React.useState('');
  const [typeState, setTypeState] = React.useState('');
  const nextCursor = React.useRef(1);

  const [dataSource, setDataSource] = React.useState([]);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);

  const requestData = async ({ tab, subTab, page, query = '', type }): Promise<any[]> => {
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

    return convert(data);
  };

  // useEffect(() => {

  // }, [tab, subTab]);

  const onTabChange = async (tab) => {
    setTabState(tab);
    const data = requestData({ tab, subTab: subTabState, page: 1, query: '', type: '' });
  };

  const onSubTabChange = async (subTab) => {
    setSubTabState(subTab);
    // if (subTab === 'event') return;
    const data = await requestData({ tab: tabState, subTab, page: 1, query: '', type: '' });
    setDataSource(data);
  };

  const onTypeChangeHandler = React.useCallback((type: string) => {
    setTypeState(type);
  }, []);

  const onSearchHandler = React.useCallback(
    (text: string) => {
      setSearchText(text);

      requestData({ tab: tabState, subTab: subTabState, query: text, page: 1, type: typeState });
    },
    [tabState, subTabState, typeState],
  );

  const loadMore = React.useCallback(
    async (defaultPage?: number) => {
      if (dataSource.length === 0) return;
      const list = await requestData({
        tab: tabState,
        subTab: subTabState,
        page: defaultPage || 1,
        query: searchText,
        type: typeState,
      });
      if (list.length === 0) {
        setHasMore(false);
        return;
      }
      setDataSource([...dataSource, ...list]);
      setPageNumber((defaultPage || pageNumber) + 1);
      setHasMore(true);
    },
    [pageNumber, hasMore, tabState, subTabState, searchText, typeState, dataSource],
  );

  const cls = cn('flex-1', style.bottomLine);

  console.log(dataSource, pageNumber, hasMore);
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
        <div className="main-content">
          <div className={cn('flex justify-between items-center', style.contentHeader)}>
            <div className="flex">
              {SUBTAB.map((item, index) => {
                return (
                  <SecondTab
                    label={item.label}
                    key={item.label}
                    onClick={() => {
                      onSubTabChange(item.type);
                    }}
                    active={subTabState === item.type}
                  />
                );
              })}
            </div>
            {subTabState === 'parcel' ? <Search onSearch={onSearchHandler}></Search> : null}
          </div>
          <div className="mt-8">
            {subTabState === 'parcel' ? (
              <>
                <SwiperTag onActive={onTypeChangeHandler} tags={TAGS}></SwiperTag>

                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-7">
                  {CARDS.map((card, idx) => {
                    return <Card {...card} key={idx}></Card>;
                  })}
                </div>
                <PagiNation
                  total={50}
                  pageNumber={0}
                  pageSize={5}
                  pageChange={(e) => {
                    console.log(e);
                  }}
                ></PagiNation>
              </>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-8 my-7">
                  <PostGrid loadMore={loadMore} hasMore={hasMore} events={dataSource}></PostGrid>
                </div>
              </>
            )}
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
