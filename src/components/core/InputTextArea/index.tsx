import LabelWrapper from '../../../components/common/LabelWrapper';
import {
  booleanExposingStateControl,
  eventHandlerControl,
  hiddenPropertyView,
  jsonControl,
  NameConfig,
  NameConfigHidden,
  Section,
  stringExposingStateControl,
  toJSONObject,
  UICompBuilder,
  withExposingConfigs
} from 'lowcoder-sdk';
import {InputTextarea, InputTextareaProps} from 'primereact/inputtextarea';
import {INPUT_DEFAULT_ONCHANGE_DEBOUNCE} from "../../common/constants/perf";
import {ChangeEvent, useEffect, useRef, useState} from "react";
import _ from "lodash";

export interface TextAreaProps extends InputTextareaProps {
  debounce?: number;
}

function TacoTextArea(props: TextAreaProps) {
  const {onChange, value, debounce = INPUT_DEFAULT_ONCHANGE_DEBOUNCE, ...inputProps} = props;
  const [internalValue, setIntervalValue] = useState(value);
  const isTypingRef = useRef(0);

  const originOnChangeRef = useRef(onChange);
  originOnChangeRef.current = onChange;

  const debouncedOnChangeRef = useRef(debounce > 0 ? _.debounce((e: ChangeEvent<HTMLTextAreaElement>) => {
    window.clearTimeout(isTypingRef.current);
    isTypingRef.current = window.setTimeout(() => (isTypingRef.current = 0), 100);
    originOnChangeRef.current?.(e);
  }, debounce) : (e: ChangeEvent<HTMLTextAreaElement>) => originOnChangeRef.current?.(e));

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setIntervalValue(e.target.value);
    debouncedOnChangeRef.current?.(e);
  };

  useEffect(() => {
    if (!isTypingRef.current) {
      setIntervalValue(value);
    }
  }, [value]);

  return (<InputTextarea
    value={internalValue}
    onChange={(e) => handleChange(e)}
    {...inputProps}
  />);
}

const defStaticProps = {
  tooltip: 'Enter a description', variant: 'filled', style: {
    width: '100%',
  },
};
const defValue = '';

let InputTextareaCompBase = (function () {
  const childrenMap = {
    staticProps: jsonControl(toJSONObject, defStaticProps),
    value: stringExposingStateControl('value', defValue),
    label: stringExposingStateControl('label', ''),
    error: stringExposingStateControl('error', ''),
    caption: stringExposingStateControl('caption', ''),
    showCaption: booleanExposingStateControl('showCaption', false),
    required: booleanExposingStateControl('required', false),
    onEvent: eventHandlerControl([{
      label: 'onChange', value: 'change', description: 'Triggers when Input Textarea is changed.',
    },]),
  };

  return new UICompBuilder(childrenMap, (props: any) => {
    const handleChange = (e: any) => {
      props.value.onChange(e.target.value);
      props.onEvent('change');
    };

    return (<div style={{padding: '5px'}}>
        <LabelWrapper label={props.label.value} required={props.required.value} error={props.error.value}
                      caption={props.caption.value} showCaption={props.showCaption.value}>
          <TacoTextArea {...props.staticProps} value={props.value.value} onChange={handleChange}
                        invalid={props.error.value.length > 0}></TacoTextArea>
        </LabelWrapper>
      </div>);
  })
    .setPropertyViewFn((children: any) => {
      return (<>
          <Section name='Basic'>
            {children.staticProps.propertyView({label: 'Static Props'})}
            {children.value.propertyView({label: 'Value'})}
          </Section>
          <Section name='Interaction'>
            {hiddenPropertyView(children)}
          </Section>
          <Section name='Form'>
            {children.label.propertyView({label: 'Label'})}
            {children.error.propertyView({label: 'Error'})}
            {children.caption.propertyView({label: 'Caption'})}
            {children.showCaption.propertyView({label: 'Show caption'})}
            {children.required.propertyView({label: 'Required'})}
          </Section>
          <Section name='Event'>{children.onEvent.getPropertyView()}</Section>
          <Section name='Description'>
            <ol className='text-sm p-0 m-0 mx-3'>
              <li>Static Props area should contain only static props of Primereact InputTextarea.</li>
              <li>
                <a href='https://primereact.org/inputtextarea/' target='_blank'>
                  More information
                </a>
              </li>
            </ol>
          </Section>
        </>);
    })
    .build();
})();
const exposingConfigs = [new NameConfig('staticProps'), new NameConfig('value'), new NameConfig('label'), new NameConfig('error'), new NameConfig('caption'), new NameConfig('showCaption'), new NameConfig('required'), NameConfigHidden,];
export default withExposingConfigs(InputTextareaCompBase, exposingConfigs);
