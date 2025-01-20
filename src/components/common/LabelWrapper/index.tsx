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

const LabelWrapper = ({
  label,
  inputId,
  required,
  error,
  caption,
  showCaption,
  underRightContent,
  children,
}: LabelWrapperProps): React.JSX.Element => {
  return (
    <>
      <div className="flex flex-col gap-2">
        {label && label?.length > 0 && (
          <label style={{ padding: '0 5px' }} htmlFor={inputId} className={required ? 'required' : ''}>
            {label}
          </label>
        )}
        <div style={{ padding: '0 5px' }}>{children}</div>
      </div>
      <div className="flex justify-between gap-2" style={{ padding: '0 5px' }}>
        {error && error?.length > 0 ? (
          <div className="p-error">{error}</div>
        ) : showCaption && caption && caption?.length > 0 ? (
          <div
            style={{
              color: 'var(--text-color-secondary)',
              whiteSpace: 'normal',
              wordBreak: 'break-word',
            }}
          >
            {caption}
          </div>
        ) : (
          <div></div>
        )}
        {showCaption && underRightContent && underRightContent.length > 0 && (
          <div style={{ color: 'var(--text-color-secondary)' }}>{underRightContent}</div>
        )}
      </div>
    </>
  );
};

export default LabelWrapper;
