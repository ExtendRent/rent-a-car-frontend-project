import { useFormikContext } from "formik";
import { ErrorMessage, Field } from "formik";

type FormValues = {
  [key: string]: any;
};

type Props = {
  label: string;
  name: string;
};

const FormikCheckbox = (props: Props) => {
  const { values } = useFormikContext<FormValues>(); // useFormikContext'a FormValues türünü belirtin

  return (
    <div className="mb-3">
      <label className="form-check-label" style={{color:'white'}}>
        <Field
          type="checkbox"
          name={props.name}
          className="form-check-input"
          checked={values[props.name]}
        />
        {props.label}
      </label>
      <ErrorMessage name={props.name}>
        {message => <span className="text-danger">{message}</span>}
      </ErrorMessage>
    </div>
  );
};

export default FormikCheckbox;
