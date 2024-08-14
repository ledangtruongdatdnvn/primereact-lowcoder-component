interface LabelWrapperProps {
  inputId?: string;
  label?: string;
  required?: boolean;
  error?: string;
  caption?: string;
  showCaption?: boolean;
  underRightContent?: string;
  children?: React.ReactNode;
}

const LabelWrapper = ({ label, inputId, required, error, caption, showCaption, underRightContent, children }: LabelWrapperProps): React.JSX.Element => {
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
      {showCaption && (
        <div className='flex justify-content-between gap-2 mt-1'>
          {caption && caption?.length > 0 ? <div style={{ color: 'var(--text-color-secondary)', whiteSpace: 'normal', wordBreak: 'break-word' }}>{caption}</div> : <div></div>}
          {underRightContent && underRightContent.length > 0 && <div style={{ color: 'var(--text-color-secondary)' }}>{underRightContent}</div>}
        </div>
      )}
      {error && error?.length > 0 && <div className='p-error mt-1'>{error}</div>}
    </>
  );
};

export default LabelWrapper;
