import {
  Button,
  Pagination,
  Space,
  Table,
  TableColumnsType,
  TableProps,
} from 'antd';
import { useState } from 'react';
import { TMeta, TQueryParam, TStudent } from '../../../types';
import { useGetAllStudentsQuery } from '../../../redux/features/admin/userManagement.api';
import { Link } from 'react-router-dom';

export type TTableData = Pick<
  TStudent,
  'fullName' | 'id' | 'email' | 'contactNo'
> & { key: string };

// Match your API response:
type TStudentApiData = {
  data: any;
  meta: TMeta;
  result: TStudent[];
};
type TResponse<T> = { data: T; meta?: any };

const StudentData = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);

  // This is correct for your API response
  const {
    data: apiResponse,
    isLoading,
  } = useGetAllStudentsQuery<TResponse<TStudentApiData>>([
    { name: 'page', value: page },
    { name: 'sort', value: 'id' },
    ...params,
  ]);

  

  // Defensive: log the response to debug
  console.log('apiResponse', apiResponse);

  // Defensive: check for existence
  const tableData: TTableData[] =
    apiResponse?.data?.result?.map(
      ({ _id, fullName, id, email, contactNo }: TStudent & { _id: string }) => ({
        key: _id,
        fullName,
        id,
        email,
        contactNo,
      })
    ) ?? [];

  const metaData = apiResponse?.data?.meta;

  const columns: TableColumnsType<TTableData> = [
    {
      title: 'Name',
      key: 'fullName',
      dataIndex: 'fullName',
    },
    {
      title: 'Roll No.',
      key: 'id',
      dataIndex: 'id',
    },
    {
      title: 'Email',
      key: 'email',
      dataIndex: 'email',
    },
    {
      title: 'Contact No.',
      key: 'contactNo',
      dataIndex: 'contactNo',
    },
    {
      title: 'Action',
      key: 'x',
      render: (item) => (
        <Space>
          <Link to={`/admin/student-data/${item.key}`}>
            <Button>Details</Button>
          </Link>
          <Button>Update</Button>
          <Button>Block</Button>
        </Space>
      ),
      width: '1%',
    },
  ];

  const onChange: TableProps<TTableData>['onChange'] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === 'filter') {
      const queryParams: TQueryParam[] = [];
      filters.name?.forEach((item) =>
        queryParams.push({ name: 'name', value: item })
      );
      filters.year?.forEach((item) =>
        queryParams.push({ name: 'year', value: item })
      );
      setParams(queryParams);
    }
  };

  return (
    <>
      <Table
        
        loading={isLoading}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        pagination={false}
        rowKey="key"
      />
      <Pagination
        current={page}
        onChange={(value) => setPage(value)}
        pageSize={metaData?.limit ?? 10}
        total={metaData?.total ?? 0}
      />
    </>
  );
};

export default StudentData;