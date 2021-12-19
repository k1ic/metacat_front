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
import Status from '../components/status';
import TopJumper from '../components/jump-to-top';

import style from './index.module.less';
import { getCVEventList, getCVParcelList, getDCLEventList, getDCLParcelList } from '../service';

const TAB = [
  {
    label: 'Cryptovoxel',
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

export default function Index(props) {
  const meta = {
    title: `Home - ${SITE_NAME}`,
    description: META_DESCRIPTION,
  };

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  const [tabState, setTabState] = React.useState(props.query.tab || 'voxel');
  const [subTabState, setSubTabState] = React.useState(props.query.subTab || 'parcel');
  const [totalPage, setTotalPage] = React.useState(1);
  const [noData, setNoData] = React.useState(false);
  const [searchText, setSearchText] = React.useState(props.query.search || '');
  const [typeState, setTypeState] = React.useState(props.query.type || 'all');
  const [typeList, setTypeList] = React.useState([]);
  const nextCursor = React.useRef(1);

  const [dataSource, setDataSource] = React.useState([]);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);

  const requestData = async ({
    tab,
    subTab,
    page,
    query = '',
    type,
    needUpdateTypeList = false,
  }): Promise<any[]> => {
    let data = [];
    setLoading(true);
    setError(false);

    try {
      if (tab === 'voxel') {
        if (subTab === 'parcel') {
          const res = await getCVParcelList(page, 50, query, type);
          const { parcel_list, total_page, type_total, page: currentPage } = res.data;

          const typeArray = Object.keys(type_total).map((key) => {
            const value = type_total[key];
            return { name: key, value };
          });

          setTotalPage(total_page);
          setPageNumber(currentPage);

          if (needUpdateTypeList) {
            setTypeList(typeArray);
          }
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
          const res = await getDCLParcelList(page, 50, query, type);
          const { parcel_list, total_page, type_total, page: currentPage } = res.data;

          setTotalPage(total_page);
          setPageNumber(currentPage);

          const typeArray = Object.keys(type_total).map((key) => {
            const value = type_total[key];
            return { name: key, value };
          });

          if (needUpdateTypeList) {
            setTypeList(typeArray);
          }
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
    } catch (err) {
      setError(true);
    }

    setLoading(false);
    return convert(data);
  };

  const onTabChange = async (tab) => {
    setTabState(tab);
    const data = await requestData({
      tab,
      subTab: subTabState,
      page: 1,
      query: '',
      type: '',
      needUpdateTypeList: true,
    });
    setDataSource(data);
  };

  const onSubTabChange = React.useCallback(
    async (subTab) => {
      setSubTabState(subTab);

      const data = await requestData({
        tab: tabState,
        subTab,
        page: 1,
        query: searchText,
        type: typeState,
        needUpdateTypeList: true,
      });
      setDataSource(data);
    },
    [tabState, searchText, typeState],
  );

  const onTypeChangeHandler = React.useCallback(
    async (type: string) => {
      setTypeState(type);

      const data = await requestData({
        tab: tabState,
        subTab: subTabState,
        page: 1,
        query: searchText,
        type,
      });

      setDataSource(data);
    },
    [tabState, subTabState, searchText],
  );

  const onPageChangeHandler = React.useCallback(
    async (number: number) => {
      const requestNumber = number + 1;
      const data = await requestData({
        tab: tabState,
        subTab: subTabState,
        page: requestNumber,
        query: searchText,
        type: typeState,
      });

      setDataSource(data);
    },
    [tabState, subTabState, typeState, searchText],
  );

  const onSearchHandler = React.useCallback(
    async (text: string) => {
      setSearchText(text);
      const data = await requestData({
        tab: tabState,
        subTab: subTabState,
        query: text,
        page: 1,
        type: typeState,
        needUpdateTypeList: true,
      });

      setDataSource(data);
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

  const onRetry = React.useCallback(async () => {
    const data = await requestData({
      tab: tabState,
      subTab: subTabState,
      page: pageNumber,
      query: searchText,
      type: typeState,
      needUpdateTypeList: true,
    });
    setDataSource(data);
  }, [tabState, subTabState, pageNumber, searchText, typeState]);

  const renderContent = React.useMemo(() => {
    if (subTabState === 'parcel') {
      if (loading) {
        return <Status status="loading" />;
      }

      if (error) {
        return <Status retry={onRetry} status="error" />;
      }

      if (dataSource.length === 0) {
        return <Status status="empty" />;
      }

      return (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-7">
            {dataSource.map((card, idx) => {
              return <Card {...card} key={idx}></Card>;
            })}
          </div>
          <PagiNation
            total={totalPage}
            pageNumber={pageNumber - 1}
            pageSize={9}
            pageChange={onPageChangeHandler}
          />
        </>
      );
    }

    if (subTabState === 'event') {
      if (error) {
        return (
          <div className="grid grid-cols-1 gap-8 my-7">
            <PostGrid loadMore={loadMore} hasMore={hasMore} events={dataSource} />

            <Status retry={onRetry} status="error" />
          </div>
        );
      }

      if (dataSource.length === 0) {
        return <Status status="empty" />;
      }

      return (
        <div className="grid grid-cols-1 gap-8 my-7">
          <PostGrid loadMore={loadMore} hasMore={hasMore} events={dataSource} />
        </div>
      );
    }
  }, [
    subTabState,
    error,
    dataSource,
    hasMore,
    loadMore,
    loading,
    totalPage,
    pageNumber,
    onPageChangeHandler,
    onRetry,
  ]);

  const init = React.useCallback(async () => {
    const data = await requestData({
      tab: tabState,
      subTab: subTabState,
      page: 1,
      query: searchText,
      type: typeState,
      needUpdateTypeList: true,
    });
    setDataSource(data);
  }, [props.query]);

  React.useEffect(() => {
    init();
  }, [null]);

  const cls = cn('flex-1', style.bottomLine);

  return (
    <Page meta={meta}>
      <Layout>
        <div className={cn('tab-list flex pt-5', style.allHeight)}>
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
          <div className={cn('flex justify-between items-center pt-5', style.contentHeader)}>
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
            {subTabState === 'parcel' && (
              <SwiperTag onActive={onTypeChangeHandler} tags={typeList} label={typeList[0]?.name} />
            )}

            {renderContent}
          </div>
        </div>
        {subTabState === 'parcel' ? null : <TopJumper></TopJumper>}
      </Layout>
    </Page>
  );
}

export async function getServerSideProps({ locale = 'en-US', query }) {
  return {
    props: {
      messages: {
        ...require(`../messages/common/${locale}.json`),
        ...require(`../messages/index/${locale}.json`),
      },
      now: new Date().getTime(),
      locale,
      query,
    },
  };
}
