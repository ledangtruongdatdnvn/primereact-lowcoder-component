import { RadioButton } from 'primereact/radiobutton';

const AppRadioButton = (props: any) => {
  return (
    <>
      <RadioButton {...props}></RadioButton>
      <label htmlFor={props.inputId} className='ml-2'>
        {props.name}
      </label>
    </>
  );
};

export default AppRadioButton;
