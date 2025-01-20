import LabelWrapper from '../../../components/common/LabelWrapper';
import {
  booleanExposingStateControl,
  hiddenPropertyView,
  jsonControl,
  NameConfig,
  NameConfigHidden,
  Section,
  stringExposingStateControl,
  toJSONObject,
  UICompBuilder,
  withExposingConfigs,
  InputEventHandlerControl,
  refMethods,
  RefControl,
  focusWithOptions,
  blurMethod,
} from 'lowcoder-sdk';
import { InputText, InputTextProps } from 'primereact/inputtext';
import { ChangeEvent, ForwardedRef, forwardRef, KeyboardEvent, useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import { INPUT_DEFAULT_ONCHANGE_DEBOUNCE } from '../../common/constants/perf';

interface InputProps extends InputTextProps {
  debounce?: number;
  iconClass?: string;
  showClear?: boolean;
}

const TacoInput = forwardRef(function (props: InputProps, ref: ForwardedRef<HTMLInputElement>) {
  const {
    onChange,
    value,
    debounce = INPUT_DEFAULT_ONCHANGE_DEBOUNCE,
    iconClass,
    showClear,
    disabled,
    ...inputProps
  } = props;
  const [internalValue, setIntervalValue] = useState(value);
  const isTypingRef = useRef(0);

  const originOnChangeRef = useRef(onChange);
  originOnChangeRef.current = onChange;

  const debouncedOnChangeRef = useRef(
    debounce > 0
      ? _.debounce((e: ChangeEvent<HTMLInputElement>) => {
          window.clearTimeout(isTypingRef.current);
          isTypingRef.current = window.setTimeout(() => (isTypingRef.current = 0), 100);
          originOnChangeRef.current?.(e);
        }, debounce)
      : (e: ChangeEvent<HTMLInputElement>) => originOnChangeRef.current?.(e)
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIntervalValue(e.target.value);
    debouncedOnChangeRef.current?.(e);
  };

  const handleClear = (e: any) => {
    onChange?.({ target: { value: '' } } as ChangeEvent<HTMLInputElement>); // clear value
  };

  const classNames = [
    iconClass && iconClass.length > 0 && 'p-input-icon-left',
    showClear && internalValue && internalValue.length > 0 && 'p-input-icon-right',
  ]
    .filter(Boolean)
    .join(' ');

  useEffect(() => {
    if (!isTypingRef.current) {
      setIntervalValue(value);
    }
  }, [value]);

  return (
    <span className={classNames} style={{ width: '100%' }}>
      {iconClass && <i className={iconClass}></i>}
      <InputText
        ref={ref}
        value={internalValue}
        onChange={(e) => handleChange(e)}
        disabled={disabled}
        {...inputProps}
      />
      {showClear && internalValue && internalValue?.length > 0 && !disabled && (
        <i className="pi pi-times cursor-pointer" onClick={handleClear}></i>
      )}
    </span>
  );
});

const defStaticProps = {
  placeholder: 'Enter a name',
  style: {
    width: '100%',
  },
  iconClass: 'pi pi-search',
  showClear: true,
};
const defValue = '';

export const textInputProps = (props: any) => ({
  onFocus: () => props.onEvent('focus'),
  onBlur: () => props.onEvent('blur'),
  onKeyUp: (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      props.onEvent('submit');
    }
  },
});

let InputTextCompBase = (function () {
  const childrenMap = {
    viewRef: RefControl,
    staticProps: jsonControl(toJSONObject, defStaticProps),
    value: stringExposingStateControl('value', defValue),
    iconClass: stringExposingStateControl('value', ''),
    label: stringExposingStateControl('label', ''),
    error: stringExposingStateControl('error', ''),
    caption: stringExposingStateControl('caption', ''),
    showCaption: booleanExposingStateControl('showCaption', false),
    required: booleanExposingStateControl('required', false),
    onEvent: InputEventHandlerControl,
  };

  return new UICompBuilder(childrenMap, (props: any) => {
    const handleChange = (e: any) => {
      props.value.onChange(e.target.value);
      props.onEvent('change');
    };

    return (
      <LabelWrapper
        label={props.label.value}
        required={props.required.value}
        error={props.error.value}
        caption={props.caption.value}
        showCaption={props.showCaption.value}
        underRightContent={
          props.staticProps.maxLength ? `${props.value.value.length}/${props.staticProps.maxLength}` : ''
        }
      >
        <TacoInput
          ref={props.viewRef}
          {...props.staticProps}
          {...textInputProps(props)}
          value={props.value.value}
          onChange={handleChange}
          invalid={props.error.value.length > 0}
        ></TacoInput>
      </LabelWrapper>
    );
  })
    .setPropertyViewFn((children: any) => {
      return (
        <>
          <Section name="Basic">
            {children.staticProps.propertyView({ label: 'Static Props' })}
            {children.value.propertyView({ label: 'Value' })}
          </Section>
          <Section name="Interaction">{hiddenPropertyView(children)}</Section>
          <Section name="Form">
            {children.label.propertyView({ label: 'Label' })}
            {children.error.propertyView({ label: 'Error' })}
            {children.caption.propertyView({ label: 'Caption' })}
            {children.showCaption.propertyView({ label: 'Show caption' })}
            {children.required.propertyView({ label: 'Required' })}
          </Section>
          <Section name="Event">{children.onEvent.getPropertyView()}</Section>
          <Section name="Description">
            <ol className="text-sm p-0 m-0 mx-4">
              <li>Static Props area should contain only static props of Primereact InputText.</li>
              <li>
                <a href="https://primereact.org/inputtext/" target="_blank">
                  More information
                </a>
              </li>
            </ol>
          </Section>
        </>
      );
    })
    .setExposeMethodConfigs(refMethods([focusWithOptions, blurMethod]))
    .build();
})();
const exposingConfigs = [
  new NameConfig('staticProps'),
  new NameConfig('value'),
  new NameConfig('label'),
  new NameConfig('error'),
  new NameConfig('caption'),
  new NameConfig('showCaption'),
  new NameConfig('required'),
  NameConfigHidden,
];
export default withExposingConfigs(InputTextCompBase, exposingConfigs);
