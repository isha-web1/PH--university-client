import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { bloodGroupOptions, genderOptions } from "../../../constants/global";
import PHDatePicker from "../../../components/form/PHDatePicker";
import {
  useGetAcademicDepartmentsQuery,
  useGetAllSemestersQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { useAddStudentMutation } from "../../../redux/features/admin/userManagement.api";
import dayjs from "dayjs";


const studentDummyData = {
  password: "ami123",
  student: {
    name: {
      firstName: "mykel", // Only alphabets, required
      secondName: "Doe", // Optional, may be left blank
      lastName: "Smith", // Required
    },
    gender: "male", // Required
    dateOfBirth: "1998-05-15T00:00:00.000Z",
    email: "new@example.com", // Required
    contactNo: "1234567890", // Required
    emergencyContactNo: "0987654321",
    bloodGroup: "A+", // Required, one of the specified values
    presentAddress: "123 Main St, Anytown",
    permanentAddress: "456 Oak Ave, Othercity",
    guardian: {
      fatherName: "Robert Smith",
      fatherOccupation: "Engineer",
      fatherContact: "1112223333", // Required, not fatherContactNo
      motherName: "Alice Smith",
      motherOccupation: "Doctor",
      motherContact: "4445556666", // Required, not motherContactNo
    },

    localGuardian: {
      name: "Jane Local",
      occupation: "Teacher",
      contact: "7778889999", // Required, not contactNo
      address: "789 Pine Rd, Smallville",
    },

    admissionSemester: "68320232d37583bf5b657548",
    academicDepartment: "683340b976fa2e8237adce3b",
  },
};

//! This is only for development
//! Should be removed
const studentDefaultValues = {
  name: {
    firstName: "mykel",
    secondName: "Doe",
    lastName: "Smith",
  },
  gender: "male",
  dateOfBirth: dayjs("1998-05-15T00:00:00.000Z"), // ✅ dayjs object,
  email: "new@example.com",
  contactNo: "1234567890",
  emergencyContactNo: "0987654321",
  bloodGroup: "A+",
  presentAddress: "123 Main St, Anytown",
  permanentAddress: "456 Oak Ave, Othercity",
  guardian: {
    fatherName: "Robert Smith",
    fatherOccupation: "Engineer",
    fatherContact: "1112223333",
    motherName: "Alice Smith",
    motherOccupation: "Doctor",
    motherContact: "4445556666"
  },
  localGuardian: {
    name: "Jane Local",
    occupation: "Teacher",
    contact: "7778889999",
    address: "789 Pine Rd, Smallville"
  },
  admissionSemester: "68320232d37583bf5b657548",
  academicDepartment: "683340b976fa2e8237adce3b"
};



const CreateStudent = () => {
  const [addStudent, { data, error }] = useAddStudentMutation();

  console.log({ data, error });

  const { data: sData, isLoading: sIsLoading } =
    useGetAllSemestersQuery(undefined);

  const { data: dData, isLoading: dIsLoading } =
    useGetAcademicDepartmentsQuery(undefined);

  const semesterOptions = sData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`,
  }));

  const departmentOptions = dData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
     const processedData = {
    ...data,
    dateOfBirth: data.dateOfBirth ? data.dateOfBirth.toISOString() : undefined,
  };
    const studentData = {
      password: "ami123",
      student: processedData,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(studentData));

    // Only append file if exists and is a File object
    // if (data.image instanceof File) {
    //   formData.append('file', data.image);
    // }
    console.log("Form Data:", formData);
    addStudent(studentData);
  };

  return (
    <Row justify="center">
      <Col span={24}>
        <PHForm onSubmit={onSubmit} defaultValues={studentDefaultValues}>
          <Divider>Personal Info.</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="name.firstName" label="First Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="name.secondName" label="Second Name" />{" "}
              {/* optional per backend */}
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="name.lastName" label="Last Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect options={genderOptions} name="gender" label="Gender" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHDatePicker name="dateOfBirth" label="Date of Birth" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                options={bloodGroupOptions}
                name="bloodGroup"
                label="Blood Group"
              />
            </Col>
          </Row>
          <Divider>Contact Info.</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="email" label="Email" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="contactNo" label="Contact No." />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="emergencyContactNo"
                label="Emergency Contact No."
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="presentAddress"
                label="Present Address"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="permanentAddress"
                label="Permanent Address"
              />
            </Col>
          </Row>
          <Divider>Guardian</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.fatherName"
                label="Father Name"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.fatherOccupation"
                label="Father Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.fatherContact"
                label="Father Contact"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.motherName"
                label="Mother Name"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.motherOccupation"
                label="Mother Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.motherContact"
                label="Mother Contact"
              />
            </Col>
          </Row>
          <Divider>Local Guardian</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="localGuardian.name"
                label="Local Guardian Name"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="localGuardian.occupation"
                label="Local Guardian Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="localGuardian.contact"
                label="Local Guardian Contact"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="localGuardian.address"
                label="Local Guardian Address"
              />
            </Col>
          </Row>
          <Divider>Academic Info.</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                options={semesterOptions}
                disabled={sIsLoading}
                name="admissionSemester"
                label="Admission Semester"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                options={departmentOptions}
                disabled={dIsLoading}
                name="academicDepartment"
                label="Academic Department"
              />
            </Col>
          </Row>

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Row>
  );
};

export default CreateStudent;
