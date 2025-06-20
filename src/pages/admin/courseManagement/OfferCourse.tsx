import { Button, Col, Flex } from 'antd';
import PHForm from '../../../components/form/PHForm';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import PHSelect from '../../../components/form/PHSelect';
import PHSelectWithWatch from '../../../components/form/PHSelectWithWatch';
import { useState } from 'react';
import PHInput from '../../../components/form/PHInput';
import moment from 'moment';
import {
  useCreateOfferedCourseMutation,
  useGetAllCoursesQuery,
  useGetAllRegisteredSemestersQuery,
  useGetCourseFacultiesQuery,
} from '../../../redux/features/admin/courseManagement.api.ts';
import {
  useGetAcademicDepartmentsQuery,
  useGetAcademicFacultiesQuery,
} from '../../../redux/features/admin/academicManagement.api';
import { weekDaysOptions } from '../../../constants/global';
import PHTimePicker from '../../../components/form/PHTimePicker';

interface PaginatedResult<T> {
  result: T[];
  meta: any;
}
interface APIResponse<T> {
  data: PaginatedResult<T>;
  meta?: any;
}

const OfferCourse = () => {
  const [courseId, setCourseId] = useState('');

  const [addOfferedCourse] = useCreateOfferedCourseMutation();

  // Cast the hook result, not the destructured data
  const semesterRegistrationQuery = useGetAllRegisteredSemestersQuery([
    { name: 'sort', value: 'year' },
    { name: 'status', value: 'UPCOMING' },
  ]) as { data?: PaginatedResult<any> } | undefined;
  const semesterRegistrationData = semesterRegistrationQuery?.data;

  const academicFacultyQuery = useGetAcademicFacultiesQuery(undefined) as { data?: PaginatedResult<any> } | undefined;
  const academicFacultyData = academicFacultyQuery?.data;

  const academicDepartmentQuery = useGetAcademicDepartmentsQuery(undefined) as { data?: PaginatedResult<any> } | undefined;
  const academicDepartmentData = academicDepartmentQuery?.data;

  const coursesQuery = useGetAllCoursesQuery(undefined) as { data?: PaginatedResult<any> } | undefined;
  const coursesData = coursesQuery?.data;

  const { data: facultiesData, isFetching: fetchingFaculties } =
    useGetCourseFacultiesQuery(courseId, { skip: !courseId }) as { data?: { faculties?: any[] } } & { isFetching: boolean };

  // Use .result for paginated API responses
  const semesterRegistrationOptions = semesterRegistrationData?.result?.map(
    (item) => ({
      value: item._id,
      label: `${item.academicSemester.name} ${item.academicSemester.year}`,
    })
  );

  const academicFacultyOptions = academicFacultyData?.result?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const academicDepartmentOptions = academicDepartmentData?.result?.map(
    (item) => ({
      value: item._id,
      label: item.name,
    })
  );

  const courseOptions = coursesData?.result?.map((item) => ({
    value: item._id,
    label: item.title,
  }));

  const facultiesOptions = facultiesData?.faculties?.map((item: any) => ({
    value: item._id,
    label: item.fullName,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const offeredCourseData = {
      ...data,
      maxCapacity: Number(data.maxCapacity),
      section: Number(data.section),
      startTime: moment(new Date(data.startTime)).format('HH:mm'),
      endTime: moment(new Date(data.endTime)).format('HH:mm'),
    };

    const res = await addOfferedCourse(offeredCourseData);
    console.log(res);
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm onSubmit={onSubmit}>
          <PHSelect
            name="semesterRegistration"
            label="Semester Registrations"
            options={semesterRegistrationOptions}
          />
          <PHSelect
            name="academicFaculty"
            label="Academic Faculty"
            options={academicFacultyOptions}
          />
          <PHSelect
            name="academicDepartment"
            label="Academic Department"
            options={academicDepartmentOptions}
          />
          <PHSelectWithWatch
            onValueChange={setCourseId}
            options={courseOptions}
            name="course"
            label="Course"
          />
          <PHSelect
            disabled={!courseId || fetchingFaculties}
            name="faculty"
            label="Faculty"
            options={facultiesOptions}
          />
          <PHInput type="text" name="section" label="Section" />
          <PHInput type="text" name="maxCapacity" label="Max Capacity" />
          <PHSelect
            mode="multiple"
            options={weekDaysOptions}
            name="days"
            label="Days"
          />
          <PHTimePicker name="startTime" label="Start Time" />
          <PHTimePicker name="endTime" label="End Time" />

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default OfferCourse;