import {
  eventHandlerControl,
  jsonControl,
  jsonExposingStateControl,
  NameConfig,
  Section,
  stringExposingStateControl,
  toJSONObject,
  toJSONObjectArray,
  UICompBuilder,
  withExposingConfigs,
} from 'lowcoder-sdk';
import { AutoComplete } from 'primereact/autocomplete';

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

    return <AutoComplete {...props.staticProps} suggestions={props.suggestions.value} value={props.value.value} completeMethod={search} onChange={handleChange}></AutoComplete>;
  })
    .setPropertyViewFn((children: any) => {
      return (
        <>
          <Section name='Basic'>
            {children.staticProps.propertyView({ label: 'Static Props' })}
            {children.value.propertyView({ label: 'Value' })}
            {children.suggestions.propertyView({ label: 'Suggestions' })}
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

const exposingConfigs = [new NameConfig('staticProps'), new NameConfig('value'), new NameConfig('suggestions')];
export default withExposingConfigs(AutoCompleteCompBase, exposingConfigs);
