import { useMemo } from 'react';

type Link = {
  id: string;
  title: string;
  url: string;
  image: string;
  date: string;
  isRead: boolean;
  profitDividend?: number;
  [key: string]: any;
};

type Filters = {
  search: string;
  sort: string;
  isRead: string;
};
const withSearch = (data: Link[], value: string = ''): Link[] => {
  return data.filter((item) => item?.title.toLocaleLowerCase().includes(value.toLocaleLowerCase()));
};

const withSortType = (data: Link[], value: string = 'default'): Link[] => {
  if (value === 'default') return data;

  return [...data].sort((a, b) => {
    if (value === 'totalProfit') {
      if (!a.profitDividend) return 1;
      if (!b.profitDividend) return -1;
    }
    return Number(b[value]) - Number(a[value]);
  });
};

const withIsRead = (data: Link[], value: string = 'all'): Link[] => {
  return value === 'all' ? data : data.filter((item) => String(!!item.isRead) === String(value));
};

const compose =
  (...fns) =>
  (param) =>
    fns.reduceRight((y, f) => f(y), param);

const useLinkFilter = (links: Link[], filters: Filters): Link[] => {
  const filteredFunds = useMemo(() => {
    const filtered = compose<Link[]>(
      (data) => withSearch(data, filters.search),
      (data) => withIsRead(data, filters.isRead),
      (data) => withSortType(data, filters.sortType),
    );
    return filtered(links);
  }, [links, filters.search, filters.sortType, filters.isRead]);

  return filteredFunds;
};

export default useLinkFilter;
