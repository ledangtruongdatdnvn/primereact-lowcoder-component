import {
  blurMethod,
  booleanExposingStateControl,
  eventHandlerControl,
  focusWithOptions,
  hiddenPropertyView,
  jsonControl,
  jsonExposingStateControl,
  NameConfig,
  NameConfigHidden,
  RefControl,
  refMethods,
  Section,
  stringExposingStateControl,
  toJSONObject,
  toJSONObjectArray,
  UICompBuilder,
  withExposingConfigs,
} from 'lowcoder-sdk';
import { AutoComplete } from 'primereact/autocomplete';
import LabelWrapper from '../../../components/common/LabelWrapper';
import { ChangeEvent } from 'react';

const defStaticProps = {
  placeholder: 'Enter a country name',
  field: 'name',
  inputStyle: {
    width: '100%',
  },
  style: {
    width: '100%',
  },
  showClear: true,
  iconClass: 'pi pi-search',
};
const defValue = '';
const defSuggestions = [
  { name: 'United Kingdom', code: 'UK' },
  { name: 'United States', code: 'USA' },
];

let AutoCompleteCompBase = (function () {
  const childrenMap = {
    viewRef: RefControl,
    staticProps: jsonControl(toJSONObject, defStaticProps),
    value: stringExposingStateControl('value', defValue),
    label: stringExposingStateControl('label', ''),
    error: stringExposingStateControl('error', ''),
    caption: stringExposingStateControl('caption', ''),
    showCaption: booleanExposingStateControl('showCaption', false),
    required: booleanExposingStateControl('required', false),
    suggestions: jsonExposingStateControl('suggestions', toJSONObjectArray, defSuggestions),
    onEvent: eventHandlerControl([
      {
        label: 'onChange',
        value: 'change',
        description: 'Triggers when Auto Complete is changed.',
      },
      {
        label: 'completeMethod',
        value: 'complete',
        description: 'Triggers when Auto Complete is completed.',
      },
    ]),
  };

  return new UICompBuilder(childrenMap, (props: any) => {
    const handleChange = (e: any) => {
      props.value.onChange(e.target.value);
      props.onEvent('change');
    };

    const search = () => {
      props.onEvent('complete');
    };

    const handleClear = (e: any) => {
      handleChange?.({ target: { value: '' } } as ChangeEvent<HTMLInputElement>); // clear value
    };

    const classNames = [
      props.staticProps.iconClass && props.staticProps.iconClass.length > 0 && 'p-input-icon-left',
      props.staticProps.showClear && props.value.value && props.value.value.length > 0 && 'p-input-icon-right',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <LabelWrapper
        label={props.label.value}
        required={props.required.value}
        error={props.error.value}
        caption={props.caption.value}
        showCaption={props.showCaption.value}
      >
        <span className={classNames}>
          {props.staticProps.iconClass && <i className={props.staticProps.iconClass} style={{ zIndex: 9 }}></i>}
          <AutoComplete
            ref={props.viewRef}
            {...props.staticProps}
            suggestions={props.suggestions.value}
            value={props.value.value}
            completeMethod={search}
            onChange={handleChange}
            inputStyle={{
              paddingLeft: props.staticProps.iconClass ? '40px' : '12px',
              paddingRight:
                props.staticProps.showClear &&
                props.value.value &&
                props.value.value?.length > 0 &&
                !props.staticProps.disabled
                  ? '40px'
                  : '12px',
              width: '100%',
            }}
            invalid={props.error.value.length > 0}
          ></AutoComplete>
          {props.staticProps.showClear &&
            props.value.value &&
            props.value.value?.length > 0 &&
            !props.staticProps.disabled && <i className="pi pi-times cursor-pointer" onClick={handleClear}></i>}
        </span>
      </LabelWrapper>
    );
  })
    .setPropertyViewFn((children: any) => {
      return (
        <>
          <Section name="Basic">
            {children.staticProps.propertyView({ label: 'Static Props' })}
            {children.value.propertyView({ label: 'Value' })}
            {children.suggestions.propertyView({ label: 'Suggestions' })}
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
            <ol className="text-sm p-0 m-0 mx-3">
              <li>Static Props area should contain only static props of Primereact AutoComplete.</li>
              <li>
                <a href="https://primereact.org/autocomplete/" target="_blank">
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
  new NameConfig('suggestions'),
  new NameConfig('label'),
  new NameConfig('error'),
  new NameConfig('caption'),
  new NameConfig('showCaption'),
  new NameConfig('required'),
  NameConfigHidden,
];
export default withExposingConfigs(AutoCompleteCompBase, exposingConfigs);
