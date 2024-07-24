interface LabelWrapperProps {
  inputId?: string;
  label?: string;
  required?: boolean;
  error?: string;
  caption?: string;
  showCaption?: boolean;
  children?: React.ReactNode;
}

const LabelWrapper = ({ label, inputId, required, error, caption, showCaption, children }: LabelWrapperProps): React.JSX.Element => {
  return (
    <>
      <div className='flex flex-column gap-2'>
        {label && label?.length > 0 && (
          <label htmlFor={inputId} className={required ? 'required' : ''}>
            {label}
          </label>
        )}
        {children}
      </div>
      {caption && caption?.length > 0 && showCaption && (
        <div className='mt-1' style={{ color: 'var(--text-color-secondary)' }}>
          {caption}
        </div>
      )}
      {error && error?.length > 0 && <div className='p-error mt-1'>{error}</div>}
    </>
  );
};

export default LabelWrapper;
