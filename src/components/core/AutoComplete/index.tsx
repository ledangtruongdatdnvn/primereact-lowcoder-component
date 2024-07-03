import {
  booleanExposingStateControl,
  eventHandlerControl,
  hiddenPropertyView,
  jsonControl,
  jsonExposingStateControl,
  NameConfig,
  NameConfigHidden,
  Section,
  stringExposingStateControl,
  toJSONObject,
  toJSONObjectArray,
  UICompBuilder,
  withExposingConfigs,
} from 'lowcoder-sdk';
import { AutoComplete } from 'primereact/autocomplete';
import LabelWrapper from '../../../components/common/LabelWrapper';

const defStaticProps = {
  placeholder: 'Enter a country name',
  field: 'name',
  inputStyle: {
    width: '100%',
  },
  style: {
    width: '100%',
  },
};
const defValue = '';
const defSuggestions = [
  { name: 'United Kingdom', code: 'UK' },
  { name: 'United States', code: 'USA' },
];

let AutoCompleteCompBase = (function () {
  const childrenMap = {
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

    return (
      <div style={{ padding: '5px' }}>
        <LabelWrapper label={props.label.value} required={props.required.value} error={props.error.value} caption={props.caption.value} showCaption={props.showCaption.value}>
          <AutoComplete
            {...props.staticProps}
            suggestions={props.suggestions.value}
            value={props.value.value}
            completeMethod={search}
            onChange={handleChange}
            invalid={props.error.value.length > 0}
          ></AutoComplete>
        </LabelWrapper>
      </div>
    );
  })
    .setPropertyViewFn((children: any) => {
      return (
        <>
          <Section name='Basic'>
            {children.staticProps.propertyView({ label: 'Static Props' })}
            {children.value.propertyView({ label: 'Value' })}
            {children.suggestions.propertyView({ label: 'Suggestions' })}
          </Section>
          <Section name='Interaction'>{hiddenPropertyView(children)}</Section>
          <Section name='Form'>
            {children.label.propertyView({ label: 'Label' })}
            {children.error.propertyView({ label: 'Error' })}
            {children.caption.propertyView({ label: 'Caption' })}
            {children.showCaption.propertyView({ label: 'Show caption' })}
            {children.required.propertyView({ label: 'Required' })}
          </Section>
          <Section name='Event'>{children.onEvent.getPropertyView()}</Section>
          <Section name='Description'>
            <ol className='text-sm p-0 m-0 mx-3'>
              <li>Static Props area should contain only static props of Primereact AutoComplete.</li>
              <li>
                <a href='https://primereact.org/autocomplete/' target='_blank'>
                  More information
                </a>
              </li>
            </ol>
          </Section>
        </>
      );
    })
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
