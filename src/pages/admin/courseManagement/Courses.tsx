import { Button, Modal, Table } from 'antd';
import {
  useAddFacultiesMutation,
  useGetAllCoursesQuery,
} from '../../../redux/features/admin/courseManagement.api.ts';
import { useState } from 'react';
import PHForm from '../../../components/form/PHForm';
import PHSelect from '../../../components/form/PHSelect';

import { useGetAllFacultiesQuery } from '../../../redux/features/admin/userManagement.api';
import { TStudent } from '../../../types/userManagement.type.ts';
import { TMeta } from '../../../types/global.ts';

interface CoursesApiResponse {
  data: {
    meta: TMeta | undefined;
    result: {
      _id: string;
      title: string;
      prefix: string;
      code: string | number;
      credits?: number;
    }[] | undefined;
  };
  meta?: any;
}

const Courses = () => {
  // Get the full response, which contains 'data' property as shown in your API response
  const { data: apiResponse, isLoading } = useGetAllCoursesQuery<CoursesApiResponse>(undefined) as any;

  // The actual course array is in apiResponse?.data?.result
  const tableData = apiResponse?.data?.result?.map(
    ({ _id, title, prefix, code }: { _id: string; title: string; prefix: string; code: string | number }) => ({
      key: _id,
      title,
      code: `${prefix}${code}`,
    })
  );

  const columns = [
    {
      title: 'Title',
      key: 'title',
      dataIndex: 'title',
    },
    {
      title: 'Code',
      key: 'code',
      dataIndex: 'code',
    },
    {
      title: 'Action',
      key: 'x',
      render: (item: any) => {
        return <AddFacultyModal facultyInfo={item} />;
      },
    },
  ];

  return (
    <Table
      loading={isLoading}
      columns={columns}
      dataSource={tableData}
    />
  );
};

type FacultyInfo = {
  key: string;
  title: string;
  code: string;
};

const AddFacultyModal = ({ facultyInfo }: { facultyInfo: FacultyInfo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: facultiesApiResponse } = useGetAllFacultiesQuery<CoursesApiResponse>(undefined) as any;
  const [addFaculties] = useAddFacultiesMutation();

  // The actual faculties array is in facultiesApiResponse?.data?.result
  const facultiesOption = facultiesApiResponse?.data?.result?.map((item: TStudent) => ({
    value: item._id,
    label: item.fullName,
  }));

  const handleSubmit = (data: any) => {
    const facultyData = {
      courseId: facultyInfo.key,
      data,
    };
    addFaculties(facultyData);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={showModal}>Add Faculty</Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <PHForm onSubmit={handleSubmit}>
          <PHSelect
            mode="multiple"
            options={facultiesOption}
            name="faculties"
            label="Faculty"
          />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Modal>
    </>
  );
};

export default Courses;