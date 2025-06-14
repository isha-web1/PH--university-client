import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";


const CreateAcademicSemester = () => {


     const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading('Creating...');

   

    const semesterData = {
      name,
      code: data.name,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };

    return (
         <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicSemesterSchema)}
        >
          <PHSelect label="Name" name="name"  />
          <PHSelect label="Year" name="year"  />
          <PHSelect
            label="Start Month"
            name="startMonth"
            
          />
          <PHSelect label="End Month" name="endMonth"  />

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
    );
};

export default CreateAcademicSemester;