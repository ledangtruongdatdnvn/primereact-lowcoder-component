const AppLabel = (props: any) => {
  return (
    <div className='flex flex-column gap-2'>
      <label>{props.label}</label>
      {props.children}
    </div>
  );
};
export default AppLabel;
