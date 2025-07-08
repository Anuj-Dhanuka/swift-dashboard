export const SORT_DIRECTIONS = {
  ASC: 'asc',
  DESC: 'desc'
};

export const sortData = (data, sortField, sortOrder) => {
  if (sortField === 'postId') {
    return [...data].sort((a, b) => {
      const numA = parseInt(a.postId, 10);
      const numB = parseInt(b.postId, 10);
      if (sortOrder === SORT_DIRECTIONS.ASC) return numA - numB;
      if (sortOrder === SORT_DIRECTIONS.DESC) return numB - numA;
      return 0;
    });
  }

  if (sortField === 'name' || sortField === 'email') {
    return [...data].sort((a, b) => {
      const strA = a[sortField].toLowerCase();
      const strB = b[sortField].toLowerCase();
      if (sortOrder === SORT_DIRECTIONS.ASC) return strA.localeCompare(strB);
      if (sortOrder === SORT_DIRECTIONS.DESC) return strB.localeCompare(strA);
      return 0;
    });
  }

  return data;
};

export const getNextSortOrder = (currentSortOrder) => {
  return currentSortOrder === SORT_DIRECTIONS.ASC
    ? SORT_DIRECTIONS.DESC
    : SORT_DIRECTIONS.ASC;
};
